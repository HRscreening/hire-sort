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

export const dataAnalyst: InterviewQuestionsPage = {
  slug: 'data-analyst',
  role: 'Data Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Data Analyst Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these data analyst interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'data analyst interview questions',
      'SQL interview questions',
      'analytics interview questions',
      'data analyst scorecard',
      'business analyst interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Data Analyst ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A practical question bank for evaluating SQL, analytical thinking, dashboard judgment, business communication, and attention to data quality.',
      'This page is built for analytics managers, founders, operations leaders, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Data Analyst interview',
    intro: 'A good data analyst interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'SQL and data querying',
      'Business analysis',
      'Dashboarding',
      'Metric definition',
      'Data quality',
      'Communication',
    ],
  },

  questionGroups: [
    {
      title: 'Analytical thinking',
      questions: [
        'Tell me about a business question you answered using data. What decision changed because of your analysis?',
        'How would you investigate a sudden drop in weekly active users?',
        'How do you decide which metric should be the north-star metric for a team?',
      ],
    },
    {
      title: 'SQL and data quality',
      questions: [
        'How would you find duplicate customer records in a table?',
        'Explain the difference between inner join, left join, and full outer join using a business example.',
        'What checks do you run before trusting a dataset?',
      ],
    },
    {
      title: 'Communication',
      questions: [
        'How do you present analysis when the result is not what leadership expected?',
        'Describe a dashboard you built. How did you decide what to include and what to exclude?',
        'How do you make sure stakeholders interpret data correctly?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Frames analysis around business decisions',
      'Understands data quality risks',
      'Explains SQL in practical terms',
      'Knows how to simplify dashboards for stakeholders',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Focuses only on tools, not decisions',
      'Cannot explain joins or basic metrics',
      'Ignores missing or inconsistent data',
      'Creates dashboards without user context',
    ],
  },

  scorecard: {
    title: 'Data Analyst interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'SQL and technical ability', weight: '30%', whatToAssess: 'Assess SQL and technical ability using role-specific evidence and examples.' },
      { area: 'Analytical problem solving', weight: '30%', whatToAssess: 'Assess analytical problem solving using role-specific evidence and examples.' },
      { area: 'Business communication', weight: '20%', whatToAssess: 'Assess business communication using role-specific evidence and examples.' },
      { area: 'Data quality discipline', weight: '10%', whatToAssess: 'Assess data quality discipline using role-specific evidence and examples.' },
      { area: 'Dashboarding judgment', weight: '10%', whatToAssess: 'Assess dashboarding judgment using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Data Analyst', 'data analyst'),
  internalLinks: buildInternalLinks('data-analyst'),
  cta: buildStandardCta('Data Analyst'),
};
