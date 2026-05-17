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

const toBlogPost = (post: BlogPostInput): BlogPost => ({
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

let cachedPosts: Promise<BlogPost[]> | null = null;

const loadPosts = async (): Promise<BlogPost[]> => {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
        return toBlogPost(blogPostInputSchema.parse(JSON.parse(raw)));
      }),
  );

  return posts
    .filter((post) => post.publishedAt && post.body.length > 0)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
};

const getPosts = (): Promise<BlogPost[]> => {
  if (!cachedPosts) cachedPosts = loadPosts();
  return cachedPosts;
};

export async function getAllPosts(): Promise<BlogPost[]> {
  return getPosts();
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPaginatedPosts(page: number): Promise<{
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const safePage = Math.max(1, Math.floor(page));
  const allPosts = await getPosts();
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
