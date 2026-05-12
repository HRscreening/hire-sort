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

export const productManager: InterviewQuestionsPage = {
  slug: 'product-manager',
  role: 'Product Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Product Manager Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these product manager interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'product manager interview questions',
      'PM interview questions',
      'product manager scorecard',
      'product sense interview questions',
      'product strategy questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Product Manager ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A role-focused question set for evaluating product judgment, prioritization, user empathy, analytics, stakeholder management, and execution.',
      'This page is built for founders, product leaders, hiring managers, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Product Manager interview',
    intro: 'A good product manager interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Product sense',
      'Prioritization',
      'User research',
      'Analytics',
      'Execution',
      'Stakeholder alignment',
    ],
  },

  questionGroups: [
    {
      title: 'Product judgment',
      questions: [
        'Tell me about a product decision you made with incomplete information.',
        'How would you improve the onboarding experience for a SaaS product with low activation?',
        'What makes a product feature worth building?',
      ],
    },
    {
      title: 'Prioritization and execution',
      questions: [
        'How do you choose between a high-revenue customer request and a strategic platform improvement?',
        'Describe a time when engineering capacity was limited. How did you prioritize?',
        'What metrics would you track after launching a new feature?',
      ],
    },
    {
      title: 'Stakeholder management',
      questions: [
        'Tell me about a disagreement with engineering, sales, or leadership. How did you resolve it?',
        'How do you communicate roadmap trade-offs to non-product stakeholders?',
        'How do you avoid building features that users ask for but do not actually need?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Connects user needs to business goals',
      'Makes trade-offs explicit',
      'Uses metrics without losing qualitative context',
      'Can align stakeholders without overpromising',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Treats PM as project management only',
      'Cannot explain prioritization logic',
      'Ignores engineering constraints',
      'Over-indexes on stakeholder opinions without user evidence',
    ],
  },

  scorecard: {
    title: 'Product Manager interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Product judgment', weight: '30%', whatToAssess: 'Assess product judgment using role-specific evidence and examples.' },
      { area: 'Prioritization and strategy', weight: '25%', whatToAssess: 'Assess prioritization and strategy using role-specific evidence and examples.' },
      { area: 'Execution discipline', weight: '20%', whatToAssess: 'Assess execution discipline using role-specific evidence and examples.' },
      { area: 'Stakeholder communication', weight: '15%', whatToAssess: 'Assess stakeholder communication using role-specific evidence and examples.' },
      { area: 'Analytical thinking', weight: '10%', whatToAssess: 'Assess analytical thinking using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Product Manager', 'product manager'),
  internalLinks: buildInternalLinks('product-manager'),
  cta: buildStandardCta('Product Manager'),
};
