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

export const salesExecutive: InterviewQuestionsPage = {
  slug: 'sales-executive',
  role: 'Sales Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Sales Executive Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these sales executive interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'sales executive interview questions',
      'sales interview questions',
      'sales rep interview scorecard',
      'B2B sales interview questions',
      'business development interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Sales Executive ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A practical question set for evaluating prospecting ability, sales discipline, communication, objection handling, and target ownership.',
      'This page is built for sales leaders, founders, recruiters, and revenue teams who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Sales Executive interview',
    intro: 'A good sales executive interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Prospecting',
      'Discovery',
      'Objection handling',
      'CRM discipline',
      'Revenue ownership',
      'Communication',
    ],
  },

  questionGroups: [
    {
      title: 'Sales process',
      questions: [
        'Walk me through your typical sales process from lead generation to close.',
        'How do you qualify whether a prospect is worth pursuing?',
        'What metrics do you track weekly to know whether your pipeline is healthy?',
        'Describe a time when you missed target. What did you change afterward?',
      ],
    },
    {
      title: 'Prospecting and communication',
      questions: [
        'How would you reach out to a cold prospect who has never heard of our product?',
        'Give an example of a cold email or pitch that worked well for you.',
        'How do you personalize outreach without spending too much time per lead?',
      ],
    },
    {
      title: 'Objection handling',
      questions: [
        'A prospect says the product is too expensive. How do you respond?',
        'Tell me about a deal you lost. What were the signals you missed?',
        'How do you handle a prospect who repeatedly delays the decision?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Uses numbers and conversion metrics',
      'Shows discipline around pipeline and follow-up',
      'Handles objections with discovery rather than discounting',
      'Demonstrates resilience and learning from lost deals',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Cannot explain their sales process',
      'Over-focuses on discounts',
      'No evidence of target ownership',
      'Claims success without numbers or examples',
    ],
  },

  scorecard: {
    title: 'Sales Executive interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Prospecting ability', weight: '25%', whatToAssess: 'Ability to identify, research, and reach relevant accounts.' },
      { area: 'Discovery and qualification', weight: '25%', whatToAssess: 'Skill in understanding customer need, budget, urgency, and fit.' },
      { area: 'Objection handling', weight: '20%', whatToAssess: 'Ability to respond with context, questions, and value rather than pressure.' },
      { area: 'Target ownership and CRM discipline', weight: '20%', whatToAssess: 'Pipeline hygiene, follow-up quality, and metric ownership.' },
      { area: 'Communication fit', weight: '10%', whatToAssess: 'Clarity, persuasion, listening, and professional presence.' },
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

  faqs: buildStandardFaqs('Sales Executive', 'sales executive'),
  internalLinks: buildInternalLinks('sales-executive'),
  cta: buildStandardCta('Sales Executive'),
};
