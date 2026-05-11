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

export const businessDevelopmentExecutive: JobDescriptionPage = {
  slug: 'business-development-executive',
  role: 'Business Development Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Business Development Executive Job Description Template | HireSort',
    description:
      'Use this business development executive job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Business Development Executive candidates.',
    keywords: [
      'business development executive job description',
      'BD executive JD',
      'business development representative job description',
      'BDE job description',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Business Development Executive ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize business development executive job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'A Business Development Executive identifies potential customers, builds relationships, creates partnership or sales opportunities, and supports revenue growth. The role requires prospecting discipline, market understanding, communication skills, and the ability to convert outreach into qualified conversations.',
    ],
  },

  responsibilities: [
    'Identify target accounts, prospects, partners, or market opportunities.',
    'Run outreach through calls, emails, LinkedIn, events, referrals, or network-led channels.',
    'Qualify prospects based on business need, budget, timeline, decision-making process, and fit.',
    'Schedule meetings, demos, or discovery calls for sales or leadership teams.',
    'Maintain CRM records, activity logs, and pipeline updates.',
    'Build relationships with prospects and support follow-up communication.',
    'Share market feedback, objections, and opportunity insights with internal teams.',
  ],

  requiredSkills: [
    'Experience or strong interest in sales, business development, partnerships, or customer-facing roles.',
    'Strong communication, persuasion, research, and follow-up skills.',
    'Ability to identify target customers and personalize outreach.',
    'Comfort with calls, emails, LinkedIn, CRM tools, and pipeline discipline.',
    'Goal orientation and ability to work with activity and conversion targets.',
  ],

  preferredQualifications: [
    'Experience in B2B SaaS, staffing, HR tech, recruitment, consulting, or technology businesses.',
    'Exposure to outbound sales, appointment setting, lead qualification, or enterprise prospecting.',
    'Experience using tools such as HubSpot, Salesforce, Apollo, LinkedIn Sales Navigator, or email automation tools.',
    'Ability to create outreach messaging and handle objections.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for business development executive candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Prospecting experience', weight: '30%', lookFor: 'Outbound, inbound qualification, account research, referrals, or partnerships.' },
      { criterion: 'Pipeline generation', weight: '25%', lookFor: 'Meetings booked, leads qualified, opportunities created, or target attainment.' },
      { criterion: 'Communication quality', weight: '20%', lookFor: 'Written outreach, calls, discovery, and stakeholder interaction.' },
      { criterion: 'Market and customer understanding', weight: '15%', lookFor: 'Industry awareness, buyer personas, and ability to personalize engagement.' },
      { criterion: 'CRM and process discipline', weight: '10%', lookFor: 'Follow-up, reporting, activity tracking, and data hygiene.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'How do you decide which prospects to target first?',
      'Walk me through your outbound process.',
      'How do you personalize outreach without spending too much time?',
      'Tell me about a meeting or opportunity you created from scratch.',
      'How do you handle prospects who do not respond?',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Candidate claims business development experience but shows no pipeline or prospecting ownership.',
      'No evidence of follow-up discipline or CRM usage.',
      'Communication is generic, vague, or not tailored to customer pain points.',
      'Too dependent on inbound leads for a role that requires outbound motion.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Business Development Executive'),
  faqs: buildStandardFaqs('Business Development Executive', 'business development executive'),
  internalLinks: standardInternalLinks,
};
