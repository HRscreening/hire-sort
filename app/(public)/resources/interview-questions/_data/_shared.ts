import type { FaqItem, InterviewQuestionsPage } from './types';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

export const hsRedirect = `${main_app_url}/`;

export const PUBLISHED_AT = '2026-04-21';
export const UPDATED_AT = '2026-05-12';

export const standardHowToRun = [
  'Align on the must-have competencies before interviews begin.',
  'Ask the same core questions to candidates being compared for the same role.',
  'Take evidence-based notes instead of writing only impressions.',
  'Score each candidate immediately after the interview while context is fresh.',
  'Compare candidates using the scorecard, not only the loudest opinion in the debrief.',
];

export const standardHowHireSortHelpsBody = [
  'Interview quality improves when the shortlist is already structured. HireSort helps teams screen resumes against job-specific rubrics, produce ranked shortlists, and capture strengths, missing elements, and evidence before interviews begin.',
  'That gives interviewers a clearer starting point: what to validate, what to probe deeper, and where the candidate may need follow-up questions.',
];

export const buildStandardFaqs = (role: string, roleLower: string): FaqItem[] => [
  {
    id: 'best-questions',
    question: `What are the best ${roleLower} interview questions?`,
    answer: [
      `The best questions test role-specific skills, judgment, communication, and evidence of past performance. For a ${roleLower}, focus on practical examples rather than generic personality questions.`,
    ],
  },
  {
    id: 'how-score',
    question: `How should I score a ${roleLower} interview?`,
    answer: [
      'Use a scorecard with clear criteria, rating guidance, and evidence notes. Score each area separately so the final decision is easier to compare across candidates.',
    ],
  },
  {
    id: 'match-rubric',
    question: 'Should interview questions match the resume screening rubric?',
    answer: [
      'Yes. Resume screening and interviews should evaluate the same core role requirements. The interview should validate and deepen the evidence found during screening.',
    ],
  },
  {
    id: 'hiresort-workflows',
    question: 'Can HireSort help create structured hiring workflows?',
    answer: [
      'Yes. HireSort helps teams move from job description to rubric, ranked shortlist, candidate detail review, and structured scorecard-driven evaluation.',
    ],
  },
];

export const buildStandardCta = (role: string): InterviewQuestionsPage['cta'] => ({
  eyebrow: 'Hire better',
  title: `Hire better ${role.toLowerCase()} candidates`,
  body: 'Use HireSort to screen resumes, identify stronger candidates, and carry structured criteria into interviews.',
  primary: { label: 'Get started for free', href: hsRedirect },
  secondary: { label: 'Screen resumes with HireSort', href: hsRedirect },
});

export const buildStandardHeroCtas = () => ({
  primaryCta: { label: 'Create a scorecard', href: hsRedirect },
  secondaryCta: { label: 'Screen resumes with HireSort', href: hsRedirect },
});

export const buildInternalLinks = (jdSlug?: string) => {
  const links = [
    { href: '/resources/interview-questions', label: 'All interview question sets' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-parser', label: 'Resume Parser' },
    { href: '/pricing', label: 'Pricing' },
  ];
  if (jdSlug) {
    links.splice(1, 0, {
      href: `/resources/job-descriptions/${jdSlug}`,
      label: 'Matching job description template',
    });
  }
  return links;
};
