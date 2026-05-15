'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

const linkHover = {
  rest: { y: 0 },
  hover: { y: -2, transition: { type: 'spring' as const, stiffness: 400, damping: 18 } },
};

const linkItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

type IconKey =
  | 'ats' | 'pipeline' | 'software' | 'parser' | 'resume'
  | 'compare' | 'blog' | 'about' | 'mail' | 'doc' | 'award' | 'sparkles'
  | 'rocket' | 'users' | 'briefcase' | 'building' | 'volume';

const Icon = ({ name }: { name: IconKey }) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'ats': return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h6M7 17h4" /></svg>;
    case 'pipeline': return <svg {...common}><path d="M3 6h6l3 4-3 4H3zM12 10h6l3 4-3 4h-6" /></svg>;
    case 'software': return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg>;
    case 'parser': return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 14l2 2 4-4" /></svg>;
    case 'resume': return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>;
    case 'compare': return <svg {...common}><path d="M12 3v18M5 8l-3 4 3 4M19 8l3 4-3 4" /></svg>;
    case 'blog': return <svg {...common}><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" /></svg>;
    case 'about': return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case 'doc': return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>;
    case 'award': return <svg {...common}><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.12" /></svg>;
    case 'sparkles': return <svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>;
    case 'rocket': return <svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    case 'users': return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case 'briefcase': return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case 'building': return <svg {...common}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" /></svg>;
    case 'volume': return <svg {...common}><path d="M3 3v18h18M7 14l4-4 4 4 5-5" /></svg>;
  }
};

type MegaItem = { href: string; label: string; description?: string; icon: IconKey };
type MegaGroup = { title: string; items: MegaItem[] };
type MegaFeatured = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
};
type MegaConfig = { groups: MegaGroup[]; featured?: MegaFeatured };

const productMega: MegaConfig = {
  groups: [
    {
      title: 'Platform',
      items: [
        { href: '/product/applicant-tracking-system', label: 'Applicant Tracking', description: 'Track candidates end-to-end', icon: 'ats' },
        { href: '/product/recruitment-software', label: 'Recruitment Software', description: 'AI-powered hiring workflows', icon: 'software' },
        { href: '/product/candidate-pipeline', label: 'Candidate Pipeline', description: 'Visualise your hiring funnel', icon: 'pipeline' },
      ],
    },
    {
      title: 'Resumes',
      items: [
        { href: '/product/resume-parser', label: 'Resume Parser', description: 'Extract structured data', icon: 'parser' },
        { href: '/product/resume-management', label: 'Resume Management', description: 'Organise and search resumes', icon: 'resume' },
      ],
    },
    {
      title: 'ATS by team',
      items: [
        { href: '/applicant-tracking-system', label: 'ATS overview', description: 'All variants', icon: 'ats' },
        { href: '/applicant-tracking-system/startups', label: 'ATS for startups', description: 'Lean hiring stack', icon: 'rocket' },
        { href: '/applicant-tracking-system/smb', label: 'ATS for SMBs', description: 'Right-sized for SMBs', icon: 'briefcase' },
      ],
    },
  ],
  featured: {
    eyebrow: 'Get started',
    title: 'Try HireSort free',
    body: 'Screen resumes in seconds with AI-ranked shortlists.',
    href: main_app_url + '/',
    ctaLabel: 'Start for free',
  },
};

const useCasesMega: MegaConfig = {
  groups: [
    {
      title: 'By role',
      items: [
        { href: '/use-cases', label: 'All use cases', description: 'Browse every workflow', icon: 'users' },
        { href: '/use-cases/founder-led-hiring', label: 'Founder-led hiring', description: 'Hire your first team', icon: 'rocket' },
        { href: '/use-cases/hiring-managers', label: 'Hiring managers', description: 'Faster shortlist reviews', icon: 'briefcase' },
        { href: '/use-cases/recruiters', label: 'Recruiters', description: 'Screen more, faster', icon: 'users' },
      ],
    },
    {
      title: 'By scale',
      items: [
        { href: '/use-cases/recruitment-agencies', label: 'Recruitment agencies', description: 'Multi-client screening', icon: 'building' },
        { href: '/use-cases/high-volume-hiring', label: 'High-volume hiring', description: 'Scale screening fast', icon: 'volume' },
      ],
    },
  ],
  featured: {
    eyebrow: 'New',
    title: 'High-volume hiring',
    body: 'Process thousands of resumes per role with explainable AI.',
    href: '/use-cases/high-volume-hiring',
    ctaLabel: 'See how',
  },
};

const resourcesMega: MegaConfig = {
  groups: [
    // {
    //   title: 'Learn',
    //   items: [
    //     { href: '/blog', label: 'Blog', description: 'Hiring insights & guides', icon: 'blog' },
    //     { href: '/about', label: 'About', description: 'Our mission & team', icon: 'about' },
    //   ],
    // },
    {
      title: 'Compare',
      items: [
        { href: '/resources/compare', label: 'All comparisons', description: 'Browse every comparison', icon: 'compare' },
        { href: '/resources/compare/workable-alternative', label: 'Workable alternative', description: 'HireSort vs Workable', icon: 'compare' },
        { href: '/resources/compare/lever-alternative', label: 'Lever alternative', description: 'HireSort vs Lever', icon: 'compare' },
        { href: '/resources/compare/hiresort-vs-manual-screening', label: 'vs Manual screening', description: 'AI vs manual review', icon: 'compare' },
        { href: '/resources/compare/hiresort-vs-spreadsheets', label: 'vs Spreadsheets', description: 'Beyond candidate sheets', icon: 'compare' },
        { href: '/resources/compare/resume-screening-software-vs-resume-parser', label: 'Screening vs parser', description: 'Know the difference', icon: 'compare' },
      ],
    },
    {
      title: 'Screening guides',
      items: [
        { href: '/resources/best', label: 'All guides', description: 'Browse every guide', icon: 'award' },
        { href: '/resources/best/resume-screening-software', label: 'Resume screening', description: 'Top tools compared', icon: 'doc' },
        { href: '/resources/best/ai-resume-screening-software', label: 'AI resume screening', description: 'Best AI screeners', icon: 'sparkles' },
        { href: '/resources/best/candidate-screening-software', label: 'Candidate screening', description: 'End-to-end picks', icon: 'doc' },
      ],
    },
    {
      title: 'Recruiting guides',
      items: [
        { href: '/resources/best/ats-for-startups', label: 'ATS for startups', description: 'Lean hiring stack', icon: 'rocket' },
        { href: '/resources/best/recruitment-software-for-small-business', label: 'Software for SMBs', description: 'Right-sized tools', icon: 'briefcase' },
        { href: '/resources/best/high-volume-hiring-software', label: 'High-volume hiring', description: 'Scale screening fast', icon: 'volume' },
      ],
    },
    {
      title: 'Templates',
      items: [
        { href: '/resources/job-descriptions', label: 'Job descriptions', description: 'Browse every role', icon: 'doc' },
        { href: '/resources/interview-questions', label: 'Interview questions', description: 'Structured by role', icon: 'users' },
        { href: '/resources/scorecards', label: 'Scorecards', description: 'Evaluate by role', icon: 'award' },
        { href: '/resources/screening-rubrics', label: 'Screening rubrics', description: 'Screen resumes by role', icon: 'parser' },
      ],
    },
  ],
};

type NavEntry =
  | { kind: 'link'; href: string; label: string }
  | { kind: 'mega'; key: string; label: string; config: MegaConfig };

const navLinks: NavEntry[] = [
  { kind: 'link', href: '/#how', label: 'How it works' },
  { kind: 'link', href: '/#features', label: 'Features' },
  { kind: 'mega', key: 'product', label: 'Product', config: productMega },
  { kind: 'mega', key: 'solutions', label: 'Solutions', config: useCasesMega },
  { kind: 'mega', key: 'resources', label: 'Resources', config: resourcesMega },
  { kind: 'link', href: '/blog', label: 'Blog' },
  { kind: 'link', href: '/pricing', label: 'Pricing' },
];

const isActiveTop = (entry: NavEntry, pathname: string): boolean => {
  if (entry.kind === 'link') {
    if (entry.href.startsWith('/#')) return false;
    return entry.href === '/' ? pathname === '/' : pathname === entry.href || pathname.startsWith(entry.href + '/');
  }
  return entry.config.groups.some((g) =>
    g.items.some((it) => pathname === it.href || pathname.startsWith(it.href + '/')),
  );
};

const Navbar = () => {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(
      document.cookie.split('; ').some((c) => c === 'hs_auth=1'),
    );
  }, []);

  const dashboardHref = isLoggedIn ? main_app_url : `${main_app_url}/login`;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMega = (key: string) => {
    cancelClose();
    setActiveMega(key);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMega(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'fixed',
            top: '12px',
            left: '12px',
            width: 'auto',
            height: 'auto',
            padding: '8px 12px',
            margin: 0,
            overflow: 'visible',
            clip: 'auto',
            background: '#1a1a1a',
            color: '#f5f3ee',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            zIndex: 200,
            textDecoration: 'none',
          });
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            background: 'transparent',
            color: 'transparent',
          });
        }}
      >
        Skip to content
      </a>

      <motion.nav
        aria-label="Primary"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="sticky top-0 z-100 border-b border-line-soft bg-ivory/95 backdrop-blur-xl"
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto grid h-17 max-w-300 grid-cols-[auto_1fr_auto] items-center gap-6 px-6">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="justify-self-start"
          >
            <Link href="/" aria-label="HireSort — home" className="flex items-center gap-2.5 text-charcoal no-underline">
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                className="inline-flex"
              >
                <Image src="/logo.png" alt="" width={28} height={28} priority sizes="28px" />
              </motion.span>
              <span className="text-[19px] font-bold tracking-[-0.4px]">HireSort</span>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
            }}
            style={{ columnGap: '1.75rem' }}
            className="hidden items-center justify-center justify-self-center md:flex"
          >
            {navLinks.map((item) => {
              const active = isActiveTop(item, pathname);
              if (item.kind === 'mega') {
                const isOpen = activeMega === item.key;
                return (
                  <motion.div
                    key={item.key}
                    variants={linkItem}
                    initial="rest"
                    whileHover="hover"
                    onMouseEnter={() => openMega(item.key)}
                    onFocus={() => openMega(item.key)}
                    className="relative"
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setActiveMega(isOpen ? null : item.key)}
                      className={`inline-flex items-center gap-1 bg-transparent p-0 text-[14.5px] font-medium transition-colors hover:text-accent ${active ? 'text-accent' : 'text-charcoal-md'}`}
                    >
                      <motion.span variants={linkHover} className="inline-block">
                        {item.label}
                      </motion.span>
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>
                    {active && (
                      <span className="absolute -bottom-2 left-0 right-4 h-0.5 rounded-full bg-accent" aria-hidden="true" />
                    )}

                    <AnimatePresence>
                      {isOpen && (
                        <div
                          style={{ left: '50%', transform: 'translateX(-50%)' }}
                          className="fixed top-17 z-100 w-max max-w-[calc(100vw-2rem)] pt-3"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.18, ease }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                            className="flex w-fit gap-5 rounded-2xl border border-line-soft bg-ivory p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
                          >
                            <div
                              className="grid gap-5"
                              style={{ gridTemplateColumns: `repeat(${Math.min(item.config.groups.length, 4)}, minmax(13rem, 14rem))` }}
                            >
                              {item.config.groups.map((group) => (
                                <div key={group.title}>
                                  <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-md/70">
                                    {group.title}
                                  </div>
                                  <ul className="flex flex-col gap-0.5">
                                    {group.items.map((it) => {
                                      const itemActive = pathname === it.href || pathname.startsWith(it.href + '/');
                                      return (
                                        <li key={it.href}>
                                          <Link
                                            href={it.href}
                                            onClick={() => setActiveMega(null)}
                                            aria-current={itemActive ? 'page' : undefined}
                                            className={`group flex items-start gap-3 rounded-xl px-2 py-2 no-underline transition-colors ${itemActive ? 'bg-accent/8' : 'hover:bg-charcoal/5'}`}
                                          >
                                            <span className={`mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg border bg-ivory transition-colors ${itemActive ? 'border-accent/50 text-accent' : 'border-line-soft text-charcoal-md group-hover:border-accent/40 group-hover:text-accent'}`}>
                                              <Icon name={it.icon} />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                              <span className={`block truncate text-[13.5px] font-semibold transition-colors ${itemActive ? 'text-accent' : 'text-charcoal group-hover:text-accent'}`}>
                                                {it.label}
                                              </span>
                                              {it.description && (
                                                <span className="mt-0.5 block truncate text-[12px] leading-snug text-charcoal-md/80">
                                                  {it.description}
                                                </span>
                                              )}
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {item.config.featured && (
                              <Link
                                href={item.config.featured.href}
                                onClick={() => setActiveMega(null)}
                                className="flex w-56 flex-none flex-col justify-between rounded-xl bg-charcoal p-4 text-ivory no-underline shadow-soft transition-transform hover:-translate-y-0.5"
                              >
                                <div>
                                  <span className="mb-2 inline-block text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent">
                                    {item.config.featured.eyebrow}
                                  </span>
                                  <h4 className="text-[15px] font-bold leading-tight tracking-[-0.2px]">
                                    {item.config.featured.title}
                                  </h4>
                                  <p className="mt-2 text-[12.5px] leading-snug text-ivory/75">
                                    {item.config.featured.body}
                                  </p>
                                </div>
                                <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent">
                                  {item.config.featured.ctaLabel}
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </Link>
                            )}
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.href}
                  variants={linkItem}
                  initial="rest"
                  whileHover="hover"
                  onMouseEnter={scheduleClose}
                  className="relative"
                >
                  <Link href={item.href} className="no-underline">
                    <motion.span
                      variants={linkHover}
                      className={`inline-block text-[14.5px] font-medium transition-colors hover:text-accent ${active ? 'text-accent' : 'text-charcoal-md'}`}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-accent" aria-hidden="true" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex items-center gap-2 justify-self-end">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Link
                href={dashboardHref}
                className="inline-flex h-8 items-center rounded-full bg-charcoal px-4 text-[13px] font-semibold text-ivory no-underline transition-colors hover:bg-accent"
              >
                {isLoggedIn ? 'Dashboard' : 'Log in'}
              </Link>
            </motion.div>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm md:hidden"
              />
              <motion.aside
                key="drawer"
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.35, ease }}
                className="fixed right-0 top-0 z-50 flex h-dvh w-[78%] max-w-sm flex-col bg-ivory shadow-2xl md:hidden"
              >
                <div className="flex h-17 items-center justify-between border-b border-line-soft px-5">
                  <span className="text-[16px] font-bold tracking-[-0.3px] text-charcoal">Menu</span>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition-colors hover:bg-charcoal/5"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                  </button>
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                  {navLinks.map((item) => {
                    const active = isActiveTop(item, pathname);
                    if (item.kind === 'mega') {
                      const expanded = mobileExpanded === item.key;
                      return (
                        <div key={item.key}>
                          <button
                            type="button"
                            onClick={() => setMobileExpanded(expanded ? null : item.key)}
                            className={`flex w-full items-center justify-between rounded-lg bg-transparent px-4 py-3 text-left text-[15.5px] font-medium transition-colors hover:bg-charcoal/5 hover:text-accent ${active ? 'text-accent' : 'text-charcoal-md'}`}
                          >
                            {item.label}
                            <motion.svg
                              animate={{ rotate: expanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </motion.svg>
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col py-1 pl-3">
                                  {item.config.groups.map((group) => (
                                    <div key={group.title} className="mb-2 last:mb-0">
                                      <div className="px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-charcoal-md/60">
                                        {group.title}
                                      </div>
                                      <div className="flex flex-col gap-0.5">
                                        {group.items.map((sub) => {
                                          const subActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
                                          return (
                                            <Link
                                              key={sub.href}
                                              href={sub.href}
                                              onClick={() => setOpen(false)}
                                              aria-current={subActive ? 'page' : undefined}
                                              className={`block rounded-md px-4 py-2.5 text-[14px] no-underline transition-colors ${subActive ? 'bg-accent/8 text-accent' : 'text-charcoal-md hover:bg-charcoal/5 hover:text-accent'}`}
                                            >
                                              {sub.label}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    const isActive = active;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block rounded-lg px-4 py-3 text-[15.5px] font-medium no-underline transition-colors ${isActive ? 'bg-accent/8 text-accent' : 'text-charcoal-md hover:bg-charcoal/5 hover:text-accent'}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-[15.5px] font-medium text-charcoal-md no-underline transition-colors hover:bg-charcoal/5 hover:text-accent"
                  >
                    Contact
                  </Link>
                  <Link
                    href={dashboardHref}
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-charcoal px-5 text-[14.5px] font-semibold text-ivory no-underline transition-colors hover:bg-accent"
                  >
                    {isLoggedIn ? 'Dashboard' : 'Log in'}
                  </Link>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
