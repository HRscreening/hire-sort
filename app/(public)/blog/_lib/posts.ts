import 'server-only';
import { prisma } from '@/lib/prisma';
import type { BlogBlock, BlogAuthor } from '@/lib/blog-schema';

export type { BlogBlock, BlogAuthor };

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  tags: string[];
  body: BlogBlock[];
};

export const POSTS_PER_PAGE = 10;

type DbBlogPost = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  keywords: string[];
  author: unknown;
  publishedAt: Date;
  updatedAt: Date;
  readingTime: string;
  coverImage: string;
  coverAlt: string | null;
  category: string | null;
  tags: string[];
  body: unknown;
};

const toBlogPost = (row: DbBlogPost): BlogPost => ({
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle ?? '',
  description: row.description,
  keywords: row.keywords,
  author: row.author as BlogAuthor,
  publishedAt: row.publishedAt.toISOString(),
  updatedAt: row.updatedAt.toISOString(),
  readingTime: row.readingTime,
  coverImage: row.coverImage,
  coverAlt: row.coverAlt ?? '',
  category: row.category ?? '',
  tags: row.tags,
  body: row.body as BlogBlock[],
});

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(toBlogPost);
}

export async function getPostSlugs(): Promise<string[]> {
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r: { slug: string }) => r.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row || !row.published) return null;
  return toBlogPost(row);
}

export async function getPaginatedPosts(page: number): Promise<{
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const safePage = Math.max(1, Math.floor(page));
  const [total, rows] = await Promise.all([
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      skip: (safePage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
  ]);
  return {
    posts: rows.map(toBlogPost),
    total,
    totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
    page: safePage,
  };
}
