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

export const softwareEngineer: InterviewQuestionsPage = {
  slug: 'software-engineer',
  role: 'Software Engineer',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Software Engineer Interview Questions and Scorecard Guide | HireSort',
    description:
      'Use these software engineer interview questions to evaluate skills, experience, communication, and role fit. Includes what to listen for, red flags, and a scorecard framework.',
    keywords: [
      'software engineer interview questions',
      'technical interview questions',
      'software developer interview questions',
      'engineering interview scorecard',
      'software engineer hiring questions',
    ],
  },

  hero: {
    eyebrow: 'Interview questions',
    titlePrefix: 'Software Engineer ',
    titleAccent: 'Interview Questions',
    titleSuffix: ' for Structured Hiring',
    lead: [
      'A structured question bank for evaluating coding ability, system thinking, debugging, communication, and real-world engineering judgment.',
      'This page is built for engineering managers, technical recruiters, and startup founders who want to evaluate candidates consistently instead of relying only on instinct, resume brands, or unstructured conversations.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatToEvaluate: {
    title: 'What to evaluate in a Software Engineer interview',
    intro: 'A good software engineer interview should not be a random list of questions. It should test the capabilities that predict success in the role.',
    items: [
      'Programming fundamentals',
      'System design thinking',
      'Debugging and problem solving',
      'Code quality and maintainability',
      'Collaboration and communication',
      'Ownership and delivery',
    ],
  },

  questionGroups: [
    {
      title: 'Technical depth',
      questions: [
        'Walk me through a project where you owned a meaningful technical component. What problem did it solve and what trade-offs did you make?',
        'How would you design a service that needs to handle a sudden 10x increase in traffic?',
        'Explain a technical decision you made that you later changed. What did you learn?',
        'How do you decide whether to optimize for speed of development, performance, reliability, or maintainability?',
      ],
    },
    {
      title: 'Problem solving',
      questions: [
        'Describe the hardest bug you have debugged. How did you isolate the issue?',
        'If a production API suddenly becomes slow, what would you check first?',
        'How do you approach a task when the requirements are unclear?',
      ],
    },
    {
      title: 'Code quality and teamwork',
      questions: [
        'What makes code easy for other engineers to maintain?',
        'How do you handle code review feedback that you disagree with?',
        'Tell me about a time you improved an existing system instead of building something new.',
      ],
    },
  ],

  strongAnswers: {
    title: 'What strong answers usually include',
    items: [
      'Explains trade-offs clearly',
      'Connects technical choices to product or user impact',
      'Shows structured debugging approach',
      'Demonstrates ownership beyond assigned tickets',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'Only speaks in tool names without explaining decisions',
      'Cannot describe trade-offs',
      'Blames others for unclear requirements',
      'Has no examples of debugging or maintaining existing systems',
    ],
  },

  scorecard: {
    title: 'Software Engineer interview scorecard framework',
    intro: 'Use a simple scorecard so every interviewer evaluates the candidate against the same criteria. The weights below can be adjusted based on seniority, team context, and hiring priorities.',
    rows: [
      { area: 'Technical fit', weight: '35%', whatToAssess: 'Relevant skills, tools, depth, and hands-on experience.' },
      { area: 'Problem-solving depth', weight: '25%', whatToAssess: 'How the candidate diagnoses problems and works through ambiguity.' },
      { area: 'System and architecture thinking', weight: '20%', whatToAssess: 'Ability to reason about trade-offs, scale, reliability, and maintainability.' },
      { area: 'Communication and ownership', weight: '20%', whatToAssess: 'Clarity, collaboration, accountability, and delivery mindset.' },
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

  faqs: buildStandardFaqs('Software Engineer', 'software engineer'),
  internalLinks: buildInternalLinks('software-engineer'),
  cta: buildStandardCta('Software Engineer'),
};
