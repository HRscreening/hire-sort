import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllScorecards } from './_data';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const PAGE_PATH = '/resources/scorecards';
const PAGE_TITLE = 'Candidate Scorecard Templates by Role | HireSort';
const PAGE_DESCRIPTION =
  'Explore role-specific candidate scorecard templates for structured hiring. Compare candidates consistently across resumes, interviews, and hiring-manager reviews.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'candidate scorecard templates',
    'interview scorecard templates',
    'hiring scorecard',
    'candidate evaluation form',
    'structured hiring scorecard',
    'role scorecard templates',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort candidate scorecards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

const howToUse = [
  'Start with the job description and identify what truly matters for the role.',
  'Convert those requirements into evaluation criteria and suggested weights.',
  'Use the scorecard during resume screening to capture evidence and initial fit.',
  'Use the same scorecard during interviews so hiring managers evaluate consistently.',
  'Compare candidates using scores, evidence, strengths, gaps, and notes.',
  'Calibrate the scorecard over time based on interview outcomes and hiring quality.',
];

const structure = [
  { field: 'Candidate name', purpose: 'Identifies the candidate being evaluated.' },
  { field: 'Role / job', purpose: 'Connects the scorecard to a specific hiring requirement.' },
  { field: 'Criteria', purpose: 'Defines the dimensions being evaluated.' },
  { field: 'Weight', purpose: 'Shows relative importance of each criterion.' },
  { field: 'Score', purpose: 'Captures candidate performance against each criterion.' },
  { field: 'Evidence', purpose: 'Records proof from resume, interview, or work sample.' },
  { field: 'Reviewer notes', purpose: 'Captures context, concerns, and next-step recommendations.' },
];

const faqs = [
  {
    q: 'What is a candidate scorecard?',
    a: 'A candidate scorecard is a structured evaluation form used to score and compare candidates against role-specific criteria.',
  },
  {
    q: 'Why should hiring teams use scorecards?',
    a: 'Scorecards reduce inconsistency, help reviewers capture evidence, and make hiring decisions easier to explain.',
  },
  {
    q: 'Are these scorecards for resumes or interviews?',
    a: 'They can be used for both resume screening and interview evaluation.',
  },
  {
    q: 'How are scorecards different from interview questions?',
    a: 'Interview questions help collect evidence. Scorecards help evaluate that evidence and compare candidates.',
  },
  {
    q: 'Can HireSort generate scorecards automatically?',
    a: 'HireSort can generate role-specific rubrics from job descriptions and use those criteria to support scorecard-based candidate evaluation.',
  },
];

export default function ScorecardsIndexPage() {
  const pages = getAllScorecards();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Scorecards' },
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
      url: absUrl(`/resources/scorecards/${p.slug}`),
      name: p.role,
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
              Scorecards
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Candidate scorecard templates for structured hiring
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              Use role-specific scorecards to evaluate candidates consistently, capture evidence, align recruiters and hiring managers, and build stronger shortlists. HireSort scorecards are designed to support structured resume screening and interview evaluation across common hiring roles.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              Hiring decisions become inconsistent when reviewers rely only on memory, instinct, or unstructured notes. A candidate scorecard gives every reviewer the same evaluation framework, which makes candidate comparison easier and more explainable.
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/scorecards/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <ClipboardList size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.role}
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.role} Scorecard
                  </h2>
                  <p className="text-[13.5px] leading-[1.6] text-charcoal-md">
                    Top criteria: {p.criteria.rows.slice(0, 4).map((r) => r.criterion).join(', ')}.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Open scorecard
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
                How to use
              </span>
              <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
                How to use a candidate scorecard
              </h2>
            </div>
            <ol className="grid list-none gap-3 p-0 md:grid-cols-2">
              {howToUse.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-line-soft bg-white p-4 shadow-soft"
                >
                  <span className="font-mono text-[12px] font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] leading-[1.65] text-charcoal-md">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mb-8 max-w-2xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Anatomy
            </span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              Recommended scorecard structure
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-soft">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-soft bg-ivory-light">
                  <th className="px-5 py-3 font-bold text-charcoal">Field</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {structure.map((row, i) => (
                  <tr
                    key={row.field}
                    className={
                      i % 2 === 0
                        ? 'border-b border-line-soft'
                        : 'border-b border-line-soft bg-ivory-light/40'
                    }
                  >
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.field}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-charcoal px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Bring structure to evaluation
            </span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
              Bring structure to resume screening and candidate evaluation
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
              Use HireSort to screen resumes, rank candidates, and build clearer hiring decisions.
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
