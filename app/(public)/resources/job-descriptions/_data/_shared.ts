import type { FaqItem, JobDescriptionPage } from './types';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

export const hsRedirect = `${main_app_url}/`;

export const standardHowHireSortHelps = [
  'Turn the job description into a structured screening rubric.',
  'Upload resumes in bulk and parse key candidate information automatically.',
  'Score every candidate against the same role-specific criteria.',
  'Review ranked shortlists with evidence, strengths, and missing elements.',
  'Store candidates in a reusable resume repository for future roles.',
  'Track candidate stages from New to Shortlisted, Interviews, Offer, Hired, Rejected, or On Hold.',
];

export const buildStandardFaqs = (role: string, roleLower: string): FaqItem[] => [
  {
    id: 'what-include',
    question: `What should a ${roleLower} job description include?`,
    answer: [
      'It should include a clear role overview, responsibilities, required skills, preferred qualifications, success expectations, and the screening criteria your team will use to evaluate candidates.',
    ],
  },
  {
    id: 'how-screen',
    question: `How do I screen ${roleLower} resumes?`,
    answer: [
      'Start by defining must-have criteria, then compare candidates against a consistent rubric instead of relying only on instinct or keyword matching.',
    ],
  },
  {
    id: 'can-hiresort',
    question: 'Can HireSort screen resumes for this role?',
    answer: [
      'Yes. HireSort can use the job description to generate a rubric, parse uploaded resumes, score candidates, and produce ranked shortlists with evidence-based explanations.',
    ],
  },
  {
    id: 'customize',
    question: 'Should I customize this template?',
    answer: [
      'Yes. Treat this as a strong starting point and adjust responsibilities, skills, seniority, location, compensation, and domain requirements for your company.',
    ],
  },
];

export const buildStandardCta = (role: string): JobDescriptionPage['cta'] => ({
  eyebrow: 'Ready to hire',
  title: `Ready to hire a ${role}?`,
  body: `Use HireSort to generate a structured JD, screen resumes faster, and identify the most relevant ${role.toLowerCase()} candidates with explainable AI scoring.`,
  primary: { label: 'Generate this JD with HireSort', href: hsRedirect },
  secondary: { label: 'Screen resumes for this role', href: hsRedirect },
});

export const buildStandardHeroCtas = () => ({
  primaryCta: { label: 'Generate this JD with HireSort', href: hsRedirect },
  secondaryCta: { label: 'Screen resumes for this role', href: hsRedirect },
});

export const standardInternalLinks = [
  { href: '/resources/job-descriptions', label: 'All job description templates' },
  { href: '/product/resume-parser', label: 'Resume Parser' },
  { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
  { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
  { href: '/pricing', label: 'Pricing' },
];

export const PUBLISHED_AT = '2026-05-11';
export const UPDATED_AT = '2026-05-11';
