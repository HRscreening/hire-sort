import 'server-only';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BLOG_BUCKET;

const PUBLIC_PREFIX = '/storage/v1/object/public/';

const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
};

let cachedClient: ReturnType<typeof createClient> | null = null;

function adminClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var',
    );
  }
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return cachedClient;
}

/*
 Uploads a cover image for a blog post. The image is stored in Supabase Storage with a filename based on the blog post slug.
 The function checks the file type against a list of allowed image types and returns an appropriate error message if the type is unsupported or if the upload fails.
*/
export async function uploadCoverForSlug(
  slug: string,
  file: File,
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  if (!BUCKET) return { ok: false, message: 'SUPABASE_BLOG_BUCKET env var is not set' };

  const ext = ALLOWED_EXT[file.type];
  if (!ext) {
    return { ok: false, message: `Unsupported image type: ${file.type || 'unknown'}` };
  }

  const path = `${slug}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await adminClient()
    .storage.from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
      cacheControl: '3600',
    });

  if (error) return { ok: false, message: error.message };
  return { ok: true, path };
}

export function coverImageUrl(coverImage: string): string {
  if (!coverImage) return '';
  if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) return coverImage;
  if (coverImage.startsWith('/')) return coverImage;
  if (!SUPABASE_URL || !BUCKET) return coverImage;
  return `${SUPABASE_URL}${PUBLIC_PREFIX}${BUCKET}/${coverImage}`;
}
