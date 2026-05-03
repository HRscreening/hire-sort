import type { CompetitorPage } from './types';
import { workableAlternative } from './workable-alternative';

const PAGES: Record<string, CompetitorPage> = {
  [workableAlternative.slug]: workableAlternative,
};

export const getComparisonSlugs = (): string[] => Object.keys(PAGES);

export const getComparisonBySlug = (slug: string): CompetitorPage | null =>
  PAGES[slug] ?? null;

export type { CompetitorPage } from './types';
