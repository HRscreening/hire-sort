import { getPostBySlug } from '../_lib/posts';
import { OG_CONTENT_TYPE, OG_SIZE, renderOGCard } from '@/lib/og-card';

export const alt = 'HireSort blog post';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return renderOGCard({
    eyebrow: post?.category ?? 'Blog',
    title: post?.title ?? 'HireSort Blog',
    subtitle: post?.subtitle,
    byline: post?.author?.name,
  });
}
