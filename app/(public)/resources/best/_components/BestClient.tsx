'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Award, CheckCircle2 } from 'lucide-react';
import {
  PageHero,
  pageFadeUp,
  pageStagger,
} from '@/components/layout/PageHero';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import type { BestPage } from '../_data/types';

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

type Props = { data: BestPage };

const BestClient = ({ data }: Props) => {
  const [openFaq, setOpenFaq] = useState<string | null>(data.faqs[0]?.id ?? null);
  const heroSlot = `best_${data.slug}_hero`;
  const ctaSlot = `best_${data.slug}_bottom_cta`;
  const heroPrimaryCta = data.hero.primaryCta ?? {
    label: 'Get Started with HireSort',
    href: 'https://app.hiresort.ai/login',
  };
  const heroSecondaryCta = data.hero.secondaryCta ?? null;
  const bottomPrimaryCta = data.cta.primary ?? heroPrimaryCta;
  const bottomSecondaryCta = data.cta.secondary ?? null;

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
        icon={<Award size={13} strokeWidth={2.5} />}
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
            href={heroPrimaryCta.href}
            onClick={() => trackCTAClick('primary_cta', heroSlot)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            {heroPrimaryCta.label}
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          {heroSecondaryCta ? (
            <a
              href={heroSecondaryCta.href}
              onClick={() => trackCTAClick('secondary_cta', heroSlot)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
            >
              {heroSecondaryCta.label}
            </a>
          ) : null}
        </div>
        {data.hero.supporting && (
          <p className="mx-auto mt-6 max-w-160 text-[14px] leading-[1.65] text-charcoal-lt">
            {data.hero.supporting}
          </p>
        )}
      </PageHero>

      {data.whatToLookFor && (
        <section className="mx-auto max-w-300 px-6 pt-8 pb-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={pageStagger}
            className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"
          >
            <motion.div variants={pageFadeUp}>
              {data.whatToLookFor.eyebrow && (
                <span className={sectionLabel}>{data.whatToLookFor.eyebrow}</span>
              )}
              <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
                {data.whatToLookFor.title}
              </h2>
              {data.whatToLookFor.intro && (
                <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
                  {data.whatToLookFor.intro}
                </p>
              )}
            </motion.div>
            <motion.ul
              variants={pageFadeUp}
              className="grid list-none gap-2 p-0 sm:grid-cols-2"
            >
              {data.whatToLookFor.items.map((p) => (
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
      )}

      <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={pageStagger}
          className="mx-auto max-w-300"
        >
          <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-180 text-center">
            <span className={sectionLabel}>Tools to consider</span>
            <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              {data.toolsTable.heading}
            </h2>
          </motion.div>

          <motion.div
            variants={pageFadeUp}
            className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card"
          >
            <table className="w-full min-w-200 border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-soft bg-ivory-light">
                  <th className="px-5 py-3 font-bold text-charcoal">Tool</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Best fit</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Why it may work</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Watch out</th>
                </tr>
              </thead>
              <tbody>
                {data.toolsTable.rows.map((row, i) => (
                  <tr
                    key={row.tool}
                    className={
                      i % 2 === 0
                        ? 'border-b border-line-soft'
                        : 'border-b border-line-soft bg-ivory-light/40'
                    }
                  >
                    <td className="px-5 py-3 font-semibold text-charcoal">
                      {row.href ? (
                        row.href.startsWith('/') ? (
                          <Link
                            href={row.href}
                            className={row.tool === 'HireSort' ? 'text-accent no-underline hover:underline' : 'text-charcoal no-underline hover:text-accent hover:underline'}
                          >
                            {row.tool}
                          </Link>
                        ) : (
                          <a
                            href={row.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal no-underline hover:text-accent hover:underline"
                          >
                            {row.tool}
                          </a>
                        )
                      ) : row.tool === 'HireSort' ? (
                        <span className="text-accent">{row.tool}</span>
                      ) : (
                        row.tool
                      )}
                    </td>
                    <td className="px-5 py-3 text-charcoal-md">{row.bestFit}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.whyItMayWork}</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.watchOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {data.positioning && (
        <section className="mx-auto max-w-300 px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageStagger}
            className="max-w-275"
          >
            {data.positioning.eyebrow && (
              <motion.span variants={pageFadeUp} className={sectionLabel}>
                {data.positioning.eyebrow}
              </motion.span>
            )}
            <motion.h2
              variants={pageFadeUp}
              className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
            >
              {data.positioning.title}
            </motion.h2>
            <motion.div variants={pageFadeUp} className="flex max-w-200 flex-col gap-3">
              {data.positioning.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-charcoal-lt">
                  {p}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {data.framework && (
        <section className="bg-linear-to-b from-ivory-medium to-ivory px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={pageStagger}
            className="mx-auto max-w-300"
          >
            <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-180 text-center">
              <span className={sectionLabel}>Framework</span>
              <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
                {data.framework.heading}
              </h2>
            </motion.div>

            <motion.div
              variants={pageFadeUp}
              className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card"
            >
              <table className="w-full min-w-160 border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-line-soft bg-ivory-light">
                    {data.framework.columns.map((c) => (
                      <th key={c} className="px-5 py-3 font-bold text-charcoal">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.framework.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0
                          ? 'border-b border-line-soft'
                          : 'border-b border-line-soft bg-ivory-light/40'
                      }
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={
                            j === 0
                              ? 'px-5 py-3 font-semibold text-charcoal'
                              : 'px-5 py-3 text-charcoal-md'
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </section>
      )}

      {data.evidence && (
        <section className="mx-auto max-w-300 px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={pageStagger}
          >
            <motion.div variants={pageFadeUp} className="mx-auto mb-10 max-w-190 text-center">
              {data.evidence.eyebrow && (
                <span className={sectionLabel}>{data.evidence.eyebrow}</span>
              )}
              <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
                {data.evidence.title}
              </h2>
              <p className="text-[15px] leading-[1.7] text-charcoal-lt">
                {data.evidence.intro}
              </p>
            </motion.div>

            <motion.div variants={pageFadeUp} className="grid gap-4 md:grid-cols-2">
              {data.evidence.items.map((item) => (
                <article
                  key={item.href + item.title}
                  className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
                >
                  <h3 className="mb-2 text-[17px] font-bold tracking-[-0.3px] text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-[14px] leading-[1.7] text-charcoal-lt">
                    {item.body}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] font-semibold text-accent no-underline hover:underline"
                  >
                    Source: {item.label}
                  </a>
                </article>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {data.howToChoose && (
        <section className="mx-auto max-w-300 px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={pageStagger}
            className="max-w-275"
          >
            {data.howToChoose.eyebrow && (
              <motion.span variants={pageFadeUp} className={sectionLabel}>
                {data.howToChoose.eyebrow}
              </motion.span>
            )}
            <motion.h2
              variants={pageFadeUp}
              className="mb-6 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal"
            >
              {data.howToChoose.title}
            </motion.h2>
            {data.howToChoose.intro && (
              <motion.p
                variants={pageFadeUp}
                className="mb-4 max-w-200 text-[15px] leading-[1.7] text-charcoal-md"
              >
                {data.howToChoose.intro}
              </motion.p>
            )}
            <motion.ol
              variants={pageFadeUp}
              className="grid list-none gap-3 p-0 md:grid-cols-2"
            >
              {data.howToChoose.items.map((p, i) => (
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
            </motion.ol>
          </motion.div>
        </section>
      )}

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
              href={bottomPrimaryCta.href}
              onClick={() => trackCTAClick('primary_cta', ctaSlot)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
            >
              {bottomPrimaryCta.label}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            {bottomSecondaryCta ? (
              <a
                href={bottomSecondaryCta.href}
                onClick={() => trackCTAClick('secondary_cta', ctaSlot)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-white/10"
              >
                {bottomSecondaryCta.label}
              </a>
            ) : null}
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

      {data.externalReferences && data.externalReferences.length > 0 && (
        <section className="mx-auto max-w-300 px-6 py-16">
          <div className="rounded-xl border border-line-soft bg-ivory-light p-6 shadow-soft">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
              Sources and further reading
            </div>
            <ul className="grid list-none gap-3 p-0 md:grid-cols-2">
              {data.externalReferences.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-line-soft bg-white p-4 no-underline transition-shadow hover:shadow-soft"
                  >
                    <span className="block text-[14px] font-semibold text-accent group-hover:underline">
                      {reference.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[1.55] text-charcoal-lt">
                      {reference.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {data.disclaimer && (
        <section className="mx-auto max-w-300 px-6 py-10">
          <p className="text-[12.5px] leading-[1.65] text-charcoal-lt">{data.disclaimer}</p>
        </section>
      )}
    </>
  );
};

export default BestClient;
