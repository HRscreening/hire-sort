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

export const productManager: ScorecardPage = {
  slug: 'product-manager',
  role: 'Product Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Product Manager Candidate Scorecard Template | HireSort',
    description:
      'Use this product manager candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'product manager candidate scorecard',
      'product manager interview scorecard',
      'product manager hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Product Manager ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate product manager candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps founders, product leaders, recruiters, and hiring managers compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('product manager'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Product sense and customer understanding', weight: '20%', whatToLookFor: 'Evidence of user research, customer empathy, product judgment, and problem discovery.' },
      { criterion: 'Prioritization and roadmap thinking', weight: '20%', whatToLookFor: 'Ability to sequence work, make trade-offs, and focus on business/user outcomes.' },
      { criterion: 'Execution and delivery', weight: '20%', whatToLookFor: 'Examples of shipping features, coordinating teams, removing blockers, and managing timelines.' },
      { criterion: 'Data and experimentation mindset', weight: '15%', whatToLookFor: 'Use of metrics, funnels, A/B tests, analytics, and evidence-based decision-making.' },
      { criterion: 'Stakeholder communication', weight: '15%', whatToLookFor: 'Clear collaboration with engineering, design, sales, support, leadership, and customers.' },
      { criterion: 'Domain and company fit', weight: '10%', whatToLookFor: 'Relevance to product stage, business model, market, and team maturity.' },
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
      'Feature-list resumes without outcomes',
      'No evidence of customer discovery',
      'Weak metrics ownership',
      'Unclear role in product launches',
      'Over-indexing on strategy with little delivery evidence',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'Tell me about a product decision you reversed.',
      'How do you prioritize between customer requests and roadmap work?',
      'What metrics did you own in your last product?',
      'How do you work with engineering when scope changes?',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('product manager'),
  faqs: buildStandardFaqs('product manager'),
  internalLinks: buildInternalLinks('product-manager'),
  cta: buildStandardCta('product manager'),
};
