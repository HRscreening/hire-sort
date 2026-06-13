'use client';

import { ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { trackCTAClick } from '@/lib/google_analytics_tracker';
import redirectURL from '@/lib/mainsSiteRedirectUrl';
import Image from 'next/image';

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
      className="mx-auto w-full px-10 md:px-30 pt-20 pb-30 text-center flex md:flex-row justify-between items-center gap-10"
    >
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start">


        <motion.h2
          variants={item}
          className="mb-5 text-left text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.12] tracking-[-1.5px] text-charcoal"
        >
          Stop reading resumes.
          <br />
          Start <span className="text-accent">finding talent</span>.
        </motion.h2>
        <motion.p variants={item} className="text-left mb-9 text-[17px] leading-[1.6] text-charcoal-lt">
          Upload your first batch and see ranked results in under 90 seconds. Free to start, no credit card required.
        </motion.p>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 360, damping: 18 }}
          className='flex flex-row justify-start'
        >
          <a
            href={redirectURL}
            onClick={() => trackCTAClick('get_started', 'bottom_cta')}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-8 py-3.5 text-[15px] font-semibold leading-none text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] no-underline transition-colors hover:bg-copper-dark"
          >
            Screen resumes for free
            <motion.span whileHover={{ x: 4 }} className="inline-flex">
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.span>
          </a>
        </motion.div>
      </div>
      <motion.div variants={item} className="mb-12">
        <img
          src="/appScreenshots/12_Resume ranked list.png"
          alt="Ranked candidates list showing top applicants scored by technical skills, experience, and qualifications"
          className="mx-auto w-full max-w-2xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]"
        />
      </motion.div>
    </motion.section>
  );
};

export default CTA;
