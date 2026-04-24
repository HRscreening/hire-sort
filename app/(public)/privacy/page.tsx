import type { Metadata } from 'next';
import PrivacyClient from './privacyClient';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | HireSort',
  description:
    'Read HireSort\'s Privacy Policy to understand how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | HireSort',
    description: 'Learn how HireSort handles and protects your data.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | HireSort',
    description: 'Learn how HireSort handles and protects your data.',
  },
};

const crumbs = breadcrumbJsonLd([{ name: 'Privacy Policy' }]);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      <PrivacyClient />
    </>
  );
}
