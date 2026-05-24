import { Scale } from 'lucide-react';
import type { RegulationSection } from '../../_data/types';

type Props = { data: RegulationSection };

const Regulation = ({ data }: Props) => {
  return (
    <section id="regulation" className="bg-linear-to-b from-ivory-medium to-ivory px-6 py-16">
      <div className="mx-auto max-w-300">
        <div className="mx-auto mb-6 max-w-220 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
            <Scale size={13} strokeWidth={2.5} />
            Regulation
          </span>
          <h2 className="mb-2 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
            {data.title}
          </h2>
          <p className="text-[14.5px] leading-[1.7] text-charcoal-md">{data.intro}</p>
          <p className="mt-2 text-[12px] text-charcoal-lt">Last reviewed: {data.lastReviewed}</p>
        </div>

        <div className="mx-auto grid max-w-260 gap-4 md:grid-cols-2">
          {data.jurisdictions.map((j) => (
            <article
              key={j.jurisdiction + j.lawName}
              className="rounded-xl border border-line-soft bg-white p-5 shadow-soft"
            >
              <header className="mb-2">
                <div className="text-[12px] font-bold uppercase tracking-[0.6px] text-accent">
                  {j.jurisdiction}
                </div>
                <h3 className="text-[17px] font-extrabold tracking-[-0.2px] text-charcoal">
                  {j.lawName}
                </h3>
                <div className="mt-0.5 text-[12.5px] text-charcoal-lt">
                  Effective: {j.effectiveDate}
                </div>
              </header>
              <p className="mb-3 text-[14px] leading-[1.65] text-charcoal-md">{j.summary}</p>
              {j.employerRequirements.length > 0 && (
                <div className="mb-3">
                  <h4 className="mb-1 text-[12px] font-bold uppercase tracking-[0.4px] text-charcoal-xlt">
                    Employer requirements
                  </h4>
                  <ul className="ml-5 list-disc text-[13.5px] leading-[1.65] text-charcoal-md">
                    {j.employerRequirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
              <a
                href={j.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] font-semibold text-accent no-underline hover:underline"
              >
                Source: {j.sourceLabel}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-220 text-center text-[12px] italic leading-[1.6] text-charcoal-lt">
          {data.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default Regulation;
