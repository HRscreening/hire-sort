import type { ScreeningRubricPage } from './types';
import { businessDevelopmentExecutive } from './business-development-executive';
import { customerSupport } from './customer-support';
import { dataAnalyst } from './data-analyst';
import { financeAnalyst } from './finance-analyst';
import { hrExecutive } from './hr-executive';
import { marketingManager } from './marketing-manager';
import { productManager } from './product-manager';
import { salesExecutive } from './sales-executive';
import { softwareEngineer } from './software-engineer';

const PAGES: Record<string, ScreeningRubricPage> = {
  [softwareEngineer.slug]: softwareEngineer,
  [salesExecutive.slug]: salesExecutive,
  [productManager.slug]: productManager,
  [dataAnalyst.slug]: dataAnalyst,
  [customerSupport.slug]: customerSupport,
  [marketingManager.slug]: marketingManager,
  [hrExecutive.slug]: hrExecutive,
  [financeAnalyst.slug]: financeAnalyst,
  [businessDevelopmentExecutive.slug]: businessDevelopmentExecutive,
};

export const getScreeningRubricSlugs = (): string[] => Object.keys(PAGES);

export const getScreeningRubricBySlug = (slug: string): ScreeningRubricPage | null =>
  PAGES[slug] ?? null;

export const getAllScreeningRubrics = (): ScreeningRubricPage[] => Object.values(PAGES);

export type { ScreeningRubricPage } from './types';
