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

export const salesExecutive: JobDescriptionPage = {
  slug: 'sales-executive',
  role: 'Sales Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Sales Executive Job Description Template | HireSort',
    description:
      'Use this sales executive job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Sales Executive candidates.',
    keywords: [
      'sales executive job description',
      'sales representative job description',
      'B2B sales job description',
      'sales JD template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Sales Executive ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize sales executive job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Sales Executive is responsible for generating revenue by identifying prospects, building relationships, understanding customer needs, presenting solutions, and converting opportunities into customers. The role requires commercial discipline, communication skills, follow-up rigor, and the ability to work toward targets.',
    ],
  },

  responsibilities: [
    'Identify and qualify new prospects through outbound, inbound, referrals, and network-led channels.',
    'Understand customer pain points and position the company’s product or service effectively.',
    'Run discovery calls, demos, follow-ups, negotiations, and deal-closing conversations.',
    'Maintain accurate pipeline records in CRM and provide regular sales forecasts.',
    'Meet or exceed monthly, quarterly, or annual revenue and activity targets.',
    'Coordinate with marketing, customer success, and product teams for customer feedback and handoffs.',
    'Build long-term relationships with customers and support repeat or expansion opportunities.',
  ],

  requiredSkills: [
    'Experience in sales, business development, account management, or customer-facing roles.',
    'Strong communication, persuasion, negotiation, and relationship-building skills.',
    'Ability to manage pipeline, follow-ups, and sales targets with discipline.',
    'Comfort using CRM tools, email, LinkedIn, calling, or other prospecting channels.',
    'Outcome orientation and ability to work in a target-driven environment.',
  ],

  preferredQualifications: [
    'Experience in B2B SaaS, recruitment, HR tech, staffing, or technology sales.',
    'Track record of meeting or exceeding sales quotas.',
    'Experience selling to founders, HR leaders, recruiters, or business owners.',
    'Ability to create outbound messaging and manage consultative selling cycles.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for sales executive candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Relevant sales experience', weight: '30%', lookFor: 'Inside sales, field sales, B2B, SaaS, staffing, HR tech, or industry-relevant selling exposure.' },
      { criterion: 'Target achievement', weight: '25%', lookFor: 'Quota attainment, revenue numbers, lead conversion, pipeline generation, or repeatable outcomes.' },
      { criterion: 'Prospecting and pipeline discipline', weight: '20%', lookFor: 'Outbound channels, CRM usage, follow-up habits, and pipeline management.' },
      { criterion: 'Communication and customer orientation', weight: '15%', lookFor: 'Discovery, presentations, negotiations, and stakeholder management.' },
      { criterion: 'Role and market fit', weight: '10%', lookFor: 'Sales cycle, ticket size, buyer persona, and company stage fit.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Walk me through your current or most recent sales process.',
      'How do you generate pipeline when inbound leads are limited?',
      'Tell me about a deal you lost and what you learned.',
      'How do you handle objections from a prospect?',
      'What sales metrics do you track every week?',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume describes tasks but gives no targets, quotas, revenue, conversion, or pipeline numbers.',
      'Candidate has sales titles but no evidence of owning prospecting or closing.',
      'Heavy reliance on inbound leads when the role requires outbound selling.',
      'Weak CRM discipline or no structured approach to follow-up.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Sales Executive'),
  faqs: buildStandardFaqs('Sales Executive', 'sales executive'),
  internalLinks: standardInternalLinks,
};
