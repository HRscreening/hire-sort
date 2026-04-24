import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type BlogBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; title?: string; text: string };

export type BlogAuthor = {
  name: string;
  role?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  /** Meta description — used for <meta name="description"> and OpenGraph. */
  description: string;
  keywords: string[];
  author: BlogAuthor;
  /** ISO date (YYYY-MM-DD or full ISO). */
  publishedAt: string;
  /** ISO date. Omit if never edited. */
  updatedAt?: string;
  /** Human-readable estimate, e.g. "6 min read". */
  readingTime: string;
  /** Path relative to /public, e.g. "/blog1.jpeg". */
  coverImage: string;
  coverAlt: string;
  category: string;
  tags: string[];
  body: BlogBlock[];
};

const POSTS_DIR = path.join(process.cwd(), 'app', '(public)', 'blog', '_lib', 'posts');

async function readPost(fileName: string): Promise<BlogPost> {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as BlogPost;
}

/** Returns every post, sorted newest-first by publishedAt. */
export async function getAllPosts(): Promise<BlogPost[]> {
  let files: string[];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }
  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const posts = await Promise.all(jsonFiles.map(readPost));
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
