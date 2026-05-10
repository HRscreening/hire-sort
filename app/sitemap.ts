import type { MetadataRoute } from 'next';
import { getAllPosts } from './(public)/blog/_lib/posts';
import {
  getComparisonBySlug,
  getComparisonSlugs,
} from './(public)/resources/compare/_data';
import { getAllProductPages } from '@/app/(public)/product/_lib/registry';
import { getAllUseCases } from '@/app/(public)/use-cases/_lib/registry';
import { getAllAtsPages } from '@/app/(public)/applicant-tracking-system/_lib/registry';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/faqs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
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

  const useCaseRoutes: MetadataRoute.Sitemap = getAllUseCases().map((p) => ({
    url: `${siteUrl}/use-cases/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const atsRoutes: MetadataRoute.Sitemap = getAllAtsPages().map((p) => ({
    url: `${siteUrl}/applicant-tracking-system/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const sectionIndexRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/use-cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/applicant-tracking-system`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/resources/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/product`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
  ];

  return [
    ...staticRoutes,
    ...postRoutes,
    ...compareRoutes,
    ...productRoutes,
    ...useCaseRoutes,
    ...atsRoutes,
    ...sectionIndexRoutes,
  ];
}
