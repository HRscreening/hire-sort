import type { JobDescriptionPage } from './types';
import {
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelps,
  standardInternalLinks,
  UPDATED_AT,
} from './_shared';

export const dataAnalyst: JobDescriptionPage = {
  slug: 'data-analyst',
  role: 'Data Analyst',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Data Analyst Job Description Template | HireSort',
    description:
      'Use this data analyst job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Data Analyst candidates.',
    keywords: [
      'data analyst job description',
      'business analyst data job description',
      'analytics job description',
      'data analyst JD template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Data Analyst ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize data analyst job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Data Analyst collects, cleans, analyses, and visualises data to support business decisions. The role requires analytical thinking, SQL or spreadsheet capability, comfort with dashboards, and the ability to translate data into clear recommendations.',
    ],
  },

  responsibilities: [
    'Collect, clean, validate, and analyse data from multiple business systems.',
    'Write SQL queries or use analytics tools to extract and transform data.',
    'Build dashboards, reports, and recurring performance trackers.',
    'Analyse trends, cohorts, funnels, operations, revenue, product usage, or customer behaviour.',
    'Work with business teams to define metrics and answer decision questions.',
    'Present findings clearly with context, caveats, and recommendations.',
    'Improve data quality, documentation, and reporting processes over time.',
  ],

  requiredSkills: [
    'Strong analytical and problem-solving skills.',
    'Working knowledge of SQL, Excel/Google Sheets, and at least one BI or visualization tool.',
    'Ability to clean, structure, and interpret data accurately.',
    'Comfort communicating insights to non-technical stakeholders.',
    'Attention to detail and ability to validate assumptions before sharing results.',
  ],

  preferredQualifications: [
    'Experience with Python, R, dbt, BigQuery, Snowflake, Tableau, Power BI, Looker, or Metabase.',
    'Experience with product analytics, marketing analytics, financial analytics, or operations analytics.',
    'Ability to design metrics, build dashboards, and automate recurring reports.',
    'Exposure to statistical analysis, experimentation, or forecasting.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for data analyst candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Analytical toolkit', weight: '30%', lookFor: 'SQL, spreadsheets, BI tools, data cleaning, visualization, and analytics workflows.' },
      { criterion: 'Business impact', weight: '25%', lookFor: 'Evidence that analysis influenced decisions, revenue, efficiency, product changes, or operations.' },
      { criterion: 'Data quality and rigor', weight: '20%', lookFor: 'Validation, documentation, metric definitions, and ability to handle messy data.' },
      { criterion: 'Communication', weight: '15%', lookFor: 'Clear dashboards, stakeholder presentations, and decision-oriented storytelling.' },
      { criterion: 'Domain fit', weight: '10%', lookFor: 'Industry, function, data stack, and company-stage relevance.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about an analysis that changed a business decision.',
      'How do you validate whether a dashboard number is correct?',
      'What metrics would you track for a new product feature?',
      'How do you handle missing or inconsistent data?',
      'Explain a complex analysis to a non-technical stakeholder.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume lists tools but does not show business outcomes or decision impact.',
      'No evidence of SQL, data cleaning, or dashboard ownership where those are required.',
      'Overly academic analysis with weak business communication.',
      'No mention of validation, data quality, or metric definitions.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Data Analyst'),
  faqs: buildStandardFaqs('Data Analyst', 'data analyst'),
  internalLinks: standardInternalLinks,
};
