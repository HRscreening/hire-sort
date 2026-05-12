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

export const dataScientist: InterviewQuestionsPage = {
  slug: 'data-scientist',
  role: 'Data Scientist',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Data Scientist Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these data scientist interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'data scientist interview questions',
      'machine learning interview questions',
      'data science interview scorecard',
      'analytics interview questions',
      'modeling interview questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Data Scientist ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A structured set of questions for assessing statistics, experimentation, modeling judgment, business problem framing, and communication.',
      'This page is built for analytics leaders, data science managers, hiring managers, and recruiters who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Data Scientist interview',
    intro: 'A good data scientist interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Statistics',
      'Machine learning',
      'Experimentation',
      'Data cleaning',
      'Business framing',
      'Model communication',
    ],
  },

  questionGroups: [
    {
      title: 'Problem framing',
      questions: [
        'Describe a data science project where the first problem statement was poorly defined. How did you clarify it?',
        'How do you decide whether a problem needs a machine learning model or a simpler analysis?',
        'What business metric did your last model or analysis improve?',
      ],
    },
    {
      title: 'Technical judgment',
      questions: [
        'How do you handle missing or biased data before modeling?',
        'Explain how you would evaluate a binary classification model for a high-cost false positive problem.',
        'What is the difference between correlation and causation, and how does that affect decision-making?',
        'How would you design an A/B test for a product feature?',
      ],
    },
    {
      title: 'Communication and deployment',
      questions: [
        'How do you explain model performance to non-technical stakeholders?',
        'Tell me about a model that worked technically but failed to get adopted. Why?',
        'How do you monitor model drift or performance after launch?',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Starts with business objective before modeling',
      'Understands trade-offs in metrics',
      'Can explain statistical concepts plainly',
      'Discusses adoption, monitoring, and limitations',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Defaults to complex models without justification',
      'Cannot explain evaluation metrics',
      'Ignores data quality',
      'Overstates certainty in model outputs',
    ],
  },

  scorecard: {
    title: 'Data Scientist interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Statistical and modeling depth', weight: '30%', whatToAssess: 'Assess statistical and modeling depth using role-specific evidence and examples.' },
      { area: 'Business problem framing', weight: '25%', whatToAssess: 'Assess business problem framing using role-specific evidence and examples.' },
      { area: 'Experimentation and evaluation', weight: '20%', whatToAssess: 'Assess experimentation and evaluation using role-specific evidence and examples.' },
      { area: 'Communication and adoption', weight: '15%', whatToAssess: 'Assess communication and adoption using role-specific evidence and examples.' },
      { area: 'Data quality judgment', weight: '10%', whatToAssess: 'Assess data quality judgment using role-specific evidence and examples.' },
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

  faqs: buildStandardFaqs('Data Scientist', 'data scientist'),
  // No matching JD for data scientist — omit JD cross-link
  internalLinks: buildInternalLinks(),
  cta: buildStandardCta('Data Scientist'),
};
