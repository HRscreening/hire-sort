'use client';

import { ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { trackCTAClick } from '@/lib/google_analytics_tracker';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const CTA = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
      className="mx-auto max-w-175 px-6 pt-20 pb-30 text-center"
    >
      <motion.h2
        variants={item}
        className="mb-5 text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.12] tracking-[-1.5px] text-charcoal"
      >
        Stop reading resumes.
        <br />
        Start <span className="text-accent">finding talent</span>.
      </motion.h2>
      <motion.p variants={item} className="mb-9 text-[17px] leading-[1.6] text-charcoal-lt">
        Upload your first batch and see ranked results in under 90 seconds. Free to start, no credit card required.
      </motion.p>
      <motion.a
        href="#"
        onClick={() => trackCTAClick('get_started', 'bottom_cta')}
        variants={item}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 18 }}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-8 py-3.5 text-[15px] font-semibold leading-none text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] no-underline transition-colors hover:bg-copper-dark"
      >
        Get started
        <motion.span whileHover={{ x: 4 }} className="inline-flex">
          <ArrowRight size={16} strokeWidth={2.5} />
        </motion.span>
      </motion.a>
    </motion.section>
  );
};

export default CTA;
