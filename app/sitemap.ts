import type { MetadataRoute } from 'next';
import { getAllPosts } from './(public)/blog/_lib/posts';
import {
  getComparisonBySlug,
  getComparisonSlugs,
} from './(public)/resources/compare/_data';
import { getAllProductPages } from '@/app/(public)/product/_lib/registry';
import { getAllUseCases } from '@/app/(public)/use-cases/_lib/registry';
import { getAllAtsPages } from '@/app/(public)/applicant-tracking-system/_lib/registry';
import { getAllBestPages } from '@/app/(public)/resources/best/_data';
import { getAllJobDescriptions } from '@/app/(public)/resources/job-descriptions/_data';
import { getAllInterviewQuestions } from '@/app/(public)/resources/interview-questions/_data';
import { getAllScorecards } from '@/app/(public)/resources/scorecards/_data';
import { getAllScreeningRubrics } from '@/app/(public)/resources/screening-rubrics/_data';
import { getAllToolDetails } from '@/app/(public)/free-tools/_data/details';
import { TEST_JOB } from '@/lib/test-job';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

/**
 * Stable lastModified dates for static pages. Bump the relevant date when the
 * page's content actually changes — never use `new Date()` here, because that
 * tells crawlers the page churns daily even when it doesn't, hurting crawl budget.
 */
const STATIC_PAGE_UPDATED = {
  home: new Date('2026-05-15'),
  about: new Date('2026-05-01'),
  contact: new Date('2026-05-01'),
  pricing: new Date('2026-05-01'),
  faqs: new Date('2026-05-01'),
  privacy: new Date('2026-01-01'),
  terms: new Date('2026-01-01'),
  sectionIndex: new Date('2026-05-15'),
  tools: new Date('2026-06-03'),
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: STATIC_PAGE_UPDATED.home, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: STATIC_PAGE_UPDATED.about, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: STATIC_PAGE_UPDATED.contact, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified: STATIC_PAGE_UPDATED.pricing, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/faqs`, lastModified: STATIC_PAGE_UPDATED.faqs, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: STATIC_PAGE_UPDATED.privacy, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/terms`, lastModified: STATIC_PAGE_UPDATED.terms, changeFrequency: 'yearly', priority: 0.4 },
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

  const bestRoutes: MetadataRoute.Sitemap = getAllBestPages().map((p) => ({
    url: `${siteUrl}/resources/best/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const jobDescriptionRoutes: MetadataRoute.Sitemap = getAllJobDescriptions().map((p) => ({
    url: `${siteUrl}/resources/job-descriptions/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const interviewQuestionRoutes: MetadataRoute.Sitemap = getAllInterviewQuestions().map((p) => ({
    url: `${siteUrl}/resources/interview-questions/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const scorecardRoutes: MetadataRoute.Sitemap = getAllScorecards().map((p) => ({
    url: `${siteUrl}/resources/scorecards/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const screeningRubricRoutes: MetadataRoute.Sitemap = getAllScreeningRubrics().map((p) => ({
    url: `${siteUrl}/resources/screening-rubrics/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const sectionIndex = STATIC_PAGE_UPDATED.sectionIndex;
  const sectionIndexRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/use-cases`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/free-tools`, lastModified: STATIC_PAGE_UPDATED.tools, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/applicant-tracking-system`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/resources`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/resources/compare`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/best`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/job-descriptions`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/interview-questions`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/scorecards`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/resources/screening-rubrics`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/product`, lastModified: sectionIndex, changeFrequency: 'weekly', priority: 0.85 },
  ];

  const jobRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/careers/${TEST_JOB.id}`,
      lastModified: new Date(TEST_JOB.datePosted),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dedicated, indexable SEO pages for each free tool (the interactive apps
  // themselves canonicalize elsewhere; these detail pages carry the content).
  const toolDetailRoutes: MetadataRoute.Sitemap = getAllToolDetails().map((t) => ({
    url: `${siteUrl}/free-tools/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Only the live screening tool is indexable. The demo (/demo), sample result
  // (/sample) and per-session result pages are noindex → intentionally excluded.
  const toolRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/tools/screening`, lastModified: STATIC_PAGE_UPDATED.tools, changeFrequency: 'monthly', priority: 0.8 },
  ];

  return [
    ...staticRoutes,
    ...jobRoutes,
    ...postRoutes,
    ...compareRoutes,
    ...productRoutes,
    ...useCaseRoutes,
    ...atsRoutes,
    ...bestRoutes,
    ...jobDescriptionRoutes,
    ...interviewQuestionRoutes,
    ...scorecardRoutes,
    ...screeningRubricRoutes,
    ...sectionIndexRoutes,
    ...toolDetailRoutes,
    ...toolRoutes,
  ];
}
