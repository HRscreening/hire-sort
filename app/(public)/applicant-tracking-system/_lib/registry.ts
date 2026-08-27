import type { ProductPage } from '@/app/(public)/product/_lib/types';
import { withEndToEndContext } from '@/app/(public)/product/_lib/end-to-end-context';
import { atsForSmallBusinesses } from '../_data/smb';
import { atsForStartups } from '../_data/startups';

const BASE_PAGES: Record<string, ProductPage> = {
  [atsForSmallBusinesses.slug]: atsForSmallBusinesses,
  [atsForStartups.slug]: atsForStartups,
};

const PAGES: Record<string, ProductPage> = Object.fromEntries(
  Object.values(BASE_PAGES).map((page) => [page.slug, withEndToEndContext(page)]),
) as Record<string, ProductPage>;

export const getAtsPageSlugs = (): string[] => Object.keys(PAGES);

export const getAtsPageBySlug = (slug: string): ProductPage | null =>
  PAGES[slug] ?? null;

export const getAllAtsPages = (): ProductPage[] => Object.values(PAGES);

export type { ProductPage } from '@/app/(public)/product/_lib/types';
