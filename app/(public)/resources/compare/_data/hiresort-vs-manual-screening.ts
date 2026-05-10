import type { CompetitorPage } from './types';

export const hiresortVsManualScreening: CompetitorPage = {
  slug: 'hiresort-vs-manual-screening',
  competitor: 'Manual Resume Screening',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-10',

  meta: {
    title: 'HireSort vs Manual Resume Screening | HireSort',
    description:
      'Compare HireSort with manual resume screening. Learn how AI-assisted, rubric-based screening helps recruiters shortlist candidates faster and more consistently.',
    keywords: [
      'manual resume screening alternative',
      'AI resume screening vs manual screening',
      'resume screening software',
      'shortlist candidates faster',
      'recruiter productivity',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort vs manual resume screening',
  },

  hero: {
    eyebrow: 'AI vs manual screening',
    titlePrefix: 'Manual resume screening ',
    titleAccent: 'does not scale.',
    lead: [
      'Manual screening works when there are only a few resumes. But for high-volume roles, it becomes slow, inconsistent and difficult to explain.',
      'HireSort helps recruiters reduce repetitive first-pass review by applying structured AI screening to every resume and presenting ranked candidates for human review.',
    ],
    primaryCta: { label: 'Get started for free', href: '/pricing' },
    secondaryCta: { label: 'Compare features', href: '#feature-compare' },
    supporting:
      'AI should support recruiters, not replace them. HireSort is decision-support: humans still make the final hiring call.',
  },

  quickCompare: {
    heading: 'Manual screening vs HireSort at a glance',
    rows: [
      { area: 'Screening speed', competitor: 'Slow for large applicant pools', hiresort: 'Designed for faster first-pass screening' },
      { area: 'Consistency', competitor: 'Depends on reviewer judgment', hiresort: 'Same rubric applied across candidates' },
      { area: 'Candidate ranking', competitor: 'Manual comparison', hiresort: 'Ranked shortlists' },
      { area: 'Evidence', competitor: 'Reviewer memory or notes', hiresort: 'Evidence excerpts and explanations' },
      { area: 'Scoring criteria', competitor: 'Often implicit', hiresort: 'Explicit role-specific rubric' },
      { area: 'Candidate tracking', competitor: 'Separate spreadsheet or ATS', hiresort: 'Built into lightweight workflow' },
      { area: 'Best fit', competitor: 'Low-volume hiring', hiresort: 'Teams screening many resumes per role' },
    ],
  },

  problem: {
    eyebrow: 'The problem',
    title: 'The problem with manual screening',
    intro: 'Manual resume review breaks down quickly as volume increases:',
    bullets: [
      'Every reviewer may interpret the job description differently.',
      'Strong candidates can get missed when resume volume is high.',
      'Keyword-heavy resumes can look stronger than they are.',
      'Shortlists can be difficult to justify to hiring managers.',
      'Recruiters spend time on repetitive review instead of candidate engagement.',
      'Candidates are hard to compare if there is no shared rubric.',
    ],
    closing:
      'A consistent rubric and AI-assisted ranking reduce these problems while keeping recruiters in control.',
  },

  workflow: {
    eyebrow: 'How HireSort changes the workflow',
    title: 'From manual review to structured shortlist',
    steps: [
      { n: '01', title: 'Create a job', body: 'Use the job description to start a screening workflow.' },
      { n: '02', title: 'Generate and review a rubric', body: 'A role-specific screening rubric is generated from the JD. You can review and edit before screening.' },
      { n: '03', title: 'Upload resumes in bulk', body: 'PDF and DOCX resumes are parsed and prepared for evaluation.' },
      { n: '04', title: 'Let HireSort screen and score', body: 'Each resume is evaluated against the rubric with score breakdowns and evidence.' },
      { n: '05', title: 'Review ranked shortlists', body: 'Candidates are surfaced in ranked order with strengths and gaps.' },
      { n: '06', title: 'Move candidates manually', body: 'You decide who advances to the next hiring stage.' },
    ],
  },

  featureCompare: {
    heading: 'Manual screening vs HireSort feature comparison',
    rows: [
      { need: 'Screening speed', competitor: 'Slow for large applicant pools', hiresort: 'Designed for faster first-pass screening' },
      { need: 'Consistency', competitor: 'Depends on reviewer judgment', hiresort: 'Same rubric applied across candidates' },
      { need: 'Candidate ranking', competitor: 'Manual comparison', hiresort: 'Ranked shortlists' },
      { need: 'Evidence', competitor: 'Reviewer memory or notes', hiresort: 'Evidence excerpts and explanations' },
      { need: 'Scoring criteria', competitor: 'Often implicit', hiresort: 'Explicit role-specific rubric' },
      { need: 'Candidate tracking', competitor: 'Separate spreadsheet or ATS', hiresort: 'Built into lightweight workflow' },
    ],
  },

  chooseHiresort: {
    title: 'Who should use HireSort?',
    bullets: [
      'Recruiters managing large applicant pools',
      'Hiring managers who want clearer shortlist reasoning',
      'Founders hiring without a dedicated HR team',
      'Agencies screening resumes for multiple clients',
      'Teams that want a structured alternative to first-pass manual review',
    ],
    suitableForTitle: 'When manual screening is still useful',
    suitableFor: [
      'Final decisions and edge cases',
      'Deeper qualitative evaluation',
      'Interview-stage assessment',
      'Cases that need human judgment beyond first-pass review',
    ],
  },

  chooseCompetitor: {
    title: 'Manual screening may be enough if',
    bullets: [
      'You only review a small handful of resumes per role',
      'You hire infrequently and have time for deep manual review',
      'You already have a consistent rubric and reviewer team',
      'Your hiring managers prefer to read every resume themselves',
      'You do not need ranked shortlists or evidence-backed scoring',
    ],
    closing:
      'For low-volume hiring, manual screening can still produce good shortlists. HireSort is built for the moment volume, consistency, or explainability starts to break.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Screen resumes faster without losing control',
    body: 'Use HireSort to reduce repetitive first-pass review and create evidence-backed shortlists your team can review with confidence.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'auto-decisions',
      question: 'Does HireSort make hiring decisions automatically?',
      answer: [
        'No. HireSort helps screen, score and rank resumes, but recruiters and hiring managers should make final decisions.',
      ],
    },
    {
      id: 'non-traditional',
      question: 'Will HireSort miss non-traditional candidates?',
      answer: [
        'Any screening process needs careful criteria. HireSort helps by making criteria explicit and editable so teams can review what is being evaluated.',
      ],
    },
    {
      id: 'better-than-manual',
      question: 'Is AI screening better than manual screening?',
      answer: [
        'AI screening is better for consistency and speed at first-pass review. Manual judgment remains important for final assessment, interviews and hiring decisions.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/resources/compare/hiresort-vs-spreadsheets', label: 'HireSort vs Spreadsheets' },
    { href: '/resources/compare/resume-screening-software-vs-resume-parser', label: 'Resume Screening vs Resume Parser' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/pricing', label: 'Pricing' },
  ],

  disclaimer:
    'This comparison page is for informational purposes only and is based on publicly available information and HireSort’s own product positioning. Feature availability may change over time.',
};
