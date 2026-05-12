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

export const operationsManager: ScorecardPage = {
  slug: 'operations-manager',
  role: 'Operations Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Operations Manager Candidate Scorecard Template | HireSort',
    description:
      'Use this operations manager candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'operations manager candidate scorecard',
      'operations manager interview scorecard',
      'operations manager hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Operations Manager ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate operations manager candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps founders, operations leaders, recruiters, and business teams compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('operations manager'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Process improvement and execution', weight: '25%', whatToLookFor: 'Experience improving workflows, reducing delays, increasing productivity, or standardizing operations.' },
      { criterion: 'Team and stakeholder coordination', weight: '15%', whatToLookFor: 'Managing teams, coordinating across functions, and ensuring task ownership.' },
      { criterion: 'SLA, vendor, or service management', weight: '15%', whatToLookFor: 'Handling service levels, vendors, partners, delivery operations, or operational escalations.' },
      { criterion: 'Data-driven operations', weight: '15%', whatToLookFor: 'Use of operational metrics, dashboards, reporting, and root-cause analysis.' },
      { criterion: 'Cost and productivity orientation', weight: '15%', whatToLookFor: 'Evidence of cost savings, efficiency improvements, utilization, throughput, or quality gains.' },
      { criterion: 'Problem solving and escalation handling', weight: '15%', whatToLookFor: 'Ability to manage ambiguity, resolve issues, and prevent repeat problems.' },
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
      'Only generic coordination language',
      'No quantified operational impact',
      'No metrics ownership',
      'Poor evidence of process improvement',
      'Unclear team or vendor management scope',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'Tell me about an operations process you improved.',
      'Which operational metrics did you track?',
      'How do you manage escalations?',
      'How do you balance cost, speed, and quality?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('operations manager'),
  faqs: buildStandardFaqs('operations manager'),
  internalLinks: buildInternalLinks('operations-manager', { hasJd: true, hasIq: false }),
  cta: buildStandardCta('operations manager'),
};
