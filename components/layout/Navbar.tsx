'use client';

import Image from 'next/image';
import Link from 'next/link';
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
  | 'compare' | 'blog' | 'about' | 'mail' | 'doc';

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
  }
};

type MegaItem = { href: string; label: string; description?: string; icon: IconKey };
type MegaGroup = { title: string; items: MegaItem[] };

const productMega: MegaGroup[] = [
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
];

const resourcesMega: MegaGroup[] = [
  {
    title: 'Learn',
    items: [
      { href: '/blog', label: 'Blog', description: 'Hiring insights & guides', icon: 'blog' },
      { href: '/about', label: 'About', description: 'Our mission & team', icon: 'about' },
      { href: '/contact', label: 'Contact', description: 'Talk to our team', icon: 'mail' },
    ],
  },
  {
    title: 'Compare',
    items: [
      { href: '/resources/compare/workable-alternative', label: 'Workable Alternative', description: 'How HireSort compares', icon: 'compare' },
    ],
  },
];

type NavEntry =
  | { kind: 'link'; href: string; label: string; internal?: boolean }
  | { kind: 'mega'; key: string; label: string; groups: MegaGroup[] };

const navLinks: NavEntry[] = [
  { kind: 'link', href: '/#how', label: 'How it works' },
  { kind: 'link', href: '/#features', label: 'Features' },
  { kind: 'mega', key: 'product', label: 'Product', groups: productMega },
  { kind: 'mega', key: 'resources', label: 'Resources', groups: resourcesMega },
  { kind: 'link', href: '/pricing', label: 'Pricing',internal: true },
  { kind: 'link', href: '/contact', label: 'Contact', internal: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
              <Image
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                priority
                sizes="28px"
              />
            </motion.span>
            <span className="text-[19px] font-bold tracking-[-0.4px]">HireSort</span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
          }}
          className="hidden items-center justify-center gap-8 justify-self-center md:flex"
        >
          {navLinks.map((item) => {
            if (item.kind === 'mega') {
              const isActive = activeMega === item.key;
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
                    aria-expanded={isActive}
                    onClick={() => setActiveMega(isActive ? null : item.key)}
                    className="inline-flex items-center gap-1 bg-transparent p-0 text-[14.5px] font-medium text-charcoal-md transition-colors hover:text-accent"
                  >
                    <motion.span variants={linkHover} className="inline-block">
                      {item.label}
                    </motion.span>
                    <motion.svg
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        className="absolute left-0 top-full z-100 pt-3"
                      >
                        <div
                          className="grid gap-6 rounded-2xl border border-line-soft bg-ivory p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
                          style={{ gridTemplateColumns: `repeat(${item.groups.length}, minmax(15rem, 1fr))` }}
                        >
                          {item.groups.map((group) => (
                            <div key={group.title}>
                              <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-md/70">
                                {group.title}
                              </div>
                              <ul className="flex flex-col gap-0.5">
                                {group.items.map((it) => (
                                  <li key={it.href}>
                                    <Link
                                      href={it.href}
                                      onClick={() => setActiveMega(null)}
                                      className="group flex items-start gap-3 rounded-xl px-2 py-2 no-underline transition-colors hover:bg-charcoal/5"
                                    >
                                      <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line-soft bg-ivory text-charcoal-md transition-colors group-hover:border-accent/40 group-hover:text-accent">
                                        <Icon name={it.icon} />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-[14px] font-semibold text-charcoal transition-colors group-hover:text-accent">
                                          {it.label}
                                        </span>
                                        {it.description && (
                                          <span className="mt-0.5 block text-[12.5px] leading-snug text-charcoal-md/80">
                                            {it.description}
                                          </span>
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            const Inner = (
              <motion.span
                variants={linkHover}
                className="inline-block text-[14.5px] font-medium text-charcoal-md transition-colors hover:text-accent"
              >
                {item.label}
              </motion.span>
            );

            return (
              <motion.div
                key={item.href}
                variants={linkItem}
                initial="rest"
                whileHover="hover"
                onMouseEnter={scheduleClose}
              >
                {item.internal ? (
                  <Link href={item.href} className="no-underline">{Inner}</Link>
                ) : (
                  <a href={item.href} className="no-underline">{Inner}</a>
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
              href={main_app_url+'/login'}
              className="inline-flex h-8 items-center rounded-full bg-charcoal px-4 text-[13px] font-semibold text-ivory no-underline transition-colors hover:bg-accent"
            >
              Log in
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
                  const cls = 'block rounded-lg px-4 py-3 text-[15.5px] font-medium text-charcoal-md no-underline transition-colors hover:bg-charcoal/5 hover:text-accent';
                  if (item.kind === 'mega') {
                    const expanded = mobileExpanded === item.key;
                    return (
                      <div key={item.key}>
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(expanded ? null : item.key)}
                          className="flex w-full items-center justify-between rounded-lg bg-transparent px-4 py-3 text-left text-[15.5px] font-medium text-charcoal-md transition-colors hover:bg-charcoal/5 hover:text-accent"
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
                              <div className="flex flex-col gap-0.5 py-1 pl-3">
                                {item.groups.flatMap((g) => g.items).map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-4 py-2.5 text-[14px] text-charcoal-md no-underline transition-colors hover:bg-charcoal/5 hover:text-accent"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return item.internal ? (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls}>
                      {item.label}
                    </Link>
                  ) : (
                    <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls}>
                      {item.label}
                    </a>
                  );
                })}
                <Link
                  href={main_app_url+'/login'}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-charcoal px-5 text-[14.5px] font-semibold text-ivory no-underline transition-colors hover:bg-accent"
                >
                  Log in
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
