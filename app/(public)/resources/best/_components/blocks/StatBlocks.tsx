import type { StatBlock } from '../../_data/types';

type Props = { blocks: StatBlock[] };

const StatBlocks = ({ blocks }: Props) => {
  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((b, idx) => (
        <section key={idx} className="mx-auto max-w-300 px-6 py-12">
          <div className="mx-auto max-w-220">
            {b.heading && (
              <h3 className="mb-2 text-[clamp(20px,2.6vw,26px)] font-extrabold tracking-[-0.3px] text-charcoal">
                {b.heading}
              </h3>
            )}
            {b.intro && (
              <p className="mb-5 text-[14.5px] leading-[1.7] text-charcoal-md">{b.intro}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.items.map((it, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-line-soft bg-white p-5 shadow-soft"
                >
                  <div className="text-[clamp(28px,4vw,36px)] font-extrabold tracking-[-0.5px] text-accent">
                    {it.value}
                  </div>
                  <div className="mt-1 text-[14px] leading-[1.55] text-charcoal-md">{it.label}</div>
                  <a
                    href={it.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[12px] font-semibold text-charcoal-lt no-underline hover:text-accent hover:underline"
                  >
                    Source: {it.sourceLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default StatBlocks;
