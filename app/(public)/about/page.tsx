import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About HireSort',
  description:
    'HireSort helps hiring teams screen resumes faster with explainable AI scoring, bulk processing, and recruiter-friendly workflows. Built for modern, scalable hiring.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About HireSort',
    description:
      'Why we build HireSort: speed, structure, and clarity for every screening cycle.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HireSort',
    description:
      'Why we build HireSort: speed, structure, and clarity for every screening cycle.',
  },
  keywords: [
    'HireSort',
    'about HireSort',
    'why HireSort',
    'HireSort mission',
    'HireSort vision',
    'HireSort values',
    'HireSort team',
  ],
};

const crumbs = breadcrumbJsonLd([{ name: 'About' }]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      <AboutClient />
    </>
  );
}
