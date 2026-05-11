import type { JobDescriptionPage } from './types';
import { businessDevelopmentExecutive } from './business-development-executive';
import { customerSupport } from './customer-support';
import { dataAnalyst } from './data-analyst';
import { financeAnalyst } from './finance-analyst';
import { hrExecutive } from './hr-executive';
import { marketingManager } from './marketing-manager';
import { operationsManager } from './operations-manager';
import { productManager } from './product-manager';
import { salesExecutive } from './sales-executive';
import { softwareEngineer } from './software-engineer';

const PAGES: Record<string, JobDescriptionPage> = {
  [softwareEngineer.slug]: softwareEngineer,
  [salesExecutive.slug]: salesExecutive,
  [dataAnalyst.slug]: dataAnalyst,
  [productManager.slug]: productManager,
  [customerSupport.slug]: customerSupport,
  [marketingManager.slug]: marketingManager,
  [businessDevelopmentExecutive.slug]: businessDevelopmentExecutive,
  [hrExecutive.slug]: hrExecutive,
  [financeAnalyst.slug]: financeAnalyst,
  [operationsManager.slug]: operationsManager,
};

export const getJobDescriptionSlugs = (): string[] => Object.keys(PAGES);

export const getJobDescriptionBySlug = (slug: string): JobDescriptionPage | null =>
  PAGES[slug] ?? null;

export const getAllJobDescriptions = (): JobDescriptionPage[] => Object.values(PAGES);

export type { JobDescriptionPage } from './types';
