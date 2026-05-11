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

export const productManager: JobDescriptionPage = {
  slug: 'product-manager',
  role: 'Product Manager',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Product Manager Job Description Template | HireSort',
    description:
      'Use this product manager job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Product Manager candidates.',
    keywords: [
      'product manager job description',
      'PM job description',
      'SaaS product manager JD',
      'product management template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Product Manager ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize product manager job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Product Manager is responsible for identifying customer problems, defining product direction, prioritizing features, aligning cross-functional teams, and ensuring product outcomes are delivered. The role requires customer empathy, analytical thinking, communication, execution discipline, and business judgment.',
    ],
  },

  responsibilities: [
    'Understand customer needs, market trends, and business priorities.',
    'Define product requirements, user stories, success metrics, and release goals.',
    'Prioritize roadmap items based on impact, effort, risk, and strategic fit.',
    'Collaborate with engineering, design, marketing, sales, and customer success teams.',
    'Run discovery, user research, stakeholder interviews, and feedback loops.',
    'Track product performance and use data to guide decisions.',
    'Communicate roadmap decisions, trade-offs, and launch plans clearly.',
  ],

  requiredSkills: [
    'Experience in product management, product operations, consulting, analytics, engineering, or a related role.',
    'Strong problem-solving, prioritization, and stakeholder management skills.',
    'Ability to translate customer needs into clear requirements and product decisions.',
    'Comfort working with data, user feedback, and cross-functional teams.',
    'Strong written and verbal communication skills.',
  ],

  preferredQualifications: [
    'Experience in B2B SaaS, HR tech, marketplace, fintech, healthcare, or enterprise software.',
    'Experience with agile delivery, product analytics, UX research, or go-to-market launches.',
    'Technical fluency sufficient to work effectively with engineering teams.',
    'Experience owning measurable product KPIs.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for product manager candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Product thinking', weight: '30%', lookFor: 'Problem discovery, user understanding, prioritization, and trade-off decisions.' },
      { criterion: 'Execution and delivery', weight: '25%', lookFor: 'Roadmap ownership, launches, sprint collaboration, and shipping outcomes.' },
      { criterion: 'Business impact', weight: '20%', lookFor: 'Metrics influenced, growth, retention, efficiency, revenue, or user adoption outcomes.' },
      { criterion: 'Cross-functional leadership', weight: '15%', lookFor: 'Alignment with engineering, design, sales, marketing, and leadership.' },
      { criterion: 'Domain and stage fit', weight: '10%', lookFor: 'Relevant product type, user segment, company stage, and technical context.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about a product decision where you had to make a trade-off.',
      'How do you decide what goes on the roadmap?',
      'Describe a feature you launched and how you measured success.',
      'How do you work with engineering when timelines are tight?',
      'Tell me about a time user feedback changed your product direction.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume focuses on coordination but not product decisions or outcomes.',
      'No evidence of customer discovery, prioritization, or metrics.',
      'Claims ownership but does not clarify scope, team size, or shipped impact.',
      'Too much emphasis on feature output without evidence of user or business results.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Product Manager'),
  faqs: buildStandardFaqs('Product Manager', 'product manager'),
  internalLinks: standardInternalLinks,
};
