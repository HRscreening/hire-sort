import type { InterviewQuestionsPage } from './types';
import { businessDevelopmentExecutive } from './business-development-executive';
import { customerSupport } from './customer-support';
import { dataAnalyst } from './data-analyst';
import { dataScientist } from './data-scientist';
import { financeAnalyst } from './finance-analyst';
import { hrExecutive } from './hr-executive';
import { marketingManager } from './marketing-manager';
import { productManager } from './product-manager';
import { salesExecutive } from './sales-executive';
import { softwareEngineer } from './software-engineer';

const PAGES: Record<string, InterviewQuestionsPage> = {
  [softwareEngineer.slug]: softwareEngineer,
  [salesExecutive.slug]: salesExecutive,
  [dataScientist.slug]: dataScientist,
  [dataAnalyst.slug]: dataAnalyst,
  [productManager.slug]: productManager,
  [customerSupport.slug]: customerSupport,
  [marketingManager.slug]: marketingManager,
  [businessDevelopmentExecutive.slug]: businessDevelopmentExecutive,
  [hrExecutive.slug]: hrExecutive,
  [financeAnalyst.slug]: financeAnalyst,
};

export const getInterviewQuestionsSlugs = (): string[] => Object.keys(PAGES);

export const getInterviewQuestionsBySlug = (slug: string): InterviewQuestionsPage | null =>
  PAGES[slug] ?? null;

export const getAllInterviewQuestions = (): InterviewQuestionsPage[] => Object.values(PAGES);

export type { InterviewQuestionsPage } from './types';
