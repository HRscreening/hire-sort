import type { BestPage } from './types';
import { aiResumeScreeningSoftware } from './ai-resume-screening-software';
import { atsForStartups } from './ats-for-startups';
import { candidateScreeningSoftware } from './candidate-screening-software';
import { highVolumeHiringSoftware } from './high-volume-hiring-software';
import { recruitmentSoftwareForSmallBusiness } from './recruitment-software-for-small-business';
import { resumeScreeningSoftware } from './resume-screening-software';

const PAGES: Record<string, BestPage> = {
  [aiResumeScreeningSoftware.slug]: aiResumeScreeningSoftware,
  [atsForStartups.slug]: atsForStartups,
  [candidateScreeningSoftware.slug]: candidateScreeningSoftware,
  [highVolumeHiringSoftware.slug]: highVolumeHiringSoftware,
  [recruitmentSoftwareForSmallBusiness.slug]: recruitmentSoftwareForSmallBusiness,
  [resumeScreeningSoftware.slug]: resumeScreeningSoftware,
};

export const getBestPageSlugs = (): string[] => Object.keys(PAGES);

export const getBestPageBySlug = (slug: string): BestPage | null =>
  PAGES[slug] ?? null;

export const getAllBestPages = (): BestPage[] => Object.values(PAGES);

export type { BestPage } from './types';
