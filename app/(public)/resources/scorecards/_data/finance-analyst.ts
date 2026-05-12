import type { ScorecardPage } from './types';
import {
  buildHowHireSortHelps,
  buildInternalLinks,
  buildProblemSection,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardScoringScale,
  UPDATED_AT,
} from './_shared';

export const financeAnalyst: ScorecardPage = {
  slug: 'finance-analyst',
  role: 'Finance Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Finance Analyst Candidate Scorecard Template | HireSort',
    description:
      'Use this finance analyst candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'finance analyst candidate scorecard',
      'finance analyst interview scorecard',
      'finance analyst hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Finance Analyst ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate finance analyst candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps finance managers, founders, recruiters, and business teams compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('finance analyst'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Financial modeling and Excel skills', weight: '25%', whatToLookFor: 'Experience building models, forecasts, budgets, scenarios, and structured spreadsheets.' },
      { criterion: 'Accounting and finance fundamentals', weight: '20%', whatToLookFor: 'Understanding of P&L, balance sheet, cash flow, revenue, costs, margins, and working capital.' },
      { criterion: 'Data analysis and reporting', weight: '15%', whatToLookFor: 'Ability to analyze financial data, prepare reports, dashboards, and variance analysis.' },
      { criterion: 'Business partnering', weight: '15%', whatToLookFor: 'Ability to support decisions for sales, operations, leadership, or business units.' },
      { criterion: 'Accuracy and controls', weight: '15%', whatToLookFor: 'Attention to detail, reconciliations, checks, audit readiness, and process discipline.' },
      { criterion: 'Communication and presentation', weight: '10%', whatToLookFor: 'Ability to explain financial insights clearly to non-finance stakeholders.' },
    ],
  },

  scoringScale: {
    title: 'Scoring scale',
    intro: 'Apply the same scale across reviewers so totals are comparable across candidates.',
    rows: standardScoringScale,
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'No modeling examples',
      'Weak accounting fundamentals',
      'No business impact',
      'Errors in resume formatting or numbers',
      'Tool mentions without analytical ownership',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'Walk me through a model you built.',
      'How do you investigate a budget variance?',
      'How do you ensure financial reporting accuracy?',
      'How would you explain a margin decline to a business head?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('finance analyst'),
  faqs: buildStandardFaqs('finance analyst'),
  internalLinks: buildInternalLinks('finance-analyst'),
  cta: buildStandardCta('finance analyst'),
};
