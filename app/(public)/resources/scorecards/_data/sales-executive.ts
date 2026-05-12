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

export const salesExecutive: ScorecardPage = {
  slug: 'sales-executive',
  role: 'Sales Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Sales Executive Candidate Scorecard Template | HireSort',
    description:
      'Use this sales executive candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'sales executive candidate scorecard',
      'sales executive interview scorecard',
      'sales executive hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Sales Executive ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate sales executive candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps sales leaders, founders, recruiters, and revenue teams compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('sales executive'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Sales experience and market fit', weight: '20%', whatToLookFor: 'Experience selling similar products, deal sizes, customer segments, or industries.' },
      { criterion: 'Prospecting and lead generation', weight: '20%', whatToLookFor: 'Outbound calling, email, LinkedIn prospecting, pipeline generation, and territory building.' },
      { criterion: 'Quota achievement and performance', weight: '25%', whatToLookFor: 'Evidence of targets, attainment, revenue generated, conversion rates, or awards.' },
      { criterion: 'CRM discipline and sales process', weight: '10%', whatToLookFor: 'Use of CRM, pipeline hygiene, follow-up discipline, and structured sales cadence.' },
      { criterion: 'Communication and persuasion', weight: '15%', whatToLookFor: 'Clear positioning, customer discovery, objection handling, and consultative selling.' },
      { criterion: 'Resilience and coachability', weight: '10%', whatToLookFor: 'Ability to handle rejection, learn quickly, and improve based on feedback.' },
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
      'No target or performance metrics',
      'Only vague sales responsibilities',
      'Poor evidence of prospecting ownership',
      'No CRM/process experience',
      'Short tenure without context',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'How did you build pipeline in your last role?',
      'What was your quota and attainment?',
      'Walk me through a difficult objection you handled.',
      'How do you organize follow-ups and pipeline hygiene?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('sales executive'),
  faqs: buildStandardFaqs('sales executive'),
  internalLinks: buildInternalLinks('sales-executive'),
  cta: buildStandardCta('sales executive'),
};
