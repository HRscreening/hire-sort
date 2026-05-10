import type { CompetitorPage } from './types';
import { workableAlternative } from './workable-alternative';
import { greenhouseAlternative } from './greenhouse-alternative';
import { aiResumeScreeningVsAts } from './ai-resume-screening-vs-ats';

const PAGES: Record<string, CompetitorPage> = {
  [workableAlternative.slug]: workableAlternative,
  [greenhouseAlternative.slug]: greenhouseAlternative,
  [aiResumeScreeningVsAts.slug]: aiResumeScreeningVsAts,
};

export const getComparisonSlugs = (): string[] => Object.keys(PAGES);

export const getComparisonBySlug = (slug: string): CompetitorPage | null =>
  PAGES[slug] ?? null;

export type { CompetitorPage } from './types';
