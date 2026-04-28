import {
  BookOpen,
  Briefcase,
  ClipboardList,
  Compass,
  FileSearch,
  Layers,
  Lightbulb,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

const VARIANT_COUNT = 5;

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickVariant(seed: string): number {
  return hash(seed) % VARIANT_COUNT;
}

const ICON_KEYWORDS: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /(ai|ml|model|smart|intelligen)/i, icon: Sparkles },
  { match: /(screen|resume|cv|filter|sort)/i, icon: FileSearch },
  { match: /(workflow|process|pipeline|stage)/i, icon: Workflow },
  { match: /(team|people|candidate|talent|hire|recruit)/i, icon: Users },
  { match: /(template|checklist|guide|playbook)/i, icon: ClipboardList },
  { match: /(role|job|career|position)/i, icon: Briefcase },
  { match: /(strategy|plan|goal|target|metric)/i, icon: Target },
  { match: /(insight|idea|tip|learn)/i, icon: Lightbulb },
  { match: /(compare|review|analysis|research)/i, icon: Compass },
  { match: /(stack|tool|integration|platform)/i, icon: Layers },
];

function pickIcon(category?: string): LucideIcon {
  if (!category) return BookOpen;
  for (const entry of ICON_KEYWORDS) {
    if (entry.match.test(category)) return entry.icon;
  }
  return BookOpen;
}

function CategoryLabel({ category }: { category?: string }) {
  if (!category) return null;
  return (
    <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.8px] text-accent shadow-soft backdrop-blur-sm">
      {category}
    </span>
  );
}

function CenterMark({
  category,
  tone,
}: {
  category?: string;
  tone: 'light' | 'dark';
}) {
  const Icon = pickIcon(category);
  const ringBg = tone === 'light' ? 'bg-white/70' : 'bg-white/15';
  const ringRing = tone === 'light' ? 'ring-accent/15' : 'ring-white/25';
  const iconColor = tone === 'light' ? 'text-accent' : 'text-white';
  return (
    <div
      className={`flex h-[88px] w-[88px] items-center justify-center rounded-full ring-1 ${ringBg} ${ringRing} backdrop-blur-sm`}
    >
      <Icon size={40} strokeWidth={1.6} className={iconColor} />
    </div>
  );
}

function VariantDiagonal({ category }: { category?: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light text-white">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 14px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterMark category={category} tone="dark" />
      </div>
      <CategoryLabel category={category} />
    </div>
  );
}

function VariantDots({ category }: { category?: string }) {
  return (
    <div className="absolute inset-0 bg-ivory-medium text-charcoal">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-accent) 1px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterMark category={category} tone="light" />
      </div>
      <CategoryLabel category={category} />
    </div>
  );
}

function VariantBlob({ category }: { category?: string }) {
  return (
    <div className="absolute inset-0 bg-ivory-light text-charcoal">
      <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-accent/15 blur-2xl" />
      <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-accent/25 blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterMark category={category} tone="light" />
      </div>
      <CategoryLabel category={category} />
    </div>
  );
}

function VariantGrid({ category }: { category?: string }) {
  return (
    <div className="absolute inset-0 bg-charcoal text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterMark category={category} tone="dark" />
      </div>
      <CategoryLabel category={category} />
    </div>
  );
}

function VariantSplit({ category }: { category?: string }) {
  return (
    <div className="absolute inset-0 flex">
      <div className="relative flex-1 bg-ivory-light" />
      <div className="relative flex-1 bg-accent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterMark category={category} tone="light" />
      </div>
      <CategoryLabel category={category} />
    </div>
  );
}

export function CoverPlaceholder({
  seed,
  category,
}: {
  seed: string;
  category?: string;
}) {
  const variant = pickVariant(seed);

  switch (variant) {
    case 0:
      return <VariantDiagonal category={category} />;
    case 1:
      return <VariantDots category={category} />;
    case 2:
      return <VariantBlob category={category} />;
    case 3:
      return <VariantGrid category={category} />;
    default:
      return <VariantSplit category={category} />;
  }
}
