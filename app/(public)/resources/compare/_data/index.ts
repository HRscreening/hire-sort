import type { CompetitorPage } from './types';
import { workableAlternative } from './workable-alternative';
import { greenhouseAlternative } from './greenhouse-alternative';
import { aiResumeScreeningVsAts } from './ai-resume-screening-vs-ats';
import { leverAlternative } from './lever-alternative';
import { hiresortVsManualScreening } from './hiresort-vs-manual-screening';
import { hiresortVsSpreadsheets } from './hiresort-vs-spreadsheets';
import { resumeScreeningVsParser } from './resume-screening-software-vs-resume-parser';

const PAGES: Record<string, CompetitorPage> = {
  [workableAlternative.slug]: workableAlternative,
  [greenhouseAlternative.slug]: greenhouseAlternative,
  [aiResumeScreeningVsAts.slug]: aiResumeScreeningVsAts,
  [leverAlternative.slug]: leverAlternative,
  [hiresortVsManualScreening.slug]: hiresortVsManualScreening,
  [hiresortVsSpreadsheets.slug]: hiresortVsSpreadsheets,
  [resumeScreeningVsParser.slug]: resumeScreeningVsParser,
};

export const getComparisonSlugs = (): string[] => Object.keys(PAGES);

export const getComparisonBySlug = (slug: string): CompetitorPage | null =>
  PAGES[slug] ?? null;

export type { CompetitorPage } from './types';
