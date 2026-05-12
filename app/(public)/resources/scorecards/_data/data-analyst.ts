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

export const dataAnalyst: ScorecardPage = {
  slug: 'data-analyst',
  role: 'Data Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Data Analyst Candidate Scorecard Template | HireSort',
    description:
      'Use this data analyst candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'data analyst candidate scorecard',
      'data analyst interview scorecard',
      'data analyst hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Data Analyst ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate data analyst candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps analytics leaders, business teams, recruiters, and founders compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('data analyst'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'SQL and data extraction skills', weight: '20%', whatToLookFor: 'Ability to query, join, clean, and validate data from databases or warehouses.' },
      { criterion: 'Analytical reasoning and statistics', weight: '20%', whatToLookFor: 'Structured problem solving, hypothesis testing, segmentation, trend analysis, and basic statistics.' },
      { criterion: 'Dashboarding and visualization', weight: '15%', whatToLookFor: 'Experience with BI tools, dashboards, charts, and decision-ready reporting.' },
      { criterion: 'Business understanding', weight: '20%', whatToLookFor: 'Ability to translate data into commercial, operational, product, or customer insights.' },
      { criterion: 'Data quality and attention to detail', weight: '15%', whatToLookFor: 'Evidence of validation, error checks, documentation, and reliable outputs.' },
      { criterion: 'Communication and storytelling', weight: '10%', whatToLookFor: 'Ability to explain findings clearly to non-technical stakeholders.' },
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
      'Tool lists without analytical examples',
      'No business impact',
      'Unclear SQL depth',
      'Dashboards without decision context',
      'Poor communication of findings',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'Describe a time your analysis changed a business decision.',
      'How do you validate a dataset before analysis?',
      'What SQL query pattern do you use most often?',
      'How do you explain complex analysis to non-technical teams?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('data analyst'),
  faqs: buildStandardFaqs('data analyst'),
  internalLinks: buildInternalLinks('data-analyst'),
  cta: buildStandardCta('data analyst'),
};
