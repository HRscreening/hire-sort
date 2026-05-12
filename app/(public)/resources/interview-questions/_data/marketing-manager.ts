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

export const marketingManager: InterviewQuestionsPage = {
  slug: 'marketing-manager',
  role: 'Marketing Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Marketing Manager Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these marketing manager interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'marketing manager interview questions',
      'digital marketing interview questions',
      'growth marketing interview questions',
      'marketing manager scorecard',
      'marketing hiring questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Marketing Manager ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A practical question bank for evaluating strategy, channel judgment, campaign execution, analytics, content quality, and cross-functional collaboration.',
      'This page is built for founders, growth leaders, marketing heads, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Marketing Manager interview',
    intro: 'A good marketing manager interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Marketing strategy',
      'Channel selection',
      'Campaign execution',
      'Analytics',
      'Content judgment',
      'Cross-functional work',
    ],
  },

  questionGroups: [
    {
      title: 'Strategy and channels',
      questions: [
        'Walk me through a marketing campaign you planned from idea to execution.',
        'How do you choose between SEO, paid ads, partnerships, events, and outbound campaigns?',
        'What would you do in your first 30 days if organic traffic was flat and paid CAC was rising?',
      ],
    },
    {
      title: 'Execution and analytics',
      questions: [
        'Which metrics do you track for campaign performance and why?',
        'Tell me about a campaign that underperformed. How did you diagnose the problem?',
        'How do you balance brand-building work with short-term lead generation?',
      ],
    },
    {
      title: 'Collaboration',
      questions: [
        'How do you work with sales when they say lead quality is poor?',
        'How do you get subject-matter experts to contribute to content?',
        'Describe a time when you had to market a product with limited differentiation.',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Can connect channels to funnel stage',
      'Uses numbers without losing creativity',
      'Understands sales alignment',
      'Has examples of testing and iteration',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Lists channels without strategy',
      'Cannot explain CAC, conversion, or pipeline influence',
      'Blames sales for lead quality without analysis',
      'No examples of measurable outcomes',
    ],
  },

  scorecard: {
    title: 'Marketing Manager interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Strategy and positioning', weight: '25%', whatToAssess: 'Assess strategy and positioning using role-specific evidence and examples.' },
      { area: 'Channel and campaign execution', weight: '25%', whatToAssess: 'Assess channel and campaign execution using role-specific evidence and examples.' },
      { area: 'Analytics and experimentation', weight: '20%', whatToAssess: 'Assess analytics and experimentation using role-specific evidence and examples.' },
      { area: 'Content and messaging judgment', weight: '15%', whatToAssess: 'Assess content and messaging judgment using role-specific evidence and examples.' },
      { area: 'Sales collaboration', weight: '15%', whatToAssess: 'Assess sales collaboration using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Marketing Manager', 'marketing manager'),
  internalLinks: buildInternalLinks('marketing-manager'),
  cta: buildStandardCta('Marketing Manager'),
};
