import Image from 'next/image';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';
import type { ProseBlock, ProseSection as ProseSectionData } from '../../_data/types';

const calloutIcon = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};
const calloutBg = {
  info: 'border-line-soft bg-ivory-light',
  warning: 'border-copper-light bg-amber-50/60',
  tip: 'border-line-soft bg-white',
};

const renderBlock = (block: ProseBlock, i: number) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={i} className="text-[15px] leading-[1.75] text-charcoal-md">
          {block.text}
        </p>
      );
    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h4';
      const cls =
        block.level === 3
          ? 'mt-4 mb-1 text-[clamp(18px,2.2vw,22px)] font-bold tracking-[-0.3px] text-charcoal'
          : 'mt-3 mb-1 text-[16px] font-bold tracking-[-0.2px] text-charcoal';
      return (
        <Tag key={i} className={cls}>
          {block.text}
        </Tag>
      );
    }
    case 'list': {
      const items = block.items.map((it, j) => (
        <li key={j} className="text-[15px] leading-[1.75] text-charcoal-md">
          {it}
        </li>
      ));
      return block.ordered ? (
        <ol key={i} className="ml-6 list-decimal text-charcoal-md">
          {items}
        </ol>
      ) : (
        <ul key={i} className="ml-6 list-disc text-charcoal-md">
          {items}
        </ul>
      );
    }
    case 'quote':
      return (
        <blockquote
          key={i}
          className="border-l-4 border-accent bg-ivory-light/60 px-5 py-3 text-[15px] italic leading-[1.65] text-charcoal-md"
        >
          {block.text}
          {block.attribution && (
            <footer className="mt-2 text-[12.5px] not-italic text-charcoal-lt">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case 'callout': {
      const Icon = calloutIcon[block.variant];
      return (
        <aside
          key={i}
          className={`flex gap-3 rounded-md border px-4 py-3 ${calloutBg[block.variant]}`}
        >
          <Icon size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-accent" />
          <div>
            {block.title && (
              <div className="mb-1 text-[13px] font-bold uppercase tracking-[0.4px] text-charcoal">
                {block.title}
              </div>
            )}
            <p className="text-[14px] leading-[1.65] text-charcoal-md">{block.text}</p>
          </div>
        </aside>
      );
    }
    case 'image':
      return (
        <figure key={i} className="my-2">
          <Image
            src={block.src}
            alt={block.alt}
            width={800}
            height={450}
            className="w-full rounded-xl border border-line-soft"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-[12.5px] text-charcoal-lt">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
};

type Props = { sections: ProseSectionData[] };

const ProseSections = ({ sections }: Props) => {
  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="mx-auto max-w-300 px-6 py-14">
          <div className="mx-auto max-w-220">
            {s.eyebrow && (
              <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
                {s.eyebrow}
              </span>
            )}
            <h2 className="mb-3 text-[clamp(24px,3.2vw,32px)] font-extrabold leading-[1.2] tracking-[-0.6px] text-charcoal">
              {s.title}
            </h2>
            {s.lead && (
              <p className="mb-5 text-[16px] font-medium leading-[1.65] text-charcoal">{s.lead}</p>
            )}
            <div className="flex flex-col gap-3">{s.body.map(renderBlock)}</div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ProseSections;
