'use client';

import { Check, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { trackCTAClick } from '@/lib/google_analytics_tracker';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const floatEnter = (x: number, y: number, delay: number): Variants => ({
  hidden: { opacity: 0, x, y, scale: 0.92 },
  show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.6, ease, delay } },
});

const floatCardClass =
  'pointer-events-auto w-55 rounded-lg border border-line-soft bg-white p-[16px_18px] shadow-lg';
const floatLabelClass =
  'mb-2.5 text-[10px] font-bold uppercase tracking-[1px] text-charcoal-xlt';

const Hero = () => {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="relative mx-auto max-w-350 overflow-visible px-6 pt-20 pb-15 text-center"
    >
      {/* Grid background with radial fade */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="pointer-events-none absolute inset-y-[-40px] left-1/2 z-0 w-screen -translate-x-1/2"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(200,180,160,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,180,160,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 35%, black 20%, transparent 75%)',
        }}
      />

      {/* Floating left: resume snippet card */}
      <motion.div
        variants={floatEnter(-32, 16, 0.25)}
        className="pointer-events-none absolute left-0 top-27.5 z-2 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          whileHover={{ scale: 1.04, rotate: -1, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
        >
          <div className={floatCardClass}>
            <div className={floatLabelClass}>Resume Detected</div>
            <div className="flex flex-col gap-1.5">
              {[
                { cls: 'h-2.5 w-[55%] rounded bg-charcoal mb-0.5' },
                { cls: 'h-[7px] w-[70%] rounded-[3px] bg-charcoal-xlt opacity-60 mb-1.5' },
                { cls: 'h-1.5 w-[90%] rounded-[3px] bg-ivory-medium' },
                { cls: 'h-1.5 w-[80%] rounded-[3px] bg-ivory-medium' },
                { cls: 'h-1.5 w-[65%] rounded-[3px] bg-ivory-medium' },
                { cls: 'h-1.5 w-[90%] rounded-[3px] bg-ivory-medium' },
                { cls: 'h-1.5 w-[50%] rounded-[3px] bg-ivory-medium' },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  className={line.cls}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.35, ease }}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {['Python', 'AWS', 'React', 'SQL'].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.05, duration: 0.3, ease }}
                  className="rounded-full border border-line bg-ivory-medium px-2 py-[3px] text-[9px] font-semibold text-charcoal-md"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating right: score card */}
      <motion.div
        variants={floatEnter(32, 16, 0.3)}
        className="pointer-events-none absolute right-0 top-27.5 z-2 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          whileHover={{ scale: 1.04, rotate: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
        >
          <div className={floatCardClass}>
            <div className={floatLabelClass}>Top Candidate</div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#E8D5C0] to-[#D4B896] text-[11px] font-bold text-charcoal-md">
                SC
              </div>
              <div className="text-left">
                <div className="text-[13px] font-semibold">Sarah Chen</div>
                <div className="text-[11px] text-charcoal-lt">Sr. Backend Engineer</div>
              </div>
            </div>
            <div className="mb-2.5 flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="h-12 w-12 overflow-visible">
                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-ivory-medium)" strokeWidth="5" />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="var(--color-success)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.92 }}
                  transition={{ delay: 0.5, duration: 1.5, ease }}
                />
              </svg>
              <div className="text-left">
                <span className="font-mono text-[22px] font-extrabold text-success">92%</span>
                <div className="text-[11px] text-charcoal-lt">Match Score</div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.35, ease }}
              className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-[10px] font-bold text-success before:h-[5px] before:w-[5px] before:rounded-full before:bg-success before:content-['']"
            >
              Best Fit
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating bottom-left: stat */}
      <motion.div
        variants={floatEnter(-24, 24, 0.4)}
        className="pointer-events-none absolute left-5 top-75 z-2 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="pointer-events-auto rounded-md border border-line-soft bg-white px-[18px] py-3.5 text-left shadow-md">
            <div className="font-mono text-2xl font-extrabold leading-none text-charcoal">2.4s</div>
            <div className="mt-0.5 text-[11px] text-charcoal-lt">Avg. per resume</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating bottom-right: notification */}
      <motion.div
        variants={floatEnter(24, 24, 0.45)}
        className="pointer-events-none absolute right-5 top-80 z-3 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-md border border-line-soft bg-white px-4 py-3 shadow-md">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 14 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-copper to-copper-light text-white"
            >
              <Check size={16} strokeWidth={2.5} />
            </motion.div>
            <div className="text-left">
              <div className="text-xs font-semibold text-charcoal">47 resumes ranked</div>
              <div className="text-[11px] font-normal text-charcoal-lt">Completed just now</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Badge */}
      <motion.div
        variants={itemUp}
        className="relative z-3 mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(200,90,23,0.12)] bg-[rgba(0,0,0,0.05)] px-4 py-1.5 text-[13px] font-semibold text-copper"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[7px] w-[7px] rounded-full bg-copper"
        />
        AI-powered resume screening
      </motion.div>

      <motion.h1
        variants={itemUp}
        className="relative z-3 mx-auto mb-5 max-w-180 text-[clamp(36px,5.5vw,58px)] font-extrabold leading-[1.12] tracking-[-1.5px] text-charcoal"
      >
        Screen resumes in <span className="text-accent">seconds</span>, not hours
      </motion.h1>

      <motion.p
        variants={itemUp}
        className="relative z-3 mx-auto mb-12 max-w-130 text-[clamp(16px,2vw,19px)] leading-[1.6] text-charcoal-lt"
      >
        Upload resumes, describe the role, and let AI rank your candidates with explainable scores. No more manual screening.
      </motion.p>

      <motion.div
        variants={itemUp}
        className="relative z-3 mx-auto mt-14 w-full max-w-4xl overflow-hidden rounded-xl border border-line-soft bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      >
        <video
          src="/demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          className="pointer-events-none block aspect-video h-auto w-full object-cover"
          style={{ filter: 'brightness(1)' }}
        />
      </motion.div>

      <motion.div variants={itemUp} className="relative z-3 mt-9 flex flex-col items-center gap-3.5">
        <motion.a
          href="#"
          onClick={() => trackCTAClick('get_started', 'hero')}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 360, damping: 18 }}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-8 py-3.5 text-[15px] font-semibold leading-none text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] no-underline transition-colors hover:bg-copper-dark"
        >
          Get Started
          <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} className="inline-flex">
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.span>
        </motion.a>
      </motion.div>

    </motion.section>
  );
};

export default Hero;
