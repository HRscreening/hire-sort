import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact HireSort',
  description:
    'Questions about pricing, onboarding, or a custom workflow? Reach the HireSort team — a real human reads every message and replies within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact HireSort',
    description: 'Get in touch with the HireSort team — we reply within 24 hours.',
    url: '/contact',
    type: 'website',
    siteName: 'HireSort',
    images: [
      { url: `${SITE_URL}/logo.png`, width: 1200, height: 630, alt: 'Contact HireSort' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HireSort',
    description: 'Get in touch with the HireSort team — we reply within 24 hours.',
    images: [`${SITE_URL}/logo.png`],
  },
};

const crumbs = breadcrumbJsonLd([{ name: 'Contact' }]);

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact HireSort',
  url: `${SITE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'HireSort',
    email: 'support@hiresort.ai',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@hiresort.ai',
      availableLanguage: ['English'],
    },
  },
};

export default function ContactPage() {
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
        dangerouslySetInnerHTML={{ __html: jsonLdString(contactPageJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
