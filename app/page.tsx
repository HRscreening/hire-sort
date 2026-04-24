import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import Pricing from '@/components/home/Pricing';
import ContactSection from '@/components/home/ContactSection';
import CTA from '@/components/home/CTA';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort — AI-powered resume screening',
    description:
      'Rank resumes in seconds with explainable AI scores. Built for hiring teams.',
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
      <Pricing />
      <ContactSection />
      <CTA />
    </>
  );
}
