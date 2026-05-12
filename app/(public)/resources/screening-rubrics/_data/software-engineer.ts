import type { ScreeningRubricPage } from './types';
import {
  buildInternalLinks,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelps,
  standardHowToUse,
  standardScoreInterpretation,
  standardWhatIsRubric,
  UPDATED_AT,
} from './_shared';

export const softwareEngineer: ScreeningRubricPage = {
  slug: 'software-engineer',
  role: 'Software Engineer',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Software Engineer Screening Rubric | HireSort',
    description:
      'Use this software engineer screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'software engineer screening rubric',
      'software engineer resume screening',
      'developer evaluation rubric',
      'engineering hiring rubric',
      'technical resume screening',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Software Engineer ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate software engineer resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Software Engineer screening rubric',
    rows: [
      { criterion: 'Technical skills and stack fit', weight: '30%', whatToLookFor: 'Languages, frameworks, databases, cloud tools, and technical skills that match the role.', resumeEvidence: 'Relevant projects, production systems, GitHub links, tech stack alignment, certifications.' },
      { criterion: 'Engineering problem-solving', weight: '20%', whatToLookFor: 'Evidence of solving real engineering problems, debugging, optimization, scalability, or reliability issues.', resumeEvidence: 'System improvements, performance gains, architecture changes, incident handling, complex project ownership.' },
      { criterion: 'Relevant project experience', weight: '20%', whatToLookFor: 'Hands-on experience building features, APIs, platforms, infrastructure, or user-facing products similar to the role.', resumeEvidence: 'Project descriptions, shipped products, ownership scope, impact metrics, team size.' },
      { criterion: 'Code quality and engineering discipline', weight: '10%', whatToLookFor: 'Signals of testing, documentation, code reviews, maintainability, CI/CD, and clean engineering practices.', resumeEvidence: 'Test coverage, code review ownership, release process, documentation, refactoring examples.' },
      { criterion: 'Collaboration and communication', weight: '10%', whatToLookFor: 'Ability to work with product, design, QA, DevOps, and other engineers.', resumeEvidence: 'Cross-functional projects, mentoring, stakeholder collaboration, clear resume structure.' },
      { criterion: 'Role and seniority fit', weight: '10%', whatToLookFor: 'Alignment with expected seniority, ownership, autonomy, and domain complexity.', resumeEvidence: 'Years of experience, leadership scope, project scale, decision-making responsibility.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a software engineer role, the resume should ideally show:',
    items: [
      'Relevant programming language or stack experience',
      'Evidence of shipping real software',
      'Clear project ownership',
      'Ability to work in a team engineering environment',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'Resume lists many technologies without project evidence',
      'No meaningful project or product ownership',
      'Very unclear technical responsibilities',
      'Only academic projects for a mid/senior role',
      'No evidence of debugging, testing, or production exposure',
    ],
  },

  scoreInterpretation: {
    title: 'Suggested score interpretation',
    rows: standardScoreInterpretation,
  },

  howToUse: standardHowToUse,

  followUpQuestions: {
    title: 'Follow-up questions for recruiters',
    items: [
      'Which project best shows the candidate can solve the problem this role requires?',
      'Is the candidate strong in the core stack or only adjacent tools?',
      'Does the resume show depth or only keyword breadth?',
      'Does the candidate have the ownership level required for the seniority?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('software engineer'),
  internalLinks: buildInternalLinks('software-engineer'),
  cta: buildStandardCta('software engineer'),
};
