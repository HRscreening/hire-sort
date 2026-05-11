import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getAllJobDescriptions } from './_data';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const PAGE_PATH = '/resources/job-descriptions';
const PAGE_TITLE = 'Job Description Templates by Role | HireSort';
const PAGE_DESCRIPTION =
  'Browse role-ready job description templates for software engineering, sales, data, product, customer support, marketing, HR, finance, and operations roles.';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'job description templates',
    'job description template',
    'role description template',
    'hiring template',
    'JD template',
    'recruitment templates',
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: 'HireSort',
    images: [{ url: absUrl('/logo.png'), width: 1200, height: 630, alt: 'HireSort job description templates' }],
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
  'Choose the role closest to your hiring requirement.',
  'Customize responsibilities and requirements based on seniority, industry, and location.',
  'Convert the JD into a screening rubric before reviewing resumes.',
  'Use the screening rubric to create fairer, more consistent shortlists.',
  'Use HireSort to parse resumes, score candidates, and track candidate stages.',
];

const faqs = [
  {
    q: 'What is a job description template?',
    a: 'A job description template is a reusable structure for defining a role, including responsibilities, required skills, preferred qualifications, and hiring expectations.',
  },
  {
    q: 'Why should job descriptions connect to screening criteria?',
    a: 'Because the JD should define what the team will actually evaluate. When the job description and screening rubric are aligned, recruiters and hiring managers make more consistent decisions.',
  },
  {
    q: 'Can HireSort generate a screening rubric from a job description?',
    a: 'Yes. HireSort is designed to convert job descriptions into structured screening rubrics that can be applied to uploaded resumes.',
  },
  {
    q: 'Should every role have a separate job description page?',
    a: 'Yes, if the role has meaningful search demand and enough unique content. Avoid creating thin or duplicate pages for roles that do not differ materially.',
  },
];

export default function JobDescriptionsIndexPage() {
  const pages = getAllJobDescriptions();
  const pageUrl = absUrl(PAGE_PATH);

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Job Descriptions' },
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
      url: absUrl(`/resources/job-descriptions/${p.slug}`),
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
              Job description templates
            </span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Job description templates built for better screening
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-charcoal-md">
              Use HireSort’s job description templates to define roles clearly, attract better-fit candidates, and create a structured screening workflow from the first step of hiring.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              A strong job description does more than describe a role. It sets expectations, defines must-have skills, aligns recruiters and hiring managers, and becomes the foundation for resume screening. When job descriptions are vague, hiring teams receive irrelevant applications, screen inconsistently, and struggle to explain why one candidate should move forward.
            </p>
          </div>

          <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/resources/job-descriptions/${p.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-white p-5 shadow-soft transition hover:border-accent hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <FileText size={18} />
                    <span className="text-[12px] font-bold uppercase tracking-[0.6px]">
                      {p.role}
                    </span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                    {p.role} Job Description Template
                  </h2>
                  <p className="text-[13.5px] leading-[1.6] text-charcoal-md">
                    {p.meta.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent">
                    Open template
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
                How to use these templates
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

        <section className="bg-charcoal px-6 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              Ready to hire
            </span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
              Turn job descriptions into better shortlists
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
              Use HireSort to create structured job descriptions, generate rubrics, screen resumes, and build ranked shortlists faster.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={redirectURL}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
              >
                Generate a JD with HireSort
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
