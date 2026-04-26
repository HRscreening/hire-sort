'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, Mail, MessageSquare } from 'lucide-react';
import { PageHero, pageEase, pageFadeUp, pageStagger } from '@/components/layout/PageHero';
import { CATEGORIES, FAQS } from './_data';
import { trackEvent, trackSearch, trackCTAClick } from '@/lib/google_analytics_tracker';

const navButtonBase =
  'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[13.5px] font-medium transition-colors';

const FaqsClient = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: FAQS.length };
    for (const f of FAQS) map[f.category] = (map[f.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchCat = activeCategory === 'all' || f.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const hay = (f.question + ' ' + f.answer.join(' ')).toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query]);

  const allExpanded = openId === '__all__';
  const toggle = (id: string) => {
    setOpenId((curr) => {
      const next = curr === id ? null : id;
      if (next && next !== '__all__') {
        const item = FAQS.find((f) => f.id === id);
        trackEvent('faq_open', { faq_id: id, question: item?.question ?? '' });
      }
      return next;
    });
  };
  const expandAll = () => {
    if (filtered.length === 0) return;
    const next = allExpanded ? null : '__all__';
    setOpenId(next);
    trackEvent('faq_expand_all', { state: next ? 'expanded' : 'collapsed' });
  };

  const selectCategory = (id: string) => {
    if (id !== activeCategory) trackEvent('faq_category', { category: id });
    setActiveCategory(id);
  };

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const q = query.trim();
    if (!q) return;
    searchTimer.current = setTimeout(() => {
      trackSearch(q, filtered.length);
    }, 800);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [query, filtered.length]);

  return (
    <>
      <PageHero
        icon={<HelpCircle size={13} strokeWidth={2.5} />}
        eyebrow="Documentation & FAQs"
        title={
          <>
            Questions, answered <span className="text-accent">clearly.</span>
          </>
        }
        lead={
          <>
            Everything you need to know about how HireSort screens resumes, supports recruiters,
            and fits into your hiring workflow. If you can&apos;t find what you&apos;re looking
            for, we&apos;re one click away.
          </>
        }
      >
        <div className="mx-auto flex w-full max-w-140 items-center gap-2 rounded-full border border-line-soft bg-white px-4 py-2.5 shadow-soft focus-within:border-accent focus-within:ring-3 focus-within:ring-[rgba(200,90,23,0.12)]">
          <Search size={16} strokeWidth={2.2} className="text-charcoal-xlt" />
          <input
            type="text"
            placeholder="Search questions — e.g. bulk upload, file formats, pricing"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search FAQs"
            className="w-full bg-transparent text-[14px] text-charcoal placeholder:text-charcoal-xlt focus:outline-none"
          />
        </div>
      </PageHero>

      <section className="mx-auto w-full max-w-300 px-6 pt-6 pb-24">
        <div className="grid items-start gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: pageEase }}
            className="sticky top-22 z-10 rounded-lg border border-line-soft bg-white p-3 shadow-card md:sticky"
          >
            <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
              Browse by topic
            </div>
            <div className="flex flex-col gap-0.5" role="tablist">
              {CATEGORIES.map((c) => {
                const active = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCategory(c.id)}
                    className={`${navButtonBase} ${
                      active
                        ? 'bg-[rgba(200,90,23,0.08)] text-accent'
                        : 'text-charcoal-md hover:bg-ivory-medium hover:text-charcoal'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className={`text-[11px] font-bold ${active ? 'text-accent' : 'text-charcoal-xlt'}`}>
                      {counts[c.id] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.aside>

          <div className="min-w-0">
            <div className="mb-5 flex items-center justify-between text-[13px] text-charcoal-lt">
              <span>
                Showing <strong className="font-semibold text-charcoal">{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'question' : 'questions'}
                {query ? <> matching &ldquo;{query}&rdquo;</> : null}
              </span>
              {filtered.length > 0 && (
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-[13px] font-semibold text-accent transition-colors hover:text-copper-dark"
                >
                  {allExpanded ? 'Collapse all' : 'Expand all'}
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-1 rounded-lg border border-line-soft bg-white px-6 py-10 text-center">
                <strong className="text-[15px] font-semibold text-charcoal">No matches found</strong>
                <p className="text-[13.5px] text-charcoal-lt">
                  Try a different keyword or pick another topic from the sidebar.
                </p>
              </div>
            ) : (
              <motion.ul
                initial="hidden"
                animate="show"
                variants={pageStagger}
                className="flex list-none flex-col gap-2.5 p-0"
              >
                {filtered.map((item, idx) => {
                  const isOpen = allExpanded || openId === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      variants={pageFadeUp}
                      className="overflow-hidden rounded-lg border border-line-soft bg-white shadow-soft"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        onClick={() => toggle(item.id)}
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
                            id={`faq-panel-${item.id}`}
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
            )}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: pageEase }}
              className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[rgba(200,90,23,0.16)] bg-[rgba(200,90,23,0.05)] px-6 py-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.12)] text-accent">
                  <MessageSquare size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-charcoal">Still have a question?</div>
                  <div className="text-[13px] text-charcoal-lt">
                    We read every message — usually reply within one business day.
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => trackCTAClick('contact_us', 'faqs_footer')}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-5 py-2.5 text-[14px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
              >
                <Mail size={15} strokeWidth={2.5} />
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsClient;
