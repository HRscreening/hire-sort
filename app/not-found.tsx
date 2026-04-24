import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-200 flex-col items-center justify-center px-6 py-20 text-center">
      <span className="font-mono text-[13px] font-bold uppercase tracking-[0.8px] text-accent">
        404
      </span>
      <h1 className="mt-3 mb-4 text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.15] tracking-[-1.2px] text-charcoal">
        We couldn&apos;t find that page.
      </h1>
      <p className="mx-auto mb-8 max-w-150 text-[15px] leading-[1.65] text-charcoal-lt">
        The link may be broken or the page may have moved. Head back to the home page or reach
        out if you think this is a mistake.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-6 py-3 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
        >
          <ArrowLeft size={15} strokeWidth={2.5} />
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-6 py-3 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
        >
          Contact support
        </Link>
      </div>
    </section>
  );
}
