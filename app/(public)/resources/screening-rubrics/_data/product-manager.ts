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

export const productManager: ScreeningRubricPage = {
  slug: 'product-manager',
  role: 'Product Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Product Manager Screening Rubric | HireSort',
    description:
      'Use this product manager screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'product manager screening rubric',
      'product manager resume screening',
      'PM candidate evaluation rubric',
      'product management hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Product Manager ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate product manager resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Product Manager screening rubric',
    rows: [
      { criterion: 'Product judgment and user understanding', weight: '25%', whatToLookFor: 'Ability to understand user problems, define product opportunities, and make trade-offs.', resumeEvidence: 'User research, customer discovery, product decisions, feature prioritization examples.' },
      { criterion: 'Roadmap and prioritization', weight: '20%', whatToLookFor: 'Experience defining roadmaps, prioritizing features, and aligning stakeholders.', resumeEvidence: 'Roadmap ownership, prioritization frameworks, stakeholder alignment, product strategy.' },
      { criterion: 'Execution and delivery', weight: '15%', whatToLookFor: 'Ability to work with engineering/design and ship products or features.', resumeEvidence: 'Launched features, sprint collaboration, PRDs, delivery metrics, release ownership.' },
      { criterion: 'Analytics and metrics', weight: '15%', whatToLookFor: 'Use of data to measure success, diagnose issues, and improve product outcomes.', resumeEvidence: 'A/B tests, funnels, dashboards, retention, conversion, engagement metrics.' },
      { criterion: 'Cross-functional leadership', weight: '15%', whatToLookFor: 'Ability to coordinate engineering, design, sales, marketing, support, and leadership.', resumeEvidence: 'Cross-functional projects, stakeholder communication, conflict resolution.' },
      { criterion: 'Domain and role fit', weight: '10%', whatToLookFor: 'Fit with product type, customer segment, company stage, and seniority expectations.', resumeEvidence: 'B2B/B2C/SaaS/domain experience, team size, ownership scope, seniority alignment.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a product manager role, the resume should ideally show:',
    items: [
      'Product or adjacent ownership experience',
      'Evidence of shipped work',
      'Customer/user orientation',
      'Ability to work cross-functionally',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'Only project coordination without product decision-making',
      'No metrics or user insight',
      'Generic product language without shipped outcomes',
      'Unclear ownership of features or roadmap',
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
      'Has the candidate made real product decisions?',
      'Does the resume show user insight and business impact?',
      'Can the candidate work with engineering and design?',
      'Is the candidate suitable for the product stage and domain?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('product manager'),
  internalLinks: buildInternalLinks('product-manager'),
  cta: buildStandardCta('product manager'),
};
