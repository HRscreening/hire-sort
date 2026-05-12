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

export const hrExecutive: InterviewQuestionsPage = {
  slug: 'hr-executive',
  role: 'HR Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'HR Executive Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these HR executive interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'HR executive interview questions',
      'human resources interview questions',
      'HR generalist interview questions',
      'HR executive scorecard',
      'recruitment HR interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'HR Executive ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A structured question bank for evaluating recruitment support, HR operations, employee communication, documentation, compliance awareness, and stakeholder handling.',
      'This page is built for HR managers, founders, recruiters, and operations leaders who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in an HR Executive interview',
    intro: 'A good HR executive interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Recruitment coordination',
      'HR operations',
      'Employee communication',
      'Documentation',
      'Compliance awareness',
      'Stakeholder management',
    ],
  },

  questionGroups: [
    {
      title: 'Recruitment and coordination',
      questions: [
        'Walk me through how you would coordinate hiring for five open roles at once.',
        'How do you keep candidates informed during a long hiring process?',
        'What information should be captured when moving a candidate from screening to interview?',
      ],
    },
    {
      title: 'HR operations',
      questions: [
        'Tell me about an HR process you improved or made more organized.',
        'How do you handle confidential employee information?',
        'What checks would you perform before releasing an employee document or letter?',
      ],
    },
    {
      title: 'Communication and judgment',
      questions: [
        'How would you respond to an employee who is upset about a policy decision?',
        'Describe a time you had to coordinate between employees, managers, and leadership.',
        'How do you balance empathy with process consistency?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Shows process orientation',
      'Communicates with discretion',
      'Understands candidate experience',
      'Maintains documentation accuracy',
      'Balances empathy and consistency',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Casual approach to confidentiality',
      'Poor follow-up discipline',
      'No process examples',
      'Overly rigid or overly informal judgment',
    ],
  },

  scorecard: {
    title: 'HR Executive interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Recruitment coordination', weight: '25%', whatToAssess: 'Assess recruitment coordination using role-specific evidence and examples.' },
      { area: 'HR operations discipline', weight: '25%', whatToAssess: 'Assess HR operations discipline using role-specific evidence and examples.' },
      { area: 'Communication and empathy', weight: '20%', whatToAssess: 'Assess communication and empathy using role-specific evidence and examples.' },
      { area: 'Documentation accuracy', weight: '15%', whatToAssess: 'Assess documentation accuracy using role-specific evidence and examples.' },
      { area: 'Confidentiality and judgment', weight: '15%', whatToAssess: 'Assess confidentiality and judgment using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('HR Executive', 'HR executive'),
  internalLinks: buildInternalLinks('hr-executive'),
  cta: buildStandardCta('HR Executive'),
};
