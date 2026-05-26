import type { Methodology as MethodologyData } from '../../_data/types';

type Props = { data: MethodologyData };

const Methodology = ({ data }: Props) => {
  return (
    <section id="methodology" className="mx-auto max-w-300 px-6 py-16">
      <div className="mx-auto max-w-220">
        <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
          Methodology
        </span>
        <h2 className="mb-4 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
          {data.title}
        </h2>
        <p className="mb-8 text-[15px] leading-[1.7] text-charcoal-md">{data.intro}</p>

        <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card">
          <table className="w-full min-w-160 border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line-soft bg-ivory-light">
                <th className="px-5 py-3 font-bold text-charcoal">Criterion</th>
                <th className="px-5 py-3 font-bold text-charcoal">Weight</th>
                <th className="px-5 py-3 font-bold text-charcoal">Why it matters</th>
                <th className="px-5 py-3 font-bold text-charcoal">How we measured it</th>
              </tr>
            </thead>
            <tbody>
              {data.criteria.map((c, i) => (
                <tr
                  key={c.name}
                  className={
                    i % 2 === 0
                      ? 'border-b border-line-soft'
                      : 'border-b border-line-soft bg-ivory-light/40'
                  }
                >
                  <td className="px-5 py-3 font-semibold text-charcoal">{c.name}</td>
                  <td className="px-5 py-3 font-mono text-charcoal-md">{c.weight}%</td>
                  <td className="px-5 py-3 text-charcoal-md">{c.description}</td>
                  <td className="px-5 py-3 text-charcoal-md">{c.howWeMeasured}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(data.scoringScale || data.reviewedDate || data.reviewerNote) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-charcoal-lt">
            {data.scoringScale && (
              <span>
                <span className="font-semibold text-charcoal-md">Scale:</span> {data.scoringScale}
              </span>
            )}
            {data.reviewedDate && (
              <span>
                <span className="font-semibold text-charcoal-md">Last reviewed:</span>{' '}
                {data.reviewedDate}
              </span>
            )}
          </div>
        )}
        {data.reviewerNote && (
          <p className="mt-3 text-[12.5px] italic leading-[1.6] text-charcoal-lt">
            {data.reviewerNote}
          </p>
        )}
      </div>
    </section>
  );
};

export default Methodology;
