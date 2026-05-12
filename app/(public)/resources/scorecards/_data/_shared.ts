import type { FaqItem, ScoringRow, ScorecardPage } from './types';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

export const hsRedirect = `${main_app_url}/`;

export const PUBLISHED_AT = '2026-04-28';
export const UPDATED_AT = '2026-05-12';

export const standardScoringScale: ScoringRow[] = [
  { score: '5 - Excellent', meaning: 'Strong evidence, directly relevant experience, and clear fit for the role.' },
  { score: '4 - Strong', meaning: 'Good evidence and likely fit, with only minor gaps.' },
  { score: '3 - Acceptable', meaning: 'Meets the basic bar but needs deeper validation.' },
  { score: '2 - Weak', meaning: 'Some evidence exists, but important gaps are visible.' },
  { score: '1 - Poor fit', meaning: 'Little or no evidence against the criterion.' },
];

export const buildProblemSection = (roleLower: string): ScorecardPage['problemSection'] => ({
  title: `Why ${roleLower} hiring needs a scorecard`,
  body: [
    `Hiring for a ${roleLower} role becomes difficult when every reviewer looks for different signals. One person may focus on experience, another may focus on tools, and another may focus on communication. Without a shared scorecard, shortlisting becomes slow, inconsistent, and hard to explain.`,
    'A candidate scorecard gives the hiring team a common evaluation structure. It defines what to review, how to score it, and what evidence should support the decision.',
  ],
});

export const buildHowHireSortHelps = (roleLower: string): ScorecardPage['howHireSortHelps'] => ({
  title: 'How HireSort helps',
  body: [
    `HireSort helps teams move from manual resume review to structured candidate evaluation. For a ${roleLower} role, teams can paste a job description, generate a role-specific screening rubric, upload resumes, and review ranked candidates with scores, strengths, gaps, and evidence.`,
    'The scorecard can then be used as the shared evaluation layer for recruiters and hiring managers, helping the team compare candidates using the same criteria.',
  ],
});

export const buildStandardFaqs = (roleLower: string): FaqItem[] => [
  {
    id: 'what-is',
    question: `What is a ${roleLower} candidate scorecard?`,
    answer: [
      `A ${roleLower} candidate scorecard is a structured evaluation form used to rate candidates against the criteria that matter for the role.`,
    ],
  },
  {
    id: 'vs-rubric',
    question: 'How is a scorecard different from a screening rubric?',
    answer: [
      'A rubric defines what will be evaluated and how important each criterion is. A scorecard records how a specific candidate performs against those criteria.',
    ],
  },
  {
    id: 'resume-or-interview',
    question: 'Should the scorecard be used for resumes or interviews?',
    answer: [
      'Both. It can guide first-pass resume screening and then be used again during interviews to keep evaluation consistent.',
    ],
  },
  {
    id: 'customize',
    question: 'Can this scorecard be customized?',
    answer: [
      'Yes. The weights, criteria, and evidence prompts should be adapted to your job description, seniority level, and hiring context.',
    ],
  },
  {
    id: 'hiresort-support',
    question: 'How does HireSort support scorecard-based hiring?',
    answer: [
      'HireSort helps generate structured screening criteria from the job description, score resumes against those criteria, and provide evidence-backed candidate summaries.',
    ],
  },
];

export const buildStandardCta = (roleLower: string): ScorecardPage['cta'] => ({
  eyebrow: 'Bring structure to evaluation',
  title: `Ready to evaluate ${roleLower} candidates more consistently?`,
  body: 'Use HireSort to screen resumes, rank candidates, and bring structure to your hiring workflow.',
  primary: { label: 'Get started for free', href: hsRedirect },
  secondary: { label: 'View resume screening software', href: '/product/resume-parser' },
});

export const buildStandardHeroCtas = () => ({
  primaryCta: { label: 'Use this scorecard with HireSort', href: hsRedirect },
  secondaryCta: { label: 'Screen resumes with HireSort', href: hsRedirect },
});

export const buildInternalLinks = (
  slug: string,
  opts: { hasJd?: boolean; hasIq?: boolean } = { hasJd: true, hasIq: true },
) => {
  const links: { href: string; label: string }[] = [
    { href: '/resources/scorecards', label: 'All candidate scorecards' },
  ];
  if (opts.hasJd !== false) {
    links.push({
      href: `/resources/job-descriptions/${slug}`,
      label: 'Matching job description template',
    });
  }
  if (opts.hasIq !== false) {
    links.push({
      href: `/resources/interview-questions/${slug}`,
      label: 'Matching interview questions',
    });
  }
  links.push(
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/pricing', label: 'Pricing' },
  );
  return links;
};
