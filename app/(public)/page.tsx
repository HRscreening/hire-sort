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
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const TwoWaysToHire = dynamic(() => import('@/components/home/TwoWaysToHire'));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'HireSort: Agentic Hiring Workflows for Faster Shortlists',
  },
  description:
    'HireSort creates JDs, posts jobs, sources candidates, screens resumes, runs AI phone screens, conducts first-round interviews, and delivers structured shortlists.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HireSort: Agentic Hiring Workflows for Faster Shortlists',
    description:
      'Create JDs, post jobs, source candidates, screen resumes, run phone screens, and deliver structured shortlists with less manual work.',
    url: '/',
    type: 'website',
    siteName: 'HireSort',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'HireSort' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort: Agentic Hiring Workflows for Faster Shortlists',
    description:
      'Create JDs, post jobs, source candidates, screen resumes, run phone screens, and deliver structured shortlists with less manual work.',
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
    'Agentic hiring workflow software for JD creation, job posting, sourcing, AI resume screening, phone screening, first-round interviews, and structured shortlists.',
  image: `${siteUrl}/logo.png`,
  featureList: [
    'AI job description creation',
    'One-tap job posting and sourcing',
    'Explainable AI resume screening',
    'AI phone screening',
    'AI first-round interviews',
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
      description: 'One active role and 250 hiring credits.',
    },
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '49',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '49',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'MONTH',
      },
      description: 'Two active roles and 1,000 hiring credits per month.',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '149',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '149',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'MONTH',
      },
      description: 'Five active roles and 4,000 hiring credits per month for sourcing, screening, phone screens, and interviews.',
    },
    {
      '@type': 'Offer',
      name: 'Scale',
      price: '399',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '399',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'MONTH',
      },
      description: 'Fifteen active roles and 12,000 hiring credits per month for agencies and high-volume teams.',
    },
  ],
  publisher: { '@type': 'Organization', name: 'HireSort' },
};

const heroVideoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'HireSort AI resume screening product demo',
  description:
    'Walkthrough of HireSort: bulk resume upload, AI-driven candidate ranking with explainable match scores, and shortlist-ready insights for recruiters.',
  thumbnailUrl: [`${siteUrl}/demo-poster.png`],
  contentUrl: `${siteUrl}/demo.mp4`,
  uploadDate: '2026-05-04',
  duration: 'PT30S',
  embedUrl: siteUrl,
  publisher: {
    '@type': 'Organization',
    name: 'HireSort',
    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
  },
  isFamilyFriendly: true,
  inLanguage: 'en',
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
        text: 'HireSort is an agentic hiring platform that helps teams create JDs, post jobs, source candidates, screen resumes, run phone screens, conduct first-round interviews, and review structured shortlists.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is agentic hiring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agentic hiring uses AI agents to complete multi-step recruiting work such as JD creation, sourcing, screening, phone calls, interviews, and shortlist preparation while recruiters keep review and approval control.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does AI phone screening work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI phone screening calls qualified candidates, asks preliminary fit questions, captures answers, and turns the call into structured notes for recruiter review.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can HireSort work with a recruiter in the loop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Recruiters can review AI-created JDs, sourcing results, resume scores, phone-screen notes, interview notes, and final shortlists before making hiring decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can HireSort deliver candidates for us?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. HireSort can combine human recruiters with proprietary agentic workflows to understand your role and share best-fit candidates in a matter of days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much time can HireSort save?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HireSort is designed to reduce manual recruiting time and effort by 50%-90% by automating sourcing, screening, phone screens, interviews, and shortlist preparation.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroVideoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }}
      />
      <Hero />
      <HowItWorks />
      <TwoWaysToHire />
      <Features />
      <Stats />
      <PopularResources />
      <Testimonials />
      <ContactSection />
      <CTA />

    </>
  );
}
