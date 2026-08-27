import type { ProductPage } from '@/app/(public)/product/_lib/types';
import { withEndToEndContext } from '@/app/(public)/product/_lib/end-to-end-context';
import { founderLedHiring } from '../_data/founder-led-hiring';
import { highVolumeHiring } from '../_data/high-volume-hiring';
import { recruiters } from '../_data/recruiters';
import { hiringManagers } from '../_data/hiring-managers';
import { recruitmentAgencies } from '../_data/recruitment-agencies';
import { doneForYouHiring, recruiterInTheLoop } from '../_data/agentic-use-cases';

/**
 * Registry of all use-case landing pages keyed by slug.
 * To add a new page: write a data file under ./_data/, import it here,
 * and add an entry. The route's page.tsx + sitemap pick it up automatically.
 */
const BASE_PAGES: Record<string, ProductPage> = {
  [founderLedHiring.slug]: founderLedHiring,
  [highVolumeHiring.slug]: highVolumeHiring,
  [recruiters.slug]: recruiters,
  [hiringManagers.slug]: hiringManagers,
  [recruitmentAgencies.slug]: recruitmentAgencies,
  [doneForYouHiring.slug]: doneForYouHiring,
  [recruiterInTheLoop.slug]: recruiterInTheLoop,
};

const PAGES: Record<string, ProductPage> = Object.fromEntries(
  Object.values(BASE_PAGES).map((page) => [page.slug, withEndToEndContext(page)]),
) as Record<string, ProductPage>;

export const getUseCaseSlugs = (): string[] => Object.keys(PAGES);

export const getUseCaseBySlug = (slug: string): ProductPage | null =>
  PAGES[slug] ?? null;

export const getAllUseCases = (): ProductPage[] => Object.values(PAGES);

export type { ProductPage } from '@/app/(public)/product/_lib/types';
