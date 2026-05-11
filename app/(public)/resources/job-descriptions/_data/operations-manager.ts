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

export const operationsManager: JobDescriptionPage = {
  slug: 'operations-manager',
  role: 'Operations Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Operations Manager Job Description Template | HireSort',
    description:
      'Use this operations manager job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Operations Manager candidates.',
    keywords: [
      'operations manager job description',
      'business operations manager JD',
      'operations lead job description',
      'ops manager template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Operations Manager ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize operations manager job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'An Operations Manager is responsible for improving business processes, coordinating execution, tracking operational performance, managing cross-functional workflows, and ensuring that teams deliver reliably. The role requires ownership, process thinking, data orientation, and strong stakeholder management.',
    ],
  },

  responsibilities: [
    'Manage day-to-day operations and ensure workflows run smoothly.',
    'Identify process bottlenecks and implement improvements.',
    'Track operational KPIs, create dashboards, and report performance trends.',
    'Coordinate across teams such as sales, customer success, finance, product, vendors, or field operations.',
    'Create SOPs, playbooks, trackers, escalation paths, and operating rhythms.',
    'Manage projects, timelines, resources, and issue resolution.',
    'Support planning, budgeting, vendor coordination, compliance, or quality control depending on business context.',
  ],

  requiredSkills: [
    'Experience in operations, project management, business operations, process improvement, or team coordination.',
    'Strong organizational, analytical, and stakeholder management skills.',
    'Ability to create structure, SOPs, trackers, and operating cadences.',
    'Comfort with spreadsheets, dashboards, reporting, and performance metrics.',
    'Ownership mindset and ability to solve problems across functions.',
  ],

  preferredQualifications: [
    'Experience in SaaS, logistics, healthcare, ecommerce, manufacturing, staffing, professional services, or startups.',
    'Exposure to tools such as Excel, Google Sheets, Notion, Asana, Jira, Monday, ClickUp, ERP, CRM, or BI tools.',
    'Experience managing vendors, teams, SLAs, quality metrics, or field operations.',
    'Lean, Six Sigma, PMP, or process improvement exposure.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for operations manager candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Operations ownership', weight: '30%', lookFor: 'Process management, execution, cross-functional workflows, and operating cadence.' },
      { criterion: 'Process improvement', weight: '25%', lookFor: 'Bottleneck removal, SOP creation, automation, cost reduction, or quality improvement.' },
      { criterion: 'Metrics and reporting', weight: '20%', lookFor: 'KPIs, dashboards, trackers, performance reviews, and analytical rigor.' },
      { criterion: 'Stakeholder coordination', weight: '15%', lookFor: 'Team, vendor, leadership, customer, or cross-functional coordination.' },
      { criterion: 'Business context fit', weight: '10%', lookFor: 'Industry, scale, complexity, and operating model relevance.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about a process you improved significantly.',
      'How do you identify bottlenecks in operations?',
      'What operating metrics have you owned before?',
      'How do you manage cross-functional dependencies?',
      'Describe a time when execution was failing and you had to fix it.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume says operations but only shows coordination without ownership or measurable improvement.',
      'No evidence of metrics, SOPs, trackers, or process discipline.',
      'Weak stakeholder management for roles requiring cross-functional execution.',
      'No clarity on scale, team size, volume, or operational complexity.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Operations Manager'),
  faqs: buildStandardFaqs('Operations Manager', 'operations manager'),
  internalLinks: standardInternalLinks,
};
