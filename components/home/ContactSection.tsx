'use client';

import Link from 'next/link';
import { Mail, ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
};
const leftStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const floatCardClass =
  'absolute flex items-center gap-3 min-w-55 rounded-md border border-line-soft bg-white px-4 py-3 shadow-md';

const ContactSection = () => {
  return (
    <section id="contact" className="mx-auto max-w-287.5 px-6 pt-20 pb-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={cardVariants}
        className="relative grid items-center gap-10 overflow-hidden rounded-2xl border border-line-soft bg-linear-to-br from-ivory-light via-white to-ivory-light p-8 shadow-md md:grid-cols-[1.1fr_1fr] md:p-14"
      >
        {/* Glow */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-35 -right-35 z-0 h-90 w-90 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(200, 90, 23, 0.18) 0%, transparent 70%)',
          }}
        />

        <motion.div variants={leftStagger} className="relative z-1">
          <motion.div
            variants={item}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(200,90,23,0.18)] bg-[rgba(200,90,23,0.09)] px-3.5 py-1 text-xs font-semibold tracking-[0.2px] text-accent"
          >
            <Mail size={13} strokeWidth={2.5} />
            <span>Get in touch</span>
          </motion.div>
          <motion.h2
            variants={item}
            className="mb-4 text-[clamp(28px,3.6vw,38px)] font-extrabold leading-[1.15] tracking-[-1.2px] text-charcoal"
          >
            Have a question? <span className="text-accent">Let&apos;s talk.</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mb-7 max-w-130 text-[15px] leading-[1.65] text-charcoal-lt"
          >
            Need custom workflows, enterprise pricing, or guidance on rolling out HireSort
            across your team? Our team responds within one business day &mdash; no forms, no
            runaround, just straightforward answers from the people who build the product.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-8 py-3.5 text-[15px] font-semibold leading-none text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] no-underline transition-colors hover:bg-copper-dark"
            >
              <motion.span
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-1.5"
              >
                Contact us
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.span>
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-charcoal-lt">
              <Clock size={13} strokeWidth={2.5} className="text-charcoal-xlt" />
              Typical response in under 24 hours
            </span>
          </motion.div>
        </motion.div>

        {/* Floating cards */}
        <div aria-hidden className="relative z-1 hidden h-60 sm:block">
          {[
            { pos: 'top-0 left-0', icon: <MessageCircle size={14} strokeWidth={2.5} />, title: 'Custom workflows', sub: 'Tailored to your ATS', accent: false, delay: 0.3, yLoop: [0, -8, 0], dur: 5.5 },
            { pos: 'top-1/2 right-0 -translate-y-1/2', icon: <Mail size={14} strokeWidth={2.5} />, title: 'Enterprise pricing', sub: 'Built for scale', accent: true, delay: 0.45, yLoop: [0, 8, 0], dur: 6.5 },
            { pos: 'bottom-0 left-5', icon: <Clock size={14} strokeWidth={2.5} />, title: 'Onboarding support', sub: 'Humans, not bots', accent: false, delay: 0.6, yLoop: [0, -6, 0], dur: 5 },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: c.yLoop,
                transition: {
                  opacity: { delay: c.delay, duration: 0.6, ease },
                  scale: { delay: c.delay, duration: 0.6, ease },
                  y: { delay: c.delay + 0.6, duration: c.dur, repeat: Infinity, ease: 'easeInOut' },
                },
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 280, damping: 16 } }}
              className={`${floatCardClass} ${c.pos}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  c.accent ? 'bg-[rgba(200,90,23,0.12)] text-accent' : 'bg-ivory-medium text-charcoal'
                }`}
              >
                {c.icon}
              </div>
              <div>
                <div className="text-[13px] font-semibold leading-tight text-charcoal">{c.title}</div>
                <div className="mt-0.5 text-[11.5px] text-charcoal-lt">{c.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
