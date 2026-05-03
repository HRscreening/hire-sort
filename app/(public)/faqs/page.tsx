import type { Metadata } from 'next';
import FaqsClient from './FaqsClient';
import { FAQS } from './_data';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';

const ogImageUrl = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  title: 'FAQs — HireSort',
  description:
    'Answers to common questions about how HireSort screens resumes, handles candidate data, supports bulk uploads, and fits into recruiter workflows.',
  alternates: { canonical: '/faqs' },
  openGraph: {
    title: 'HireSort FAQs',
    description:
      'Answers to common questions about HireSort — scoring, bulk uploads, integrations, and data handling.',
    url: '/faqs',
    type: 'website',
    siteName: 'HireSort',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'HireSort FAQs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort FAQs',
    description:
      'Answers to common questions about HireSort — scoring, bulk uploads, integrations, and data handling.',
    images: [ogImageUrl],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer.join(' '),
    },
  })),
};

const crumbs = breadcrumbJsonLd([{ name: 'FAQs' }]);

export default function FaqsPage() {
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }}
      />
      <FaqsClient />
    </>
  );
}
