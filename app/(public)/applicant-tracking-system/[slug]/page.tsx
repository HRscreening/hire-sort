import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductClient from '@/app/(public)/product/_components/ProductClient';
import { getAtsPageBySlug, getAtsPageSlugs } from '../_lib/registry';

type Params = Promise<{ slug: string }>;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAtsPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = getAtsPageBySlug(slug);
  if (!data) return { title: 'Not found', robots: { index: false, follow: false } };
  const url = `/applicant-tracking-system/${data.slug}`;
  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: 'HireSort',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function AtsSegmentPageRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getAtsPageBySlug(slug);
  if (!data) notFound();

  const pageUrl = absUrl(`/applicant-tracking-system/${data.slug}`);
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');

  const crumbTrail = [
    { name: 'Applicant Tracking System', path: '/applicant-tracking-system' },
    { name: data.product },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);

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
    isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
    about: [{ '@type': 'Thing', name: data.product }],
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
      <Breadcrumb crumbs={crumbTrail} />
      <ProductClient data={data} />
    </>
  );
}
