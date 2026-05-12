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

export const businessDevelopmentExecutive: ScreeningRubricPage = {
  slug: 'business-development-executive',
  role: 'Business Development Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Business Development Executive Screening Rubric | HireSort',
    description:
      'Use this business development executive screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'business development executive screening rubric',
      'business development resume screening',
      'BDE candidate evaluation rubric',
      'business development hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Business Development Executive ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate business development executive resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Business Development Executive screening rubric',
    rows: [
      { criterion: 'Prospecting and lead generation', weight: '25%', whatToLookFor: 'Ability to identify prospects, run outreach, and create opportunities.', resumeEvidence: 'Cold calls, email campaigns, LinkedIn outreach, event leads, lead volume, pipeline created.' },
      { criterion: 'Relationship building', weight: '20%', whatToLookFor: 'Ability to build trust with prospects, partners, clients, or channel stakeholders.', resumeEvidence: 'Client meetings, partnerships, account nurturing, stakeholder mapping, follow-ups.' },
      { criterion: 'Qualification and opportunity management', weight: '15%', whatToLookFor: 'Ability to understand customer needs, qualify opportunities, and move prospects forward.', resumeEvidence: 'Lead qualification, discovery calls, pipeline stages, requirement gathering.' },
      { criterion: 'Communication and presentation', weight: '15%', whatToLookFor: 'Ability to explain offerings clearly and professionally.', resumeEvidence: 'Pitch decks, demos, client presentations, proposal support, negotiation exposure.' },
      { criterion: 'CRM and follow-up discipline', weight: '10%', whatToLookFor: 'Ability to maintain prospect data, update pipeline, and follow up consistently.', resumeEvidence: 'CRM usage, trackers, follow-up cadence, meeting notes, pipeline reports.' },
      { criterion: 'Market understanding', weight: '10%', whatToLookFor: 'Understanding of industry, customer segments, competition, and buyer needs.', resumeEvidence: 'Sector exposure, territory knowledge, competitor research, market mapping.' },
      { criterion: 'Target ownership', weight: '5%', whatToLookFor: 'Evidence of targets, ownership, and willingness to work toward measurable outcomes.', resumeEvidence: 'Targets, incentives, conversion rates, revenue contribution, activity metrics.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a business development executive role, the resume should ideally show:',
    items: [
      'Prospecting or client-facing experience',
      'Clear communication',
      'Follow-up discipline',
      'Some evidence of pipeline, targets, or opportunity ownership',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'No evidence of outreach or client interaction',
      'Only marketing/support tasks mislabeled as business development',
      'No CRM or follow-up discipline',
      'No measurable outcomes or activity metrics',
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
      'Has the candidate created opportunities or only supported them?',
      'Can they communicate clearly with prospects?',
      'Do they understand the target market?',
      'Will they maintain pipeline discipline?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('business development executive'),
  internalLinks: buildInternalLinks('business-development-executive', { hasScorecard: false }),
  cta: buildStandardCta('business development executive'),
};
