import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';

// Below-the-fold sections — code-split so the initial home payload stays small.
const Features = dynamic(() => import('@/components/home/Features'));
const Stats = dynamic(() => import('@/components/home/Stats'));
const PopularResources = dynamic(() => import('@/components/home/PopularResources'));
const ContactSection = dynamic(() => import('@/components/home/ContactSection'));
const CTA = dynamic(() => import('@/components/home/CTA'));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'AI Resume Screening Software for Faster Candidate Shortlisting | HireSort',
  },
  description:
    'HireSort is AI resume screening software that ranks candidates in seconds with explainable scores. Upload resumes in bulk, configure scoring rubrics, and shortlist faster.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Resume Screening Software | HireSort',
    description:
      'Rank candidates in seconds with explainable AI scores, bulk resume processing, and structured shortlists.',
    url: '/',
    type: 'website',
    siteName: 'HireSort',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'HireSort' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Screening Software | HireSort',
    description:
      'Rank candidates in seconds with explainable AI scores, bulk resume processing, and structured shortlists.',
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
    'AI resume screening software with explainable scoring, bulk processing, and candidate ranking for hiring teams.',
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

const homepageFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is HireSort?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HireSort is AI resume screening software that helps recruiters upload resumes, rank candidates, review explainable scores, and build shortlists faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does HireSort rank candidates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HireSort compares resumes against the role requirements and scoring rubric, then produces candidate rankings with evidence, strengths, gaps, and match scores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can HireSort process resumes in bulk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. HireSort supports bulk resume uploads and background processing so hiring teams can screen large candidate pools without manually reviewing every file first.',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }}
      />
      <Hero />
      <HowItWorks />
      <Features />
      <Stats />
      <PopularResources />
      <ContactSection />
      <CTA />
    </>
  );
}
