import { z } from 'zod';

// Schema for individual blog content blocks
export const BlogBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1, 'Heading text is required'),
  }),
  z.object({
    type: z.literal('paragraph'),
    text: z.string().min(1, 'Paragraph text is required'),
  }),
  z.object({
    type: z.literal('list'),
    items: z.array(z.string()).min(1, 'List must have at least one item'),
  }),
  z.object({
    type: z.literal('callout'),
    title: z.string().optional(),
    text: z.string().min(1, 'Callout text is required'),
  }),
]);

// Schema for the blog post author
export const BlogAuthorSchema = z.object({
  name: z.string().min(1, 'Author name is required'),
  role: z.string().optional(),
});

// Main Blog Post Schema
export const BlogPostSchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be url-friendly'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().min(1, 'Meta description is required').max(160),
  keywords: z.array(z.string()),
  author: BlogAuthorSchema,
  publishedAt: z.string().datetime({ message: 'Invalid ISO date for publishedAt' }),
  updatedAt: z.string().datetime({ message: 'Invalid ISO date for updatedAt' }).optional(),
  readingTime: z.string().min(1, 'Reading time is required'),
  coverImage: z.string().min(1, 'Cover image path is required'),
  coverAlt: z.string().min(1, 'Alt text is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  body: z.array(BlogBlockSchema).min(1, 'Blog body cannot be empty'),
});

// Type inference for use in your frontend/backend
export type BlogPostInput = z.infer<typeof BlogPostSchema>;