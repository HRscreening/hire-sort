/**
 * Content schema for the dedicated, indexable per-tool SEO pages
 * (e.g. /free-tools/resume-screening). The free-tools hub (`_lib/tools.ts`)
 * stays the source of truth for the card grid; this module is the source of
 * truth for the long-form, crawlable detail pages.
 *
 * To add a tool page: write a data file under this folder, then register it
 * in `index.ts`. The static route, hub link, and sitemap pick it up from there.
 */

export type ToolDetailLink = {
  label: string;
  href: string;
  /** Short clarifier shown under related links. */
  note?: string;
};

export type ToolDetailFaq = {
  question: string;
  /** Plain-text answer (one or more paragraphs). */
  answer: string[];
};

export type ToolDetailStep = {
  title: string;
  body: string;
};

export type ToolDetailFeature = {
  title: string;
  body: string;
};

export type ToolDetail = {
  /**
   * URL slug AND the matching `slug` in `_data/tools.json`. The page renders at
   * `/free-tools/<slug>`. Must NOT collide with an interactive app route name
   * (jd-generator, rubric-generator, screening) — those live in the (tools)
   * route group and would conflict.
   */
  slug: string;
  /** Display name used in breadcrumbs and JSON-LD. */
  name: string;
  /** Stable dates for sitemap `lastModified` and JSON-LD. Bump on real edits. */
  publishedAt: string;
  updatedAt: string;

  /** The interactive app this page funnels into, e.g. "/free-tools/jd-generator". */
  appHref: string;

  /** Defaults to SoftwareApplication; use DigitalDocument for downloadable files/templates. */
  schemaType?: 'SoftwareApplication' | 'DigitalDocument';

  meta: {
    title: string;
    description: string;
    keywords: string[];
    /** Defaults to /logo.png when omitted. */
    ogImage?: string;
  };

  hero: {
    eyebrow: string;
    /** Headline split so the accent word can be coloured. */
    titlePrefix: string;
    titleAccent: string;
    titleSuffix?: string;
    lead: string;
    /** Primary button label (the button launches `appHref`). */
    ctaLabel: string;
  };

  /** Long-form intro paragraphs — the main crawlable body. */
  intro: string[];

  howItWorks: {
    title: string;
    intro?: string;
    steps: ToolDetailStep[];
  };

  features: {
    title: string;
    intro?: string;
    items: ToolDetailFeature[];
  };

  whenToUse: {
    title: string;
    items: string[];
  };

  faqs: ToolDetailFaq[];

  /** Internal links out to related resources/products (SEO + discovery). */
  related: ToolDetailLink[];
};
