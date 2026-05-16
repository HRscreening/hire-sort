import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  blogPostInputSchema,
  type BlogBlock,
  type BlogAuthor,
  type BlogPostInput,
} from '@/lib/blog-schema';

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
  coverImage?: string;
  coverAlt: string;
  category: string;
  tags: string[];
  body: BlogBlock[];
};

export const POSTS_PER_PAGE = 10;

const POSTS_DIR = path.join(
  process.cwd(),
  'app',
  '(public)',
  'blog',
  '_lib',
  'posts',
);

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
  coverImage: string | null;
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
  coverImage: row.coverImage ?? undefined,
  coverAlt: row.coverAlt ?? '',
  category: row.category ?? '',
  tags: row.tags,
  body: row.body as BlogBlock[],
});

const toJsonBlogPost = (post: BlogPostInput): BlogPost => ({
  slug: post.slug,
  title: post.title,
  subtitle: post.subtitle ?? '',
  description: post.description,
  keywords: post.keywords,
  author: post.author,
  publishedAt: new Date(post.publishedAt).toISOString(),
  updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
  readingTime: post.readingTime,
  coverImage: post.coverImage ?? undefined,
  coverAlt: post.coverAlt ?? '',
  category: post.category ?? '',
  tags: post.tags,
  body: post.body,
});

const shouldUseJsonPosts = () => !process.env.DATABASE_URL;

const getPrisma = async () => {
  const { prisma } = await import('@/lib/prisma');
  return prisma;
};

const getJsonPosts = async (): Promise<BlogPost[]> => {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
        return toJsonBlogPost(blogPostInputSchema.parse(JSON.parse(raw)));
      }),
  );

  return posts
    .filter((post) => post.publishedAt && post.body.length > 0)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
};

export async function getAllPosts(): Promise<BlogPost[]> {
  if (shouldUseJsonPosts()) return getJsonPosts();
  const prisma = await getPrisma();
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map(toBlogPost);
}

export async function getPostSlugs(): Promise<string[]> {
  if (shouldUseJsonPosts()) {
    const posts = await getJsonPosts();
    return posts.map((post) => post.slug);
  }
  const prisma = await getPrisma();
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r: { slug: string }) => r.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (shouldUseJsonPosts()) {
    const posts = await getJsonPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  }
  const prisma = await getPrisma();
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
  if (shouldUseJsonPosts()) {
    const allPosts = await getJsonPosts();
    const total = allPosts.length;
    const posts = allPosts.slice(
      (safePage - 1) * POSTS_PER_PAGE,
      safePage * POSTS_PER_PAGE,
    );
    return {
      posts,
      total,
      totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
      page: safePage,
    };
  }

  const prisma = await getPrisma();
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
