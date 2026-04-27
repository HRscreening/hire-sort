'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function buildPages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

const hrefFor = (n: number) => (n === 1 ? '/blog' : `/blog/page/${n}`);

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = buildPages(page, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="mx-auto mt-12 flex items-center justify-center gap-1.5"
    >
      <PageLink
        href={page > 1 ? hrefFor(page - 1) : null}
        ariaLabel="Previous page"
        className="px-3"
      >
        <ChevronLeft size={16} strokeWidth={2.4} />
      </PageLink>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span
            key={`e-${i}`}
            className="px-2 text-[13px] text-charcoal-xlt select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <PageLink
            key={p}
            href={hrefFor(p)}
            ariaLabel={`Page ${p}`}
            ariaCurrent={p === page ? 'page' : undefined}
            active={p === page}
          >
            {p === page && (
              <motion.span
                layoutId="page-pill"
                className="absolute inset-0 rounded-lg bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{p}</span>
          </PageLink>
        ),
      )}

      <PageLink
        href={page < totalPages ? hrefFor(page + 1) : null}
        ariaLabel="Next page"
        className="px-3"
      >
        <ChevronRight size={16} strokeWidth={2.4} />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  ariaLabel,
  ariaCurrent,
  active = false,
  className = '',
}: {
  href: string | null;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaCurrent?: 'page';
  active?: boolean;
  className?: string;
}) {
  const base =
    'relative inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-line-soft bg-white px-3 text-[13px] font-semibold transition-colors';
  const state = active
    ? 'text-white border-accent'
    : 'text-charcoal-md hover:border-accent hover:text-accent';
  const disabled = !href ? 'pointer-events-none opacity-40' : '';

  if (!href) {
    return (
      <span className={`${base} ${state} ${disabled} ${className}`} aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={`${base} ${state} ${className}`}
      scroll
    >
      {children}
    </Link>
  );
}
