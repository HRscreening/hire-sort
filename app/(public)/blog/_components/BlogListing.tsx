import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/seo';
import { getPaginatedPosts } from '../_lib/posts';
import { resolveCoverImage } from '../_lib/cover';
import { PostGrid } from './PostGrid';
import { Pagination } from './Pagination';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export async function BlogListing({ page }: { page: number }) {
  const { posts, totalPages, page: safePage } = await getPaginatedPosts(page);

  if (page > 1 && page > totalPages) notFound();

  const showFeatured = safePage === 1;

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
    blogPost: posts.map((p) => {
      const resolvedImage = resolveCoverImage(p.coverImage);
      return {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.publishedAt,
        dateModified: p.updatedAt ?? p.publishedAt,
        image: resolvedImage.startsWith('http') ? resolvedImage : `${siteUrl}${resolvedImage}`,
        url: `${siteUrl}/blog/${p.slug}`,
        author: { '@type': 'Person', name: p.author.name },
      };
    }),
  };

  const crumbs = breadcrumbJsonLd([{ name: 'Blog' }]);

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
        <PostGrid posts={posts} page={safePage} showFeatured={showFeatured} />
        <Pagination page={safePage} totalPages={totalPages} />
      </section>
    </>
  );
}
