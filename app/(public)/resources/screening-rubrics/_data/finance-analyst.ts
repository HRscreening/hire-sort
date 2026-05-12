import type { ScreeningRubricPage } from './types';
import {
  buildInternalLinks,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelps,
  standardHowToUse,
  standardScoreInterpretation,
  standardWhatIsRubric,
  UPDATED_AT,
} from './_shared';

export const financeAnalyst: ScreeningRubricPage = {
  slug: 'finance-analyst',
  role: 'Finance Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Finance Analyst Screening Rubric | HireSort',
    description:
      'Use this finance analyst screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'finance analyst screening rubric',
      'finance analyst resume screening',
      'financial analyst candidate evaluation',
      'finance hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Finance Analyst ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate finance analyst resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Finance Analyst screening rubric',
    rows: [
      { criterion: 'Financial modeling and analysis', weight: '25%', whatToLookFor: 'Ability to build models, analyze financial performance, and support business decisions.', resumeEvidence: 'Financial models, forecasting, budgeting, scenario analysis, valuation, FP&A exposure.' },
      { criterion: 'Accounting and finance fundamentals', weight: '20%', whatToLookFor: 'Understanding of financial statements, accounting principles, and business finance.', resumeEvidence: 'P&L, balance sheet, cash flow, accounting support, audit coordination.' },
      { criterion: 'Excel and reporting tools', weight: '15%', whatToLookFor: 'Technical proficiency in spreadsheets, BI tools, ERP exports, and reporting workflows.', resumeEvidence: 'Advanced Excel, Power BI, Tableau, ERP, dashboards, automation, financial reports.' },
      { criterion: 'Business analysis and decision support', weight: '15%', whatToLookFor: 'Ability to interpret numbers in business context and support leaders with insights.', resumeEvidence: 'Margin analysis, cost analysis, revenue trends, management reporting, recommendations.' },
      { criterion: 'Accuracy and control mindset', weight: '15%', whatToLookFor: 'Attention to detail, reconciliation, data validation, and control discipline.', resumeEvidence: 'Reconciliations, variance checks, audit support, QA processes, error reduction.' },
      { criterion: 'Communication and presentation', weight: '10%', whatToLookFor: 'Ability to explain financial insights clearly to non-finance stakeholders.', resumeEvidence: 'Presentations, MIS reports, leadership updates, written commentary.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a finance analyst role, the resume should ideally show:',
    items: [
      'Excel or financial modeling capability',
      'Understanding of financial statements',
      'Evidence of reporting or analysis',
      'High attention to detail',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'No quantified finance work',
      'Only data entry without analysis',
      'No evidence of accuracy controls',
      'Tool names without actual finance outputs',
    ],
  },

  scoreInterpretation: {
    title: 'Suggested score interpretation',
    rows: standardScoreInterpretation,
  },

  howToUse: standardHowToUse,

  followUpQuestions: {
    title: 'Follow-up questions for recruiters',
    items: [
      'Can the candidate analyze rather than only report numbers?',
      'Does the candidate understand financial statements?',
      'Is the candidate careful enough for reporting accuracy?',
      'Can they communicate insights to business stakeholders?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('finance analyst'),
  internalLinks: buildInternalLinks('finance-analyst'),
  cta: buildStandardCta('finance analyst'),
};
