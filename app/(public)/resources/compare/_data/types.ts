export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type CompetitorPage = {
  slug: string;
  competitor: string;
  /** ISO date the page was first published. */
  publishedAt: string;
  /** ISO date the page content was last updated. Drives sitemap + WebPage JSON-LD freshness. */
  updatedAt: string;

  meta: {
    title: string;
    description: string;
    keywords: string[];
    /** Path under /public for the social share image (1200x630 recommended). */
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
    secondaryCta: Cta;
    supporting?: string;
  };

  quickCompare: {
    heading: string;
    rows: { area: string; competitor: string; hiresort: string }[];
  };

  positioning?: {
    eyebrow: string;
    title: string;
    body: string[];
    quote?: string;
    closing?: string;
  };

  problem?: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    closing: string;
  };

  workflow?: {
    eyebrow: string;
    title: string;
    intro?: string;
    steps: { n: string; title: string; body: string }[];
  };

  featureCompare: {
    heading: string;
    rows: { need: string; competitor: string; hiresort: string }[];
  };

  chooseHiresort: {
    title: string;
    bullets: string[];
    suitableForTitle: string;
    suitableFor: string[];
  };

  chooseCompetitor?: {
    title: string;
    bullets: string[];
    closing: string;
  };

  differentiator?: {
    eyebrow: string;
    title: string;
    intro: string[];
    bullets: string[];
  };

  repository?: {
    eyebrow: string;
    title: string;
    intro: string;
    fields: string[];
    closing?: string;
  };

  stages?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: string[];
    closing: string;
  };

  migration?: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    closing: string;
  };

  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
  };

  faqs: FaqItem[];

  internalLinks: { href: string; label: string }[];

  externalReferences?: { href: string; label: string; description: string }[];

  disclaimer: string;
};
