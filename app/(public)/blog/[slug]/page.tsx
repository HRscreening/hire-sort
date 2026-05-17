import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  type BlogBlock,
  type BlogPost,
} from '../_lib/posts';
import { getAllProductPages } from '@/app/(public)/product/_lib/registry';
import { getAllUseCases } from '@/app/(public)/use-cases/_lib/registry';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { InlineCTA } from '../_components/InlineCTA';
import { resolveCoverImage } from '../_lib/cover';

const absoluteCover = (cover?: string) => {
  const r = resolveCoverImage(cover);
  return r.startsWith('http') ? r : `${siteUrl}${r}`;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

type Params = Promise<{ slug: string }>;

export const revalidate = 3600;
export const dynamicParams = true;

/** Pre-render every post at build time for instant first paint + crawler-friendly HTML. */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const INLINE_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

const renderInline = (text: string): React.ReactNode => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  INLINE_LINK_RE.lastIndex = 0;
  while ((m = INLINE_LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    const internal = href.startsWith('/');
    nodes.push(
      internal ? (
        <Link
          key={key++}
          href={href}
          className="text-accent underline decoration-[rgba(200,90,23,0.4)] underline-offset-2 hover:decoration-accent"
        >
          {label}
        </Link>
      ) : (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-[rgba(200,90,23,0.4)] underline-offset-2 hover:decoration-accent"
        >
          {label}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length === 1 ? nodes[0] : nodes;
};

type ExternalLink = { href: string; label: string; description: string };

const getRelatedExternalLinks = (
  post: BlogPost,
  limit: number,
): ExternalLink[] => {
  const haystack = [
    ...post.keywords,
    ...post.tags,
    post.category,
    post.title,
  ]
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  const score = (keywords: string[], name: string) => {
    const tokens = [...keywords, name].map((s) => s.toLowerCase());
    let s = 0;
    for (const t of tokens) {
      for (const h of haystack) {
        if (t && (h.includes(t) || t.includes(h))) s += 1;
      }
    }
    return s;
  };

  const candidates: (ExternalLink & { score: number })[] = [
    ...getAllProductPages().map((p) => ({
      href: `/product/${p.slug}`,
      label: p.product,
      description: p.meta.description,
      score: score(p.meta.keywords, p.product),
    })),
    ...getAllUseCases().map((p) => ({
      href: `/use-cases/${p.slug}`,
      label: p.product,
      description: p.meta.description,
      score: score(p.meta.keywords, p.product),
    })),
  ];

  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.filter((c) => c.score > 0).slice(0, limit);

  // Fallback to curated defaults if nothing matched.
  if (top.length === 0) {
    return [
      {
        href: '/product/applicant-tracking-system',
        label: 'Applicant Tracking System',
        description: 'Track, screen, and shortlist candidates in one workspace.',
      },
      {
        href: '/use-cases/founder-led-hiring',
        label: 'Founder-led hiring',
        description: 'A lightweight hiring workflow for early-stage teams.',
      },
      {
        href: '/resources',
        label: 'Hiring resources',
        description: 'Templates, rubrics, scorecards, and guides.',
      },
    ].slice(0, limit);
  }

  return top.map(({ href, label, description }) => ({ href, label, description }));
};

const getRelatedPosts = (
  current: BlogPost,
  all: BlogPost[],
  limit: number,
): BlogPost[] => {
  const others = all.filter((p) => p.slug !== current.slug);
  const scored = others.map((p) => {
    const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
    const sameCategory =
      p.category && current.category && p.category === current.category ? 1 : 0;
    return { post: p, score: sharedTags * 2 + sameCategory };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (
      new Date(b.post.publishedAt).getTime() -
      new Date(a.post.publishedAt).getTime()
    );
  });
  return scored.slice(0, limit).map((s) => s.post);
};

const Block = ({ block, slug }: { block: BlogBlock; slug: string }) => {
  if (block.type === 'heading') {
    if (block.level === 2) {
      return (
        <h2 className="mt-10 mb-4 text-[clamp(22px,2.6vw,28px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
          {block.text}
        </h2>
      );
    }
    return (
      <h3 className="mt-6 mb-2 text-[18px] font-bold tracking-[-0.3px] text-charcoal">
        {block.text}
      </h3>
    );
  }
  if (block.type === 'paragraph') {
    return (
      <p className="my-4 text-[16px] leading-[1.8] text-charcoal-md">
        {renderInline(block.text)}
      </p>
    );
  }
  if (block.type === 'list') {
    return (
      <ul className="my-4 flex list-none flex-col gap-2 p-0">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="relative pl-5 text-[15.5px] leading-[1.7] text-charcoal-md before:absolute before:left-0 before:top-3 before:h-1.25 before:w-1.25 before:rounded-full before:bg-[rgba(200,90,23,0.6)] before:content-['']"
          >
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'linkList') {
    return (
      <aside className="my-10 rounded-xl border border-line-soft bg-white p-6 shadow-soft">
        {block.title && (
          <h3 className="mb-4 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
            {block.title}
          </h3>
        )}
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
          {block.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group block h-full rounded-lg border border-line-soft bg-ivory-light px-4 py-3 no-underline transition-colors hover:border-accent hover:bg-white"
              >
                <span className="text-[14px] font-bold text-accent group-hover:underline">
                  {link.label}
                </span>
                {link.description && (
                  <span className="mt-1 block text-[12.5px] leading-[1.5] text-charcoal-lt">
                    {link.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  return (
    <aside className="my-10 rounded-xl border border-[rgba(200,90,23,0.16)] bg-[rgba(200,90,23,0.05)] px-6 py-6">
      {block.title && (
        <h3 className="mb-2 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
          {block.title}
        </h3>
      )}
      <p className="text-[15px] leading-[1.7] text-charcoal-md">{block.text}</p>
      <div className="mt-4">
        <InlineCTA slug={slug} />
      </div>
    </aside>
  );
};

const buildJsonLd = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteUrl}/blog/${post.slug}`,
  },
  headline: post.title,
  description: post.description,
  image: [absoluteCover(post.coverImage)],
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  author: {
    '@type': 'Person',
    name: post.author.name,
    ...(post.author.role ? { jobTitle: post.author.role } : {}),
  },
  publisher: {
    '@type': 'Organization',
    name: 'HireSort',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
    },
  },
  keywords: post.keywords.join(', '),
  articleSection: post.category,
});

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = getRelatedPosts(post, allPosts, 3);
  const externalLinks = getRelatedExternalLinks(post, 3);

  const crumbTrail = [
    { name: 'Blog', path: '/blog' },
    { name: post.title },
  ];
  const crumbs = breadcrumbJsonLd(crumbTrail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(crumbs) }}
      />
      <Breadcrumb crumbs={crumbTrail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildJsonLd(post)) }}
      />

      <article className="mx-auto w-full max-w-200 px-6 pt-12 pb-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-charcoal-lt no-underline transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} strokeWidth={2.4} />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.6px] text-charcoal-xlt">
            <span className="rounded-full bg-[rgba(200,90,23,0.08)] px-2.5 py-1 text-accent">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} strokeWidth={2.4} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} strokeWidth={2.4} />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mb-4 text-[clamp(30px,4.2vw,44px)] font-extrabold leading-[1.12] tracking-[-1.2px] text-charcoal">
            {post.title}
          </h1>
          <p className="text-[17px] leading-[1.6] text-charcoal-lt">{post.subtitle}</p>

          <div className="mt-6 flex items-center gap-3 border-t border-line-soft pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-ivory-dark to-line text-[13px] font-bold text-charcoal-md">
              {post.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="text-[14px] font-semibold text-charcoal">{post.author.name}</div>
              {post.author.role && (
                <div className="text-[12.5px] text-charcoal-lt">{post.author.role}</div>
              )}
            </div>
          </div>
        </header>

        {/* Cover */}
        {post.coverImage &&
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-line-soft bg-ivory-medium shadow-card">
            <Image
              src={resolveCoverImage(post.coverImage)}
              alt={post.coverAlt}
              fill
              priority
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>
        }

        {/* Body */}
        <div className="flex flex-col">
          {post.body.map((block, i) => (
            <Block key={i} block={block} slug={post.slug} />
          ))}
        </div>

        {/* Explore HireSort — cross-links to product / use-cases */}
        {externalLinks.length > 0 && (
          <aside className="my-10 rounded-xl border border-line-soft bg-white p-6 shadow-soft">
            <h3 className="mb-4 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
              Explore HireSort
            </h3>
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
              {externalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group block h-full rounded-lg border border-line-soft bg-ivory-light px-4 py-3 no-underline transition-colors hover:border-accent hover:bg-white"
                  >
                    <span className="text-[14px] font-bold text-accent group-hover:underline">
                      {l.label}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-[1.5] text-charcoal-lt">
                      {l.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Read next — auto-derived cross-links */}
        {related.length > 0 && (
          <aside className="my-10 rounded-xl border border-line-soft bg-white p-6 shadow-soft">
            <h3 className="mb-4 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
              Read next
            </h3>
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block h-full rounded-lg border border-line-soft bg-ivory-light px-4 py-3 no-underline transition-colors hover:border-accent hover:bg-white"
                  >
                    <span className="text-[14px] font-bold text-accent group-hover:underline">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-[1.5] text-charcoal-lt">
                      {p.subtitle || p.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line-soft pt-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
              Tags
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line-soft bg-ivory-light px-2.5 py-1 text-[12px] font-medium text-charcoal-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-275 px-6 pb-24">
          <h2 className="mb-6 text-[22px] font-bold tracking-[-0.5px] text-charcoal">
            Keep reading
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-line-soft bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {p.coverImage &&
                  <div className="relative aspect-16/10 overflow-hidden bg-ivory-medium">
                    <Image
                      src={resolveCoverImage(p.coverImage)}
                      alt={p.coverAlt}
                      fill
                      loading="lazy"
                      quality={65}
                      sizes="(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.6px] text-accent">
                    {p.category}
                  </div>
                  <h3 className="text-[18px] font-bold leading-tight tracking-[-0.4px] text-charcoal">
                    {p.title}
                  </h3>
                  <p className="line-clamp-2 text-[14px] leading-[1.6] text-charcoal-lt">
                    {p.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
