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

export const customerSupport: InterviewQuestionsPage = {
  slug: 'customer-support',
  role: 'Customer Support',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Customer Support Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these customer support interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'customer support interview questions',
      'customer service interview questions',
      'support representative scorecard',
      'support agent interview questions',
      'customer success support questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Customer Support ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A structured interview question set for evaluating empathy, problem-solving, written communication, escalation judgment, and process discipline.',
      'This page is built for support leaders, operations managers, founders, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Customer Support interview',
    intro: 'A good customer support interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Empathy',
      'Problem solving',
      'Written communication',
      'Escalation judgment',
      'Product understanding',
      'Process discipline',
    ],
  },

  questionGroups: [
    {
      title: 'Customer handling',
      questions: [
        'Tell me about a difficult customer interaction. What happened and how did you handle it?',
        'How do you respond when a customer is upset but the issue is not caused by your company?',
        'How do you balance being empathetic with enforcing company policy?',
      ],
    },
    {
      title: 'Problem solving',
      questions: [
        'A customer reports that something is broken, but you cannot reproduce the issue. What do you do?',
        'How do you decide whether to solve an issue yourself or escalate it?',
        'Describe a time you found the root cause of a recurring support issue.',
      ],
    },
    {
      title: 'Communication and process',
      questions: [
        'Write a short response to a customer asking for an update when the engineering team is still investigating.',
        'How do you document issues so that other teammates can help?',
        'Which support metrics do you think matter most and why?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Shows calm under pressure',
      'Writes clearly and respectfully',
      'Knows when to escalate',
      'Documents context well',
      'Connects support work to customer retention',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Blames customers',
      'Escalates too quickly or too late',
      'Writes vague responses',
      'Cannot describe process discipline',
    ],
  },

  scorecard: {
    title: 'Customer Support interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Customer empathy', weight: '25%', whatToAssess: 'Assess customer empathy using role-specific evidence and examples.' },
      { area: 'Problem-solving ability', weight: '25%', whatToAssess: 'Assess problem-solving ability using role-specific evidence and examples.' },
      { area: 'Communication clarity', weight: '25%', whatToAssess: 'Assess communication clarity using role-specific evidence and examples.' },
      { area: 'Escalation judgment', weight: '15%', whatToAssess: 'Assess escalation judgment using role-specific evidence and examples.' },
      { area: 'Process discipline', weight: '10%', whatToAssess: 'Assess process discipline using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Customer Support', 'customer support'),
  internalLinks: buildInternalLinks('customer-support'),
  cta: buildStandardCta('Customer Support'),
};
