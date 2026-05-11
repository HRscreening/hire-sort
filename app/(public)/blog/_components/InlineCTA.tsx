'use client';

import { ArrowRight } from 'lucide-react';
import { trackCTAClick } from '@/lib/google_analytics_tracker';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const InlineCTA = ({ slug }: { slug: string }) => (
  <a
    href={redirectURL}
    onClick={() => trackCTAClick('get_started', 'blog_inline_' + slug)}
    className="inline-flex items-center gap-2 rounded-md border border-copper bg-copper px-5 py-2.5 text-[14px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
  >
    Get started free
    <ArrowRight size={14} strokeWidth={2.5} />
  </a>
);
