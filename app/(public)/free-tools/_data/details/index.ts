import type { ToolDetail } from './types';
import { resumeScreening } from './resume-screening';
import { generateRubric } from './generate-rubric';
import { jobDescriptionGenerator } from './job-description-generator';

/**
 * Registry of all dedicated tool detail pages keyed by slug.
 * To add a page: write a data file in this folder, import it here, and add an
 * entry. The static route, free-tools hub link, and sitemap pick it up.
 */
const TOOL_DETAILS: Record<string, ToolDetail> = {
  [resumeScreening.slug]: resumeScreening,
  [generateRubric.slug]: generateRubric,
  [jobDescriptionGenerator.slug]: jobDescriptionGenerator,
};

export const getToolDetailSlugs = (): string[] => Object.keys(TOOL_DETAILS);

export const getToolDetailBySlug = (slug: string): ToolDetail | null =>
  TOOL_DETAILS[slug] ?? null;

export const getAllToolDetails = (): ToolDetail[] => Object.values(TOOL_DETAILS);

export type { ToolDetail } from './types';
