import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllBestPages } from './_data';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const PAGE_PATH = '/resources/best';
const PAGE_TITLE = 'Best Recruitment Software Guides | HireSort';
const PAGE_DESCRIPTION =
  'Explore practical guides to the best ATS, recruitment software, resume screening tools, candidate screening software, and high-volume hiring platforms for growing teams.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'best recruitment software',
    'best ATS',
    'best resume screening software',
    'best candidate screening software',
    'best AI recruiting software',
    'hiring software comparison',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort recruitment software guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

const evaluationCriteria = [
  { label: 'Hiring volume', detail: 'Are you screening 20 resumes per role or 2,000 candidates per month?' },
  { label: 'Workflow scope', detail: 'Do you need only screening and tracking, or full ATS plus scheduling, offers, onboarding, and HR workflows?' },
  { label: 'Speed to value', detail: 'Can your team start using it this week, or does it require a long implementation cycle?' },
  { label: 'Screening quality', detail: 'Does the tool rank candidates with explainable criteria, or only store applications?' },
  { label: 'Human control', detail: 'Can recruiters and hiring managers review, adjust, and override the software output?' },
  { label: 'Candidate database', detail: 'Can you reuse past resumes and profiles for future roles?' },
  { label: 'Budget and team size', detail: 'Is the product priced for startups, small businesses, agencies, or enterprises?' },
];

const faqs = [
  {
    q: 'What is the difference between recruitment software and an ATS?',
    a: 'An ATS usually focuses on tracking applicants through the hiring process. Recruitment software is a broader term that can include ATS, sourcing, screening, interview scheduling, CRM, assessments, reporting, and onboarding.',
  },
  {
    q: 'Should every team buy a full ATS?',
    a: 'Not always. If your biggest issue is resume volume and shortlist quality, a screening-first tool may create value faster than a full enterprise ATS.',
  },
];

export default function BestIndexPage() {
  const pages = getAllBestPages();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Best' },
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
      url: absUrl(`/resources/best/${p.slug}`),
      name: p.category,
      description: p.meta.description,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }}
      />

      <main className="bg-ivory">
        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Best recruitment software
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Best recruitment software guides for growing hiring teams
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              Choosing recruitment software is difficult because every team means something different by hiring software. Some need a full applicant tracking system. Some need a better way to screen resumes. Some need high-volume hiring automation. Others only need a lightweight candidate workspace that replaces spreadsheets.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              This resource hub helps founders, recruiters, hiring managers, and agencies compare the main hiring software categories and choose the right path based on team size, hiring volume, workflow complexity, and screening needs.
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/best/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <Award size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.hero.eyebrow}
                    </span>
                  </div>
                  <h2 className="text-[18px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.meta.title.replace(' | HireSort', '')}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-charcoal-md">
                    {p.meta.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Read the guide
                    <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
          <div className="mx-auto max-w-300">
            <div className="mb-8 max-w-2xl">
              <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
                How to evaluate
              </span>
              <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
                How to evaluate recruiting tools
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
                Start with the hiring problem, not the software category. The best tool for your team depends less on the label and more on the job you need the product to do.
              </p>
            </div>
            <ul className="grid list-none gap-3 p-0 md:grid-cols-2">
              {evaluationCriteria.map((c) => (
                <li
                  key={c.label}
                  className="rounded-xl border border-line-soft bg-white p-4 shadow-soft"
                >
                  <h3 className="text-[14px] font-bold tracking-[-0.2px] text-charcoal">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-[1.65] text-charcoal-md">
                    {c.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="max-w-3xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Where HireSort fits
            </span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              Screening-first recruiting
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              HireSort is best for teams that want screening-first recruiting: AI resume screening, JD-based rubrics, explainable candidate scores, ranked shortlists, a central resume repository, and lightweight stage tracking without enterprise ATS complexity.
            </p>
          </div>
        </section>

        <section className="bg-charcoal px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Compare your category
            </span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
              Compare the hiring software category that matches your team
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
              Explore the guides above, then try HireSort if your biggest bottleneck is resume screening, shortlisting, and candidate tracking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={redirectURL}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
              >
                Get started for free
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-white/10"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mx-auto mb-8 max-w-180 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              FAQ
            </span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              Frequently asked questions
            </h2>
          </div>
          <ul className="mx-auto flex max-w-3xl list-none flex-col gap-3 p-0">
            {faqs.map((f) => (
              <li
                key={f.q}
                className="rounded-xl border border-line-soft bg-white p-5 shadow-soft"
              >
                <h3 className="text-[15px] font-semibold text-charcoal">{f.q}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-charcoal-md">{f.a}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
