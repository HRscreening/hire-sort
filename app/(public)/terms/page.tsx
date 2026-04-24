import type { Metadata } from 'next';
import TermsClient from './termsClient';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service | HireSort',
  description:
    'Read HireSort\'s Terms of Service to understand the rules and guidelines for using our platform.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | HireSort',
    description: 'The terms and conditions for using HireSort.',
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | HireSort',
    description: 'The terms and conditions for using HireSort.',
  },
};

const crumbs = breadcrumbJsonLd([{ name: 'Terms of Service' }]);

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      <TermsClient />
    </>
  );
}
