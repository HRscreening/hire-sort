import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbCrumb } from '@/lib/seo';

type Props = {
  /**
   * Crumbs for the trail. The Home crumb is prepended automatically — pass only the
   * crumbs after Home. The last crumb (without `path`) is rendered as the current page.
   */
  crumbs: BreadcrumbCrumb[];
  className?: string;
};

const Breadcrumb = ({ crumbs, className }: Props) => {
  const all: BreadcrumbCrumb[] = [{ name: 'Home', path: '/' }, ...crumbs];
  return (
    <nav
      aria-label="Breadcrumb"
      className={
        'mx-auto w-full max-w-300 px-6 pt-6 text-[12.5px] leading-tight ' +
        (className ?? '')
      }
    >
      <ol className="flex list-none flex-wrap items-center gap-1 p-0 text-charcoal-lt">
        {all.map((c, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  size={12}
                  strokeWidth={2.4}
                  aria-hidden
                  className="shrink-0 text-charcoal-xlt"
                />
              )}
              {!isLast && c.path ? (
                <Link
                  href={c.path}
                  className="inline-flex items-center gap-1 rounded-sm font-medium text-charcoal-lt no-underline transition-colors hover:text-accent"
                >
                  {i === 0 ? <Home size={12} strokeWidth={2.4} aria-hidden /> : null}
                  <span>{c.name}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="inline-flex items-center gap-1 font-semibold text-charcoal"
                >
                  {i === 0 ? <Home size={12} strokeWidth={2.4} aria-hidden /> : null}
                  <span className="line-clamp-1">{c.name}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
