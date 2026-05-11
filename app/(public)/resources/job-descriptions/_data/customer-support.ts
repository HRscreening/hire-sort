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

export const customerSupport: JobDescriptionPage = {
  slug: 'customer-support',
  role: 'Customer Support',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Customer Support Job Description Template | HireSort',
    description:
      'Use this customer support job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Customer Support candidates.',
    keywords: [
      'customer support job description',
      'customer service job description',
      'support executive job description',
      'customer support representative JD',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Customer Support ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize customer support job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'Customer Support professionals help customers resolve questions, issues, and product concerns through channels such as email, chat, phone, or helpdesk systems. The role requires empathy, communication, patience, product understanding, and ownership of customer outcomes.',
    ],
  },

  responsibilities: [
    'Respond to customer queries through email, chat, phone, or ticketing systems.',
    'Diagnose customer issues and provide accurate, timely resolutions.',
    'Document tickets, recurring problems, and customer feedback clearly.',
    'Coordinate with product, engineering, operations, or account teams when escalation is needed.',
    'Maintain service quality metrics such as response time, resolution time, CSAT, and ticket quality.',
    'Contribute to help articles, FAQs, support playbooks, and process improvements.',
    'Represent the company with professionalism, empathy, and ownership.',
  ],

  requiredSkills: [
    'Strong written and verbal communication skills.',
    'Customer empathy, patience, and problem-solving orientation.',
    'Ability to manage multiple tickets or conversations without losing context.',
    'Basic comfort with helpdesk, CRM, or support tools.',
    'Ability to learn products quickly and explain them clearly.',
  ],

  preferredQualifications: [
    'Experience in SaaS, ecommerce, fintech, healthcare, telecom, or marketplace support.',
    'Exposure to tools such as Zendesk, Freshdesk, Intercom, HubSpot, or Salesforce.',
    'Experience with support metrics such as CSAT, FRT, AHT, SLA, or resolution rate.',
    'Ability to identify recurring issues and suggest product or process improvements.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for customer support candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Customer communication', weight: '30%', lookFor: 'Clarity, empathy, tone, and ability to handle difficult conversations.' },
      { criterion: 'Support operations experience', weight: '25%', lookFor: 'Ticketing tools, SLAs, queues, escalations, and documentation.' },
      { criterion: 'Problem-solving', weight: '20%', lookFor: 'Diagnosis, ownership, follow-through, and escalation judgment.' },
      { criterion: 'Product learning ability', weight: '15%', lookFor: 'Comfort understanding product workflows and explaining them to users.' },
      { criterion: 'Metrics and process orientation', weight: '10%', lookFor: 'CSAT, response time, resolution time, quality checks, and process improvements.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about a difficult customer issue you resolved.',
      'How do you prioritize when multiple customers need help at once?',
      'What makes a great support response?',
      'How do you handle a customer when the product is actually at fault?',
      'Which support metrics have you worked with before?',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume shows generic customer-facing experience but no issue resolution or ticket ownership.',
      'No evidence of written communication quality for email/chat roles.',
      'Weak escalation judgment or no mention of working with internal teams.',
      'No exposure to support tools or metrics where the role requires structured operations.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Customer Support'),
  faqs: buildStandardFaqs('Customer Support', 'customer support'),
  internalLinks: standardInternalLinks,
};
