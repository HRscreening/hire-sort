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

export const salesExecutive: ScreeningRubricPage = {
  slug: 'sales-executive',
  role: 'Sales Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Sales Executive Screening Rubric | HireSort',
    description:
      'Use this sales executive screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'sales executive screening rubric',
      'sales resume screening',
      'sales candidate evaluation rubric',
      'sales hiring rubric',
      'sales executive score criteria',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Sales Executive ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate sales executive resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Sales Executive screening rubric',
    rows: [
      { criterion: 'Sales track record', weight: '30%', whatToLookFor: 'Revenue achievement, quota attainment, target ownership, and consistency of performance.', resumeEvidence: 'Quota numbers, revenue handled, target achievement %, deal size, awards, promotions.' },
      { criterion: 'Prospecting and pipeline generation', weight: '20%', whatToLookFor: 'Ability to generate leads, run outbound campaigns, qualify prospects, and build pipeline.', resumeEvidence: 'Cold calling, LinkedIn outreach, email campaigns, lead conversion, pipeline metrics.' },
      { criterion: 'Communication and persuasion', weight: '15%', whatToLookFor: 'Clarity, customer-facing communication, negotiation, and ability to influence buyers.', resumeEvidence: 'Client presentations, proposal ownership, negotiation examples, customer-facing roles.' },
      { criterion: 'Sales process and CRM discipline', weight: '15%', whatToLookFor: 'Use of CRM, pipeline hygiene, follow-up discipline, and structured selling methodology.', resumeEvidence: 'Salesforce, HubSpot, Zoho, CRM reporting, sales stages, forecasting exposure.' },
      { criterion: 'Industry and buyer fit', weight: '10%', whatToLookFor: 'Experience selling to similar customers, industries, deal sizes, or buying committees.', resumeEvidence: 'B2B/B2C fit, SaaS/enterprise/SMB exposure, geography, customer segment.' },
      { criterion: 'Ownership and resilience', weight: '10%', whatToLookFor: 'Ability to handle rejection, follow through, and work independently toward targets.', resumeEvidence: 'Long sales cycles, growth in responsibilities, repeat target achievement, retention/upsell examples.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a sales executive role, the resume should ideally show:',
    items: [
      'Clear sales target or revenue ownership',
      'Evidence of prospecting or customer interaction',
      'CRM or structured pipeline experience',
      'Communication clarity',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'No numbers or quota-related evidence',
      'Only coordination work without selling ownership',
      'Resume focuses on responsibilities but not outcomes',
      'Unclear customer segment or sales cycle',
      'No evidence of follow-up discipline',
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
      'Has this candidate owned revenue or only supported sales?',
      'What customer segment has the candidate sold to?',
      'Does the candidate show repeatable sales process discipline?',
      'Are outcomes quantified clearly?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('sales executive'),
  internalLinks: buildInternalLinks('sales-executive'),
  cta: buildStandardCta('sales executive'),
};
