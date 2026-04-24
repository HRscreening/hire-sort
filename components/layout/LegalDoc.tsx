'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { pageEase, pageFadeUp, pageStagger } from './PageHero';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'p-upper'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'h3'; text: string };

export type LegalSection = {
  id: string;
  number: string;
  title: string;
  blocks: LegalBlock[];
};

const renderBlock = (block: LegalBlock, idx: number) => {
  if (block.type === 'p') {
    return (
      <p key={idx} className="text-[15px] leading-[1.75] text-charcoal-md">
        {block.text}
      </p>
    );
  }
  if (block.type === 'p-upper') {
    return (
      <p
        key={idx}
        className="text-[13px] font-semibold uppercase tracking-[0.6px] leading-[1.65] text-charcoal-md"
      >
        {block.text}
      </p>
    );
  }
  if (block.type === 'h3') {
    return (
      <h3
        key={idx}
        className="mt-1.5 text-[15px] font-semibold tracking-[-0.2px] text-charcoal"
      >
        {block.text}
      </h3>
    );
  }
  return (
    <ul key={idx} className="flex list-none flex-col gap-2 p-0">
      {block.items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 text-[14.5px] leading-[1.7] text-charcoal-md before:absolute before:left-0 before:top-2.75 before:h-1.25 before:w-1.25 before:rounded-full before:bg-[rgba(200,90,23,0.6)] before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

type LegalDocProps = {
  sections: LegalSection[];
  intro: ReactNode;
  /** Copy shown in the small callout card at the bottom. */
  calloutTitle: string;
  calloutSub: string;
  calloutCta: string;
};

export const LegalDoc = ({
  sections,
  intro,
  calloutTitle,
  calloutSub,
  calloutCta,
}: LegalDocProps) => {
  return (
    <section className="mx-auto w-full max-w-300 px-6 pt-6 pb-24">
      <div className="grid items-start gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
        {/* TOC */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: pageEase }}
          className="sticky top-23 z-10 hidden rounded-lg border border-line-soft bg-white p-3 shadow-card md:block"
        >
          <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
            On this page
          </div>
          <nav className="flex flex-col gap-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium text-charcoal-md transition-colors hover:bg-[rgba(200,90,23,0.06)] hover:text-accent"
              >
                <span className="w-5 shrink-0 font-mono text-[10px] font-semibold text-charcoal-xlt transition-colors group-hover:text-accent">
                  {s.number}
                </span>
                <span className="truncate">{s.title}</span>
              </a>
            ))}
          </nav>
        </motion.aside>

        {/* Article */}
        <motion.article
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={pageStagger}
          className="min-w-0 rounded-xl border border-line-soft bg-white p-8 shadow-card md:p-11"
        >
          <motion.p
            variants={pageFadeUp}
            className="mb-10 border-l-[3px] border-accent pl-4 text-[15.5px] leading-[1.75] text-charcoal-md"
          >
            {intro}
          </motion.p>

          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={pageFadeUp}
                className="scroll-mt-25"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-mono text-[13px] font-semibold tracking-[0.5px] text-accent">
                    {section.number}
                  </span>
                  <h2 className="text-[22px] font-bold leading-tight tracking-[-0.5px] text-charcoal">
                    {section.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-3 border-l border-line-soft pl-5">
                  {section.blocks.map((b, i) => renderBlock(b, i))}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            variants={pageFadeUp}
            className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[rgba(200,90,23,0.16)] bg-[rgba(200,90,23,0.05)] px-6 py-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.12)] text-accent">
                <Mail size={18} strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-charcoal">{calloutTitle}</div>
                <div className="text-[13px] text-charcoal-lt">{calloutSub}</div>
              </div>
            </div>
            <a
              href="mailto:support@hiresort.ai"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-5 py-2.5 text-[14px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
            >
              {calloutCta}
            </a>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};
