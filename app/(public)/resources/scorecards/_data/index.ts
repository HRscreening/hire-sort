import type { ScorecardPage } from './types';
import { customerSupport } from './customer-support';
import { dataAnalyst } from './data-analyst';
import { financeAnalyst } from './finance-analyst';
import { hrExecutive } from './hr-executive';
import { marketingManager } from './marketing-manager';
import { operationsManager } from './operations-manager';
import { productManager } from './product-manager';
import { salesExecutive } from './sales-executive';
import { softwareEngineer } from './software-engineer';

const PAGES: Record<string, ScorecardPage> = {
  [softwareEngineer.slug]: softwareEngineer,
  [salesExecutive.slug]: salesExecutive,
  [productManager.slug]: productManager,
  [dataAnalyst.slug]: dataAnalyst,
  [customerSupport.slug]: customerSupport,
  [marketingManager.slug]: marketingManager,
  [hrExecutive.slug]: hrExecutive,
  [financeAnalyst.slug]: financeAnalyst,
  [operationsManager.slug]: operationsManager,
};

export const getScorecardSlugs = (): string[] => Object.keys(PAGES);

export const getScorecardBySlug = (slug: string): ScorecardPage | null =>
  PAGES[slug] ?? null;

export const getAllScorecards = (): ScorecardPage[] => Object.values(PAGES);

export type { ScorecardPage } from './types';
