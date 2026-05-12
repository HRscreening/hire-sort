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

export const dataAnalyst: ScreeningRubricPage = {
  slug: 'data-analyst',
  role: 'Data Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Data Analyst Screening Rubric | HireSort',
    description:
      'Use this data analyst screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'data analyst screening rubric',
      'data analyst resume screening',
      'analyst hiring rubric',
      'data analyst candidate evaluation',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Data Analyst ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate data analyst resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Data Analyst screening rubric',
    rows: [
      { criterion: 'Technical analytics skills', weight: '25%', whatToLookFor: 'SQL, Excel, Python/R, BI tools, statistics, and data manipulation ability.', resumeEvidence: 'SQL queries, dashboards, Python/R projects, Excel modeling, Tableau/Power BI exposure.' },
      { criterion: 'Analytical problem-solving', weight: '25%', whatToLookFor: 'Ability to structure business questions, analyze data, and draw useful conclusions.', resumeEvidence: 'Business analysis examples, insight generation, cohort/funnel analysis, root-cause analysis.' },
      { criterion: 'Dashboarding and visualization', weight: '15%', whatToLookFor: 'Ability to communicate data clearly through dashboards, charts, and reports.', resumeEvidence: 'BI dashboards, KPI reporting, visualization projects, recurring reporting ownership.' },
      { criterion: 'Business impact orientation', weight: '15%', whatToLookFor: 'Evidence that analysis influenced decisions, improved metrics, or supported business outcomes.', resumeEvidence: 'Revenue, retention, cost, conversion, operations, or productivity impact.' },
      { criterion: 'Data quality and attention to detail', weight: '10%', whatToLookFor: 'Ability to clean, validate, reconcile, and interpret data carefully.', resumeEvidence: 'Data cleaning, QA checks, reconciliation, metric definitions, documentation.' },
      { criterion: 'Communication and stakeholder management', weight: '10%', whatToLookFor: 'Ability to explain analysis to non-technical stakeholders.', resumeEvidence: 'Stakeholder presentations, decision support, written summaries, cross-functional projects.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a data analyst role, the resume should ideally show:',
    items: [
      'SQL or equivalent data querying skill',
      'Evidence of business analysis',
      'Dashboard/reporting experience',
      'Clear examples of insight or impact',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'Only course projects with no applied analysis',
      'Tool names listed without evidence of use',
      'No business context behind analysis',
      'No explanation of impact or decision support',
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
      'Does the candidate translate data into decisions?',
      'Are the technical skills proven through projects or only listed?',
      'Is the candidate strong enough for the data volume and complexity of the role?',
      'Can the candidate communicate insights clearly?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('data analyst'),
  internalLinks: buildInternalLinks('data-analyst'),
  cta: buildStandardCta('data analyst'),
};
