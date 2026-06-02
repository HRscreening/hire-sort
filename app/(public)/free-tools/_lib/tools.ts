import data from '../_data/tools.json';

/**
 * Free-tools hub data. The source of truth is `_data/tools.json` — to add a tool,
 * append an entry there (no code change needed). The hub page + sitemap pick it up
 * automatically. Keep `icon` in sync with the `ICONS` map in `page.tsx`.
 */

export type ToolStatus = 'live' | 'coming-soon';

export type ToolLink = {
  label: string;
  href: string;
  /** Short clarifier shown under related links. */
  note?: string;
};

export type FreeTool = {
  slug: string;
  name: string;
  eyebrow: string;
  /** Icon key — must exist in the `ICONS` map in the hub page. */
  icon: string;
  /** Optional grouping label. Used to split tools into columns in the navbar mega menu. */
  category?: string;
  status: ToolStatus;
  tagline: string;
  description: string;
  /** Bullet list answering "when should I reach for this tool?". */
  whenToUse: string[];
  features: string[];
  /** Short, scannable tag labels shown on the hub card. Falls back to `features`. */
  tags?: string[];
  cta: ToolLink;
  secondaryCta?: ToolLink;
  keywords: string[];
  /** Internal links out to related resources/products (SEO + discovery). */
  related: ToolLink[];
};

const TOOLS = (data.tools as FreeTool[]);

export const getAllTools = (): FreeTool[] => TOOLS;

export const getLiveTools = (): FreeTool[] =>
  TOOLS.filter((t) => t.status === 'live');
