'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/google_analytics_tracker';
import type { CompetitorPage } from '../_data/types';

type Props = { faqs: CompetitorPage['faqs'] };

const CompareFaq = ({ faqs }: Props) => {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id ?? null);

  const toggleFaq = (id: string) => {
    setOpenFaq((curr) => {
      const next = curr === id ? null : id;
      if (next) {
        const item = faqs.find((f) => f.id === id);
        trackEvent('faq_open', { faq_id: id, question: item?.question ?? '' });
      }
      return next;
    });
  };

  return (
    <ul className="flex list-none flex-col gap-2.5 p-0">
      {faqs.map((item, idx) => {
        const isOpen = openFaq === item.id;
        return (
          <li
            key={item.id}
            className="overflow-hidden rounded-lg border border-line-soft bg-white shadow-soft"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`compare-faq-${item.id}`}
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
            {isOpen && (
              <div
                id={`compare-faq-${item.id}`}
                role="region"
                className="flex flex-col gap-2.5 border-t border-line-soft bg-ivory-light px-5 py-4 text-[14px] leading-[1.7] text-charcoal-md"
              >
                {item.answer.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CompareFaq;
