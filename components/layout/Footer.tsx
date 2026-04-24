'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const col: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

type FooterLink = { label: string; to?: string; href?: string };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'Pricing', to: '/#pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blogs', to: '/blog' },
      { label: 'FAQs', to: '/faqs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={grid}
      className="mx-auto max-w-300 border-t border-line px-6 pt-12 pb-16"
    >
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[2fr_repeat(4,1fr)]">
        <motion.div variants={col}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mb-1">
            <Link
              href="/"
              aria-label="HireSort — home"
              className="flex items-center gap-2.5 text-charcoal no-underline"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                className="inline-flex"
              >
                <Image src="/logo.png" alt="" width={28} height={28} sizes="28px" />
              </motion.span>
              <span className="text-[19px] font-bold tracking-[-0.4px]">HireSort</span>
            </Link>
          </motion.div>
          <p className="mt-3 max-w-65 text-[13.5px] leading-[1.6] text-charcoal-lt">
            AI-powered resume screening that explains its reasoning. Built for hiring teams who value transparency.
          </p>
        </motion.div>

        {columns.map((c) => (
          <motion.div key={c.title} variants={col} className="flex flex-col">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-charcoal-xlt">
              {c.title}
            </h4>
            {c.links.map((l) => {
              const className =
                'block py-1 text-[14px] text-charcoal-md no-underline transition-colors hover:text-charcoal';
              return l.to ? (
                <motion.div
                  key={l.label}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                >
                  <Link href={l.to} className={className}>
                    {l.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={l.label}
                  href={l.href ?? '#'}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                  className={className}
                >
                  {l.label}
                </motion.a>
              );
            })}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
        className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line-soft pt-6 text-center text-[13px] text-charcoal-xlt sm:flex-row sm:text-left"
      >
        <span>© 2026 HireSort. All rights reserved.</span>
        <span>Made with care for hiring teams everywhere.</span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
