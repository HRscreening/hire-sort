import type { Metadata } from 'next';
import TermsClient from './termsClient';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';

const ogImageUrl = `${SITE_URL}/logo.png`;

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
    siteName: 'HireSort',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'HireSort Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | HireSort',
    description: 'The terms and conditions for using HireSort.',
    images: [ogImageUrl],
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
