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

export type RecommendationCard = {
  label: string;
  tool: string;
  href?: string;
  description: string;
};

// ────────────────────────────────────────────────────────────────────────────
// Long-form guide blocks (introduced 2026-05-22, Change #3a)
//
// All fields below are OPTIONAL on `BestPage`. Existing guides that do not set
// them render unchanged. Authoring a 5,000+ word guide uses these blocks to
// add a methodology section, per-tool deep dives, prose sections with mixed
// content, sourced stats, a regulatory section, and explicit Article +
// FAQPage JSON-LD opt-in.
// ────────────────────────────────────────────────────────────────────────────

/** Named human author for E-E-A-T signal and Article JSON-LD `author.Person`. */
export type Author = {
  name: string;
  role: string;
  /** 1–2 sentences. Surfaced in byline and Article schema description. */
  bio: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  /** Short tags shown next to byline: e.g., ["10+ years recruiting", "former PM"]. */
  expertiseTags?: string[];
};

/** "How we evaluated these tools" — methodology disclosure section. */
export type Methodology = {
  title: string;
  intro: string;
  criteria: Array<{
    name: string;
    /** 0–100. Sum across all criteria should equal 100 (not enforced by type). */
    weight: number;
    description: string;
    howWeMeasured: string;
  }>;
  /** Free-text scale label, e.g. "1–5, where 5 = best in class". */
  scoringScale?: string;
  /** ISO date string. */
  reviewedDate?: string;
  /** Caveats, e.g. "Not all tools tested hands-on; see disclaimer". */
  reviewerNote?: string;
};

/** Long-form per-tool capsule. Replaces the short 3-field `ToolRow`. */
export type ToolDeepDive = {
  tool: string;
  href?: string;
  logoUrl?: string;
  oneLiner: string;
  pricingRange?: string;
  pricingNote?: string;
  bestFor: string;
  notIdealFor?: string;
  keyCapabilities: string[];
  prosAndCons?: { pros: string[]; cons: string[] };
  /** 3–5 paragraphs, target 250–350 words total per tool. */
  bodyParagraphs: string[];
  /**
   * Per-criterion scores. Keys must match `Methodology.criteria[].name` slugified
   * (lowercase, hyphens) so the renderer can join them to the scoring matrix.
   */
  scoringSummary?: Record<string, number>;
  /** 1-sentence takeaway. Drives AI-citation verdict extraction. */
  verdict?: string;
};

/** Block-level content inside a `ProseSection.body`. Discriminated union. */
export type ProseBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 3 | 4; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | {
      type: 'callout';
      variant: 'info' | 'warning' | 'tip';
      title?: string;
      text: string;
    }
  | { type: 'image'; src: string; alt: string; caption?: string };

/** Generic long-form section. Sections are ordered; `id` doubles as ToC anchor. */
export type ProseSection = {
  id: string;
  eyebrow?: string;
  title: string;
  /** Bold intro paragraph rendered above `body`. */
  lead?: string;
  body: ProseBlock[];
};

/** Sourced data callouts. Every item must cite a source URL. */
export type StatBlock = {
  heading?: string;
  intro?: string;
  items: Array<{
    /** The headline number/figure, e.g. "37%". */
    value: string;
    label: string;
    sourceLabel: string;
    sourceUrl: string;
  }>;
};

/** Multi-criterion comparison matrix. Renders as an HTML `<table>` for AI extraction. */
export type ComparisonMatrix = {
  heading: string;
  intro?: string;
  criteria: Array<{
    /** Slug-style key referenced by `tools[].cells` and `winnerByCriterion`. */
    key: string;
    label: string;
    tooltip?: string;
  }>;
  tools: Array<{
    tool: string;
    href?: string;
    /** Keyed by `criteria[].key`. */
    cells: Record<
      string,
      {
        value: string | boolean | number;
        note?: string;
      }
    >;
  }>;
  /** Optional: `criteria.key` → winning tool name. */
  winnerByCriterion?: Record<string, string>;
};

/** Regulatory / compliance section. Jurisdiction-agnostic shape. */
export type RegulationSection = {
  title: string;
  intro: string;
  /** ISO date. Surfaced in UI so readers can judge freshness of legal info. */
  lastReviewed: string;
  jurisdictions: Array<{
    /** Free-text jurisdiction, e.g. "California", "European Union", "India". */
    jurisdiction: string;
    /** Law/regulation name, e.g. "EU AI Act" or "DPDP Act 2023". */
    lawName: string;
    /** Free-text effective date, e.g. "October 2025" or "Phased through 2027". */
    effectiveDate: string;
    summary: string;
    employerRequirements: string[];
    sourceUrl: string;
    sourceLabel: string;
  }>;
  /** Required: explicit "not legal advice" line. */
  disclaimer: string;
};

/** Manual or auto-generated table of contents source. */
export type TableOfContents = {
  /** If true, ToC is built from `ProseSection.id` + `title` at render time. */
  autoFromSections?: boolean;
  /** Manual override or supplement; rendered if present. */
  manualItems?: Array<{ id: string; label: string }>;
};

/** Per-page JSON-LD opt-in flags. Default: no Article/FAQPage emission. */
export type SchemaFlags = {
  /** Emit Article JSON-LD using `authors[0]`, `publishedAt`, `updatedAt`. */
  emitArticleJsonLd?: boolean;
  /** Emit FAQPage JSON-LD from `faqs`. AI/LLM citation only (not Google rich result for commercial sites). */
  emitFaqPageJsonLd?: boolean;
};

// ────────────────────────────────────────────────────────────────────────────

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

  quickRecommendations?: {
    eyebrow?: string;
    title: string;
    intro?: string;
    cards: RecommendationCard[];
  };

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

  // ── Long-form additions (Change #3a). All optional. ───────────────────────

  /** Named human authors. Strictly optional; renderer falls back to no byline. */
  authors?: Author[];

  /** Estimated reading time in minutes. Used in UI and Article schema. */
  readingTimeMinutes?: number;

  /** ToC config. If omitted, no ToC renders. */
  tableOfContents?: TableOfContents;

  /** Methodology disclosure. Surfaces criteria and weights used to score tools. */
  methodology?: Methodology;

  /** Long-form per-tool capsules. Complements (does not replace) `toolsTable`. */
  toolDeepDives?: ToolDeepDive[];

  /** Multi-criterion comparison table for AI-citation-friendly extraction. */
  comparisonMatrix?: ComparisonMatrix;

  /** Ordered long-form prose sections. Authoring escape hatch for free-form content. */
  proseSections?: ProseSection[];

  /** Inline sourced data callouts. */
  stats?: StatBlock[];

  /** Regulation / compliance section (India, US, EU, UK, etc.). */
  regulation?: RegulationSection;

  /** Per-page JSON-LD opt-in flags. */
  schema?: SchemaFlags;
};
