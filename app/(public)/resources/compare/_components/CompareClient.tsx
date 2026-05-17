import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  GitCompare,
  UserSearch,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import type { CompetitorPage } from '../_data/types';
import CompareFaq from './CompareFaq';
import TrackedCta from './TrackedCta';

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

type Props = { data: CompetitorPage };

const CompareClient = ({ data }: Props) => {
  const heroSlot = `compare_${data.slug}_hero`;
  const ctaSlot = `compare_${data.slug}_bottom_cta`;

  return (
    <>
      <PageHero
        icon={<GitCompare size={13} strokeWidth={2.5} />}
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
          <TrackedCta
            href={data.hero.primaryCta.href}
            cta="primary_cta"
            location={heroSlot}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            {data.hero.primaryCta.label}
            <ArrowRight size={15} strokeWidth={2.5} />
          </TrackedCta>
          <TrackedCta
            href={data.hero.secondaryCta.href}
            cta="secondary_cta"
            location={heroSlot}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
          >
            {data.hero.secondaryCta.label}
          </TrackedCta>
        </div>
        {data.hero.supporting && (
          <p className="mx-auto mt-6 max-w-160 text-[14px] leading-[1.65] text-charcoal-lt">
            {data.hero.supporting}
          </p>
        )}
      </PageHero>

      {/* Quick comparison */}
      <section className="mx-auto max-w-300 px-6 pt-8 pb-16">
        <div className="mx-auto mb-8 max-w-180 text-center">
          <span className={sectionLabel}>Quick comparison</span>
          <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
            {data.quickCompare.heading}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card">
          <table className="w-full min-w-200 border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line-soft bg-ivory-light">
                <th className="px-5 py-3 font-bold text-charcoal">Area</th>
                <th className="px-5 py-3 font-bold text-charcoal">{data.competitor}</th>
                <th className="px-5 py-3 font-bold text-accent">HireSort</th>
              </tr>
            </thead>
            <tbody>
              {data.quickCompare.rows.map((row, i) => (
                <tr
                  key={row.area}
                  className={
                    i % 2 === 0
                      ? 'border-b border-line-soft'
                      : 'border-b border-line-soft bg-ivory-light/40'
                  }
                >
                  <td className="px-5 py-3 font-semibold text-charcoal">{row.area}</td>
                  <td className="px-5 py-3 text-charcoal-md">{row.competitor}</td>
                  <td className="px-5 py-3 text-charcoal-md">{row.hiresort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Positioning */}
      {data.positioning && (
        <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
          <div className="mx-auto max-w-275">
            <span className={sectionLabel}>{data.positioning.eyebrow}</span>
            <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
              {data.positioning.title}
            </h2>
            <div className="flex max-w-200 flex-col gap-3">
              {data.positioning.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-charcoal-lt">
                  {p}
                </p>
              ))}
            </div>
            {data.positioning.quote && (
              <blockquote className="my-6 max-w-200 border-l-[3px] border-accent bg-white px-5 py-4 text-[16px] leading-[1.7] font-semibold text-charcoal italic shadow-soft">
                {data.positioning.quote}
              </blockquote>
            )}
            {data.positioning.closing && (
              <p className="max-w-200 text-[15px] leading-[1.7] text-charcoal-lt">
                {data.positioning.closing}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Problem */}
      {data.problem && (
        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className={sectionLabel}>{data.problem.eyebrow}</span>
              <h2 className="text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
                {data.problem.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-[15px] leading-[1.75] text-charcoal-md">
              <p>{data.problem.intro}</p>
              <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
                {data.problem.bullets.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 rounded-md border border-line-soft bg-white px-3 py-2 text-[13.5px] text-charcoal-md shadow-soft"
                  >
                    <XCircle size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p>{data.problem.closing}</p>
            </div>
          </div>
        </section>
      )}

      {/* Evidence */}
      {data.evidence && (
        <section className="mx-auto max-w-300 px-6 py-20">
          <div className="mx-auto mb-10 max-w-180 text-center">
            <span className={sectionLabel}>{data.evidence.eyebrow}</span>
            <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
              {data.evidence.title}
            </h2>
            <p className="text-[15px] leading-[1.7] text-charcoal-lt">
              {data.evidence.intro}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {data.evidence.items.map((item) => (
              <article
                key={item.href}
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
          </div>
        </section>
      )}

      {/* Workflow */}
      {data.workflow && (
        <section className="bg-linear-to-b from-ivory-medium to-ivory px-6 py-20">
          <div className="mx-auto max-w-300">
            <div className="mx-auto mb-10 max-w-180 text-center">
              <span className={sectionLabel}>{data.workflow.eyebrow}</span>
              <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
                {data.workflow.title}
              </h2>
              {data.workflow.intro && (
                <p className="font-mono text-[13px] leading-[1.65] text-charcoal-lt">
                  {data.workflow.intro}
                </p>
              )}
            </div>

            <ol className="grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
              {data.workflow.steps.map((s) => (
                <li
                  key={s.n}
                  className="rounded-xl border border-line-soft bg-white p-6 shadow-soft"
                >
                  <div className="mb-3 font-mono text-[13px] font-bold text-accent">{s.n}</div>
                  <h3 className="mb-2 text-[16.5px] font-bold tracking-[-0.3px] text-charcoal">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-charcoal-lt">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Feature comparison */}
      <section id="feature-compare" className="mx-auto max-w-300 px-6 py-20">
        <div className="mx-auto mb-10 max-w-180 text-center">
          <span className={sectionLabel}>Feature comparison</span>
          <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
            {data.featureCompare.heading}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card">
          <table className="w-full min-w-200 border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line-soft bg-ivory-light">
                <th className="px-5 py-3 font-bold text-charcoal">Workflow need</th>
                <th className="px-5 py-3 font-bold text-charcoal">{data.competitor}</th>
                <th className="px-5 py-3 font-bold text-accent">HireSort</th>
              </tr>
            </thead>
            <tbody>
              {data.featureCompare.rows.map((row, i) => (
                <tr
                  key={row.need}
                  className={
                    i % 2 === 0
                      ? 'border-b border-line-soft'
                      : 'border-b border-line-soft bg-ivory-light/40'
                  }
                >
                  <td className="px-5 py-3 font-semibold text-charcoal">{row.need}</td>
                  <td className="px-5 py-3 text-charcoal-md">{row.competitor}</td>
                  <td className="px-5 py-3 text-charcoal-md">{row.hiresort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Choose lists */}
      <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
        <div className="mx-auto grid max-w-275 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[rgba(200,90,23,0.25)] bg-linear-to-br from-white to-ivory-light p-8 shadow-card">
            <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
              <Sparkles size={13} strokeWidth={2.5} />
              HireSort
            </div>
            <h3 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px] text-charcoal">
              {data.chooseHiresort.title}
            </h3>
            <ul className="flex list-none flex-col gap-2 p-0">
              {data.chooseHiresort.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[14px] text-charcoal-md">
                  <CheckCircle2 size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-line-soft pt-4">
              <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
                {data.chooseHiresort.suitableForTitle}
              </div>
              <ul className="flex list-none flex-col gap-1.5 p-0">
                {data.chooseHiresort.suitableFor.map((s) => (
                  <li key={s} className="text-[13.5px] text-charcoal-md">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {data.chooseCompetitor && (
            <div className="rounded-xl border border-line-soft bg-white p-8 shadow-card">
              <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
                {data.competitor}
              </div>
              <h3 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px] text-charcoal">
                {data.chooseCompetitor.title}
              </h3>
              <ul className="flex list-none flex-col gap-2 p-0">
                {data.chooseCompetitor.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[14px] text-charcoal-md">
                    <CheckCircle2 size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-charcoal-xlt" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line-soft pt-4 text-[13.5px] leading-[1.65] text-charcoal-lt">
                {data.chooseCompetitor.closing}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Differentiator */}
      {data.differentiator && (
        <section className="mx-auto max-w-275 px-6 py-20">
          <span className={sectionLabel}>{data.differentiator.eyebrow}</span>
          <h2 className="mb-4 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
            {data.differentiator.title}
          </h2>
          <div className="mb-6 flex max-w-200 flex-col gap-3">
            {data.differentiator.intro.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.7] text-charcoal-lt">
                {p}
              </p>
            ))}
          </div>
          <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
            {data.differentiator.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-md border border-line-soft bg-white px-4 py-3 text-[14px] text-charcoal-md shadow-soft"
              >
                <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Repository */}
      {data.repository && (
        <section className="bg-linear-to-b from-ivory-medium to-ivory px-6 py-20">
          <div className="mx-auto grid max-w-300 gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <span className={sectionLabel}>{data.repository.eyebrow}</span>
              <h2 className="mb-3 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
                {data.repository.title}
              </h2>
              <p className="text-[15px] leading-[1.7] text-charcoal-lt">{data.repository.intro}</p>
              {data.repository.closing && (
                <p className="mt-4 text-[14.5px] leading-[1.7] text-charcoal-lt">
                  {data.repository.closing}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-line-soft bg-white p-6 shadow-card">
              <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.8px] text-charcoal-xlt">
                <UserSearch size={14} strokeWidth={2.4} />
                Candidate record
              </div>
              <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
                {data.repository.fields.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-charcoal-md">
                    <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Stages */}
      {data.stages && (
        <section className="mx-auto max-w-275 px-6 py-20">
          <span className={sectionLabel}>{data.stages.eyebrow}</span>
          <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
            {data.stages.title}
          </h2>
          <p className="mb-8 max-w-200 text-[15px] leading-[1.7] text-charcoal-lt">
            {data.stages.intro}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.stages.items.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line-soft bg-white px-4 py-2 text-[13px] font-semibold text-charcoal-md shadow-soft"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-200 text-[14.5px] leading-[1.7] text-charcoal-lt">
            {data.stages.closing}
          </p>
        </section>
      )}

      {/* Migration */}
      {data.migration && (
        <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
          <div className="mx-auto max-w-275">
            <span className={sectionLabel}>{data.migration.eyebrow}</span>
            <h2 className="mb-3 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal">
              {data.migration.title}
            </h2>
            <p className="mb-6 max-w-200 text-[15px] leading-[1.7] text-charcoal-lt">
              {data.migration.intro}
            </p>
            <ul className="mb-6 grid list-none gap-2 p-0 sm:grid-cols-2">
              {data.migration.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 rounded-md border border-line-soft bg-white px-4 py-3 text-[14px] text-charcoal-md shadow-soft"
                >
                  <CheckCircle2 size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-200 text-[14.5px] leading-[1.7] text-charcoal-lt">
              {data.migration.closing}
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-250 px-6 pt-20 pb-8">
        <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-linear-to-br from-ivory-light via-white to-ivory-light p-10 text-center shadow-md md:p-14">
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
              <TrackedCta
                href={data.cta.primary.href}
                cta="primary_cta"
                location={ctaSlot}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
              >
                {data.cta.primary.label}
                <ArrowRight size={15} strokeWidth={2.5} />
              </TrackedCta>
              <Link
                href={data.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal no-underline transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
              >
                {data.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-250 px-6 py-16">
        <div className="mx-auto mb-8 max-w-180 text-center">
          <span className={sectionLabel}>FAQ</span>
          <h2 className="text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
            Frequently asked questions
          </h2>
        </div>

        <CompareFaq faqs={data.faqs} />
      </section>

      {/* Internal links */}
      <section className="mx-auto max-w-275 px-6 pb-16">
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

      {/* External references */}
      {data.externalReferences && data.externalReferences.length > 0 && (
        <section className="mx-auto max-w-275 px-6 pb-16">
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

      {/* Disclaimer */}
      <aside
        aria-label="Trademark and informational disclaimer"
        className="mx-auto max-w-275 px-6 pb-20"
      >
        <small className="block text-[12.5px] leading-[1.65] text-charcoal-xlt">
          {data.disclaimer}
        </small>
      </aside>
    </>
  );
};

export default CompareClient;
