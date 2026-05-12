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

export const businessDevelopmentExecutive: InterviewQuestionsPage = {
  slug: 'business-development-executive',
  role: 'Business Development Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Business Development Executive Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these business development executive interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'business development executive interview questions',
      'BDE interview questions',
      'business development interview questions',
      'BD executive scorecard',
      'sales development interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Business Development Executive ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A targeted question set for evaluating outbound prospecting, market mapping, relationship building, qualification, and commercial follow-through.',
      'This page is built for founders, sales managers, recruiters, and revenue teams who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Business Development Executive interview',
    intro: 'A good business development executive interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Outbound prospecting',
      'Lead qualification',
      'Market research',
      'Relationship building',
      'Follow-up discipline',
      'Commercial communication',
    ],
  },

  questionGroups: [
    {
      title: 'Prospecting and market mapping',
      questions: [
        'How would you identify the first 100 accounts to target for a new B2B product?',
        'What makes a lead worth pursuing?',
        'How do you research a prospect before reaching out?',
      ],
    },
    {
      title: 'Outreach and qualification',
      questions: [
        'Write a short cold outreach message for a founder persona.',
        'How do you handle a prospect who says they are interested but not ready now?',
        'What questions do you ask to qualify budget, authority, need, and timeline?',
      ],
    },
    {
      title: 'Execution discipline',
      questions: [
        'How do you organize follow-ups across many prospects?',
        'Tell me about a partnership or client relationship you helped open.',
        'Which metrics should a BDE track every week?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Researches accounts before outreach',
      'Understands qualification',
      'Uses consistent follow-up system',
      'Can write crisp outreach',
      'Shows commercial persistence',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Confuses activity with outcomes',
      'Poor written communication',
      'No follow-up discipline',
      'Cannot define ideal customer profile',
    ],
  },

  scorecard: {
    title: 'Business Development Executive interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Prospecting quality', weight: '25%', whatToAssess: 'Assess prospecting quality using role-specific evidence and examples.' },
      { area: 'Qualification skill', weight: '25%', whatToAssess: 'Assess qualification skill using role-specific evidence and examples.' },
      { area: 'Outreach communication', weight: '20%', whatToAssess: 'Assess outreach communication using role-specific evidence and examples.' },
      { area: 'Follow-up discipline', weight: '20%', whatToAssess: 'Assess follow-up discipline using role-specific evidence and examples.' },
      { area: 'Commercial judgment', weight: '10%', whatToAssess: 'Assess commercial judgment using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Business Development Executive', 'business development executive'),
  internalLinks: buildInternalLinks('business-development-executive'),
  cta: buildStandardCta('Business Development Executive'),
};
