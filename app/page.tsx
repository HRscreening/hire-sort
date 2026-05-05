import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';

// Below-the-fold sections — code-split so the initial home payload stays small.
const Features = dynamic(() => import('@/components/home/Features'));
const Stats = dynamic(() => import('@/components/home/Stats'));
const ContactSection = dynamic(() => import('@/components/home/ContactSection'));
const CTA = dynamic(() => import('@/components/home/CTA'));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'HireSort — AI-powered resume screening that ranks candidates in seconds',
  },
  description:
    'HireSort uses AI to rank resumes in seconds with explainable scores. Upload 500 resumes at once, configure scoring rubrics, and shortlist faster — built for modern hiring teams.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HireSort — AI-powered resume screening',
    description:
      'Rank resumes in seconds with explainable AI scores. Built for hiring teams.',
    url: '/',
    type: 'website',
    siteName: 'HireSort',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'HireSort' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort — AI-powered resume screening',
    description:
      'Rank resumes in seconds with explainable AI scores. Built for hiring teams.',
    images: [`${siteUrl}/logo.png`],
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HireSort',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Recruiting software',
  operatingSystem: 'Web',
  url: siteUrl,
  description:
    'AI-powered resume screening with explainable scoring, bulk processing, and candidate ranking for hiring teams.',
  image: `${siteUrl}/logo.png`,
  featureList: [
    'Explainable AI resume scoring',
    'Bulk upload and processing',
    'Customizable scoring rubrics',
    'Contextual candidate search',
    'End-to-end candidate pipeline',
    'Privacy and compliance controls (GDPR, DPDP, CCPA)',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: 'Up to 50 resume analyses per month.',
    },
    {
      '@type': 'Offer',
      name: 'Plus',
      price: '25',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '25',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'MONTH',
      },
      description: '1,000 AI resume analyses per month.',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '150',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '150',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'MONTH',
      },
      description: '10,000 AI resume analyses per month with configurable scoring rubrics.',
    },
  ],
  publisher: { '@type': 'Organization', name: 'HireSort' },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <ContactSection />
      <CTA />
    </>
  );
}
