import { z } from 'zod';

export const blogBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal('paragraph'),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal('list'),
    items: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal('callout'),
    title: z.string().optional(),
    text: z.string().min(1),
  }),
]);

export const blogAuthorSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
});

const isoDate = z
  .string()
  .refine((v) => !Number.isNaN(new Date(v).getTime()), 'Invalid ISO date');

export const blogPostInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),
  title: z.string().min(1),
  subtitle: z.string().optional().default(''),
  description: z.string().min(1),
  keywords: z.array(z.string().min(1)).default([]),
  author: blogAuthorSchema,
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  readingTime: z.string().min(1),
  coverImage: z.string().min(1).nullable().default(null),
  coverAlt: z.string().optional().default(''),
  category: z.string().optional().default(''),
  tags: z.array(z.string().min(1)).default([]),
  body: z.array(blogBlockSchema).min(1),
  published: z.boolean().optional().default(true),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;
export type BlogBlock = z.infer<typeof blogBlockSchema>;
export type BlogAuthor = z.infer<typeof blogAuthorSchema>;
