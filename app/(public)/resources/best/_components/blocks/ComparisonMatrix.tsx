import Link from 'next/link';
import { Check, X } from 'lucide-react';
import type { ComparisonMatrix as MatrixData } from '../../_data/types';

type Props = { data: MatrixData };

const renderCellValue = (value: string | number | boolean) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={15} strokeWidth={2.5} className="text-accent" aria-label="Yes" />
    ) : (
      <X size={15} strokeWidth={2.5} className="text-charcoal-lt" aria-label="No" />
    );
  }
  return <span>{value}</span>;
};

const ComparisonMatrix = ({ data }: Props) => {
  return (
    <section id="comparison-matrix" className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-16">
      <div className="mx-auto max-w-300">
        <div className="mx-auto mb-8 max-w-220 text-center">
          <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
            Side-by-side
          </span>
          <h2 className="mb-2 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
            {data.heading}
          </h2>
          {data.intro && <p className="text-[14.5px] leading-[1.7] text-charcoal-md">{data.intro}</p>}
        </div>

        <div className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card">
          <table className="w-full min-w-220 border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line-soft bg-ivory-light">
                <th className="sticky left-0 z-10 bg-ivory-light px-5 py-3 font-bold text-charcoal">
                  Tool
                </th>
                {data.criteria.map((c) => (
                  <th
                    key={c.key}
                    className="px-5 py-3 font-bold text-charcoal"
                    title={c.tooltip}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tools.map((t, i) => (
                <tr
                  key={t.tool}
                  className={
                    i % 2 === 0
                      ? 'border-b border-line-soft'
                      : 'border-b border-line-soft bg-ivory-light/40'
                  }
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-inherit px-5 py-3 text-left font-semibold text-charcoal"
                  >
                    {t.href ? (
                      t.href.startsWith('/') ? (
                        <Link
                          href={t.href}
                          className="text-charcoal no-underline hover:text-accent hover:underline"
                        >
                          {t.tool}
                        </Link>
                      ) : (
                        <a
                          href={t.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal no-underline hover:text-accent hover:underline"
                        >
                          {t.tool}
                        </a>
                      )
                    ) : (
                      t.tool
                    )}
                  </th>
                  {data.criteria.map((c) => {
                    const cell = t.cells[c.key];
                    return (
                      <td key={c.key} className="px-5 py-3 text-charcoal-md">
                        {cell ? (
                          <div className="flex flex-col gap-0.5">
                            <span>{renderCellValue(cell.value)}</span>
                            {cell.note && (
                              <span className="text-[12px] text-charcoal-lt">{cell.note}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-charcoal-lt">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.winnerByCriterion && Object.keys(data.winnerByCriterion).length > 0 && (
          <div className="mx-auto mt-4 max-w-220 rounded-md border border-line-soft bg-white p-4 text-[13px] text-charcoal-md">
            <span className="font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
              Best by criterion:
            </span>{' '}
            {Object.entries(data.winnerByCriterion).map(([key, tool], i, arr) => {
              const label = data.criteria.find((c) => c.key === key)?.label ?? key;
              return (
                <span key={key}>
                  <span className="font-medium text-charcoal">{label}</span> — {tool}
                  {i < arr.length - 1 ? '; ' : ''}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonMatrix;
