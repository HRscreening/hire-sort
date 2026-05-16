'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import {
  PageHero,
  pageEase,
  pageFadeUp,
  pageStagger,
} from '@/components/layout/PageHero';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import type { ProductBlock, ProductPage } from '@/app/(public)/product/_lib/types';
import { Icon } from './icons';

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

/** Alternating section background — keeps the page visually rhythmic. */
const sectionBg = (i: number) =>
  i % 2 === 0
    ? 'mx-auto max-w-300 px-6 py-20'
    : 'bg-linear-to-b from-ivory to-ivory-medium px-6 py-20';

const sectionInner = (i: number) =>
  i % 2 === 0 ? '' : 'mx-auto max-w-300';

const Section = ({ index, children }: { index: number; children: React.ReactNode }) => (
  <section className={sectionBg(index)}>
    <div className={sectionInner(index)}>{children}</div>
  </section>
);

const ProblemBlock = ({ b }: { b: Extract<ProductBlock, { type: 'problem' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"
  >
    <motion.div variants={pageFadeUp}>
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
        {b.title}
      </h2>
    </motion.div>
    <motion.div
      variants={pageFadeUp}
      className="flex flex-col gap-4 text-[15px] leading-[1.75] text-charcoal-md"
    >
      {b.intro && <p>{b.intro}</p>}
      <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
        {b.bullets.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 rounded-md border border-line-soft bg-white px-3 py-2 text-[13.5px] text-charcoal-md shadow-soft"
          >
            <XCircle size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {b.closing && <p>{b.closing}</p>}
    </motion.div>
  </motion.div>
);

const PositioningBlock = ({ b }: { b: Extract<ProductBlock, { type: 'positioning' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-275"
  >
    {b.eyebrow && (
      <motion.span variants={pageFadeUp} className={sectionLabel}>
        {b.eyebrow}
      </motion.span>
    )}
    <motion.h2
      variants={pageFadeUp}
      className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
    >
      {b.title}
    </motion.h2>
    <motion.div variants={pageFadeUp} className="mb-6 flex max-w-200 flex-col gap-3">
      {b.body.map((p, i) => (
        <p key={i} className="text-[15px] leading-[1.7] text-charcoal-lt">
          {p}
        </p>
      ))}
    </motion.div>
    {b.flow && (
      <motion.div
        variants={pageFadeUp}
        className="overflow-x-auto rounded-xl border border-line-soft bg-white p-6 shadow-card"
      >
        <div className="flex min-w-max items-center gap-2 font-mono text-[13px] text-charcoal-md">
          {b.flow.map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md bg-ivory-medium px-3 py-1.5 font-semibold text-charcoal">
                {step}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight size={14} strokeWidth={2.4} className="text-charcoal-xlt" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )}
    {b.quote && (
      <motion.blockquote
        variants={pageFadeUp}
        className="my-6 max-w-200 border-l-[3px] border-accent bg-white px-5 py-4 text-[16px] leading-[1.7] font-semibold text-charcoal italic shadow-soft"
      >
        {b.quote}
      </motion.blockquote>
    )}
    {b.closing && (
      <motion.p
        variants={pageFadeUp}
        className="mt-6 max-w-200 text-[14.5px] leading-[1.7] text-charcoal-lt"
      >
        {b.closing}
      </motion.p>
    )}
  </motion.div>
);

const WorkflowBlock = ({ b }: { b: Extract<ProductBlock, { type: 'workflow' }> }) => (
  <>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={pageStagger}
      className="mx-auto mb-10 max-w-180 text-center"
      id="how-it-works"
    >
      {b.eyebrow && (
        <motion.span variants={pageFadeUp} className={sectionLabel}>
          {b.eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={pageFadeUp}
        className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
      >
        {b.title}
      </motion.h2>
      {b.intro && (
        <motion.p variants={pageFadeUp} className="text-[15px] leading-[1.65] text-charcoal-lt">
          {b.intro}
        </motion.p>
      )}
    </motion.div>
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={pageStagger}
      className="grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3"
    >
      {b.steps.map((s) => (
        <motion.li
          key={s.n}
          variants={pageFadeUp}
          className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
        >
          <div className="mb-3 font-mono text-[13px] font-bold text-accent">{s.n}</div>
          <h3 className="mb-2 text-[16.5px] font-bold tracking-[-0.3px] text-charcoal">
            {s.title}
          </h3>
          <p className="text-[14px] leading-[1.65] text-charcoal-lt">{s.body}</p>
        </motion.li>
      ))}
    </motion.ol>
  </>
);

const FeaturesBlock = ({ b }: { b: Extract<ProductBlock, { type: 'features' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-275"
  >
    <motion.div variants={pageFadeUp} className="mx-auto mb-10 max-w-180 text-center">
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
        {b.title}
      </h2>
      {b.intro && (
        <p className="text-[15px] leading-[1.65] text-charcoal-lt">{b.intro}</p>
      )}
    </motion.div>
    <motion.div variants={pageStagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {b.items.map((f) => (
        <motion.div
          key={f.title}
          variants={pageFadeUp}
          className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
        >
          {f.icon && (
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.12)] text-accent">
              <Icon name={f.icon} size={18} />
            </div>
          )}
          <h3 className="mb-2 text-[16px] font-bold tracking-[-0.3px] text-charcoal">
            {f.title}
          </h3>
          <p className="text-[14px] leading-[1.65] text-charcoal-lt">{f.body}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const FieldListBlock = ({ b }: { b: Extract<ProductBlock, { type: 'fieldList' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="grid gap-10 md:grid-cols-[1fr_1fr]"
  >
    <motion.div variants={pageFadeUp}>
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="mb-3 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
        {b.title}
      </h2>
      {b.intro && (
        <p className="text-[15px] leading-[1.7] text-charcoal-lt">{b.intro}</p>
      )}
      {b.closing && (
        <p className="mt-4 text-[14.5px] leading-[1.7] text-charcoal-lt">{b.closing}</p>
      )}
    </motion.div>
    <motion.div
      variants={pageFadeUp}
      className="rounded-xl border border-line-soft bg-white p-6 shadow-card"
    >
      {b.cardLabel && (
        <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
          <Icon name={b.cardIcon} size={14} />
          {b.cardLabel}
        </div>
      )}
      <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
        {b.fields.map((field) => (
          <li key={field} className="flex items-start gap-2 text-[13.5px] text-charcoal-md">
            <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
            <span>{field}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  </motion.div>
);

const StagesBlock = ({ b }: { b: Extract<ProductBlock, { type: 'stages' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-275"
  >
    {b.eyebrow && (
      <motion.span variants={pageFadeUp} className={sectionLabel}>
        {b.eyebrow}
      </motion.span>
    )}
    <motion.h2
      variants={pageFadeUp}
      className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
    >
      {b.title}
    </motion.h2>
    {b.intro && (
      <motion.p
        variants={pageFadeUp}
        className="mb-8 max-w-200 text-[15px] leading-[1.7] text-charcoal-lt"
      >
        {b.intro}
      </motion.p>
    )}
    <motion.div variants={pageFadeUp} className="flex flex-wrap gap-2">
      {b.items.map((s) => (
        <span
          key={s}
          className="rounded-full border border-line-soft bg-white px-4 py-2 text-[13px] font-semibold text-charcoal-md shadow-soft"
        >
          {s}
        </span>
      ))}
    </motion.div>
    {b.closing && (
      <motion.p
        variants={pageFadeUp}
        className="mt-6 max-w-200 text-[14.5px] leading-[1.7] text-charcoal-lt"
      >
        {b.closing}
      </motion.p>
    )}
  </motion.div>
);

const PlansSplitBlock = ({ b }: { b: Extract<ProductBlock, { type: 'plansSplit' }> }) => (
  <div className="mx-auto max-w-275">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={pageStagger}
      className="mx-auto mb-10 max-w-180 text-center"
    >
      {b.eyebrow && (
        <motion.span variants={pageFadeUp} className={sectionLabel}>
          {b.eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={pageFadeUp}
        className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
      >
        {b.title}
      </motion.h2>
    </motion.div>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={pageStagger}
      className="grid gap-6 md:grid-cols-2"
    >
      <motion.div
        variants={pageFadeUp}
        className="rounded-xl border border-line-soft bg-white p-8 shadow-card"
      >
        {b.free.label && (
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
            {b.free.label}
          </div>
        )}
        <h3 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px] text-charcoal">
          {b.free.heading}
        </h3>
        <ul className="flex list-none flex-col gap-2 p-0">
          {b.free.bullets.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[14px] text-charcoal-md">
              <CheckCircle2 size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        variants={pageFadeUp}
        className="rounded-xl border border-[rgba(200,90,23,0.25)] bg-linear-to-br from-white to-ivory-light p-8 shadow-card"
      >
        {b.paid.label && (
          <div className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
            <Sparkles size={13} strokeWidth={2.5} />
            {b.paid.label}
          </div>
        )}
        <h3 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px] text-charcoal">
          {b.paid.heading}
        </h3>
        <ul className="flex list-none flex-col gap-2 p-0">
          {b.paid.bullets.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[14px] text-charcoal-md">
              <CheckCircle2 size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  </div>
);

const UseCasesBlock = ({ b }: { b: Extract<ProductBlock, { type: 'useCases' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-275"
  >
    <motion.div variants={pageFadeUp} className="mx-auto mb-10 max-w-180 text-center">
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
        {b.title}
      </h2>
    </motion.div>
    <motion.div variants={pageStagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {b.items.map((u) => (
        <motion.div
          key={u.title}
          variants={pageFadeUp}
          className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
        >
          {u.icon && (
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ivory-medium text-charcoal">
              <Icon name={u.icon} size={18} />
            </div>
          )}
          <h3 className="mb-2 text-[15.5px] font-bold tracking-[-0.3px] text-charcoal">
            {u.title}
          </h3>
          <p className="text-[13.5px] leading-[1.65] text-charcoal-lt">{u.body}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const ComparisonBlock = ({ b }: { b: Extract<ProductBlock, { type: 'comparison' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    variants={pageStagger}
  >
    <motion.div variants={pageFadeUp} className="mx-auto mb-10 max-w-180 text-center">
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
        {b.title}
      </h2>
    </motion.div>
    <motion.div
      variants={pageFadeUp}
      className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card"
    >
      <table className="w-full min-w-200 border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-line-soft bg-ivory-light">
            {b.columns.map((col, idx) => (
              <th
                key={col}
                className={`px-5 py-3 font-bold ${
                  idx === b.accentColIndex ? 'text-accent' : 'text-charcoal'
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((row, i) => (
            <tr
              key={row[0]}
              className={
                i % 2 === 0
                  ? 'border-b border-line-soft'
                  : 'border-b border-line-soft bg-ivory-light/40'
              }
            >
              {row.map((cell, idx) => (
                <td
                  key={idx}
                  className={
                    idx === 0
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
);

const WhyBlock = ({ b }: { b: Extract<ProductBlock, { type: 'why' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-275"
  >
    <motion.div variants={pageFadeUp} className="mx-auto mb-10 max-w-180 text-center">
      {b.eyebrow && <span className={sectionLabel}>{b.eyebrow}</span>}
      <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
        {b.title}
      </h2>
    </motion.div>
    <motion.div variants={pageStagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {b.items.map((p) => (
        <motion.div
          key={p.title}
          variants={pageFadeUp}
          className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
        >
          <h3 className="mb-2 text-[16px] font-bold tracking-[-0.3px] text-charcoal">
            {p.title}
          </h3>
          <p className="text-[14px] leading-[1.65] text-charcoal-lt">{p.body}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const ScopeBlock = ({ b }: { b: Extract<ProductBlock, { type: 'scope' }> }) => (
  <div className="mx-auto max-w-275">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={pageStagger}
      className="mx-auto mb-10 max-w-180 text-center"
    >
      {b.eyebrow && (
        <motion.span variants={pageFadeUp} className={sectionLabel}>
          {b.eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={pageFadeUp}
        className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal"
      >
        {b.title}
      </motion.h2>
    </motion.div>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={pageStagger}
      className="grid gap-6 md:grid-cols-2"
    >
      <motion.div
        variants={pageFadeUp}
        className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
      >
        <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
          <CheckCircle2 size={14} strokeWidth={2.4} />
          {b.inLabel ?? 'In scope'}
        </div>
        <ul className="flex list-none flex-col gap-2 p-0">
          {b.inItems.map((s) => (
            <li key={s} className="flex items-start gap-2 text-[14px] text-charcoal-md">
              <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        variants={pageFadeUp}
        className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
      >
        <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
          <XCircle size={14} strokeWidth={2.4} />
          {b.outLabel ?? 'Not in near-term scope'}
        </div>
        <ul className="flex list-none flex-col gap-2 p-0">
          {b.outItems.map((s) => (
            <li key={s} className="flex items-start gap-2 text-[14px] text-charcoal-md">
              <XCircle size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-charcoal-xlt" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  </div>
);

const CalloutBlock = ({ b }: { b: Extract<ProductBlock, { type: 'callout' }> }) => (
  <motion.aside
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={pageFadeUp}
    className="mx-auto max-w-200 rounded-xl border border-[rgba(200,90,23,0.25)] bg-[rgba(200,90,23,0.05)] px-6 py-6 text-center shadow-soft"
  >
    {b.title && (
      <h3 className="mb-2 text-[18px] font-bold tracking-[-0.3px] text-charcoal">{b.title}</h3>
    )}
    <p className="text-[15px] leading-[1.7] text-charcoal-md">{b.body}</p>
  </motion.aside>
);

const ParagraphBlock = ({ b }: { b: Extract<ProductBlock, { type: 'paragraph' }> }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={pageStagger}
    className="mx-auto max-w-200"
  >
    {b.eyebrow && (
      <motion.span variants={pageFadeUp} className={sectionLabel}>
        {b.eyebrow}
      </motion.span>
    )}
    {b.title && (
      <motion.h2
        variants={pageFadeUp}
        className="mb-4 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal"
      >
        {b.title}
      </motion.h2>
    )}
    <motion.div variants={pageFadeUp} className="flex flex-col gap-3">
      <FormattedParagraphBody lines={b.body} />
    </motion.div>
  </motion.div>
);

const FormattedParagraphBody = ({ lines }: { lines: string[] }) => {
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;

    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-1 flex list-none flex-col gap-2 p-0">
        {listItems.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-[14.5px] leading-[1.65] text-charcoal-lt before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[rgba(200,90,23,0.65)] before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const labelMatch = trimmedLine.match(/^\*\*(.+?)\*\*:?\s*$/);
    const bulletMatch = trimmedLine.match(/^•\s*(.+)$/);

    if (labelMatch) {
      flushList();
      blocks.push(
        <h3
          key={`label-${blocks.length}`}
          className="mt-3 text-[15px] font-bold leading-[1.4] text-charcoal"
        >
          {labelMatch[1]}
        </h3>,
      );
      return;
    }

    if (bulletMatch) {
      listItems.push(bulletMatch[1]);
      return;
    }

    flushList();
    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="text-[15px] leading-[1.7] text-charcoal-lt">
        {line}
      </p>,
    );
  });

  flushList();
  return <>{blocks}</>;
};

const RenderBlock = ({ b }: { b: ProductBlock }) => {
  switch (b.type) {
    case 'problem':
      return <ProblemBlock b={b} />;
    case 'positioning':
      return <PositioningBlock b={b} />;
    case 'workflow':
      return <WorkflowBlock b={b} />;
    case 'features':
      return <FeaturesBlock b={b} />;
    case 'fieldList':
      return <FieldListBlock b={b} />;
    case 'stages':
      return <StagesBlock b={b} />;
    case 'plansSplit':
      return <PlansSplitBlock b={b} />;
    case 'useCases':
      return <UseCasesBlock b={b} />;
    case 'comparison':
      return <ComparisonBlock b={b} />;
    case 'why':
      return <WhyBlock b={b} />;
    case 'scope':
      return <ScopeBlock b={b} />;
    case 'callout':
      return <CalloutBlock b={b} />;
    case 'paragraph':
      return <ParagraphBlock b={b} />;
  }
};

const ProductClient = ({ data }: { data: ProductPage }) => {
  const [openFaq, setOpenFaq] = useState<string | null>(data.faqs[0]?.id ?? null);
  const heroSlot = `product_${data.slug}_hero`;
  const ctaSlot = `product_${data.slug}_bottom_cta`;

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
        icon={<Icon name={data.heroIcon} size={13} />}
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
            href={data.hero.primary.href}
            onClick={() => trackCTAClick('primary_cta', heroSlot)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            {data.hero.primary.label}
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <a
            href={data.hero.secondary.href}
            onClick={() => trackCTAClick('secondary_cta', heroSlot)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
          >
            {data.hero.secondary.label}
          </a>
        </div>
        {data.hero.supporting && (
          <p className="mx-auto mt-6 max-w-160 text-[14px] leading-[1.65] text-charcoal-lt">
            {data.hero.supporting}
          </p>
        )}
      </PageHero>

      {data.sections.map((b, i) => (
        <Section key={`${b.type}-${i}`} index={i}>
          <RenderBlock b={b} />
        </Section>
      ))}

      {/* CTA */}
      <section className="mx-auto max-w-250 px-6 pt-20 pb-8">
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
              background: 'radial-gradient(circle, rgba(200, 90, 23, 0.18) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(200,90,23,0.18)] bg-[rgba(200,90,23,0.08)] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.6px] text-accent">
              <Sparkles size={13} strokeWidth={2.5} />
              {data.cta.eyebrow}
            </span>
            <h2 className="my-4 text-[clamp(26px,4vw,36px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
              {data.cta.title}
            </h2>
            <p className="mx-auto mb-6 max-w-160 text-[15px] leading-[1.65] text-charcoal-lt">
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
              <Link
                href={data.cta.secondary.href}
                onClick={() => trackCTAClick('secondary_cta', ctaSlot)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
              >
                {data.cta.secondary.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-250 px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={pageStagger}
          className="mx-auto mb-8 max-w-180 text-center"
        >
          <motion.span variants={pageFadeUp} className={sectionLabel}>
            FAQ
          </motion.span>
          <motion.h2
            variants={pageFadeUp}
            className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal"
          >
            Frequently asked questions
          </motion.h2>
        </motion.div>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="flex list-none flex-col gap-2.5 p-0"
        >
          {data.faqs.map((item, idx) => {
            const isOpen = openFaq === item.id;
            return (
              <motion.li
                key={item.id}
                variants={pageFadeUp}
                className="overflow-hidden rounded-lg border border-line-soft bg-white shadow-soft"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`product-faq-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ivory-light"
                >
                  <span className="w-8 shrink-0 font-mono text-[12px] font-bold text-accent">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold leading-snug text-charcoal">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ivory-medium text-charcoal-md transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    <ChevronDown size={16} strokeWidth={2.4} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`product-faq-${item.id}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: pageEase }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2.5 border-t border-line-soft bg-ivory-light px-5 py-4 text-[14px] leading-[1.7] text-charcoal-md">
                        {item.answer.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </section>

      {/* Internal links */}
      {data.internalLinks.length > 0 && (
        <section className="mx-auto max-w-275 px-6 pb-20">
          <div className="rounded-xl border border-line-soft bg-white p-6 shadow-soft">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
              Related reading
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 p-0">
              {data.internalLinks.map((l) => (
                <li key={l.href} className="list-none">
                  <Link
                    href={l.href}
                    className="text-[14px] font-medium text-accent no-underline hover:underline"
                  >
                    {l.label}
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

export default ProductClient;
