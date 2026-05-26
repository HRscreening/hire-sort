import type { ProseSection, TableOfContents as TocConfig } from '../../_data/types';

type Props = {
  config: TocConfig;
  proseSections?: ProseSection[];
};

const TableOfContents = ({ config, proseSections }: Props) => {
  const auto =
    config.autoFromSections && proseSections
      ? proseSections.map((s) => ({ id: s.id, label: s.title }))
      : [];
  const items = [...auto, ...(config.manualItems ?? [])];
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-300 px-6 pb-6">
      <nav
        aria-label="Table of contents"
        className="mx-auto max-w-220 rounded-xl border border-line-soft bg-ivory-light px-5 py-4 shadow-soft"
      >
        <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt">
          On this page
        </div>
        <ol className="grid list-decimal gap-1.5 pl-5 text-[14px] text-charcoal-md md:grid-cols-2">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="no-underline hover:text-accent hover:underline">
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default TableOfContents;
