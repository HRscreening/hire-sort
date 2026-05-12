import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllScreeningRubrics } from './_data';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const PAGE_PATH = '/resources/screening-rubrics';
const PAGE_TITLE = 'Screening Rubrics by Role | HireSort';
const PAGE_DESCRIPTION =
  'Explore role-specific screening rubrics for software engineers, sales executives, data analysts, product managers, marketers, HR executives, finance analysts, and more.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'screening rubrics',
    'candidate screening rubric',
    'resume screening rubric',
    'hiring rubric',
    'role-based screening rubric',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort screening rubrics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

const whatToInclude = [
  'Role-specific criteria tied to the job description.',
  'Weight assigned to each criterion based on importance.',
  'Clear resume evidence to look for.',
  'Must-have signals and red flags.',
  'Score interpretation so reviewers know what to do next.',
  'Follow-up questions for recruiters and hiring managers.',
];

const rubricVsScorecard = [
  { item: 'Screening rubric', purpose: 'Defines the criteria and weights before evaluation.', example: 'Technical skills = 30%, project experience = 20%.' },
  { item: 'Candidate scorecard', purpose: 'Records how one candidate performs against the rubric.', example: 'Candidate A scored 8/10 on technical skills.' },
];

const faqs = [
  {
    q: 'What is a screening rubric?',
    a: 'A screening rubric is a structured evaluation framework that defines the criteria and weights used to assess candidates for a role.',
  },
  {
    q: 'Why should recruiters use screening rubrics?',
    a: 'Rubrics improve consistency, reduce guesswork, and help hiring teams compare candidates using the same standard.',
  },
  {
    q: 'Are rubrics the same as scorecards?',
    a: 'No. A rubric defines the standard. A scorecard records how a specific candidate performs against that standard.',
  },
  {
    q: 'Should rubrics be role-specific?',
    a: 'Yes. A software engineer, sales executive, data analyst, and HR executive should not be evaluated using the same criteria.',
  },
  {
    q: 'Can AI help with screening rubrics?',
    a: 'Yes. HireSort is designed to help generate and apply role-specific rubrics for AI-assisted resume screening.',
  },
];

export default function ScreeningRubricsIndexPage() {
  const pages = getAllScreeningRubrics();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Screening Rubrics' },
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
      url: absUrl(`/resources/screening-rubrics/${p.slug}`),
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
              Screening rubrics
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Screening rubrics by role
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              Build more consistent shortlists with structured screening rubrics for common hiring roles. Use these rubrics to define evaluation criteria, assign weights, identify red flags, and align recruiters and hiring managers before resume review begins.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              Resume screening becomes inconsistent when every reviewer uses a different mental checklist. A screening rubric solves this by making the evaluation standard explicit before candidates are reviewed.
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/screening-rubrics/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <ClipboardCheck size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.role}
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.role} Screening Rubric
                  </h2>
                  <p className="text-[13.5px] leading-[1.6] text-charcoal-md">
                    Top criteria: {p.rubric.rows.slice(0, 4).map((r) => r.criterion).join(', ')}.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Open rubric
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
                Anatomy
              </span>
              <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
                What every rubric should include
              </h2>
            </div>
            <ul className="grid list-none gap-3 p-0 md:grid-cols-2">
              {whatToInclude.map((step, i) => (
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
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mb-8 max-w-2xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Rubric vs scorecard
            </span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              How rubrics differ from scorecards
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-soft">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-soft bg-ivory-light">
                  <th className="px-5 py-3 font-bold text-charcoal">Item</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Purpose</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Example</th>
                </tr>
              </thead>
              <tbody>
                {rubricVsScorecard.map((row, i) => (
                  <tr
                    key={row.item}
                    className={
                      i % 2 === 0
                        ? 'border-b border-line-soft'
                        : 'border-b border-line-soft bg-ivory-light/40'
                    }
                  >
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.item}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.purpose}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-charcoal px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Move from manual to structured
            </span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
              Turn rubrics into AI-powered resume screening
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
              HireSort helps teams convert job requirements into structured screening rubrics and apply those rubrics consistently across uploaded resumes.
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
