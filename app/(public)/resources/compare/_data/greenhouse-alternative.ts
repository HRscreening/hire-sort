import type { CompetitorPage } from './types';

export const greenhouseAlternative: CompetitorPage = {
  slug: 'greenhouse-alternative',
  competitor: 'Greenhouse',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'Greenhouse Alternative for AI Resume Screening | HireSort',
    description:
      'Compare HireSort and Greenhouse. See when a lightweight, screening-first hiring workflow may fit better than a full enterprise hiring platform.',
    keywords: [
      'Greenhouse alternative',
      'Greenhouse competitor',
      'Greenhouse ATS alternative',
      'AI resume screening software',
      'structured hiring software',
      'lightweight ATS',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — a lightweight Greenhouse alternative',
  },

  hero: {
    eyebrow: 'Greenhouse alternative',
    titlePrefix: 'A lightweight Greenhouse alternative for ',
    titleAccent: 'AI resume screening.',
    lead: [
      'Greenhouse is a well-known hiring platform built for structured hiring, interviewing, candidate experience, workflow governance, reporting and onboarding. It is powerful for organizations that need a full recruiting operating system.',
      'HireSort takes a narrower approach: help teams screen resumes faster, rank candidates more consistently, and manage early-stage candidate workflows without enterprise complexity.',
    ],
    primaryCta: { label: 'Get started for free', href: '/pricing' },
    secondaryCta: { label: 'Compare features', href: '#feature-compare' },
    supporting:
      'Greenhouse is a broad recruiting suite. HireSort is designed for teams that want a screening-first workflow: resume upload, AI scoring, ranked shortlists, reusable candidate records, and lightweight candidate tracking.',
  },

  quickCompare: {
    heading: 'HireSort vs Greenhouse at a glance',
    rows: [
      {
        area: 'Core positioning',
        competitor: 'Broad enterprise hiring platform',
        hiresort: 'AI resume screening + lightweight applicant tracking',
      },
      {
        area: 'Best fit',
        competitor: 'Mature TA functions with multiple teams and processes',
        hiresort: 'Startups, recruiters, agencies and growing teams focused on screening',
      },
      {
        area: 'Structured hiring',
        competitor: 'Strong structured hiring and interview workflows',
        hiresort: 'Rubric-first resume screening and shortlist evaluation',
      },
      {
        area: 'Scorecards',
        competitor: 'Interview scorecards and structured feedback',
        hiresort: 'Screening rubrics and candidate scorecards',
      },
      {
        area: 'AI features',
        competitor: 'AI features across recruiting workflows',
        hiresort: 'AI resume screening and explainable ranking as core workflow',
      },
      {
        area: 'Scheduling / onboarding',
        competitor: 'Available in platform workflows',
        hiresort: 'Outside near-term scope',
      },
      {
        area: 'Resume repository',
        competitor: 'Candidate records in ATS',
        hiresort: 'Central resume repository with candidate reuse focus',
      },
      {
        area: 'Best reason to choose',
        competitor: 'You need an all-in-one hiring platform across sourcing, interviewing, approvals and onboarding',
        hiresort: 'Your main bottleneck is resume screening and shortlist creation',
      },
    ],
  },

  positioning: {
    eyebrow: 'Positioning',
    title: 'Why teams compare HireSort with Greenhouse',
    body: [
      'Greenhouse is strong when companies need a broad hiring system. But not every team is ready for that level of process. Many teams first need a faster way to screen candidates, organize resumes and create reviewable shortlists.',
      'Recruiters are spending too much time on first-pass resume review. Hiring managers are not confident in shortlist quality. Candidate data is spread across drives, job posts and spreadsheets. Teams want evidence-based AI scoring, not just candidate storage.',
    ],
    closing:
      'HireSort gives teams structure around screening and candidate tracking — useful before adopting a broader hiring platform, or as a focused workspace alongside one.',
  },

  workflow: {
    eyebrow: 'How HireSort is different',
    title: 'A simpler workflow for screening-first hiring',
    intro:
      'Create job → Generate rubric → Upload resumes → AI screens candidates → Review ranked shortlist → Track candidate stages → Reuse candidates',
    steps: [
      {
        n: '01',
        title: 'Built around resume screening',
        body: 'HireSort begins with the highest-friction hiring step: reviewing resumes. The workflow is built around job descriptions, screening rubrics, candidate scoring and ranked shortlists.',
      },
      {
        n: '02',
        title: 'Explainable candidate scoring',
        body: 'HireSort helps teams understand why a candidate was ranked higher or lower by showing score breakdowns, strengths, missing elements and evidence from the resume.',
      },
      {
        n: '03',
        title: 'Lightweight candidate tracking',
        body: 'Move candidates through simple stages such as New, Shortlisted, Round 1, Offer Made, Hired or Rejected — without heavy ATS overhead.',
      },
      {
        n: '04',
        title: 'Practical for growing teams',
        body: 'A better fit for teams that want speed and structure without the overhead of a full enterprise recruiting platform.',
      },
    ],
  },

  featureCompare: {
    heading: 'Compare HireSort and Greenhouse by capability',
    rows: [
      { need: 'Applicant tracking', competitor: 'Yes, broad ATS platform', hiresort: 'Lightweight ATS-style candidate tracking' },
      { need: 'Structured hiring', competitor: 'Strong structured hiring and interview workflows', hiresort: 'Rubric-first resume screening and shortlist evaluation' },
      { need: 'Scorecards', competitor: 'Interview scorecards and structured feedback', hiresort: 'Screening rubrics and candidate scorecards' },
      { need: 'AI features', competitor: 'AI features across recruiting workflows', hiresort: 'AI resume screening and explainable ranking as core workflow' },
      { need: 'Scheduling / onboarding', competitor: 'Available in platform workflows', hiresort: 'Outside near-term scope' },
      { need: 'Resume repository', competitor: 'Candidate records in ATS', hiresort: 'Central resume repository with candidate reuse focus' },
      { need: 'Best fit', competitor: 'Enterprise and mature hiring teams', hiresort: 'Startups, recruiters, agencies and growing teams focused on screening' },
    ],
  },

  chooseHiresort: {
    title: 'Choose HireSort if you want',
    bullets: [
      'Your main bottleneck is resume screening and shortlist creation',
      'A lightweight ATS-style workflow for recruiters, founders and hiring managers',
      'AI resume screening, candidate ranking, repository and simple stage tracking',
      'Evidence-backed candidate evaluation',
      'A central resume repository with candidate reuse',
      'A focused tool before — or alongside — a broader ATS',
    ],
    suitableForTitle: 'Especially suitable for',
    suitableFor: [
      'Teams not ready for a full enterprise ATS rollout',
      'Recruiters who need to screen large resume batches quickly',
      'Founders and hiring managers who want more control over shortlisting criteria',
      'Agencies that need to process candidates role by role',
      'Small teams moving away from spreadsheet-based candidate tracking',
    ],
  },

  chooseCompetitor: {
    title: 'Greenhouse may be better if you need',
    bullets: [
      'An all-in-one hiring platform across sourcing, interviewing, approvals and onboarding',
      'Deep structured hiring programs and governance across a large organization',
      'Interview kits, scorecards, scheduling, onboarding and reporting in one platform',
      'Mature TA function support with multiple teams and processes',
    ],
    closing:
      'HireSort is not trying to replace every Greenhouse capability. It is built for teams whose biggest pain is turning resume volume into a structured, reviewable shortlist.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Try a lightweight Greenhouse alternative',
    body: 'Use HireSort to screen resumes faster, create ranked shortlists and manage candidates without heavy ATS complexity.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'complete-replacement',
      question: 'Is HireSort a complete Greenhouse replacement?',
      answer: [
        'Not for all teams. Greenhouse is broader and better suited to mature recruiting operations. HireSort is a lighter, screening-first alternative for teams focused on resume evaluation and candidate tracking.',
      ],
    },
    {
      id: 'scheduling-onboarding',
      question: 'Does HireSort include interview scheduling or onboarding?',
      answer: [
        'No. HireSort focuses on resume screening, candidate ranking, resume management and stage tracking. Scheduling, onboarding and offer workflows are outside the near-term scope.',
      ],
    },
    {
      id: 'before-buying-ats',
      question: 'Can HireSort help before we buy Greenhouse or another ATS?',
      answer: [
        'Yes. HireSort can give teams structure around screening and candidate tracking before adopting a broader hiring platform.',
      ],
    },
    {
      id: 'use-alongside',
      question: 'Can I use HireSort alongside Greenhouse?',
      answer: [
        'Yes. Teams can use HireSort as a focused screening layer before moving shortlisted candidates into a broader ATS or hiring workflow.',
      ],
    },
    {
      id: 'how-different',
      question: 'How is HireSort different from Greenhouse?',
      answer: [
        'Greenhouse is a broad enterprise hiring suite covering sourcing, structured interviewing, scheduling, offers and onboarding. HireSort is narrower — focused on resume screening, ranked shortlists, reusable candidate records, and simple candidate tracking.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/resources/compare/workable-alternative', label: 'HireSort vs Workable' },
    { href: '/resources/compare/ai-resume-screening-vs-ats', label: 'AI Resume Screening vs ATS' },
    { href: '/pricing', label: 'Pricing' },
  ],

  disclaimer:
    'Greenhouse is a trademark of its respective owner. This comparison page is for informational purposes only and is based on publicly available information and HireSort’s own product positioning. Feature availability may change over time. Buyers should verify current product capabilities before making a purchase decision.',
};
