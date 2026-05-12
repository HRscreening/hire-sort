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

export const marketingManager: ScreeningRubricPage = {
  slug: 'marketing-manager',
  role: 'Marketing Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Marketing Manager Screening Rubric | HireSort',
    description:
      'Use this marketing manager screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'marketing manager screening rubric',
      'marketing manager resume screening',
      'marketing candidate evaluation rubric',
      'marketing hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Marketing Manager ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate marketing manager resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Marketing Manager screening rubric',
    rows: [
      { criterion: 'Marketing strategy and planning', weight: '20%', whatToLookFor: 'Ability to define target segments, campaign plans, positioning, and channel strategy.', resumeEvidence: 'Campaign strategy, GTM plans, segment targeting, brand/product positioning.' },
      { criterion: 'Channel execution', weight: '20%', whatToLookFor: 'Hands-on experience running campaigns across relevant channels.', resumeEvidence: 'SEO, paid ads, email, LinkedIn, events, partnerships, social, lifecycle campaigns.' },
      { criterion: 'Content and messaging quality', weight: '15%', whatToLookFor: 'Ability to create or guide persuasive content and clear messaging.', resumeEvidence: 'Landing pages, ads, blogs, case studies, email copy, campaign messaging.' },
      { criterion: 'Analytics and performance management', weight: '15%', whatToLookFor: 'Ability to measure campaign performance and optimize based on data.', resumeEvidence: 'CAC, CPL, MQLs, conversion rates, attribution, dashboards, experiments.' },
      { criterion: 'Growth experiments and optimization', weight: '15%', whatToLookFor: 'Experience testing ideas, improving funnels, and learning quickly.', resumeEvidence: 'A/B tests, conversion improvements, funnel experiments, channel optimization.' },
      { criterion: 'Team and stakeholder collaboration', weight: '15%', whatToLookFor: 'Ability to work with sales, product, design, agencies, and leadership.', resumeEvidence: 'Sales enablement, cross-functional campaigns, agency management, team coordination.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a marketing manager role, the resume should ideally show:',
    items: [
      'Relevant channel experience',
      'Clear campaign ownership',
      'Performance metrics or business impact',
      'Strong communication and messaging',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'Only generic marketing tasks without ownership',
      'No performance metrics',
      'Unclear channel expertise',
      'No examples of campaign outcomes or learning',
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
      'Has the candidate owned strategy or only execution?',
      'Which channels are proven through results?',
      'Does the candidate understand funnel metrics?',
      'Can they create clear messaging for the target audience?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('marketing manager'),
  internalLinks: buildInternalLinks('marketing-manager'),
  cta: buildStandardCta('marketing manager'),
};
