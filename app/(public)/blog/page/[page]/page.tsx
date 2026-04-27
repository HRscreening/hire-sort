import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogListing } from '../../_components/BlogListing';
import { getPaginatedPosts, POSTS_PER_PAGE } from '../../_lib/posts';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ page: string }>;

export const revalidate = 3600;

export async function generateStaticParams() {
  const total = await prisma.blogPost.count({ where: { published: true } });
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  // Page 1 is served by /blog, so generate 2..N here.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  const canonical = `/blog/page/${n}`;
  return {
    title: `Blog — Page ${n}`,
    description:
      'Insights, guides, and updates on modern hiring, AI resume screening, and recruiter productivity from the HireSort team.',
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPagePaginated({ params }: { params: Params }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2) notFound();

  const { totalPages } = await getPaginatedPosts(n);
  if (n > totalPages) notFound();

  return <BlogListing page={n} />;
}
