import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { getBestPageBySlug, getBestPageSlugs } from '../_data';
import BestClient from '../_components/BestClient';

type Params = Promise<{ slug: string }>;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return getBestPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = getBestPageBySlug(slug);
  if (!data) return { title: 'Not found', robots: { index: false, follow: false } };

  const url = `/resources/best/${data.slug}`;

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
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BestPageRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getBestPageBySlug(slug);
  if (!data) notFound();

  const pageUrl = absUrl(`/resources/best/${data.slug}`);
  const ogImageUrl = absUrl(data.meta.ogImage ?? '/logo.png');

  const crumbTrail = [
    { name: 'Resources', path: '/resources' },
    { name: 'Best', path: '/resources/best' },
    { name: data.category },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);

  const emitFaq = data.schema?.emitFaqPageJsonLd !== false && data.faqs.length > 0;
  const emitArticle = data.schema?.emitArticleJsonLd === true;

  const faqJsonLd = emitFaq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer.join(' ') },
        })),
      }
    : null;

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
    about: [{ '@type': 'Thing', name: data.category }],
    publisher: {
      '@type': 'Organization',
      name: 'HireSort',
      logo: { '@type': 'ImageObject', url: absUrl('/logo.png') },
    },
  };

  // Article JSON-LD is opt-in via data.schema.emitArticleJsonLd. Authors are
  // strictly optional; without them we omit the `author` field rather than
  // fabricate one.
  const articleJsonLd = emitArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.meta.title,
        description: data.meta.description,
        image: ogImageUrl,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        publisher: {
          '@type': 'Organization',
          name: 'HireSort',
          logo: { '@type': 'ImageObject', url: absUrl('/logo.png') },
        },
        ...(data.authors && data.authors.length > 0
          ? {
              author: data.authors.map((a) => ({
                '@type': 'Person',
                name: a.name,
                jobTitle: a.role,
                description: a.bio,
                ...(a.linkedinUrl ? { url: a.linkedinUrl } : {}),
                ...(a.avatarUrl ? { image: a.avatarUrl } : {}),
              })),
            }
          : {}),
      }
    : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }}
        />
      )}
      {articleJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
        />
      )}
      <Breadcrumb crumbs={crumbTrail} />
      <BestClient data={data} />
    </>
  );
}
