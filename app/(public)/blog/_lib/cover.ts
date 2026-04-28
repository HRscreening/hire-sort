const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BLOG_BUCKET;

export function resolveCoverImage(coverImage: string | undefined): string {
  if (!coverImage) return '/blog/cover-placeholder.png';
  if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) return coverImage;
  if (coverImage.startsWith('/')) return coverImage;
  if (!SUPABASE_URL || !BUCKET) return coverImage;
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${coverImage}`;
}
