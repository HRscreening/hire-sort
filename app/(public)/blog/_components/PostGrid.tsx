'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { BlogPost } from '../_lib/posts';
import { PostCard } from './PostCard';

export function PostGrid({
  posts,
  page,
  showFeatured,
}: {
  posts: BlogPost[];
  page: number;
  showFeatured: boolean;
}) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-150 rounded-xl border border-line-soft bg-white p-10 text-center shadow-card">
        <h2 className="mb-2 text-[20px] font-bold text-charcoal">No posts yet</h2>
        <p className="text-[14.5px] text-charcoal-lt">
          We&apos;re working on the first ones — check back soon.
        </p>
      </div>
    );
  }

  const [first, ...rest] = posts;
  const featured = showFeatured ? first : null;
  const cards = showFeatured ? rest : posts;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {featured && <PostCard post={featured} featured index={0} />}
        {cards.map((post, i) => (
          <PostCard
            key={post.slug}
            post={post}
            index={i + (featured ? 1 : 0)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
