import type { FaqItem, ScoreInterpretationRow, ScreeningRubricPage } from './types';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

export const hsRedirect = `${main_app_url}/`;

export const PUBLISHED_AT = '2026-05-05';
export const UPDATED_AT = '2026-05-12';

export const standardWhatIsRubric: ScreeningRubricPage['whatIsRubric'] = {
  title: 'What is a screening rubric?',
  body: [
    'A screening rubric defines the criteria and weights used to evaluate candidates before interviews. It helps recruiters and hiring managers agree on what matters for a role before resumes are reviewed.',
    'Unlike a scorecard, which records how a specific candidate performed, a rubric defines the evaluation standard. In HireSort, the job description can be converted into a role-specific rubric, and each resume can then be assessed against that rubric.',
  ],
};

export const standardScoreInterpretation: ScoreInterpretationRow[] = [
  { range: '85-100', interpretation: 'Strong shortlist', action: 'Candidate appears highly aligned. Prioritize for hiring manager review or interview.' },
  { range: '70-84', interpretation: 'Good fit', action: 'Candidate meets many requirements but may need focused follow-up on gaps.' },
  { range: '55-69', interpretation: 'Borderline', action: 'Candidate may fit if the role has flexibility or if specific skills can be trained.' },
  { range: 'Below 55', interpretation: 'Weak match', action: 'Candidate does not show enough evidence for the role based on the current resume.' },
];

export const standardHowToUse: ScreeningRubricPage['howToUse'] = {
  title: 'How to use this rubric',
  items: [
    'Start with the job description and confirm the must-have requirements.',
    'Adjust the criteria weights based on what matters most for the role.',
    'Screen every resume against the same criteria instead of relying on first impressions.',
    'Shortlist candidates with strong evidence, not just keyword matches.',
    'Use the red flags and follow-up questions to guide interviews or hiring manager review.',
  ],
};

export const standardHowHireSortHelps: ScreeningRubricPage['howHireSortHelps'] = {
  title: 'How HireSort helps',
  body: [
    'HireSort helps teams move from manual resume review to structured, rubric-first screening. Recruiters can create a job, generate or customize a rubric, upload resumes, and review ranked candidates with explainable evidence.',
    'Instead of treating each resume as a separate judgment call, HireSort applies the same criteria across candidates and helps teams identify stronger shortlists faster.',
  ],
};

export const buildStandardFaqs = (roleLower: string): FaqItem[] => [
  {
    id: 'what-is',
    question: `What is a ${roleLower} screening rubric?`,
    answer: [
      `A ${roleLower} screening rubric is a structured set of criteria used to evaluate resumes for a ${roleLower} role before interviews.`,
    ],
  },
  {
    id: 'vs-scorecard',
    question: 'How is a screening rubric different from a scorecard?',
    answer: [
      'A rubric defines the criteria and weights. A scorecard records how an individual candidate performs against those criteria.',
    ],
  },
  {
    id: 'role-specific',
    question: 'Should every role use the same rubric?',
    answer: [
      'No. Each role should have a role-specific rubric because the required skills, experience, and evidence vary by function and seniority.',
    ],
  },
  {
    id: 'edit',
    question: 'Can this rubric be edited?',
    answer: [
      'Yes. The weights and criteria should be adjusted based on the job description, seniority, industry, and hiring manager expectations.',
    ],
  },
  {
    id: 'automatic',
    question: 'Can HireSort apply this rubric automatically?',
    answer: [
      'HireSort is designed to support rubric-first AI resume screening, helping teams score and rank candidates against role-specific criteria.',
    ],
  },
];

export const buildStandardCta = (roleLower: string): ScreeningRubricPage['cta'] => ({
  eyebrow: 'Bring structure to screening',
  title: `Ready to screen ${roleLower} resumes more consistently?`,
  body: 'Use HireSort to convert this rubric into AI-powered resume screening, ranked shortlists, and evidence-backed candidate evaluation.',
  primary: { label: 'Get started for free', href: hsRedirect },
  secondary: { label: 'View resume screening software', href: '/product/resume-parser' },
});

export const buildStandardHeroCtas = () => ({
  primaryCta: { label: 'Screen resumes with HireSort', href: hsRedirect },
  secondaryCta: { label: 'Browse all rubrics', href: '/resources/screening-rubrics' },
});

export const buildInternalLinks = (
  slug: string,
  opts: { hasJd?: boolean; hasIq?: boolean; hasScorecard?: boolean } = {},
) => {
  const { hasJd = true, hasIq = true, hasScorecard = true } = opts;
  const links: { href: string; label: string }[] = [
    { href: '/resources/screening-rubrics', label: 'All screening rubrics' },
  ];
  if (hasScorecard) {
    links.push({ href: `/resources/scorecards/${slug}`, label: 'Matching candidate scorecard' });
  }
  if (hasJd) {
    links.push({ href: `/resources/job-descriptions/${slug}`, label: 'Matching job description template' });
  }
  if (hasIq) {
    links.push({ href: `/resources/interview-questions/${slug}`, label: 'Matching interview questions' });
  }
  links.push(
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/pricing', label: 'Pricing' },
  );
  return links;
};
