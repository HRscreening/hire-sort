import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Briefcase,
  ClipboardCheck,
  GitCompare,
  Library,
  MessageSquare,
  SlidersHorizontal,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';

const PAGE_PATH = '/resources';
const PAGE_TITLE = 'Hiring Resources — Guides, Templates and Comparisons | HireSort';
const PAGE_DESCRIPTION =
  'A library of practical hiring resources from HireSort — software guides, comparisons, job description templates, interview questions, scorecards, and screening rubrics.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'hiring resources',
    'recruiting resources',
    'recruitment software guides',
    'job description templates',
    'interview questions',
    'scorecards',
    'screening rubrics',
    'ATS comparison',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort hiring resources' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absUrl('/logo.png')],
  },
  robots: { index: true, follow: true },
};

type ResourceCard = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
};

const cards: ResourceCard[] = [
  {
    href: '/resources/best',
    eyebrow: 'Software guides',
    title: 'Best recruitment software',
    description:
      'Curated picks for the best ATS, resume screening tools, candidate screening software and high-volume hiring platforms.',
    highlights: ['Best ATS', 'Best AI screening', 'High-volume hiring'],
    icon: <Award size={22} strokeWidth={2.2} />,
  },
  {
    href: '/resources/compare',
    eyebrow: 'Comparisons',
    title: 'Compare HireSort & alternatives',
    description:
      'Side-by-side comparisons with popular ATS platforms, resume parsers and spreadsheet-based workflows.',
    highlights: ['vs Workable', 'vs spreadsheets', 'Alternatives'],
    icon: <GitCompare size={22} strokeWidth={2.2} />,
  },
  {
    href: '/resources/job-descriptions',
    eyebrow: 'Templates',
    title: 'Job description templates',
    description:
      'Role-ready JD templates for engineering, sales, product and operations — copy, customize, and post.',
    highlights: ['Engineering', 'Sales & GTM', 'Product & ops'],
    icon: <Briefcase size={22} strokeWidth={2.2} />,
  },
  {
    href: '/resources/interview-questions',
    eyebrow: 'Question banks',
    title: 'Interview questions',
    description:
      'Structured interview question sets by role and competency, designed for consistent, evidence-based evaluation.',
    highlights: ['Behavioral', 'Technical', 'Role-specific'],
    icon: <MessageSquare size={22} strokeWidth={2.2} />,
  },
  {
    href: '/resources/scorecards',
    eyebrow: 'Evaluation',
    title: 'Interview scorecards',
    description:
      'Scorecard templates that turn interviewer notes into structured, comparable signals across candidates.',
    highlights: ['Role scorecards', 'Competency rubrics', 'Hiring committees'],
    icon: <ClipboardCheck size={22} strokeWidth={2.2} />,
  },
  {
    href: '/resources/screening-rubrics',
    eyebrow: 'Rubrics',
    title: 'Screening rubrics',
    description:
      'Ready-to-use rubrics for resume screening — weighted criteria, must-haves, and explainable scoring.',
    highlights: ['Resume rubrics', 'Weighted criteria', 'Explainable scores'],
    icon: <SlidersHorizontal size={22} strokeWidth={2.2} />,
  },
];

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${PAGE_PATH}`,
  url: `${SITE_URL}${PAGE_PATH}`,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
  hasPart: cards.map((c) => ({
    '@type': 'WebPage',
    name: c.title,
    description: c.description,
    url: `${SITE_URL}${c.href}`,
  })),
};

const Page = () => {
  const crumbs = breadcrumbJsonLd([{ name: 'Resources' }]);

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

      <PageHero
        icon={<Library size={13} strokeWidth={2.5} />}
        eyebrow="Resources"
        title={
          <>
            Hiring resources, <span className="text-accent">in one place</span>
          </>
        }
        lead="Practical guides, templates and comparisons for teams that want a faster, more structured hiring workflow."
      />

      <section className="mx-auto max-w-300 px-6 pt-4 pb-24">
        <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-line-soft bg-white p-7 no-underline shadow-soft transition-all hover:-translate-y-1 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(200,90,23,0.08)] text-accent">
                    {c.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
                    {c.eyebrow}
                  </span>
                </div>

                <div>
                  <h2 className="mb-2 text-[19px] font-extrabold leading-snug tracking-[-0.3px] text-charcoal">
                    {c.title}
                  </h2>
                  <p className="text-[14px] leading-[1.65] text-charcoal-lt">{c.description}</p>
                </div>

                <ul className="mt-auto flex list-none flex-wrap gap-1.5 p-0">
                  {c.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-line-soft bg-ivory-light px-2.5 py-1 text-[11.5px] font-semibold text-charcoal-md"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent transition-transform group-hover:translate-x-1">
                  Browse all
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Page;
