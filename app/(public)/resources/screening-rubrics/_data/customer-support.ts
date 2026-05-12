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

export const customerSupport: ScreeningRubricPage = {
  slug: 'customer-support',
  role: 'Customer Support',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Customer Support Screening Rubric | HireSort',
    description:
      'Use this customer support screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'customer support screening rubric',
      'customer support resume screening',
      'support candidate evaluation rubric',
      'customer service hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'Customer Support ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate customer support resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'Customer Support screening rubric',
    rows: [
      { criterion: 'Customer communication', weight: '25%', whatToLookFor: 'Clarity, tone, responsiveness, and ability to explain solutions to customers.', resumeEvidence: 'Email/chat/call support, customer feedback, communication-heavy roles, CSAT references.' },
      { criterion: 'Issue resolution ability', weight: '20%', whatToLookFor: 'Ability to diagnose customer problems, troubleshoot, and close tickets effectively.', resumeEvidence: 'Ticket resolution metrics, escalation handling, troubleshooting examples, SLA performance.' },
      { criterion: 'Empathy and patience', weight: '20%', whatToLookFor: 'Ability to handle frustrated customers and maintain professionalism under pressure.', resumeEvidence: 'Complaint handling, retention support, difficult customer situations, customer success exposure.' },
      { criterion: 'Product and process understanding', weight: '15%', whatToLookFor: 'Ability to learn product workflows, follow SOPs, and document repeat issues.', resumeEvidence: 'Knowledge base work, SOP usage, product training, bug reporting, internal documentation.' },
      { criterion: 'Tools and systems exposure', weight: '10%', whatToLookFor: 'Experience with support tools, CRM, chat tools, ticketing systems, or helpdesk platforms.', resumeEvidence: 'Zendesk, Freshdesk, Intercom, HubSpot, Jira, Salesforce, live chat tools.' },
      { criterion: 'Reliability and ownership', weight: '10%', whatToLookFor: 'Consistency, shift discipline, follow-through, and ability to manage ticket queues.', resumeEvidence: 'Queue ownership, SLA adherence, shift-based work, high-volume support exposure.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a customer support role, the resume should ideally show:',
    items: [
      'Customer-facing communication experience',
      'Issue resolution or ticket-handling exposure',
      'Ability to work with processes and tools',
      'Professional tone and empathy',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'No customer interaction evidence',
      'Generic service experience without problem-solving detail',
      'No tool or process exposure for a support operations role',
      'Poorly written resume for a communication-heavy role',
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
      'Can this candidate communicate clearly under pressure?',
      'Has the candidate resolved issues or only routed them?',
      'Does the candidate have tool/process discipline?',
      'Is the candidate suitable for high-volume customer interactions?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('customer support'),
  internalLinks: buildInternalLinks('customer-support'),
  cta: buildStandardCta('customer support'),
};
