import type { MetadataRoute } from 'next';
import { getAllPosts } from './(public)/blog/_lib/posts';
import {
  getComparisonBySlug,
  getComparisonSlugs,
} from './(public)/resources/compare/_data';
import { getAllProductPages } from '@/app/(public)/product/_lib/registry';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/faqs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const compareRoutes: MetadataRoute.Sitemap = getComparisonSlugs()
    .map((slug) => getComparisonBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => ({
      url: `${siteUrl}/resources/compare/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  const productRoutes: MetadataRoute.Sitemap = getAllProductPages().map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...postRoutes, ...compareRoutes, ...productRoutes];
}
