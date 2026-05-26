import 'server-only';
import { SITE_URL } from './seo';
import { getAllPosts, type BlogPost } from '@/app/(public)/blog/_lib/posts';
import {
  getComparisonSlugs,
  getComparisonBySlug,
} from '@/app/(public)/resources/compare/_data';
import { getAllProductPages } from '@/app/(public)/product/_lib/registry';
import { getAllUseCases } from '@/app/(public)/use-cases/_lib/registry';
import { getAllAtsPages } from '@/app/(public)/applicant-tracking-system/_lib/registry';
import { getAllBestPages } from '@/app/(public)/resources/best/_data';
import { getAllJobDescriptions } from '@/app/(public)/resources/job-descriptions/_data';
import { getAllInterviewQuestions } from '@/app/(public)/resources/interview-questions/_data';
import { getAllScorecards } from '@/app/(public)/resources/scorecards/_data';
import { getAllScreeningRubrics } from '@/app/(public)/resources/screening-rubrics/_data';

/**
 * Builders for /llms.txt and /llms-full.txt.
 *
 * Spec: https://llmstxt.org — provides an index for LLM crawlers (Perplexity,
 * ChatGPT Search, Claude, Copilot, etc.) so they can find and contextualize
 * key content without parsing HTML. llms-full.txt is the same idea but with
 * substantive summaries embedded inline so a model can ingest the site's
 * content in one fetch.
 *
 * The data is pulled from the same registries the sitemap uses, so additions
 * to /product, /resources, /blog, /use-cases, /applicant-tracking-system are
 * automatically reflected without manual edits.
 */

type Entry = {
  url: string;
  title: string;
  oneLine: string;
  longSummary: string;
};

const collapse = (s: string): string => s.replace(/\s+/g, ' ').trim();

/** Duck-typed adapter for the common `{ slug, meta: { title, description }, hero: { lead?: string[] } }` shape. */
type GenericPage = {
  slug: string;
  meta?: { title?: string; description?: string };
  hero?: { lead?: string[] | string; titlePrefix?: string; titleAccent?: string };
};

function fromGeneric(page: GenericPage, urlPrefix: string): Entry {
  const url = `${SITE_URL}${urlPrefix}/${page.slug}`;
  const title = collapse(page.meta?.title ?? page.slug);
  const oneLine = collapse(page.meta?.description ?? '');
  const leadParas = Array.isArray(page.hero?.lead)
    ? page.hero!.lead
    : page.hero?.lead
      ? [page.hero.lead]
      : [];
  const longSummary = collapse([oneLine, ...leadParas].filter(Boolean).join(' '));
  return { url, title, oneLine, longSummary };
}

function fromBlogPost(p: BlogPost): Entry {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const title = collapse(p.title);
  const oneLine = collapse(p.description);
  const subtitle = collapse(p.subtitle ?? '');
  const longSummary = collapse([oneLine, subtitle].filter(Boolean).join(' '));
  return { url, title, oneLine, longSummary };
}

/** Static pages with no `_data.ts` registry. Keep this list short and stable. */
const staticOptional: Entry[] = [
  {
    url: `${SITE_URL}/pricing`,
    title: 'Pricing',
    oneLine: 'HireSort plans and pricing for resume screening.',
    longSummary: 'Pricing for HireSort plans including a free tier and paid options for individual recruiters, growing teams, and high-volume hiring agencies. Each plan includes AI resume screening, ranked shortlists, and a candidate repository; paid tiers add higher monthly resume volume, configurable scoring rubrics, and team collaboration.',
  },
  {
    url: `${SITE_URL}/about`,
    title: 'About HireSort',
    oneLine: 'About the HireSort product and DeskZero Pvt Ltd, the company that builds it.',
    longSummary: 'HireSort is built by DeskZero Pvt Ltd. The product is focused on the resume screening bottleneck for recruiters, hiring managers, founders, and high-volume hiring teams.',
  },
  {
    url: `${SITE_URL}/contact`,
    title: 'Contact HireSort',
    oneLine: 'Contact the HireSort team for support, sales, and partnership inquiries.',
    longSummary: 'Support, sales, and partnership inquiries can be sent to support@hiresort.ai. Self-serve signup is available at app.hiresort.ai.',
  },
  {
    url: `${SITE_URL}/faqs`,
    title: 'Frequently Asked Questions',
    oneLine: 'Answers to common questions about HireSort, AI resume screening, pricing, and compliance.',
    longSummary: 'Common questions about how HireSort scores resumes, the rubric system, compliance with GDPR / DPDP / CCPA, supported file formats, bulk upload limits, plan differences, and how candidate data is handled.',
  },
  {
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy',
    oneLine: 'HireSort privacy policy covering candidate data, resume retention, and user rights.',
    longSummary: 'Privacy policy covering candidate data handling, resume retention windows, supported export and deletion requests, and HireSort\'s position on third-party data processors.',
  },
  {
    url: `${SITE_URL}/terms`,
    title: 'Terms of Service',
    oneLine: 'HireSort terms of service for product usage and billing.',
    longSummary: 'Terms covering acceptable use, billing, subscription cancellation, intellectual property, limitation of liability, and applicable law for the HireSort product.',
  },
];

// ─── Section assembly ──────────────────────────────────────────────────────

function sectionLine(e: Entry): string {
  return `- [${e.title}](${e.url}): ${e.oneLine}`;
}

function sectionBlock(title: string, entries: Entry[]): string {
  if (entries.length === 0) return '';
  return `## ${title}\n\n${entries.map(sectionLine).join('\n')}`;
}

function gatherEntries() {
  const home: Entry = {
    url: `${SITE_URL}/`,
    title: 'HireSort homepage',
    oneLine:
      'AI resume screening software that ranks candidates in seconds with explainable scores. Upload resumes in bulk, configure scoring rubrics, and shortlist faster.',
    longSummary:
      'HireSort is AI resume screening software for recruiters, hiring managers, founders, and high-volume hiring teams. It converts a job description into a scoring rubric, evaluates each resume against the rubric, and returns a ranked candidate shortlist with strengths, gaps, and evidence so recruiters can review and decide faster. Built by DeskZero Pvt Ltd.',
  };

  const products = getAllProductPages().map((p) => fromGeneric(p, '/product'));
  const useCases = getAllUseCases().map((p) => fromGeneric(p, '/use-cases'));
  const atsPages = getAllAtsPages().map((p) =>
    fromGeneric(p, '/applicant-tracking-system'),
  );
  const bestGuides = getAllBestPages().map((p) => fromGeneric(p, '/resources/best'));
  const comparisons = getComparisonSlugs()
    .map((s) => getComparisonBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => fromGeneric(p, '/resources/compare'));
  const jobDescriptions = getAllJobDescriptions().map((p) =>
    fromGeneric(p, '/resources/job-descriptions'),
  );
  const interviewQuestions = getAllInterviewQuestions().map((p) =>
    fromGeneric(p, '/resources/interview-questions'),
  );
  const scorecards = getAllScorecards().map((p) =>
    fromGeneric(p, '/resources/scorecards'),
  );
  const screeningRubrics = getAllScreeningRubrics().map((p) =>
    fromGeneric(p, '/resources/screening-rubrics'),
  );

  return {
    home,
    products,
    useCases,
    atsPages,
    bestGuides,
    comparisons,
    jobDescriptions,
    interviewQuestions,
    scorecards,
    screeningRubrics,
  };
}

async function gatherBlogPosts(): Promise<Entry[]> {
  const posts = await getAllPosts();
  return posts.map(fromBlogPost);
}

// ─── Public builders ───────────────────────────────────────────────────────

export async function buildLlmsTxt(): Promise<string> {
  const e = gatherEntries();
  const blog = await gatherBlogPosts();

  const header = [
    '# HireSort',
    '',
    '> AI resume screening software that ranks candidates in seconds with explainable scores, customizable rubrics, and bulk resume processing for recruiters, hiring managers, founders, and high-volume hiring teams.',
    '',
    "HireSort is built by DeskZero Pvt Ltd. The product converts a job description into a scoring rubric, evaluates each resume against that rubric, and returns a ranked candidate shortlist with strengths, gaps, and evidence — so recruiters and hiring managers can review and decide faster. HireSort is positioned as a focused AI resume screening tool rather than a full enterprise HR suite; it complements ATS workflows and is used by individual recruiters, growing teams, founder-led hiring, and recruitment agencies.",
    '',
    sectionLine(e.home),
  ].join('\n');

  const sections = [
    sectionBlock('Product', e.products),
    sectionBlock('Applicant Tracking System', e.atsPages),
    sectionBlock('Use Cases', e.useCases),
    sectionBlock('Buyer Guides (Best Of)', e.bestGuides),
    sectionBlock('Comparisons', e.comparisons),
    sectionBlock('Job Description Templates', e.jobDescriptions),
    sectionBlock('Interview Question Templates', e.interviewQuestions),
    sectionBlock('Scorecard Templates', e.scorecards),
    sectionBlock('Screening Rubric Templates', e.screeningRubrics),
    sectionBlock('Blog', blog),
    sectionBlock('Optional', staticOptional),
  ].filter(Boolean);

  return `${header}\n\n${sections.join('\n\n')}\n`;
}

function fullBlock(title: string, entries: Entry[]): string {
  if (entries.length === 0) return '';
  const items = entries.map(
    (e) => `### ${e.title}\nURL: ${e.url}\n\n${e.longSummary || e.oneLine}`,
  );
  return `## ${title}\n\n${items.join('\n\n')}`;
}

export async function buildLlmsFullTxt(): Promise<string> {
  const e = gatherEntries();
  const blog = await gatherBlogPosts();

  const header = [
    '# HireSort — Full Content Index',
    '',
    '> This file is the long-form companion to llms.txt. Each section below names a page on hiresort.ai and includes a substantive summary so AI models can cite HireSort accurately without fetching individual pages.',
    '',
    `### ${e.home.title}\nURL: ${e.home.url}\n\n${e.home.longSummary}`,
  ].join('\n');

  const sections = [
    fullBlock('Product', e.products),
    fullBlock('Applicant Tracking System', e.atsPages),
    fullBlock('Use Cases', e.useCases),
    fullBlock('Buyer Guides (Best Of)', e.bestGuides),
    fullBlock('Comparisons', e.comparisons),
    fullBlock('Job Description Templates', e.jobDescriptions),
    fullBlock('Interview Question Templates', e.interviewQuestions),
    fullBlock('Scorecard Templates', e.scorecards),
    fullBlock('Screening Rubric Templates', e.screeningRubrics),
    fullBlock('Blog', blog),
    fullBlock('Reference', staticOptional),
  ].filter(Boolean);

  return `${header}\n\n${sections.join('\n\n')}\n`;
}
