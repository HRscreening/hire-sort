export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type ToolRow = {
  tool: string;
  href?: string;
  bestFit: string;
  whyItMayWork: string;
  watchOut: string;
};

export type FrameworkTable = {
  heading: string;
  columns: [string, string, string] | [string, string];
  rows: Array<[string, string, string] | [string, string]>;
};

export type ListSection = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: string[];
};

export type BestPage = {
  slug: string;
  category: string;
  publishedAt: string;
  updatedAt: string;

  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    ogImageAlt?: string;
  };

  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix?: string;
    lead: string[];
    primaryCta: Cta;
    secondaryCta?: Cta;
    supporting?: string;
  };

  whatToLookFor?: ListSection;

  toolsTable: {
    heading: string;
    rows: ToolRow[];
  };

  /** Optional positioning block ("Where HireSort fits", "How HireSort approaches X"). */
  positioning?: {
    eyebrow?: string;
    title: string;
    body: string[];
  };

  /** Optional decision / comparison framework table. */
  framework?: FrameworkTable;

  /** Optional evidence-backed market context with outbound sources. */
  evidence?: {
    eyebrow?: string;
    title: string;
    intro: string;
    items: { title: string; body: string; href: string; label: string }[];
  };

  /** Optional ordered list of considerations or how-to-choose steps. */
  howToChoose?: ListSection;

  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: Cta;
    secondary?: Cta;
  };

  faqs: FaqItem[];

  internalLinks: { href: string; label: string }[];

  externalReferences?: { href: string; label: string; description: string }[];

  disclaimer?: string;
};
