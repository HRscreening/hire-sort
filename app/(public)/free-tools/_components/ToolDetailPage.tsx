import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Wrench } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { breadcrumbJsonLd, jsonLdString, SITE_URL } from '@/lib/seo';
import type { ToolDetail } from '../_data/details';

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/** Builds the page metadata from a tool detail record. Called by each route's page.tsx. */
export const buildToolDetailMetadata = (tool: ToolDetail): Metadata => {
  const url = `/free-tools/${tool.slug}`;
  const ogImage = absUrl(tool.meta.ogImage ?? '/logo.png');
  return {
    title: tool.meta.title,
    description: tool.meta.description,
    keywords: tool.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: tool.meta.title,
      description: tool.meta.description,
      url,
      siteName: 'HireSort',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `HireSort ${tool.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.meta.title,
      description: tool.meta.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
};

const buildJsonLd = (tool: ToolDetail) => {
  const pageUrl = absUrl(`/free-tools/${tool.slug}`);
  const ogImage = absUrl(tool.meta.ogImage ?? '/logo.png');

  const primaryEntity =
    tool.schemaType === 'DigitalDocument'
      ? {
          '@context': 'https://schema.org',
          '@type': 'DigitalDocument',
          name: tool.name,
          description: tool.meta.description,
          url: pageUrl,
          encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          isAccessibleForFree: true,
          provider: { '@type': 'Organization', name: 'HireSort', url: SITE_URL },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: tool.meta.description,
          url: pageUrl,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          provider: { '@type': 'Organization', name: 'HireSort', url: SITE_URL },
        };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.join(' ') },
    })),
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: tool.meta.title,
    description: tool.meta.description,
    inLanguage: 'en',
    datePublished: tool.publishedAt,
    dateModified: tool.updatedAt,
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
    isPartOf: { '@type': 'WebSite', name: 'HireSort', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'HireSort',
      logo: { '@type': 'ImageObject', url: absUrl('/logo.png') },
    },
  };

  return [primaryEntity, faq, webPage];
};

const CtaButton = ({
  href,
  label,
  inverted = false,
}: {
  href: string;
  label: string;
  inverted?: boolean;
}) => (
  <Link
    href={href}
    className={
      'inline-flex h-12 w-fit items-center gap-2 rounded-full px-7 text-[14.5px] font-semibold no-underline transition-colors ' +
      (inverted
        ? 'bg-accent text-ivory hover:bg-ivory hover:text-charcoal'
        : 'bg-charcoal text-ivory hover:bg-accent')
    }
  >
    {label}
    <ArrowRight size={16} strokeWidth={2.5} />
  </Link>
);

const ToolDetailPage = ({ tool }: { tool: ToolDetail }) => {
  const crumbTrail = [
    { name: 'Free tools', path: '/free-tools' },
    { name: tool.name },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);
  const schemas = buildJsonLd(tool);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLdString(s) }}
        />
      ))}

      <Breadcrumb crumbs={crumbTrail} />

      <PageHero
        icon={<Wrench size={13} strokeWidth={2.5} />}
        eyebrow={tool.hero.eyebrow}
        title={
          <>
            {tool.hero.titlePrefix}{' '}
            <span className="text-accent">{tool.hero.titleAccent}</span>
            {tool.hero.titleSuffix ? <> {tool.hero.titleSuffix}</> : null}
          </>
        }
        lead={tool.hero.lead}
      >
        <CtaButton href={tool.appHref} label={tool.hero.ctaLabel} />
      </PageHero>

      {/* Intro */}
      <section className="mx-auto max-w-180 px-6 pb-4">
        {tool.intro.map((p, i) => (
          <p key={i} className="mt-4 text-[15.5px] leading-[1.7] text-charcoal-lt first:mt-0">
            {p}
          </p>
        ))}
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-300 px-6 pt-12 pb-4">
        <h2 className="text-[26px] font-extrabold tracking-[-0.6px] text-charcoal">
          {tool.howItWorks.title}
        </h2>
        {tool.howItWorks.intro && (
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.65] text-charcoal-lt">
            {tool.howItWorks.intro}
          </p>
        )}
        <ol className="mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-3">
          {tool.howItWorks.steps.map((step, i) => (
            <li
              key={i}
              className="rounded-3xl border border-line-soft bg-white p-6 shadow-soft"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(200,90,23,0.08)] text-[15px] font-extrabold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[16px] font-bold tracking-[-0.2px] text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-charcoal-lt">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-300 px-6 pt-12 pb-4">
        <h2 className="text-[26px] font-extrabold tracking-[-0.6px] text-charcoal">
          {tool.features.title}
        </h2>
        {tool.features.intro && (
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.65] text-charcoal-lt">
            {tool.features.intro}
          </p>
        )}
        <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2">
          {tool.features.items.map((f, i) => (
            <li
              key={i}
              className="rounded-3xl border border-line-soft bg-white p-6 shadow-soft"
            >
              <h3 className="text-[16px] font-bold tracking-[-0.2px] text-charcoal">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-charcoal-lt">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* When to use */}
      <section className="mx-auto max-w-300 px-6 pt-12 pb-4">
        <div className="rounded-3xl border border-line-soft bg-ivory-light p-7 sm:p-9">
          <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-charcoal">
            {tool.whenToUse.title}
          </h2>
          <ul className="mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {tool.whenToUse.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(200,90,23,0.1)] text-accent">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-[14.5px] leading-[1.55] text-charcoal-md">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-180 px-6 pt-12 pb-4">
        <h2 className="text-[26px] font-extrabold tracking-[-0.6px] text-charcoal">
          Frequently asked questions
        </h2>
        <dl className="mt-6">
          {tool.faqs.map((f, i) => (
            <div
              key={i}
              className="border-b border-line-soft py-5 first:border-t"
            >
              <dt className="text-[16px] font-bold tracking-[-0.2px] text-charcoal">
                {f.question}
              </dt>
              {f.answer.map((a, j) => (
                <dd key={j} className="mt-2 text-[14.5px] leading-[1.65] text-charcoal-lt">
                  {a}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>

      {/* Related links */}
      <section className="mx-auto max-w-300 px-6 pt-12 pb-8">
        <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-charcoal">
          Related resources
        </h2>
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {tool.related.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex h-full flex-col gap-1.5 rounded-2xl border border-line-soft bg-white p-5 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
              >
                <span className="flex items-center gap-1.5 text-[15px] font-bold tracking-[-0.2px] text-charcoal group-hover:text-accent">
                  {r.label}
                  <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                </span>
                {r.note && (
                  <span className="text-[13px] leading-[1.55] text-charcoal-lt">{r.note}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-300 px-6 pb-24">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-line-soft bg-charcoal px-8 py-12 text-center">
          <h2 className="max-w-2xl text-[26px] font-extrabold tracking-[-0.6px] text-ivory">
            Try the {tool.name} — free, no signup
          </h2>
          <CtaButton href={tool.appHref} label={tool.hero.ctaLabel} inverted />
        </div>
      </section>
    </>
  );
};

export default ToolDetailPage;
