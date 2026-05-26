import Link from 'next/link';
import { Check, X, ArrowUpRight } from 'lucide-react';
import type { ToolDeepDive } from '../../_data/types';

type Props = { items: ToolDeepDive[] };

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ToolLink = ({ tool, href }: { tool: string; href?: string }) => {
  if (!href) return <>{tool}</>;
  if (href.startsWith('/')) {
    return (
      <Link href={href} className="text-charcoal no-underline hover:text-accent hover:underline">
        {tool}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-charcoal no-underline hover:text-accent hover:underline"
    >
      {tool}
      <ArrowUpRight size={14} strokeWidth={2} />
    </a>
  );
};

const ToolDeepDives = ({ items }: Props) => {
  if (items.length === 0) return null;

  return (
    <section id="tool-deep-dives" className="mx-auto max-w-300 px-6 py-16">
      <div className="mx-auto mb-8 max-w-220 text-center">
        <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
          Per-tool breakdown
        </span>
        <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
          Each tool, in detail
        </h2>
      </div>

      <div className="mx-auto flex max-w-220 flex-col gap-8">
        {items.map((t) => {
          const anchor = `tool-${slugify(t.tool)}`;
          return (
            <article
              key={t.tool}
              id={anchor}
              className="rounded-xl border border-line-soft bg-white p-6 shadow-soft md:p-8"
            >
              <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.3px] text-charcoal">
                  <ToolLink tool={t.tool} href={t.href} />
                </h3>
                {t.pricingRange && (
                  <span className="rounded-md border border-line-soft bg-ivory-light px-3 py-1 font-mono text-[12.5px] font-semibold text-charcoal-md">
                    {t.pricingRange}
                    {t.pricingNote && (
                      <span className="ml-2 font-sans text-[11.5px] font-normal text-charcoal-lt">
                        {t.pricingNote}
                      </span>
                    )}
                  </span>
                )}
              </header>

              <p className="mb-4 text-[15px] leading-[1.7] text-charcoal-md">
                <span className="font-semibold text-charcoal">{t.oneLiner}</span>
              </p>

              <dl className="mb-5 grid gap-3 text-[13.5px] md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-charcoal">Best for</dt>
                  <dd className="text-charcoal-md">{t.bestFor}</dd>
                </div>
                {t.notIdealFor && (
                  <div>
                    <dt className="font-semibold text-charcoal">Not ideal for</dt>
                    <dd className="text-charcoal-md">{t.notIdealFor}</dd>
                  </div>
                )}
              </dl>

              {t.keyCapabilities.length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-2 text-[13px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
                    Key capabilities
                  </h4>
                  <ul className="grid list-none gap-1.5 p-0 text-[13.5px] text-charcoal-md sm:grid-cols-2">
                    {t.keyCapabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-5 flex flex-col gap-3">
                {t.bodyParagraphs.map((p, i) => (
                  <p key={i} className="text-[14.5px] leading-[1.7] text-charcoal-md">
                    {p}
                  </p>
                ))}
              </div>

              {t.prosAndCons && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border border-line-soft bg-ivory-light p-4">
                    <h4 className="mb-2 text-[12.5px] font-bold uppercase tracking-[0.6px] text-accent">
                      Pros
                    </h4>
                    <ul className="list-none p-0 text-[13.5px] text-charcoal-md">
                      {t.prosAndCons.pros.map((p) => (
                        <li key={p} className="mt-1 flex items-start gap-2 first:mt-0">
                          <Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border border-line-soft bg-ivory-light p-4">
                    <h4 className="mb-2 text-[12.5px] font-bold uppercase tracking-[0.6px] text-charcoal-md">
                      Cons
                    </h4>
                    <ul className="list-none p-0 text-[13.5px] text-charcoal-md">
                      {t.prosAndCons.cons.map((c) => (
                        <li key={c} className="mt-1 flex items-start gap-2 first:mt-0">
                          <X size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-charcoal-lt" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {t.verdict && (
                <p className="mt-5 border-t border-line-soft pt-4 text-[14px] italic leading-[1.65] text-charcoal-md">
                  <span className="font-bold uppercase tracking-[0.6px] text-charcoal not-italic">
                    Verdict:
                  </span>{' '}
                  {t.verdict}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ToolDeepDives;
