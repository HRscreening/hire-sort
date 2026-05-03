import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import { getComparisonBySlug, getComparisonSlugs } from '../_data';
import CompareClient from '../_components/CompareClient';

type Params = Promise<{ slug: string }>;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparisonBySlug(slug);
  if (!data) {
    return { title: 'Comparison not found', robots: { index: false, follow: false } };
  }
  const url = `/resources/compare/${data.slug}`;
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');
  const ogImageAlt = data.meta.ogImageAlt ?? `${data.competitor} alternative — HireSort`;

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

export default async function ComparisonPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getComparisonBySlug(slug);
  if (!data) notFound();

  const pageUrl = absUrl(`/resources/compare/${data.slug}`);
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');

  const crumbs = breadcrumbJsonLd([
    { name: 'Resources', path: '/resources' },
    { name: 'Compare', path: '/resources/compare' },
    { name: data.competitor },
  ]);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.join(' ') },
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
    isPartOf: {
      '@type': 'WebSite',
      name: 'HireSort',
      url: SITE_URL,
    },
    about: [
      { '@type': 'Thing', name: data.competitor },
      { '@type': 'Thing', name: 'AI resume screening' },
      { '@type': 'Thing', name: 'Applicant tracking system' },
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
      <CompareClient data={data} />
    </>
  );
}
