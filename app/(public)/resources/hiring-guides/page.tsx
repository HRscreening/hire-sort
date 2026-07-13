import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllHiringGuides } from './_data';

const PAGE_PATH = '/resources/hiring-guides';
const PAGE_TITLE = 'Role Hiring Guides: Screening Checklists, Interview Questions & Scorecards | HireSort';
const PAGE_DESCRIPTION =
  'Practical role hiring guides with screening checklists, interview questions, scorecards, work samples, and free AI hiring tools.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'role hiring guides',
    'hiring guide templates',
    'screening checklist',
    'interview questions',
    'candidate scorecards',
    'resume screening',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort role hiring guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

export default function HiringGuidesIndexPage() {
  const guides = getAllHiringGuides();
  const crumbTrail = [
    { name: 'Resources', path: '/resources' },
    { name: 'Hiring Guides' },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${PAGE_PATH}`,
    url: `${SITE_URL}${PAGE_PATH}`,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
    hasPart: guides.map((guide) => ({
      '@type': 'WebPage',
      name: guide.meta.title,
      description: guide.meta.description,
      url: `${SITE_URL}/resources/hiring-guides/${guide.slug}`,
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

      <Breadcrumb crumbs={crumbTrail} />
      <PageHero
        icon={<ClipboardCheck size={13} strokeWidth={2.5} />}
        eyebrow="Hiring guides"
        title={
          <>
            Role hiring guides that are <span className="text-accent">actually useful</span>
          </>
        }
        lead="Start with the practical artifacts hiring teams need first: screening checklists, interview questions, scorecards, work samples, and free tools."
      />

      <section className="mx-auto max-w-300 px-6 pt-4 pb-24">
        <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/resources/hiring-guides/${guide.slug}`}
                className="group flex h-full flex-col gap-5 rounded-2xl border border-line-soft bg-white p-7 no-underline shadow-soft transition-all hover:-translate-y-1 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(200,90,23,0.08)] text-accent">
                    <ClipboardCheck size={22} strokeWidth={2.2} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
                    {guide.department}
                  </span>
                </div>
                <div>
                  <h2 className="mb-2 text-[22px] font-extrabold leading-snug tracking-[-0.4px] text-charcoal">
                    {guide.role} hiring guide
                  </h2>
                  <p className="text-[14px] leading-[1.65] text-charcoal-lt">
                    {guide.meta.description}
                  </p>
                </div>
                <ul className="mt-auto flex list-none flex-wrap gap-1.5 p-0">
                  {['Checklist', 'Questions', 'Scorecard', 'Free tools'].map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line-soft bg-ivory-light px-2.5 py-1 text-[11.5px] font-semibold text-charcoal-md"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent transition-transform group-hover:translate-x-1">
                  Open guide
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
