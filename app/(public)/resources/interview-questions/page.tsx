import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllInterviewQuestions } from './_data';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const PAGE_PATH = '/resources/interview-questions';
const PAGE_TITLE = 'Interview Questions by Role and Skill | HireSort';
const PAGE_DESCRIPTION =
  'Explore structured interview questions for software engineers, sales executives, data analysts, product managers, customer support roles, HR, finance, and more. Use HireSort to connect interview questions with scorecards and screening workflows.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'interview questions',
    'interview questions by role',
    'hiring questions',
    'candidate interview questions',
    'interview scorecard',
    'structured interview questions',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort interview questions' }],
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
  'Start with the role page that matches the position you are hiring for.',
  'Pick questions across skills, experience, judgment, and collaboration rather than asking only technical or generic questions.',
  'Define what a strong answer looks like before interviews begin.',
  'Use the same question set for comparable candidates to reduce inconsistency.',
  'Capture feedback in a scorecard so hiring managers can compare candidates with evidence.',
];

const faqs = [
  {
    q: 'What are structured interview questions?',
    a: 'Structured interview questions are pre-defined questions used consistently across candidates for the same role. They make evaluation more comparable and reduce reliance on gut feel.',
  },
  {
    q: 'Should every candidate get the same questions?',
    a: 'For comparable candidates in the same stage, yes. You can add follow-up questions, but the core question set should stay consistent.',
  },
  {
    q: 'How should interview answers be scored?',
    a: 'Use a scorecard with defined criteria, rating guidance, and evidence notes. Avoid scoring based only on general impressions.',
  },
  {
    q: 'Can HireSort help with interview scorecards?',
    a: 'Yes. HireSort content and workflows are designed to connect resume screening criteria with scorecards and structured candidate evaluation.',
  },
];

export default function InterviewQuestionsIndexPage() {
  const pages = getAllInterviewQuestions();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Interview Questions' },
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
      url: absUrl(`/resources/interview-questions/${p.slug}`),
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
              Interview questions
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Interview questions for better hiring decisions
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              Use structured interview questions to evaluate candidates more consistently across roles, teams, and hiring stages. HireSort helps hiring teams move from scattered interview notes to role-specific questions, evaluation criteria, and candidate scorecards that make hiring decisions easier to compare.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              Unstructured interviews often create inconsistent candidate evaluation. A structured interview question library helps teams align on what to ask, what strong answers look like, what red flags to watch for, and how to connect interview feedback to a scorecard.
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/interview-questions/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <MessageSquare size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.role}
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.role} Interview Questions
                  </h2>
                  <p className="text-[13.5px] leading-[1.6] text-charcoal-md">
                    Best for evaluating: {p.whatToEvaluate.items.slice(0, 4).join(', ')}.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Open question set
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
                How to use these interview question templates
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
          <div className="max-w-3xl">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Connect screening and interviews
            </span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              Connect interviews with screening
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              Interview questions work best when they are connected to the earlier screening process. If the resume screening rubric emphasizes ownership, communication, technical depth, or target achievement, the interview should test those same criteria with deeper evidence.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              HireSort is built around this idea: create role-specific criteria, screen resumes consistently, review evidence, and then carry the same evaluation logic into interviews and scorecards.
            </p>
          </div>
        </section>

        <section className="bg-charcoal px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Build better interviews
            </span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
              Build better interviews from better screening
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
              Use HireSort to move from resume screening to structured scorecards and role-specific interview workflows.
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
