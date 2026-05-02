'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const linkHover = {
  rest: { y: 0 },
  hover: { y: -2, transition: { type: 'spring' as const, stiffness: 400, damping: 18 } },
};

const linkItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const navLinks = [
  { href: '/#how', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/about', label: 'About', internal: true },
  { href: '/blog', label: 'Blog', internal: true },
  { href: '/contact', label: 'Contact Us', internal: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className="sticky top-0 z-50 border-b border-line-soft bg-ivory/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-17 max-w-300 items-center justify-between px-6">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
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
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((item) => {
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
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
