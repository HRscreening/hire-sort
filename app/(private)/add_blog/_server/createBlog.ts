'use server';

import { revalidatePath } from 'next/cache';
import { flattenError } from 'zod';
import { prisma } from '@/lib/prisma';
import { blogPostInputSchema } from '@/lib/blog-schema';
import { uploadCoverForSlug } from '@/lib/storage';
import { hasAdminSession } from './auth';

export type CreateBlogResult =
  | { ok: true; slug: string }
  | { ok: false; reason: 'unauthorized' }
  | { ok: false; reason: 'invalid_json'; message: string }
  | { ok: false; reason: 'missing_image' }
  | { ok: false; reason: 'upload_failed'; message: string }
  | { ok: false; reason: 'validation'; fieldErrors: Record<string, string[]>; formErrors: string[] }
  | { ok: false; reason: 'duplicate'; slug: string }
  | { ok: false; reason: 'server_error'; message: string };

export async function createBlogAction(formData: FormData): Promise<CreateBlogResult> {
  if (!(await hasAdminSession())) return { ok: false, reason: 'unauthorized' };

  const raw = formData.get('json');
  if (typeof raw !== 'string' || raw.trim() === '') {
    return { ok: false, reason: 'invalid_json', message: 'Paste a JSON document.' };
  }

  let parsedJson: Record<string, unknown>;
  try {
    parsedJson = JSON.parse(raw);
  } catch (e) {
    return {
      ok: false,
      reason: 'invalid_json',
      message: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }

  const cover = formData.get('cover');
  if (!(cover instanceof File) || cover.size === 0) {
    return { ok: false, reason: 'missing_image' };
  }

  // Validate the schema first with a placeholder coverImage so a bad
  // payload doesn't leave an orphaned upload in storage.
  const result = blogPostInputSchema.safeParse({ ...parsedJson, coverImage: 'pending' });
  if (!result.success) {
    const flat = flattenError(result.error);
    return {
      ok: false,
      reason: 'validation',
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
      formErrors: flat.formErrors,
    };
  }

  const data = result.data;

  const existing = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
    select: { slug: true },
  });
  if (existing) return { ok: false, reason: 'duplicate', slug: data.slug };

  const upload = await uploadCoverForSlug(data.slug, cover);
  if (!upload.ok) return { ok: false, reason: 'upload_failed', message: upload.message };
  data.coverImage = upload.path;

  try {
    await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle || null,
        description: data.description,
        keywords: data.keywords,
        author: data.author,
        publishedAt: new Date(data.publishedAt),
        readingTime: data.readingTime,
        coverImage: data.coverImage,
        coverAlt: data.coverAlt || null,
        category: data.category || null,
        tags: data.tags,
        body: data.body,
        published: data.published,
      },
    });
  } catch (e) {
    return {
      ok: false,
      reason: 'server_error',
      message: e instanceof Error ? e.message : 'Database error',
    };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/sitemap.xml');

  return { ok: true, slug: data.slug };
}
