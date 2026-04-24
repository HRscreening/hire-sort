'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      </div>
    </motion.nav>
  );
};

export default Navbar;
