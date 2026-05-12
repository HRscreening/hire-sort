import type { ScorecardPage } from './types';
import {
  buildHowHireSortHelps,
  buildInternalLinks,
  buildProblemSection,
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardScoringScale,
  UPDATED_AT,
} from './_shared';

export const customerSupport: ScorecardPage = {
  slug: 'customer-support',
  role: 'Customer Support',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Customer Support Candidate Scorecard Template | HireSort',
    description:
      'Use this customer support candidate scorecard template to evaluate resumes and interviews consistently. Define criteria, capture evidence, compare candidates, and build stronger shortlists.',
    keywords: [
      'customer support candidate scorecard',
      'customer support interview scorecard',
      'customer support hiring scorecard',
      'candidate evaluation scorecard',
      'resume screening scorecard',
      'structured hiring scorecard',
    ],
  },

  hero: {
    eyebrow: 'Scorecards',
    titlePrefix: 'Customer Support ',
    titleAccent: 'Candidate Scorecard',
    titleSuffix: ' Template',
    lead: [
      'Evaluate customer support candidates with a structured scorecard built for consistent resume screening, interview evaluation, and hiring-manager review.',
      'This template helps support managers, operations leads, recruiters, and founders compare candidates using clear criteria, evidence, scores, and notes instead of relying on scattered impressions.',
    ],
    ...buildStandardHeroCtas(),
  },

  problemSection: buildProblemSection('customer support'),

  criteria: {
    title: 'What to evaluate',
    intro: 'Use this table as the shared evaluation framework. Adjust weights based on your role requirements and seniority level.',
    rows: [
      { criterion: 'Customer communication and empathy', weight: '25%', whatToLookFor: 'Clear, patient, helpful communication with customers across email, chat, phone, or tickets.' },
      { criterion: 'Issue resolution and troubleshooting', weight: '20%', whatToLookFor: 'Ability to diagnose problems, ask clarifying questions, and resolve issues effectively.' },
      { criterion: 'Product/process knowledge', weight: '15%', whatToLookFor: 'Experience learning product workflows, internal tools, support docs, and escalation paths.' },
      { criterion: 'Ticket discipline and SLA orientation', weight: '15%', whatToLookFor: 'Experience managing queues, response times, documentation, and follow-up.' },
      { criterion: 'Escalation and collaboration', weight: '10%', whatToLookFor: 'Ability to coordinate with product, engineering, success, or operations teams.' },
      { criterion: 'Quality and customer experience', weight: '15%', whatToLookFor: 'Evidence of CSAT, NPS, retention support, QA scores, or customer appreciation.' },
    ],
  },

  scoringScale: {
    title: 'Scoring scale',
    intro: 'Apply the same scale across reviewers so totals are comparable across candidates.',
    rows: standardScoringScale,
  },

  redFlags: {
    title: 'Red flags to watch for',
    items: [
      'No customer-facing experience',
      'No evidence of ticket ownership',
      'Poor written communication',
      'No SLA or process exposure',
      'Lack of troubleshooting examples',
    ],
  },

  interviewQuestions: {
    title: 'Interview questions to pair with this scorecard',
    items: [
      'How do you handle an angry customer?',
      'How do you decide when to escalate a ticket?',
      'What support metrics have you worked with?',
      'Tell me about a time you improved a support process.',
    ],
  },

  howHireSortHelps: buildHowHireSortHelps('customer support'),
  faqs: buildStandardFaqs('customer support'),
  internalLinks: buildInternalLinks('customer-support'),
  cta: buildStandardCta('customer support'),
};
