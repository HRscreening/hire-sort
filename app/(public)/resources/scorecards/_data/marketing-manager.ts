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

export const marketingManager: ScorecardPage = {
  slug: 'marketing-manager',
  role: 'Marketing Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Marketing Manager Candidate Scorecard Template | HireSort',
    description:
      'Use this marketing manager candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'marketing manager candidate scorecard',
      'marketing manager interview scorecard',
      'marketing manager hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Marketing Manager ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate marketing manager candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps founders, marketing leaders, recruiters, and growth teams compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('marketing manager'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Marketing strategy and channel fit', weight: '20%', whatToLookFor: 'Experience selecting channels, defining audience segments, and building go-to-market plans.' },
      { criterion: 'Campaign execution', weight: '20%', whatToLookFor: 'Ability to launch, manage, and iterate campaigns across content, paid, email, social, or partnerships.' },
      { criterion: 'Performance analytics', weight: '20%', whatToLookFor: 'Use of CAC, conversion, funnel, pipeline, traffic, engagement, and revenue metrics.' },
      { criterion: 'Positioning and messaging', weight: '15%', whatToLookFor: 'Ability to write clear positioning, campaigns, content briefs, and customer-facing copy.' },
      { criterion: 'Budget and vendor management', weight: '10%', whatToLookFor: 'Experience managing budgets, agencies, freelancers, or campaign spend.' },
      { criterion: 'Cross-functional collaboration', weight: '15%', whatToLookFor: 'Working with sales, product, design, leadership, and customer teams.' },
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
      'No measurable campaign outcomes',
      'Only activity metrics with no business impact',
      'Weak positioning examples',
      'No channel ownership',
      'No collaboration with sales or product',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'Which campaign are you most proud of and why?',
      'How do you decide which channels to invest in?',
      'What marketing metrics do you report to leadership?',
      'How do you work with sales on lead quality?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('marketing manager'),
  faqs: buildStandardFaqs('marketing manager'),
  internalLinks: buildInternalLinks('marketing-manager'),
  cta: buildStandardCta('marketing manager'),
};
