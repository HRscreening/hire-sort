import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { getJobDescriptionBySlug, getJobDescriptionSlugs } from '../_data';
import JobDescriptionClient from '../_components/JobDescriptionClient';

type Params = Promise<{ slug: string }>;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return getJobDescriptionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = getJobDescriptionBySlug(slug);
  if (!data) return { title: 'Not found', robots: { index: false, follow: false } };

  const url = `/resources/job-descriptions/${data.slug}`;
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');
  const ogImageAlt = data.meta.ogImageAlt ?? `${data.role} job description template`;

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

export default async function JobDescriptionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getJobDescriptionBySlug(slug);
  if (!data) notFound();

  const pageUrl = absUrl(`/resources/job-descriptions/${data.slug}`);
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');

  const crumbTrail = [
    { name: 'Resources', path: '/resources' },
    { name: 'Job Descriptions', path: '/resources/job-descriptions' },
    { name: data.role },
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
    about: [{ '@type': 'Thing', name: `${data.role} job description` }],
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
      <JobDescriptionClient data={data} />
    </>
  );
}
