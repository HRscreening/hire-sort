/**
 * Block-based schema for product landing pages.
 *
 * Each page declares its sections as a `ProductBlock[]` rendered in order.
 * Add a new block type here when a page needs a section the existing
 * blocks can't express — don't reach for ad-hoc one-off rendering.
 */

export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

/** Curated icon names — see components/product-pages/icons.tsx for the map. */
export type IconName =
  | 'briefcase'
  | 'database'
  | 'userSearch'
  | 'layers'
  | 'sparkles'
  | 'listChecks'
  | 'refreshCcw'
  | 'filter'
  | 'ganttChart'
  | 'fileText'
  | 'tags'
  | 'workflow'
  | 'checkCircle'
  | 'xCircle'
  | 'rocket'
  | 'building'
  | 'users'
  | 'handCoins'
  | 'gitCompare'
  | 'clipboardCheck'
  | 'shield'
  | 'clock'
  | 'search'
  | 'fileSearch'
  | 'fileScan';

export type ProductBlock =
  | {
      type: 'problem';
      eyebrow?: string;
      title: string;
      intro?: string;
      bullets: string[];
      closing?: string;
    }
  | {
      type: 'positioning';
      eyebrow?: string;
      title: string;
      body: string[];
      /** Optional inline arrow-flow strip (e.g. "Create job → Upload → Screen"). */
      flow?: string[];
      quote?: string;
      closing?: string;
    }
  | {
      type: 'evidence';
      eyebrow?: string;
      title: string;
      intro: string;
      items: {
        title: string;
        body: string;
        href: string;
        label: string;
      }[];
    }
  | {
      type: 'workflow';
      eyebrow?: string;
      title: string;
      intro?: string;
      steps: { n: string; title: string; body: string }[];
    }
  | {
      type: 'features';
      eyebrow?: string;
      title: string;
      intro?: string;
      items: { icon?: IconName; title: string; body: string }[];
    }
  | {
      type: 'fieldList';
      eyebrow?: string;
      title: string;
      intro?: string;
      cardLabel?: string;
      cardIcon?: IconName;
      fields: string[];
      closing?: string;
    }
  | {
      type: 'stages';
      eyebrow?: string;
      title: string;
      intro?: string;
      items: string[];
      closing?: string;
    }
  | {
      type: 'plansSplit';
      eyebrow?: string;
      title: string;
      free: { label?: string; heading: string; bullets: string[] };
      paid: { label?: string; heading: string; bullets: string[] };
    }
  | {
      type: 'useCases';
      eyebrow?: string;
      title: string;
      items: { icon?: IconName; title: string; body: string }[];
    }
  | {
      type: 'comparison';
      eyebrow?: string;
      title: string;
      columns: string[];
      rows: string[][];
      /** Index of the column that should be highlighted (e.g. "HireSort"). */
      accentColIndex?: number;
    }
  | {
      type: 'why';
      eyebrow?: string;
      title: string;
      items: { title: string; body: string }[];
    }
  | {
      type: 'scope';
      eyebrow?: string;
      title: string;
      inLabel?: string;
      inItems: string[];
      outLabel?: string;
      outItems: string[];
    }
  | {
      type: 'callout';
      title?: string;
      body: string;
    }
  | {
      type: 'paragraph';
      eyebrow?: string;
      title?: string;
      body: string[];
    };

export type ProductPage = {
  slug: string;
  /** Display name for breadcrumbs / JSON-LD `about`. */
  product: string;
  /** Eyebrow icon for the hero. */
  heroIcon?: IconName;
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
    primary: Cta;
    secondary: Cta;
    supporting?: string;
  };

  sections: ProductBlock[];

  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
  };

  faqs: FaqItem[];

  internalLinks: { href: string; label: string }[];
};
