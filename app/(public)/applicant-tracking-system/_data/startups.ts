import type { ProductPage } from '@/app/(public)/product/_lib/types';

export const atsForStartups: ProductPage = {
  slug: 'startups',
  product: 'ATS for Startups',
  heroIcon: 'rocket',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'ATS for Startups: Lightweight Applicant Tracking System | HireSort',
    description:
      'HireSort is a lightweight ATS for startups that helps founders and lean hiring teams screen resumes, rank candidates, track stages, and build reusable candidate records without spreadsheet chaos.',
    keywords: [
      'ATS for startups',
      'startup ATS',
      'applicant tracking system for startups',
      'recruiting software for startups',
      'hiring software for startups',
      'lightweight ATS',
      'AI resume screening for startups',
      'candidate tracking software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — ATS for startups',
  },

  hero: {
    eyebrow: 'ATS for startups',
    titlePrefix: 'ATS for startups that helps you ',
    titleAccent: 'hire faster.',
    lead: [
      'HireSort gives startup founders, first recruiters, and lean hiring teams a simple applicant tracking system built around the part of hiring that slows teams down first: resume screening and candidate shortlisting.',
      'Create jobs, upload resumes, screen candidates with AI, track hiring stages, and build a reusable candidate repository — without the complexity of enterprise ATS software.',
    ],
    primary: { label: 'Get started for free', href: '/#pricing' },
    secondary: { label: 'See how it works', href: '#how-it-works' },
    supporting:
      'For startups that are growing beyond inboxes and spreadsheets, but are not ready for a heavy recruiting system.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Startup hiring gets messy before it gets formal',
      intro:
        'In the earliest days, hiring usually works through founder networks, email, LinkedIn messages, shared folders, and spreadsheets. That is fine when there are only a few candidates. But once your startup opens multiple roles or receives hundreds of applications, the process starts breaking.',
      bullets: [
        'Resumes are scattered across inboxes, job boards, folders, and recruiter messages',
        'Founders and hiring managers spend too much time reading resumes manually',
        'Candidate status is tracked in spreadsheets that quickly become outdated',
        'Good candidates get forgotten after one role closes',
        'Hiring managers and recruiters evaluate candidates using different criteria',
        'There is no simple way to explain why one candidate was shortlisted over another',
        'Enterprise ATS platforms feel too complex or expensive for the current stage',
      ],
      closing:
        'HireSort helps startups add structure without slowing down hiring velocity.',
    },
    {
      type: 'positioning',
      eyebrow: 'Positioning',
      title: 'A lightweight ATS built for your first 50 hires',
      body: [
        'HireSort is not trying to be a full enterprise recruiting suite. It is designed for startups that need the core structure of an ATS, but care most about speed, candidate clarity, and better resume screening.',
        'The platform helps you move from messy applications to a ranked shortlist and a reusable candidate workspace.',
      ],
      flow: [
        'Create job',
        'Generate rubric',
        'Upload resumes',
        'AI screens candidates',
        'Review ranked shortlist',
        'Track stages',
        'Reuse candidates',
      ],
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From job description to shortlist in minutes',
      steps: [
        { n: '01', title: 'Create a job', body: 'Paste your job description or upload a JD file to start a structured screening workflow.' },
        { n: '02', title: 'Generate a role-specific rubric', body: 'HireSort turns the JD into a clear evaluation rubric that can be reviewed and adjusted before screening.' },
        { n: '03', title: 'Upload resumes in bulk', body: 'Upload candidate resumes in PDF or DOCX format and let HireSort parse key candidate details.' },
        { n: '04', title: 'Screen candidates with AI', body: 'Candidates are evaluated against the role-specific rubric instead of being filtered only by keywords.' },
        { n: '05', title: 'Review ranked shortlists', body: 'See candidates ranked by role fit with scores, strengths, missing elements, and evidence from the resume.' },
        { n: '06', title: 'Track hiring stages', body: 'Move candidates across stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, or On Hold.' },
        { n: '07', title: 'Reuse strong candidates', body: 'Keep candidate profiles in a central repository so promising applicants can be considered again for future roles.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Features',
      title: 'Everything startups need before hiring gets too complicated',
      items: [
        { icon: 'sparkles', title: 'AI resume screening', body: 'Screen every candidate against job-specific criteria so founders and recruiters do not have to manually read every resume from scratch.' },
        { icon: 'listChecks', title: 'Rubric-first evaluation', body: 'Create a consistent scoring framework from the JD and use the same criteria across all candidates.' },
        { icon: 'filter', title: 'Ranked shortlists', body: 'Quickly identify which candidates deserve the first review and which are below the bar.' },
        { icon: 'fileSearch', title: 'Explainable candidate scoring', body: 'Review score breakdowns, strengths, missing elements, and evidence so decisions are easier to discuss.' },
        { icon: 'database', title: 'Central resume repository', body: 'Store every uploaded resume in one candidate library instead of losing profiles after a job closes.' },
        { icon: 'workflow', title: 'Candidate stage tracking', body: 'Track where each candidate stands in the hiring process using simple stage movement.' },
        { icon: 'ganttChart', title: 'Funnel customization', body: 'Rename, add, remove, and reorder hiring stages to match your startup’s process.' },
        { icon: 'fileText', title: 'Candidate detail view', body: 'Open a candidate profile with resume preview, parsed metadata, associated role, latest score, and current stage.' },
        { icon: 'search', title: 'Search and filters', body: 'Find candidates by name, role, stage, score range, or date added.' },
        { icon: 'refreshCcw', title: 'Resume reuse', body: 'Attach existing candidates to new jobs and run fresh screening against a different JD.' },
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Startup use cases',
      title: 'Built for the way startups actually hire',
      items: [
        { icon: 'rocket', title: 'Founder-led hiring', body: 'When founders are still screening resumes themselves, HireSort helps them define what good looks like and move quickly from applicants to shortlist.' },
        { icon: 'userSearch', title: 'First recruiter at a startup', body: 'When one recruiter is managing multiple roles, HireSort helps centralize resumes, standardize screening, and send stronger shortlists to hiring managers.' },
        { icon: 'clipboardCheck', title: 'Hiring managers reviewing directly', body: 'When functional leaders are deeply involved in hiring, HireSort gives them a clear scoring framework and candidate evidence instead of vague resume impressions.' },
        { icon: 'layers', title: 'Startups hiring across multiple roles', body: 'When one candidate may be relevant for more than one role, HireSort helps store and reuse candidate records instead of restarting from zero.' },
        { icon: 'building', title: 'Agencies supporting startup clients', body: 'For recruiters working with startups, HireSort helps process resume volume faster and deliver ranked shortlists with clearer justification.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison',
      title: 'HireSort vs spreadsheets vs enterprise ATS',
      columns: ['Capability', 'Spreadsheets / Email', 'Enterprise ATS', 'HireSort'],
      accentColIndex: 3,
      rows: [
        ['Setup effort', 'Low, but messy', 'Often high', 'Lightweight and fast'],
        ['Resume storage', 'Scattered', 'Centralized', 'Centralized and reusable'],
        ['Resume screening', 'Manual', 'Often manual or keyword/filter-based', 'AI-assisted and rubric-based'],
        ['Candidate ranking', 'Manual', 'Varies by platform', 'Built around ranked shortlists'],
        ['Candidate tracking', 'Manual updates', 'Full workflow tracking', 'Simple stage tracking'],
        ['Startup fit', 'Works only at very early stage', 'Can be too heavy early on', 'Designed for lean hiring teams'],
        ['Candidate reuse', 'Difficult', 'Usually possible', 'Core candidate repository workflow'],
        ['Decision explainability', 'Low', 'Varies', 'Score breakdowns and evidence'],
      ],
    },
    {
      type: 'why',
      eyebrow: 'Why HireSort',
      title: 'Why startups choose HireSort',
      items: [
        { title: 'Move faster without lowering the bar', body: 'Shortlist candidates faster while still evaluating them against structured role-specific criteria.' },
        { title: 'Avoid spreadsheet chaos', body: 'Keep resumes, candidate stages, scores, and role associations in one workspace.' },
        { title: 'Give hiring managers better context', body: 'Share candidate scores, strengths, gaps, and evidence instead of forwarding raw resumes only.' },
        { title: 'Build a candidate database early', body: 'Start creating a reusable talent repository before hiring volume becomes unmanageable.' },
        { title: 'Keep the workflow simple', body: 'Get the structure of an ATS without heavy enterprise implementation or unnecessary recruiting modules.' },
      ],
    },
    {
      type: 'plansSplit',
      eyebrow: 'Free vs paid',
      title: 'Useful for early teams. Expandable as hiring grows.',
      free: {
        heading: 'Free / MVP workflow',
        bullets: [
          'Central resume repository',
          'Candidate metadata extraction',
          'Resume-to-role association',
          'Reuse of resumes for future screening',
          'Basic search and filtering',
          'Manual stage movement',
          'Basic funnel customization',
          'Candidate detail page with score and stage',
        ],
      },
      paid: {
        heading: 'Paid / expanded workflow',
        bullets: [
          'Saved talent pools',
          'Saved filters and searches',
          'Advanced filtering',
          'CSV export',
          'Candidate notes and recruiter comments',
          'Advanced repository search',
          'Custom candidate table columns',
          'Kanban board',
          'Bulk stage movement',
          'Multiple funnel templates',
          'Deeper candidate history',
        ],
      },
    },
    {
      type: 'paragraph',
      eyebrow: 'Scope clarity',
      title: 'Built for screening-first startup hiring',
      body: [
        'HireSort is best positioned as a lightweight applicant tracking system for startups that need to organize resumes, screen candidates, and track stages.',
        'It is not positioned as a full enterprise recruiting suite with interview scheduling, candidate messaging, offer letters, background checks, onboarding, or complete HR workflows.',
        'That focus is intentional: most startups first need to fix resume screening, shortlisting, and candidate tracking before they need a full recruiting operations platform.',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Ready to move beyond spreadsheets?',
    body: 'Use HireSort to create jobs, screen resumes, rank candidates, track stages, and build a reusable candidate database for your startup.',
    primary: { label: 'Get started for free', href: '/#pricing' },
    secondary: { label: 'View pricing', href: '/#pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is an ATS for startups?',
      answer: ['An ATS for startups is applicant tracking software designed to help early-stage and growing companies manage candidates, store resumes, track hiring stages, and organize recruiting workflows without heavy enterprise complexity.'],
    },
    {
      id: 'is-startup-ats',
      question: 'Is HireSort an ATS for startups?',
      answer: ['Yes. HireSort can act as a lightweight ATS for startups, especially for teams that need resume screening, candidate management, and basic stage tracking.'],
    },
    {
      id: 'vs-enterprise',
      question: 'How is HireSort different from enterprise ATS software?',
      answer: ['Enterprise ATS platforms often cover the full recruiting lifecycle. HireSort focuses on the startup hiring bottleneck: resume screening, ranked shortlists, candidate tracking, and reusable candidate records.'],
    },
    {
      id: 'no-recruiter',
      question: 'Can founders use HireSort without a recruiter?',
      answer: ['Yes. HireSort is useful for founder-led hiring because it helps define a structured rubric and rank resumes without requiring a full HR team.'],
    },
    {
      id: 'replace-spreadsheets',
      question: 'Can HireSort replace spreadsheets?',
      answer: ['Yes. HireSort helps reduce spreadsheet dependency by storing resumes, candidate data, scores, stages, and role associations in one workspace.'],
    },
    {
      id: 'reuse',
      question: 'Can I reuse candidates for future startup roles?',
      answer: ['Yes. HireSort is designed to store candidates in a central repository so resumes can be mapped to future jobs and screened again.'],
    },
    {
      id: 'scheduling',
      question: 'Does HireSort include interview scheduling?',
      answer: ['No. Interview scheduling is outside the near-term scope. HireSort focuses on resume screening, candidate tracking, and early-stage applicant management.'],
    },
  ],

  internalLinks: [
    { href: '/applicant-tracking-system/smb', label: 'ATS for Small Businesses' },
    { href: '/use-cases/founder-led-hiring', label: 'Founder-Led Hiring' },
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/use-cases/hiring-managers', label: 'For Hiring Managers' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-screening-software', label: 'Resume Screening Software' },
    { href: '/#pricing', label: 'Pricing' },
  ],
};
