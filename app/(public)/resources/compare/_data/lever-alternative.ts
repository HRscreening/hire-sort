import type { CompetitorPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const leverAlternative: CompetitorPage = {
  slug: 'lever-alternative',
  competitor: 'Lever',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-10',

  meta: {
    title: 'Lever Alternative for AI Resume Screening | HireSort',
    description:
      'Compare HireSort and Lever. See when a screening-first, lightweight ATS workflow may be a better fit than a full ATS + CRM platform.',
    keywords: [
      'Lever alternative',
      'Lever competitor',
      'Lever ATS alternative',
      'AI resume screening software',
      'lightweight ATS',
      'applicant tracking system alternative',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — a screening-first Lever alternative',
  },

  hero: {
    eyebrow: 'Lever alternative',
    titlePrefix: 'A screening-first ',
    titleAccent: 'Lever alternative.',
    lead: [
      'Lever is a broad recruiting platform built around applicant tracking, CRM, automation, analytics and integrations. For larger talent teams, that breadth can be useful.',
      'HireSort is different. It is built for teams whose immediate hiring bottleneck is not long-term talent CRM, but turning large resume volumes into clear, evidence-backed shortlists.',
    ],
    primaryCta: { label: 'Get started for free', href: redirectURL },
    secondaryCta: { label: 'Compare features', href: '#feature-compare' },
    supporting:
      'Lever is a mature ATS + CRM platform. HireSort is a focused screening-first workspace for teams that want JD-to-rubric-to-shortlist without a heavy implementation.',
  },

  quickCompare: {
    heading: 'HireSort vs Lever at a glance',
    rows: [
      { area: 'Core positioning', competitor: 'Mature ATS + CRM platform', hiresort: 'AI resume screening + lightweight applicant tracking' },
      { area: 'Best fit', competitor: 'Dedicated talent acquisition teams managing complex pipelines', hiresort: 'Founders, recruiters, hiring managers and agencies reducing manual screening' },
      { area: 'CRM / talent relationships', competitor: 'Core part of the platform', hiresort: 'Not the primary focus' },
      { area: 'AI resume screening', competitor: 'Available in broader AI hiring context', hiresort: 'Core workflow with rubric-based scoring' },
      { area: 'Candidate ranking', competitor: 'Varies by workflow and configuration', hiresort: 'Built around ranked shortlists' },
      { area: 'Resume repository', competitor: 'Candidate profiles and ATS records', hiresort: 'Central resume repository with reusable records' },
      { area: 'Workflow complexity', competitor: 'Broader system, more setup', hiresort: 'Lightweight workflow' },
      { area: 'Best reason to choose', competitor: 'You need an all-in-one ATS + CRM platform', hiresort: 'You need faster, more focused resume screening' },
    ],
  },

  positioning: {
    eyebrow: 'Why teams consider alternatives to Lever',
    title: 'When a narrower, screening-first workflow makes sense',
    body: [
      'Teams usually look for Lever alternatives when they want a narrower, faster, more focused workflow. They may not need a full ATS + CRM system yet. They may need to solve a more specific problem: screening hundreds of resumes consistently.',
    ],
    closing:
      'HireSort focuses on that screening moment — JD-based rubrics, AI scoring, ranked shortlists, evidence-backed reasoning, and a candidate repository — without requiring a full recruiting operations platform.',
  },

  problem: {
    eyebrow: 'The problem',
    title: 'When a full ATS + CRM is more than you need',
    intro: 'Common signals that a screening-first tool may serve you better than a full ATS + CRM platform:',
    bullets: [
      'First-pass screening is taking too long.',
      'Hiring managers want clearer candidate reasoning.',
      'Recruiters are still using spreadsheets for status tracking.',
      'The team wants AI-assisted ranking without a heavy implementation.',
      'The company is not ready for a broad recruiting operations platform.',
    ],
    closing:
      'If most of those statements are true, a screening-first workspace can deliver value faster than a full ATS + CRM rollout.',
  },

  workflow: {
    eyebrow: 'How HireSort is different',
    title: 'Screening-first instead of CRM-first',
    intro: 'HireSort starts with the resume screening workflow rather than long-term candidate relationship management.',
    steps: [
      { n: '01', title: 'Screening-first instead of CRM-first', body: 'Paste a job description, generate a scoring rubric, upload resumes, and review candidates ranked by role fit.' },
      { n: '02', title: 'Rubric-based evaluation', body: 'Instead of relying on keyword matching alone, HireSort evaluates candidates against job-specific criteria so the shortlist is easier to explain and review.' },
      { n: '03', title: 'Candidate repository and stage tracking', body: 'Resumes live in a central candidate repository, associated with jobs and tracked across stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected or On Hold.' },
      { n: '04', title: 'Lighter setup for smaller teams', body: 'Better suited for teams that want a practical resume screening and candidate tracking layer before committing to a full recruiting suite.' },
    ],
  },

  featureCompare: {
    heading: 'Compare HireSort and Lever by capability',
    rows: [
      { need: 'Applicant tracking', competitor: 'Yes — full ATS', hiresort: 'Lightweight tracking focused on screening and stages' },
      { need: 'CRM / talent relationship management', competitor: 'Core part of platform', hiresort: 'Not the primary focus' },
      { need: 'AI resume screening', competitor: 'Available in broader AI hiring context', hiresort: 'Core workflow: rubric-based screening and ranked shortlists' },
      { need: 'Candidate ranking', competitor: 'Varies by workflow and configuration', hiresort: 'Built around ranked shortlists' },
      { need: 'Interview summaries / transcripts', competitor: 'Available in Lever AI workflows', hiresort: 'Not the primary focus' },
      { need: 'Resume repository', competitor: 'Candidate profiles and ATS records', hiresort: 'Central resume repository and reuse-focused candidate records' },
      { need: 'Best fit', competitor: 'Mature TA teams needing ATS + CRM', hiresort: 'Teams needing faster screening and simpler candidate management' },
    ],
  },

  chooseHiresort: {
    title: 'Choose HireSort if you want',
    bullets: [
      'Faster AI resume screening and ranked shortlists',
      'A lightweight workflow for JD-to-rubric-to-shortlist',
      'A simpler screening-first workspace that can replace spreadsheets',
      'Evidence-backed candidate scoring',
      'A central resume repository',
      'Simple candidate stage tracking',
    ],
    suitableForTitle: 'Especially suitable for',
    suitableFor: [
      'Startup recruiters screening 50-150 resumes per open role',
      'Founders hiring without a full HR team',
      'Hiring managers who want more control over evaluation criteria',
      'Recruitment agencies processing large resume batches',
      'Teams that want structured shortlists before buying a full ATS + CRM',
    ],
  },

  chooseCompetitor: {
    title: 'Lever may be better if you need',
    bullets: [
      'A mature ATS + CRM platform for broader recruiting operations',
      'Advanced analytics, integrations and candidate relationship workflows',
      'Dedicated TA tooling for managing complex pipelines',
      'Custom pricing and a broader hiring suite',
    ],
    closing:
      'HireSort is not trying to replace every part of an ATS + CRM platform. It is built for teams whose biggest pain is turning resume volume into a structured, reviewable shortlist.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Try a screening-first Lever alternative',
    body: 'Use HireSort to create a job, screen resumes, rank candidates and track early-stage hiring without heavy recruiting software overhead.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'full-replacement',
      question: 'Is HireSort a full replacement for Lever?',
      answer: [
        'Not in every case. Lever is a broader ATS + CRM recruiting platform. HireSort is best positioned as a screening-first applicant tracking and resume management tool.',
      ],
    },
    {
      id: 'spreadsheets',
      question: 'Can HireSort help if we are still using spreadsheets?',
      answer: [
        'Yes. HireSort is designed to replace manual resume trackers with a central candidate repository, AI screening, ranked shortlists and simple stage movement.',
      ],
    },
    {
      id: 'before-larger-ats',
      question: 'Can HireSort work before we implement a larger ATS?',
      answer: [
        'Yes. HireSort is useful for teams that need immediate screening structure before adopting or migrating to a broader ATS.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/resources/compare/workable-alternative', label: 'HireSort vs Workable' },
    { href: '/resources/compare/greenhouse-alternative', label: 'HireSort vs Greenhouse' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/pricing', label: 'Pricing' },
  ],

  disclaimer:
    'Lever is a trademark of its respective owner. This comparison page is for informational purposes only and is based on publicly available information and HireSort’s own product positioning. Feature availability may change over time. Buyers should verify current product capabilities before making a purchase decision.',
};
