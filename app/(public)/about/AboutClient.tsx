'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Telescope,
  Target,
  ShieldCheck,
  Users,
  ArrowRight,
} from 'lucide-react';
import { PageHero, pageEase, pageFadeUp, pageStagger } from '@/components/layout/PageHero';
import { trackCTAClick } from '@/lib/google_analytics_tracker';
import   redirectURL from '@/lib/mainsSiteRedirectUrl';

const callouts = [
  { num: '01', label: 'AI-powered analysis', sub: 'Structured scoring, not keyword matching.' },
  { num: '02', label: 'Bulk screening', sub: 'From 50 candidates to 50,000, in one flow.' },
  { num: '03', label: 'Recruiter-friendly', sub: 'Built around how hiring teams actually work.' },
];

const values = [
  {
    icon: <Target size={18} strokeWidth={2.2} />,
    title: 'Precision over keywords',
    desc: "We look at skills, evidence, and context — not whether a resume happens to contain the right buzzword.",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={2.2} />,
    title: 'Consistency, by design',
    desc: 'Structured rubrics ensure every candidate is evaluated against the same criteria, in the same way.',
  },
  {
    icon: <Users size={18} strokeWidth={2.2} />,
    title: 'Human judgment, amplified',
    desc: "Our platform supports recruiters — it doesn't replace them. Final decisions always belong to humans.",
  },
];

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

const AboutClient = () => {
  return (
    <>
      <PageHero
        icon={<Sparkles size={13} strokeWidth={2.5} />}
        eyebrow="About HireSort"
        title={
          <>
            Built for hiring teams that want{' '}
            <span className="text-accent">speed, structure, and clarity.</span>
          </>
        }
        lead={
          <>
            Hiring teams today deal with too many resumes, too little time, and highly inconsistent
            first-pass screening. We built our platform to fix that — so every screening cycle is
            faster, fairer, and easier to operate.
          </>
        }
      />

      {/* Narrative */}
      <section className="mx-auto max-w-300 px-6 pt-8 pb-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageStagger}
          className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div variants={pageFadeUp}>
            <span className={sectionLabel}>Who we are</span>
            <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
              Helping companies evaluate candidates faster — without sacrificing quality.
            </h2>
          </motion.div>

          <motion.div variants={pageFadeUp} className="flex flex-col gap-4 text-[15px] leading-[1.75] text-charcoal-md">
            <p>
              Our goal is simple: help companies evaluate candidates faster without sacrificing
              quality. With AI-powered resume analysis, customizable scoring rubrics, bulk
              screening, and recruiter-friendly workflows, we enable teams to process applications
              at scale while staying aligned to the role they are hiring for.
            </p>
            <p>
              We are focused on making hiring workflows more efficient, more standardized, and
              easier to operate for growing teams. Whether you are screening{' '}
              <strong className="font-semibold text-charcoal">
                50 candidates or 50,000
              </strong>
              , our platform helps you reduce manual effort, improve consistency, and reach better
              shortlists faster.
            </p>
            <p>
              We are building for modern hiring teams that want speed, structure, and better
              decision support in every screening cycle.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {callouts.map((c) => (
                <div
                  key={c.num}
                  className="rounded-lg border border-line-soft bg-white p-4 shadow-soft"
                >
                  <div className="font-mono text-[13px] font-bold text-accent">{c.num}</div>
                  <div className="mt-1 text-[14px] font-semibold text-charcoal">{c.label}</div>
                  <div className="mt-1 text-[12.5px] leading-snug text-charcoal-lt">{c.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageStagger}
          className="mx-auto grid max-w-275 gap-6 md:grid-cols-2"
        >
          {[
            {
              icon: <Compass size={20} strokeWidth={2.2} />,
              kicker: 'Our Mission',
              heading:
                'Screen candidates faster, more consistently, and with greater confidence.',
              body: 'To help hiring teams move through first-pass review without burning hours per role — while keeping evaluation aligned, auditable, and grounded in the criteria that actually matter for the job.',
            },
            {
              icon: <Telescope size={20} strokeWidth={2.2} />,
              kicker: 'Our Vision',
              heading: 'First-round hiring that is structured, explainable, and scalable.',
              body: 'A future where first-round hiring decisions are not dependent on recruiter bandwidth alone — where every team, regardless of size, can run a rigorous, fair, and repeatable screening process.',
            },
          ].map((card) => (
            <motion.div
              key={card.kicker}
              variants={pageFadeUp}
              className="rounded-xl border border-line-soft bg-white p-8 shadow-card"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.12)] text-accent">
                {card.icon}
              </div>
              <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[1px] text-charcoal-xlt">
                {card.kicker}
              </h3>
              <h2 className="mb-3 text-[22px] font-extrabold leading-tight tracking-[-0.5px] text-charcoal">
                {card.heading}
              </h2>
              <p className="text-[14.5px] leading-[1.7] text-charcoal-lt">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-275 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={pageStagger}
          className="mx-auto mb-10 max-w-160 text-center"
        >
          <motion.span variants={pageFadeUp} className={sectionLabel}>
            What we believe
          </motion.span>
          <motion.h2
            variants={pageFadeUp}
            className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
          >
            The principles that shape every screening on HireSort.
          </motion.h2>
          <motion.p variants={pageFadeUp} className="text-[15px] leading-[1.65] text-charcoal-lt">
            These aren&apos;t marketing lines — they&apos;re the design constraints we apply to
            every feature we ship.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageStagger}
          className="grid gap-5 md:grid-cols-3"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={pageFadeUp}
              className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ivory-medium text-charcoal">
                {v.icon}
              </div>
              <h3 className="mb-2 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
                {v.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-charcoal-lt">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-250 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: pageEase }}
          className="relative overflow-hidden rounded-2xl border border-line-soft bg-linear-to-br from-ivory-light via-white to-ivory-light p-10 text-center shadow-md md:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-30 -right-30 z-0 h-80 w-80 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(200, 90, 23, 0.18) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(200,90,23,0.18)] bg-[rgba(200,90,23,0.08)] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.6px] text-accent">
              <Sparkles size={13} strokeWidth={2.5} />
              Ready when you are
            </span>
            <h2 className="my-4 text-[clamp(26px,4vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              Bring structure to your next screening cycle.
            </h2>
            <p className="mx-auto mb-6 max-w-150 text-[15px] leading-[1.65] text-charcoal-lt">
              See how HireSort can help your team process applications at scale while staying
              aligned to the role you are hiring for.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={redirectURL}
                onClick={() => trackCTAClick('get_started', 'about_bottom_cta')}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
              >
                Get Started
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <Link
                href="/faqs"
                onClick={() => trackCTAClick('browse_faqs', 'about_bottom_cta')}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
              >
                Browse FAQs
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutClient;
