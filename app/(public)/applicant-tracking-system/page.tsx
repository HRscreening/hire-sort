import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllAtsPages } from './_lib/registry';
import { Icon } from '@/app/(public)/product/_components/icons';

const PAGE_PATH = '/applicant-tracking-system';
const PAGE_TITLE = 'Applicant Tracking System Solutions | HireSort';
const PAGE_DESCRIPTION =
  'Lightweight applicant tracking system pages for small businesses, startups, and growing teams. Store resumes, screen candidates with AI, and track stages without enterprise complexity.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'applicant tracking system',
    'ATS for small business',
    'ATS for startups',
    'lightweight ATS',
    'AI ATS',
    'recruiting software',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort applicant tracking system' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

export default function AtsIndexPage() {
  const pages = getAllAtsPages();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([{ name: 'Applicant Tracking System' }]);

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
      url: absUrl(`/applicant-tracking-system/${p.slug}`),
      name: p.product,
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
              Applicant Tracking System
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Lightweight ATS solutions by team type
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              {PAGE_DESCRIPTION}
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/applicant-tracking-system/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    {p.heroIcon && <Icon name={p.heroIcon} size={18} />}
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.hero.eyebrow}
                    </span>
                  </div>
                  <h2 className="text-[18px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.product}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-charcoal-md">
                    {p.meta.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Learn more
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
