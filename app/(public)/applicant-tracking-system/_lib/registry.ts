import type { ProductPage } from '@/app/(public)/product/_lib/types';
import { atsForSmallBusinesses } from '../_data/smb';
import { atsForStartups } from '../_data/startups';

const PAGES: Record<string, ProductPage> = {
  [atsForSmallBusinesses.slug]: atsForSmallBusinesses,
  [atsForStartups.slug]: atsForStartups,
};

export const getAtsPageSlugs = (): string[] => Object.keys(PAGES);

export const getAtsPageBySlug = (slug: string): ProductPage | null =>
  PAGES[slug] ?? null;

export const getAllAtsPages = (): ProductPage[] => Object.values(PAGES);

export type { ProductPage } from '@/app/(public)/product/_lib/types';
