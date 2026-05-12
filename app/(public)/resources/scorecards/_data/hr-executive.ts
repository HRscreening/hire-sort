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

export const hrExecutive: ScorecardPage = {
  slug: 'hr-executive',
  role: 'HR Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'HR Executive Candidate Scorecard Template | HireSort',
    description:
      'Use this hr executive candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'hr executive candidate scorecard',
      'hr executive interview scorecard',
      'hr executive hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'HR Executive ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate hr executive candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps HR managers, founders, recruiters, and admin teams compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('hr executive'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Recruitment coordination', weight: '20%', whatToLookFor: 'Experience with job posting, candidate coordination, screening support, and interview scheduling.' },
      { criterion: 'HR operations and documentation', weight: '20%', whatToLookFor: 'Employee records, onboarding documents, payroll coordination, attendance, and policy documentation.' },
      { criterion: 'Communication and employee support', weight: '15%', whatToLookFor: 'Handling employee queries, coordination, internal communication, and stakeholder follow-up.' },
      { criterion: 'Compliance and confidentiality', weight: '15%', whatToLookFor: 'Awareness of HR policies, data privacy, labor compliance basics, and confidential information handling.' },
      { criterion: 'HR tools and process discipline', weight: '15%', whatToLookFor: 'Use of HRMS, ATS, spreadsheets, trackers, and standardized HR processes.' },
      { criterion: 'Ownership and reliability', weight: '15%', whatToLookFor: 'Timely execution, follow-through, attention to detail, and escalation judgment.' },
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
      'No HR operations exposure',
      'Unclear role in recruitment or onboarding',
      'Poor attention to detail',
      'Weak confidentiality awareness',
      'No process ownership',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'How do you manage candidate coordination at scale?',
      'What HR documents or trackers have you owned?',
      'How do you handle confidential employee information?',
      'Tell me about a process you improved in HR operations.',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('hr executive'),
  faqs: buildStandardFaqs('hr executive'),
  internalLinks: buildInternalLinks('hr-executive'),
  cta: buildStandardCta('hr executive'),
};
