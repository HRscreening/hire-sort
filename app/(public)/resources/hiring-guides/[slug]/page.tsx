import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import {
  getHiringGuideBySlug,
  getHiringGuideSlugs,
} from '../_data';
import HiringGuideClient from '../_components/HiringGuideClient';

type Params = Promise<{ slug: string }>;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return getHiringGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = getHiringGuideBySlug(slug);
  if (!data) return { title: 'Not found', robots: { index: false, follow: false } };

  const url = `/resources/hiring-guides/${data.slug}`;
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');
  const ogImageAlt = data.meta.ogImageAlt ?? `${data.role} hiring guide`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: 'HireSort',
      publishedTime: data.publishedAt,
      modifiedTime: data.updatedAt,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function HiringGuideRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getHiringGuideBySlug(slug);
  if (!data) notFound();

  const pageUrl = absUrl(`/resources/hiring-guides/${data.slug}`);
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');

  const crumbTrail = [
    { name: 'Resources', path: '/resources' },
    { name: 'Hiring Guides', path: '/resources/hiring-guides' },
    { name: data.role },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer.join(' ') },
    })),
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: data.meta.title,
    description: data.meta.description,
    inLanguage: 'en',
    datePublished: data.publishedAt,
    dateModified: data.updatedAt,
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImageUrl },
    isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
    about: [
      { '@type': 'Thing', name: `${data.role} hiring guide` },
      { '@type': 'Thing', name: `${data.role} screening checklist` },
      { '@type': 'Thing', name: `${data.role} interview questions` },
      { '@type': 'Thing', name: `${data.role} scorecard` },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'HireSort',
      logo: { '@type': 'ImageObject', url: absUrl('/logo.png') },
    },
  };

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
        dangerouslySetInnerHTML={{ __html: jsonLdString(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }}
      />
      <div className="xl:pl-[240px]">
        <Breadcrumb crumbs={crumbTrail} />
      </div>
      <HiringGuideClient data={data} />
    </>
  );
}
