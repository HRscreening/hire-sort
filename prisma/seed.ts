import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '../lib/generated/prisma/client';
import { blogPostInputSchema } from '../lib/blog-schema';
import {prisma} from "@/lib/prisma";

const POSTS_DIR = path.join(
  process.cwd(),
  'app',
  '(public)',
  'blog',
  '_lib',
  'posts',
);

async function main() {
  let files: string[];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    console.log('No posts directory; nothing to seed.');
    return;
  }

  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  console.log(`Found ${jsonFiles.length} JSON post(s).`);

  for (const file of jsonFiles) {
    const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
    const parsed = blogPostInputSchema.safeParse(JSON.parse(raw));

    if (!parsed.success) {
      console.error(`Skipping ${file} — validation failed:`);
      console.error(JSON.stringify(parsed.error.flatten(), null, 2));
      continue;
    }

    const data = parsed.data;
    await prisma.blogPost.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
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
    console.log(`Seeded ${data.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
