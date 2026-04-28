'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '../_lib/posts';
import { resolveCoverImage } from '../_lib/cover';
import { CoverPlaceholder } from './CoverPlaceholder';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export function PostCard({
  post,
  featured = false,
  index = 0,
}: {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}) {
  const href = `/blog/${post.slug}`;
  const coverSrc = post.coverImage && resolveCoverImage(post.coverImage);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className={featured ? 'md:col-span-3' : ''}
    >
      <Link
        href={href}
        className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line-soft bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lg ${
          featured ? 'md:flex-row' : ''
        }`}
      >
        <div
          className={`relative w-full shrink-0 overflow-hidden bg-ivory-medium ${
            featured ? 'aspect-16/10 md:w-[46%] md:aspect-auto' : 'aspect-16/10'
          }`}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={post.coverAlt}
              fill
              sizes={
                featured
                  ? '(min-width: 868px) 560px, 100vw'
                  : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'
              }
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              priority={featured}
            />
          ) : (
            <CoverPlaceholder seed={post.slug} category={post.category} />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.6px] text-charcoal-xlt">
            {post.category && (
              <span className="rounded-full bg-[rgba(200,90,23,0.08)] px-2.5 py-1 text-accent">
                {post.category}
              </span>
            )}
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
    </motion.div>
  );
}
