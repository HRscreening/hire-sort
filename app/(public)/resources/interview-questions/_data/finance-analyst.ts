import type { InterviewQuestionsPage } from './types';
import {
  buildInternalLinks,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelpsBody,
  standardHowToRun,
  UPDATED_AT,
} from './_shared';

export const financeAnalyst: InterviewQuestionsPage = {
  slug: 'finance-analyst',
  role: 'Finance Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Finance Analyst Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these finance analyst interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'finance analyst interview questions',
      'financial analyst interview questions',
      'finance analyst scorecard',
      'FP&A interview questions',
      'financial modeling interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Finance Analyst ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A structured set of questions for assessing financial modeling, analytical thinking, business understanding, reporting accuracy, and communication.',
      'This page is built for finance leaders, founders, hiring managers, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Finance Analyst interview',
    intro: 'A good finance analyst interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Financial modeling',
      'Accounting basics',
      'Variance analysis',
      'Business judgment',
      'Reporting accuracy',
      'Communication',
    ],
  },

  questionGroups: [
    {
      title: 'Financial analysis',
      questions: [
        'Walk me through a financial model or analysis you built. What decision did it support?',
        'How would you investigate why gross margin declined this quarter?',
        'What are the key drivers of revenue, EBITDA, and cash flow in a SaaS business?',
      ],
    },
    {
      title: 'Modeling and accuracy',
      questions: [
        'How do you check whether a financial model is reliable?',
        'Explain the difference between profit and cash flow.',
        'How would you build a simple three-scenario forecast?',
      ],
    },
    {
      title: 'Communication',
      questions: [
        'How do you explain a complex variance to a non-finance stakeholder?',
        'Tell me about a time when your analysis challenged a business assumption.',
        'How do you prioritize accuracy and speed during monthly reporting?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Connects analysis to business decisions',
      'Understands core financial statements',
      'Checks models systematically',
      'Explains numbers clearly',
      'Balances speed and accuracy',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Memorizes formulas without business context',
      'Cannot explain cash flow',
      'No quality-control process',
      'Overcomplicates communication',
    ],
  },

  scorecard: {
    title: 'Finance Analyst interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Financial modeling ability', weight: '30%', whatToAssess: 'Assess financial modeling ability using role-specific evidence and examples.' },
      { area: 'Business and commercial judgment', weight: '25%', whatToAssess: 'Assess business and commercial judgment using role-specific evidence and examples.' },
      { area: 'Accuracy and controls', weight: '20%', whatToAssess: 'Assess accuracy and controls using role-specific evidence and examples.' },
      { area: 'Communication clarity', weight: '15%', whatToAssess: 'Assess communication clarity using role-specific evidence and examples.' },
      { area: 'Accounting fundamentals', weight: '10%', whatToAssess: 'Assess accounting fundamentals using role-specific evidence and examples.' },
    ],
  },

  howToRun: {
    title: 'How to run a structured interview',
    items: standardHowToRun,
  },

  howHireSortHelps: {
    title: 'How HireSort helps before the interview',
    body: standardHowHireSortHelpsBody,
  },

  faqs: buildStandardFaqs('Finance Analyst', 'finance analyst'),
  internalLinks: buildInternalLinks('finance-analyst'),
  cta: buildStandardCta('Finance Analyst'),
};
