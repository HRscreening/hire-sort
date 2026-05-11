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

export const hrExecutive: JobDescriptionPage = {
  slug: 'hr-executive',
  role: 'HR Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'HR Executive Job Description Template | HireSort',
    description:
      'Use this HR executive job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for HR Executive candidates.',
    keywords: [
      'HR executive job description',
      'human resources executive JD',
      'HR generalist job description',
      'HR operations job description',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'HR Executive ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize HR executive job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'An HR Executive supports day-to-day human resources operations such as recruitment coordination, onboarding, employee records, payroll inputs, compliance documentation, attendance, employee engagement, and HR administration. The role requires confidentiality, organization, communication, and process discipline.',
    ],
  },

  responsibilities: [
    'Support recruitment activities such as job posting, resume coordination, interview scheduling, and candidate follow-up.',
    'Maintain employee records, HR documentation, joining files, and exit documentation.',
    'Coordinate onboarding, induction, employee communication, and HR process handoffs.',
    'Support attendance, leave, payroll inputs, compliance records, and HR reports.',
    'Assist with employee engagement, policy communication, and grievance coordination.',
    'Maintain data accuracy in HRMS, spreadsheets, or internal systems.',
    'Coordinate with managers, finance, admin, and leadership for HR operations.',
  ],

  requiredSkills: [
    'Bachelor’s degree or relevant HR qualification.',
    'Experience or interest in recruitment, HR operations, employee lifecycle, or HR administration.',
    'Strong communication, confidentiality, documentation, and coordination skills.',
    'Basic understanding of HR policies, attendance, onboarding, and employee records.',
    'Comfort using spreadsheets, HRMS tools, email, and documentation systems.',
  ],

  preferredQualifications: [
    'Experience in startups, staffing firms, professional services, healthcare, education, manufacturing, or technology companies.',
    'Knowledge of payroll coordination, statutory compliance, employee engagement, or HR reporting.',
    'Experience using HRMS, ATS, payroll, or attendance systems.',
    'Ability to improve HR processes and reduce manual follow-up.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for HR executive candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'HR operations experience', weight: '30%', lookFor: 'Onboarding, employee records, documentation, attendance, payroll inputs, and lifecycle processes.' },
      { criterion: 'Recruitment coordination', weight: '25%', lookFor: 'Job posting, candidate tracking, interview scheduling, resume coordination, and follow-ups.' },
      { criterion: 'Process and documentation discipline', weight: '20%', lookFor: 'Accuracy, confidentiality, compliance records, and structured reporting.' },
      { criterion: 'Communication and employee handling', weight: '15%', lookFor: 'Stakeholder coordination, employee queries, and policy communication.' },
      { criterion: 'Tools and reporting', weight: '10%', lookFor: 'HRMS, spreadsheets, ATS, attendance systems, and reporting comfort.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about the HR processes you have handled independently.',
      'How do you maintain accuracy in employee records?',
      'How do you manage candidate follow-ups and interview coordination?',
      'How do you handle confidential employee information?',
      'Which HR tools or systems have you used?',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume uses broad HR terms but does not show specific process ownership.',
      'No evidence of documentation discipline or confidentiality.',
      'Weak comfort with spreadsheets, HRMS, ATS, or structured record-keeping.',
      'Experience is only event coordination when the role requires HR operations.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('HR Executive'),
  faqs: buildStandardFaqs('HR Executive', 'HR executive'),
  internalLinks: standardInternalLinks,
};
