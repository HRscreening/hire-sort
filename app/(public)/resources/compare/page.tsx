import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GitCompare } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getComparisonBySlug, getComparisonSlugs } from './_data';

const PAGE_PATH = '/resources/compare';
const PAGE_TITLE = 'HireSort Comparisons — Alternatives to Popular ATS Platforms';
const PAGE_DESCRIPTION =
  'Compare HireSort with popular ATS and recruitment platforms. See how a focused, AI-first resume screening workflow stacks up against broader hiring suites.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'HireSort comparison',
    'ATS alternative',
    'Workable alternative',
    'recruitment software comparison',
    'AI resume screening alternative',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [
      {
        url: absUrl('/logo.png'),
        width: 1200,
        height: 630,
        alt: 'HireSort comparisons and alternatives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

export default function CompareIndexPage() {
  const pages = getComparisonSlugs()
    .map((slug) => getComparisonBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Compare' },
  ]);

  const collectionJsonLd = {
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
    hasPart: pages.map((p) => ({
      '@type': 'WebPage',
      url: absUrl(`/resources/compare/${p.slug}`),
      name: `${p.competitor} alternative`,
      description: p.meta.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(collectionJsonLd) }}
      />

      <main className="bg-ivory">
        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Compare
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              HireSort vs. other hiring platforms
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              {PAGE_DESCRIPTION}
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/compare/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <GitCompare size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.hero.eyebrow}
                    </span>
                  </div>
                  <h2 className="text-[18px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    HireSort vs. {p.competitor}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-charcoal-md">
                    {p.meta.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Read comparison
                    <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
