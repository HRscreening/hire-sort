import type { JobDescriptionPage } from './types';
import {
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelps,
  standardInternalLinks,
  UPDATED_AT,
} from './_shared';

export const financeAnalyst: JobDescriptionPage = {
  slug: 'finance-analyst',
  role: 'Finance Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Finance Analyst Job Description Template | HireSort',
    description:
      'Use this finance analyst job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Finance Analyst candidates.',
    keywords: [
      'finance analyst job description',
      'financial analyst JD',
      'FP&A analyst job description',
      'finance analyst template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Finance Analyst ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize finance analyst job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Finance Analyst analyses financial performance, prepares reports, builds models, supports budgeting and forecasting, and helps leadership make better business decisions. The role requires analytical ability, financial understanding, Excel skills, attention to detail, and business communication.',
    ],
  },

  responsibilities: [
    'Prepare financial reports, variance analysis, dashboards, and management summaries.',
    'Support budgeting, forecasting, financial planning, and scenario analysis.',
    'Analyse revenue, costs, margins, working capital, unit economics, or business KPIs.',
    'Build and maintain financial models in Excel or planning tools.',
    'Coordinate with business teams to collect inputs and validate assumptions.',
    'Identify trends, risks, and improvement opportunities from financial data.',
    'Support investor, board, audit, or internal reporting where required.',
  ],

  requiredSkills: [
    'Strong Excel or spreadsheet modelling skills.',
    'Understanding of financial statements, budgeting, forecasting, and variance analysis.',
    'Analytical thinking, attention to detail, and ability to work with numbers accurately.',
    'Ability to communicate financial insights to business stakeholders.',
    'Degree in finance, commerce, accounting, economics, business, or related field.',
  ],

  preferredQualifications: [
    'Experience in FP&A, corporate finance, investment analysis, consulting, accounting, or business finance.',
    'Knowledge of SQL, Power BI, Tableau, ERP systems, or planning tools.',
    'Experience with SaaS, healthcare, retail, manufacturing, financial services, or startup finance.',
    'CA, CFA, MBA, CPA, CMA, or other relevant professional qualification.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for finance analyst candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Financial analysis skills', weight: '30%', lookFor: 'Statements, variance analysis, modelling, budgeting, forecasting, and business metrics.' },
      { criterion: 'Modelling and tools', weight: '25%', lookFor: 'Excel depth, financial models, BI tools, ERP, SQL, or planning systems.' },
      { criterion: 'Business impact', weight: '20%', lookFor: 'Decisions supported, cost savings, margin improvement, forecasting accuracy, or reporting improvements.' },
      { criterion: 'Attention to detail', weight: '15%', lookFor: 'Accuracy, validation, auditability, and assumption tracking.' },
      { criterion: 'Communication', weight: '10%', lookFor: 'Ability to explain financial insights to non-finance stakeholders.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Walk me through a financial model you built.',
      'How do you investigate a variance between budget and actuals?',
      'Which financial metrics are most important for a growing SaaS company?',
      'How do you validate assumptions in a forecast?',
      'Tell me about a financial insight that influenced a decision.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume lists finance tasks but no models, analysis, or decision impact.',
      'No evidence of strong Excel or financial statement understanding.',
      'Too accounting-heavy for roles requiring FP&A or business partnering.',
      'Weak explanation of assumptions, variance drivers, or business context.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Finance Analyst'),
  faqs: buildStandardFaqs('Finance Analyst', 'finance analyst'),
  internalLinks: standardInternalLinks,
};
