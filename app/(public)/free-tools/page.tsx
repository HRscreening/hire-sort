import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  FileText,
  ScanSearch,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllTools, getLiveTools, type FreeTool } from './_lib/tools';
import { getToolDetailBySlug } from './_data/details';

/**
 * For structured data (JSON-LD), reference a tool's dedicated SEO detail page
 * when one exists (e.g. /free-tools/resume-screening) so crawlers can discover
 * it, falling back to the tool's CTA href otherwise. The visible card button
 * always links straight to the interactive app (`t.cta.href`).
 */
const toolHref = (t: FreeTool): string =>
  getToolDetailBySlug(t.slug) ? `/free-tools/${t.slug}` : t.cta.href;

const PAGE_PATH = '/free-tools';
const PAGE_TITLE = 'Free Hiring Tools — Resume Screening & Rubrics | HireSort';
const PAGE_DESCRIPTION =
  'Free hiring tools from HireSort — screen a resume against any job description, generate screening rubrics, and more. Explainable, rubric-based, and free to use with no signup.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'free hiring tools',
    'free resume screening tool',
    'ai resume screener',
    'resume scoring tool',
    'screening rubric generator',
    'free recruiting tools',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort free hiring tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

/** Icon keys referenced by `_data/tools.json` → lucide components. */
const ICONS: Record<string, ReactNode> = {
  'scan-search': <ScanSearch size={24} strokeWidth={2.2} />,
  sliders: <SlidersHorizontal size={24} strokeWidth={2.2} />,
  'file-text': <FileText size={24} strokeWidth={2.2} />,
};

/** Links out to other sections of the site (others ← from here). */
const EXPLORE_MORE: { href: string; label: string; description: string }[] = [
  { href: '/resources/screening-rubrics', label: 'Screening rubrics', description: 'Weighted, role-specific criteria you can copy and score against.' },
  { href: '/resources/scorecards', label: 'Interview scorecards', description: 'Turn interviewer notes into structured, comparable signals.' },
  { href: '/resources/interview-questions', label: 'Interview questions', description: 'Structured question banks by role and competency.' },
  { href: '/resources/best/ai-resume-screening-software', label: 'Best AI screening software', description: 'How the top resume screening tools compare.' },
  { href: '/product/recruitment-software', label: 'Recruitment software', description: 'The full HireSort platform behind these free tools.' },
  { href: '/blog', label: 'Hiring blog', description: 'Guides on screening resumes faster and more fairly.' },
];

const buildJsonLd = (tools: FreeTool[], liveTools: FreeTool[]) => {
  const pageUrl = absUrl(PAGE_PATH);

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': pageUrl,
    url: pageUrl,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'HireSort',
      logo: { '@type': 'ImageObject', url: absUrl('/logo.png') },
    },
    hasPart: tools.map((t) => ({
      '@type': 'WebPage',
      name: t.name,
      description: t.tagline,
      url: absUrl(toolHref(t)),
    })),
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'HireSort free hiring tools',
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: absUrl(`${PAGE_PATH}#${t.slug}`),
    })),
  };

  // Only live tools are real, usable SoftwareApplications.
  const apps = liveTools.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: t.description,
    url: t.cta.href.startsWith('http') ? t.cta.href : absUrl(t.cta.href),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@type': 'Organization', name: 'HireSort', url: SITE_URL },
  }));

  return [collection, itemList, ...apps];
};

const Page = () => {
  const tools = getAllTools();
  const liveTools = getLiveTools();
  const crumbs = breadcrumbJsonLd([{ name: 'Free tools' }]);
  const schemas = buildJsonLd(tools, liveTools);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString(s) }}
        />
      ))}

      <PageHero
        icon={<Wrench size={13} strokeWidth={2.5} />}
        eyebrow="Free tools"
        title={
          <>
            Free hiring tools, <span className="text-accent">no signup</span>
          </>
        }
        lead="Explainable tools that do real hiring work — screen a resume, build a rubric, draft a JD. Pick one to get started."
      />

      {/* Tool cards */}
      <section className="mx-auto max-w-300 px-6 pt-4 pb-16">
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const isLive = t.status === 'live';
            const tags = t.tags ?? t.features.slice(0, 3);
            return (
              <li key={t.slug} id={t.slug} className="flex h-full scroll-mt-24">
                <Link
                  href={t.cta.href}
                  className="group flex h-full w-full flex-col rounded-3xl border border-line-soft bg-white p-6 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
                >
                  {/* Icon + status */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(200,90,23,0.08)] text-accent">
                      {ICONS[t.icon] ?? <Wrench size={24} strokeWidth={2.2} />}
                    </span>
                    {!isLive && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-line-soft bg-ivory-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.6px] text-charcoal-lt">
                        <Clock size={10} strokeWidth={2.5} />
                        Soon
                      </span>
                    )}
                  </div>

                  {/* Title + concise description */}
                  <h2 className="mt-5 text-[18px] font-extrabold tracking-[-0.4px] text-charcoal group-hover:text-accent">
                    {t.name}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.6] text-charcoal-lt">
                    {t.tagline}
                  </p>

                  {/* Tags */}
                  <ul className="mt-4 flex list-none flex-wrap gap-1.5 p-0">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line-soft bg-ivory-light px-2.5 py-1 text-[11px] font-semibold text-charcoal-md"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* CTA (the whole card is the link; this is the button affordance) */}
                  <span className="mt-4 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-charcoal px-5 text-[13.5px] font-semibold text-ivory transition-colors group-hover:bg-accent">
                    {t.cta.label}
                    <ArrowRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Explore more — internal links out */}
      <section className="mx-auto max-w-300 px-6 pb-24">
        <div className="rounded-3xl border border-line-soft bg-ivory-light p-7 sm:p-9">
          <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-charcoal">
            Explore more from HireSort
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.65] text-charcoal-lt">
            These free tools are part of a bigger toolkit. Dig into the templates, guides and
            product features that make structured hiring faster.
          </p>
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {EXPLORE_MORE.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="group flex h-full flex-col gap-1.5 rounded-2xl border border-line-soft bg-white p-5 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
                >
                  <span className="flex items-center gap-1.5 text-[15px] font-bold tracking-[-0.2px] text-charcoal group-hover:text-accent">
                    {e.label}
                    <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[13px] leading-[1.55] text-charcoal-lt">{e.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
