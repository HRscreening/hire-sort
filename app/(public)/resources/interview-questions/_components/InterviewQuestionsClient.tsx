'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  PageHero,
  pageFadeUp,
  pageStagger,
} from '@/components/layout/PageHero';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import type { InterviewQuestionsPage } from '../_data/types';

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

type Props = { data: InterviewQuestionsPage };

const InterviewQuestionsClient = ({ data }: Props) => {
  const [openFaq, setOpenFaq] = useState<string | null>(data.faqs[0]?.id ?? null);
  const heroSlot = `iq_${data.slug}_hero`;
  const ctaSlot = `iq_${data.slug}_bottom_cta`;

  const toggleFaq = (id: string) => {
    setOpenFaq((curr) => {
      const next = curr === id ? null : id;
      if (next) {
        const item = data.faqs.find((f) => f.id === id);
        trackEvent('faq_open', { faq_id: id, question: item?.question ?? '' });
      }
      return next;
    });
  };

  return (
    <>
      <PageHero
        icon={<MessageSquare size={13} strokeWidth={2.5} />}
        eyebrow={data.hero.eyebrow}
        title={
          <>
            {data.hero.titlePrefix}
            <span className="text-accent">{data.hero.titleAccent}</span>
            {data.hero.titleSuffix ?? ''}
          </>
        }
        lead={
          <>
            {data.hero.lead.map((p, i) => (
              <span key={i} className="block not-first:mt-3">
                {p}
              </span>
            ))}
          </>
        }
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={data.hero.primaryCta.href}
            onClick={() => trackCTAClick('primary_cta', heroSlot)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            {data.hero.primaryCta.label}
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <a
            href={data.hero.secondaryCta.href}
            onClick={() => trackCTAClick('secondary_cta', heroSlot)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
          >
            {data.hero.secondaryCta.label}
          </a>
        </div>
      </PageHero>

      {/* What to evaluate */}
      <section className="mx-auto max-w-300 px-6 pt-8 pb-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={pageStagger}
          className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div variants={pageFadeUp}>
            <span className={sectionLabel}>Evaluation areas</span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              {data.whatToEvaluate.title}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              {data.whatToEvaluate.intro}
            </p>
          </motion.div>
          <motion.ul
            variants={pageFadeUp}
            className="grid list-none gap-2 p-0 sm:grid-cols-2"
          >
            {data.whatToEvaluate.items.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 rounded-md border border-line-soft bg-white px-3 py-2 text-[13.5px] text-charcoal-md shadow-soft"
              >
                <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* Question groups */}
      <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="mx-auto max-w-300"
        >
          <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-180 text-center">
            <span className={sectionLabel}>Question set</span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              Recommended interview question set
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.questionGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={pageFadeUp}
                className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
              >
                <h3 className="mb-4 text-[18px] font-bold leading-[1.3] tracking-[-0.3px] text-charcoal">
                  {group.title}
                </h3>
                <ol className="flex list-none flex-col gap-3 p-0">
                  {group.questions.map((q, i) => (
                    <li key={q} className="flex items-start gap-3">
                      <span className="font-mono text-[12px] font-bold text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] leading-[1.65] text-charcoal-md">{q}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Strong answers + Red flags */}
      <section className="mx-auto max-w-300 px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={pageFadeUp}
            className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
          >
            <span className={sectionLabel}>Listen for</span>
            <h3 className="mb-4 text-[20px] font-bold leading-[1.3] tracking-[-0.4px] text-charcoal">
              {data.strongAnswers.title}
            </h3>
            <ul className="flex list-none flex-col gap-2 p-0">
              {data.strongAnswers.items.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-[14px] leading-[1.65] text-charcoal-md"
                >
                  <CheckCircle2 size={14} strokeWidth={2.4} className="mt-1 shrink-0 text-accent" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={pageFadeUp}
            className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
          >
            <span className={sectionLabel}>Watch out</span>
            <h3 className="mb-4 text-[20px] font-bold leading-[1.3] tracking-[-0.4px] text-charcoal">
              {data.redFlags.title}
            </h3>
            <ul className="flex list-none flex-col gap-2 p-0">
              {data.redFlags.items.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2 text-[14px] leading-[1.65] text-charcoal-md"
                >
                  <AlertTriangle size={14} strokeWidth={2.4} className="mt-1 shrink-0 text-copper" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Scorecard */}
      <section className="bg-linear-to-b from-ivory-medium to-ivory px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={pageStagger}
          className="mx-auto max-w-300"
        >
          <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-180 text-center">
            <span className={sectionLabel}>Scorecard</span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              {data.scorecard.title}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              {data.scorecard.intro}
            </p>
          </motion.div>

          <motion.div
            variants={pageFadeUp}
            className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card"
          >
            <table className="w-full min-w-180 border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-soft bg-ivory-light">
                  <th className="px-5 py-3 font-bold text-charcoal">Evaluation area</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Suggested weight</th>
                  <th className="px-5 py-3 font-bold text-charcoal">What to assess</th>
                </tr>
              </thead>
              <tbody>
                {data.scorecard.rows.map((row, i) => (
                  <tr
                    key={row.area}
                    className={
                      i % 2 === 0
                        ? 'border-b border-line-soft'
                        : 'border-b border-line-soft bg-ivory-light/40'
                    }
                  >
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.area}</td>
                    <td className="px-5 py-3 font-mono text-accent">{row.weight}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.whatToAssess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {/* How to run + How HireSort helps */}
      <section className="mx-auto max-w-300 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="grid gap-10 md:grid-cols-2"
        >
          <motion.div variants={pageFadeUp}>
            <span className={sectionLabel}>Process</span>
            <h2 className="mb-4 text-[clamp(22px,2.8vw,28px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-charcoal">
              {data.howToRun.title}
            </h2>
            <ol className="flex list-none flex-col gap-3 p-0">
              {data.howToRun.items.map((p, i) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-line-soft bg-white px-4 py-3 shadow-soft"
                >
                  <span className="font-mono text-[12px] font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] leading-[1.65] text-charcoal-md">{p}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div variants={pageFadeUp}>
            <span className={sectionLabel}>With HireSort</span>
            <h2 className="mb-4 text-[clamp(22px,2.8vw,28px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-charcoal">
              {data.howHireSortHelps.title}
            </h2>
            <div className="flex flex-col gap-3">
              {data.howHireSortHelps.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-charcoal-lt">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
            {data.cta.eyebrow}
          </span>
          <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
            {data.cta.title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[15.5px] leading-[1.7] text-white/80">
            {data.cta.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={data.cta.primary.href}
              onClick={() => trackCTAClick('primary_cta', ctaSlot)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
            >
              {data.cta.primary.label}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            <a
              href={data.cta.secondary.href}
              onClick={() => trackCTAClick('secondary_cta', ctaSlot)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-white/10"
            >
              {data.cta.secondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-300 px-6 py-20">
        <div className="mx-auto mb-10 max-w-180 text-center">
          <span className={sectionLabel}>FAQ</span>
          <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
            Frequently asked questions
          </h2>
        </div>
        <ul className="mx-auto flex max-w-3xl list-none flex-col gap-3 p-0">
          {data.faqs.map((f) => {
            const isOpen = openFaq === f.id;
            return (
              <li
                key={f.id}
                className="overflow-hidden rounded-xl border border-line-soft bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(f.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-charcoal"
                  aria-expanded={isOpen}
                >
                  <span>{f.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-charcoal-lt transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-line-soft px-5 py-4 text-[14.5px] leading-[1.7] text-charcoal-md">
                    {f.answer.map((a, i) => (
                      <p key={i} className={i > 0 ? 'mt-3' : ''}>
                        {a}
                      </p>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Internal links */}
      {data.internalLinks.length > 0 && (
        <section className="bg-ivory-light px-6 py-16">
          <div className="mx-auto max-w-300">
            <span className={sectionLabel}>Related reading</span>
            <h2 className="mb-6 text-[clamp(20px,2.6vw,26px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-charcoal">
              Continue exploring
            </h2>
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {data.internalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 rounded-md border border-line-soft bg-white px-4 py-3 text-[14px] font-semibold text-charcoal no-underline transition hover:border-accent hover:text-accent"
                  >
                    <span>{l.label}</span>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-charcoal-lt transition group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default InterviewQuestionsClient;
