import type { ProductPage } from './types';
import { applicantTrackingSystem } from '../_data/applicant-tracking-system';
import { recruitmentSoftware } from '../_data/recruitment-software';
import { resumeManagement } from '../_data/resume-management';
import { resumeParser } from '../_data/resume-parser';
import { candidatePipeline } from '../_data/candidate-pipeline';

/**
 * Registry of all product landing pages keyed by slug.
 * To add a new page: write a data file under ./data/, import it here,
 * and add an entry. The route's page.tsx + sitemap pick it up automatically.
 */
const PAGES: Record<string, ProductPage> = {
  [applicantTrackingSystem.slug]: applicantTrackingSystem,
  [recruitmentSoftware.slug]: recruitmentSoftware,
  [resumeManagement.slug]: resumeManagement,
  [resumeParser.slug]: resumeParser,
  [candidatePipeline.slug]: candidatePipeline,
};

export const getProductPageSlugs = (): string[] => Object.keys(PAGES);

export const getProductPageBySlug = (slug: string): ProductPage | null =>
  PAGES[slug] ?? null;

export const getAllProductPages = (): ProductPage[] => Object.values(PAGES);

export type { ProductPage } from './types';
