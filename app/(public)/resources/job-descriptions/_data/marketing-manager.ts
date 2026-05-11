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

export const marketingManager: JobDescriptionPage = {
  slug: 'marketing-manager',
  role: 'Marketing Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Marketing Manager Job Description Template | HireSort',
    description:
      'Use this marketing manager job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Marketing Manager candidates.',
    keywords: [
      'marketing manager job description',
      'digital marketing manager JD',
      'growth marketing job description',
      'marketing lead job description',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Marketing Manager ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize marketing manager job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Marketing Manager plans, executes, and optimizes marketing initiatives to drive brand awareness, pipeline, customer engagement, or revenue growth. The role requires channel execution, campaign planning, analytics, messaging, project management, and cross-functional collaboration.',
    ],
  },

  responsibilities: [
    'Plan and execute marketing campaigns across relevant channels such as content, email, SEO, paid, social, events, or partnerships.',
    'Develop messaging, positioning, and campaign briefs for target audiences.',
    'Track marketing performance and optimize campaigns based on data.',
    'Coordinate with sales, product, design, and leadership teams to align goals and messaging.',
    'Manage content calendars, campaign timelines, budgets, vendors, or agencies where required.',
    'Support lead generation, demand generation, brand building, or customer engagement initiatives.',
    'Report on marketing KPIs and recommend improvements.',
  ],

  requiredSkills: [
    'Experience in marketing, growth, digital marketing, content, demand generation, or brand roles.',
    'Ability to plan campaigns and execute across channels.',
    'Strong writing, messaging, analytical, and project management skills.',
    'Comfort with marketing tools, analytics dashboards, and performance reporting.',
    'Ability to collaborate with sales, product, and design teams.',
  ],

  preferredQualifications: [
    'Experience in SaaS, B2B, HR tech, recruitment, fintech, ecommerce, or startup environments.',
    'Knowledge of SEO, paid acquisition, lifecycle marketing, marketing automation, or product marketing.',
    'Experience with tools such as HubSpot, GA4, Search Console, Ahrefs, Semrush, Meta Ads, Google Ads, or LinkedIn Ads.',
    'Track record of improving leads, pipeline, traffic, conversion, or brand engagement.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for marketing manager candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Channel expertise', weight: '30%', lookFor: 'Relevant experience across SEO, content, paid, email, social, events, partnerships, or lifecycle.' },
      { criterion: 'Campaign execution', weight: '25%', lookFor: 'Ability to plan, launch, coordinate, and optimize campaigns.' },
      { criterion: 'Business impact', weight: '20%', lookFor: 'Pipeline, leads, revenue, traffic, conversion, retention, or awareness outcomes.' },
      { criterion: 'Messaging and content quality', weight: '15%', lookFor: 'Positioning, audience understanding, writing, and campaign briefs.' },
      { criterion: 'Analytics and tools', weight: '10%', lookFor: 'Reporting, experimentation, attribution, and marketing technology experience.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about a campaign you planned and executed end to end.',
      'Which marketing channels have worked best for you and why?',
      'How do you measure whether a campaign was successful?',
      'How do you work with sales or product teams?',
      'Describe a time you improved conversion, traffic, or pipeline.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume lists channels but shows no measurable outcomes.',
      'No clarity on whether the candidate owned strategy, execution, or coordination.',
      'Weak analytical orientation for performance marketing or growth roles.',
      'Portfolio or examples are missing where content or campaign quality matters.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Marketing Manager'),
  faqs: buildStandardFaqs('Marketing Manager', 'marketing manager'),
  internalLinks: standardInternalLinks,
};
