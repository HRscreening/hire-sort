import type { ScorecardPage } from './types';
import {
  buildHowHireSortHelps,
  buildInternalLinks,
  buildProblemSection,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardScoringScale,
  UPDATED_AT,
} from './_shared';

export const softwareEngineer: ScorecardPage = {
  slug: 'software-engineer',
  role: 'Software Engineer',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Software Engineer Candidate Scorecard Template | HireSort',
    description:
      'Use this software engineer candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'software engineer candidate scorecard',
      'software engineer interview scorecard',
      'software engineer hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Software Engineer ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate software engineer candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps engineering managers, technical recruiters, and founders compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('software engineer'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Technical skills and programming depth', weight: '25%', whatToLookFor: 'Evidence of relevant languages, frameworks, backend/frontend depth, and practical engineering skills.' },
      { criterion: 'Problem solving and coding judgment', weight: '20%', whatToLookFor: 'Clear examples of debugging, algorithmic thinking, trade-offs, and structured problem solving.' },
      { criterion: 'System design and architecture fit', weight: '15%', whatToLookFor: 'Experience designing reliable services, APIs, data models, infrastructure, or scalable systems.' },
      { criterion: 'Project impact and ownership', weight: '20%', whatToLookFor: 'Measurable contributions, shipped products, ownership of modules, and business or user impact.' },
      { criterion: 'Collaboration and communication', weight: '10%', whatToLookFor: 'Ability to work with product, design, QA, DevOps, and cross-functional stakeholders.' },
      { criterion: 'Role and company fit', weight: '10%', whatToLookFor: 'Fit with seniority, domain, tech stack, pace, and team operating style.' },
    ],
  },

  scoringScale: {
    title: 'Scoring scale',
    intro: 'Apply the same scale across reviewers so totals are comparable across candidates.',
    rows: standardScoringScale,
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'No evidence of shipped work',
      'Only keyword-heavy technology lists with no project context',
      'Unclear ownership or impact',
      'Mismatch between seniority and responsibilities',
      'Poor explanation of technical contribution',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'What was the most technically difficult system you built recently?',
      'Which engineering trade-off did you make and why?',
      'How do you approach debugging production issues?',
      'How do you work with product managers when requirements are unclear?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('software engineer'),
  faqs: buildStandardFaqs('software engineer'),
  internalLinks: buildInternalLinks('software-engineer'),
  cta: buildStandardCta('software engineer'),
};
