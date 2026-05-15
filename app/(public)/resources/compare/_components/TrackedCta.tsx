'use client';

import type { ReactNode } from 'react';
import { trackCTAClick } from '@/lib/google_analytics_tracker';

type Props = {
  href: string;
  cta: string;
  location: string;
  className?: string;
  children: ReactNode;
};

const TrackedCta = ({ href, cta, location, className, children }: Props) => (
  <a
    href={href}
    onClick={() => trackCTAClick(cta, location)}
    className={className}
  >
    {children}
  </a>
);

export default TrackedCta;
