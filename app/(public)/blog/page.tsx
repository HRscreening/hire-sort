import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { getAllPosts, type BlogPost } from './_lib/posts';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hiresort.ai';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, guides, and updates on modern hiring, AI resume screening, and recruiter productivity from the HireSort team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'HireSort Blog',
    description:
      'Hiring insights and AI recruitment best practices from the HireSort team.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort Blog',
    description:
      'Hiring insights and AI recruitment best practices from the HireSort team.',
  },
  keywords: [
    'HireSort blog',
    'AI hiring tips',
    'resume screening guides',
    'recruitment technology',
    'modern hiring workflows',
  ],
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const PostCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
  const href = `/blog/${post.slug}`;
  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-xl border border-line-soft bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-ivory-medium ${
          featured ? 'aspect-16/10 md:w-[46%] md:aspect-auto' : 'aspect-16/10'
        }`}
      >
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          sizes={
            featured
              ? '(min-width: 768px) 560px, 100vw'
              : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={featured}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.6px] text-charcoal-xlt">
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

        <h2
          className={`font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal ${
            featured ? 'text-[clamp(22px,2.6vw,30px)]' : 'text-[19px]'
          }`}
        >
          {post.title}
        </h2>

        <p className="line-clamp-3 text-[14.5px] leading-[1.65] text-charcoal-lt">
          {post.subtitle}
        </p>

        <div className="mt-auto flex items-center gap-2 text-[13.5px] font-semibold text-accent">
          Read article
          <ArrowUpRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'HireSort Blog',
    url: `${siteUrl}/blog`,
    description:
      'Hiring insights and AI recruitment best practices from the HireSort team.',
    publisher: {
      '@type': 'Organization',
      name: 'HireSort',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      image: `${siteUrl}${p.coverImage}`,
      url: `${siteUrl}/blog/${p.slug}`,
      author: { '@type': 'Person', name: p.author.name },
    })),
  };

  const crumbs = breadcrumbJsonLd([{ name: 'Blog' }]);

  const [featured, ...rest] = posts;

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
        dangerouslySetInnerHTML={{ __html: jsonLdString(blogJsonLd) }}
      />

      <PageHero
        icon={<BookOpen size={13} strokeWidth={2.5} />}
        eyebrow="HireSort Blog"
        title={
          <>
            Hiring, screening, and what we&apos;re <span className="text-accent">learning.</span>
          </>
        }
        lead={
          <>
            Practical guides and research notes on AI resume screening, recruiter productivity,
            and building hiring workflows that are faster without getting sloppy.
          </>
        }
      />

      <section className="mx-auto w-full max-w-300 px-6 pt-8 pb-24">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-150 rounded-xl border border-line-soft bg-white p-10 text-center shadow-card">
            <h2 className="mb-2 text-[20px] font-bold text-charcoal">No posts yet</h2>
            <p className="text-[14.5px] text-charcoal-lt">
              We&apos;re working on the first ones — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
