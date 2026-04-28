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
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { InlineCTA } from '../_components/InlineCTA';
import { resolveCoverImage } from '../_lib/cover';

const absoluteCover = (cover?: string) => {
  if (!cover) return `${siteUrl}/blog/cover-placeholder.png`;
  const r = resolveCoverImage(cover);
  return r.startsWith('http') ? r : `${siteUrl}${r}`;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

type Params = Promise<{ slug: string }>;

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
      images: [
        {
          url: absoluteCover(post.coverImage),
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [absoluteCover(post.coverImage)],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
      <p className="my-4 text-[16px] leading-[1.8] text-charcoal-md">{block.text}</p>
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
            {item}
          </li>
        ))}
      </ul>
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
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const crumbs = breadcrumbJsonLd([
    { name: 'Blog', path: '/blog' },
    { name: post.title },
  ]);

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
