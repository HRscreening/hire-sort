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

export const hrExecutive: ScreeningRubricPage = {
  slug: 'hr-executive',
  role: 'HR Executive',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'HR Executive Screening Rubric | HireSort',
    description:
      'Use this hr executive screening rubric to evaluate resumes consistently. Define criteria, weights, red flags, and shortlist logic before reviewing candidates.',
    keywords: [
      'HR executive screening rubric',
      'HR executive resume screening',
      'HR candidate evaluation rubric',
      'human resources hiring rubric',
    ],
  },

  hero: {
    eyebrow: 'Screening rubrics',
    titlePrefix: 'HR Executive ',
    titleAccent: 'Screening Rubric',
    lead: [
      'Use this structured rubric to evaluate hr executive resumes faster and more consistently.',
      'Define what matters before screening begins, compare candidates against the same criteria, and create better shortlists with less manual guesswork.',
    ],
    ...buildStandardHeroCtas(),
  },

  whatIsRubric: standardWhatIsRubric,

  rubric: {
    title: 'HR Executive screening rubric',
    rows: [
      { criterion: 'Recruitment and onboarding support', weight: '25%', whatToLookFor: 'Experience coordinating hiring, interviews, joining formalities, and onboarding tasks.', resumeEvidence: 'Recruitment coordination, interview scheduling, offer letters, onboarding checklists.' },
      { criterion: 'HR operations and compliance', weight: '20%', whatToLookFor: 'Ability to manage employee records, policies, attendance, payroll coordination, and compliance support.', resumeEvidence: 'HRMS usage, employee documentation, payroll support, compliance coordination.' },
      { criterion: 'Communication and employee interaction', weight: '20%', whatToLookFor: 'Ability to handle employee queries, communicate policies, and support managers.', resumeEvidence: 'Employee communication, grievance coordination, internal announcements, HR helpdesk work.' },
      { criterion: 'Tools and process discipline', weight: '10%', whatToLookFor: 'Familiarity with HRMS, ATS, spreadsheets, reporting, and process documentation.', resumeEvidence: 'ATS/HRMS exposure, Excel, dashboards, process trackers, documentation.' },
      { criterion: 'Empathy and culture fit', weight: '15%', whatToLookFor: 'Ability to handle people-sensitive situations with discretion and professionalism.', resumeEvidence: 'Employee engagement, conflict support, wellness/culture initiatives.' },
      { criterion: 'Organization and follow-through', weight: '10%', whatToLookFor: 'Ability to manage multiple tasks, deadlines, and employee processes accurately.', resumeEvidence: 'Joining timelines, document completion, event coordination, HR operations volume.' },
    ],
  },

  mustHaveSignals: {
    title: 'Must-have signals',
    intro: 'For a hr executive role, the resume should ideally show:',
    items: [
      'HR operations or recruitment coordination exposure',
      'Clear communication ability',
      'Process orientation',
      'Confidentiality and professionalism',
    ],
  },

  redFlags: {
    title: 'Red flags to watch for',
    intro: 'Red flags do not always mean automatic rejection, but they should trigger deeper review or follow-up questions.',
    items: [
      'Very vague HR responsibilities',
      'No evidence of process ownership',
      'Poorly structured resume for an HR communication role',
      'No tool or documentation exposure',
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
      'Can this candidate handle employee-facing communication?',
      'Does the candidate have recruitment or HR operations exposure?',
      'Is the candidate organized enough for compliance-heavy work?',
      'Can they work confidentially and professionally?',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  faqs: buildStandardFaqs('hr executive'),
  internalLinks: buildInternalLinks('hr-executive'),
  cta: buildStandardCta('hr executive'),
};
