import type { CompetitorPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const hiresortVsSpreadsheets: CompetitorPage = {
  slug: 'hiresort-vs-spreadsheets',
  competitor: 'Spreadsheets',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-10',

  meta: {
    title: 'HireSort vs Spreadsheets for Candidate Tracking | HireSort',
    description:
      'Compare HireSort with spreadsheet-based hiring. See why AI resume screening, candidate repositories and stage tracking create a better workflow.',
    keywords: [
      'candidate tracking spreadsheet alternative',
      'recruiting spreadsheet alternative',
      'ATS vs spreadsheet',
      'resume tracking software',
      'candidate tracking software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort vs spreadsheets for candidate tracking',
  },

  hero: {
    eyebrow: 'Spreadsheets vs HireSort',
    titlePrefix: 'Still tracking candidates ',
    titleAccent: 'in spreadsheets?',
    lead: [
      'Spreadsheets are a common starting point for hiring. They are flexible, cheap and familiar. But once hiring volume increases, spreadsheets quickly become difficult to manage.',
      'HireSort gives teams a more structured way to screen resumes, store candidate records, track stages and build reusable shortlists.',
    ],
    primaryCta: { label: 'Get started for free', href: redirectURL },
    secondaryCta: { label: 'Compare features', href: '#feature-compare' },
    supporting:
      'Spreadsheets work for the first few candidates. HireSort takes over when resumes, stages and roles multiply.',
  },

  quickCompare: {
    heading: 'Spreadsheets vs HireSort at a glance',
    rows: [
      { area: 'Resume storage', competitor: 'External links or folders', hiresort: 'Central resume repository' },
      { area: 'Candidate metadata', competitor: 'Manual entry', hiresort: 'Parsed candidate information' },
      { area: 'Resume screening', competitor: 'Manual reading', hiresort: 'AI-assisted rubric-based screening' },
      { area: 'Candidate ranking', competitor: 'Manual sorting', hiresort: 'Ranked shortlists' },
      { area: 'Stage tracking', competitor: 'Manual status column', hiresort: 'Simple candidate stage tracking' },
      { area: 'Candidate reuse', competitor: 'Difficult across old files', hiresort: 'Reusable candidate records' },
      { area: 'Search and filters', competitor: 'Basic spreadsheet filters', hiresort: 'Filters by name, role, stage, score and date' },
      { area: 'Best fit', competitor: 'Very small or temporary hiring', hiresort: 'Growing teams that need structure and speed' },
    ],
  },

  positioning: {
    eyebrow: 'Where spreadsheets fit',
    title: 'Where spreadsheets work — and where they break',
    body: [
      'Spreadsheets are fine for very early hiring with a few candidates, one-off roles where tracking complexity is low, simple lists that do not require scoring or evidence, and as a temporary tracker before formalizing the process.',
      'They break when resume files are stored separately from candidate rows, scores and notes are inconsistent across reviewers, candidate stage updates are easy to miss, old candidates are difficult to reuse, hiring managers cannot see why candidates were shortlisted, and multiple versions of the same tracker create confusion.',
    ],
    closing:
      'Once any of those failure modes set in, a structured candidate workspace usually saves more time than it costs to adopt.',
  },

  workflow: {
    eyebrow: 'How HireSort improves the workflow',
    title: 'A structured workspace instead of a spreadsheet',
    steps: [
      { n: '01', title: 'Resume repository instead of file links', body: 'Uploaded resumes live in a central candidate workspace so recruiters can search, filter and reuse candidates later.' },
      { n: '02', title: 'AI screening instead of manual columns', body: 'Instead of manually filling columns, HireSort screens resumes against a job-specific rubric and produces a ranked shortlist.' },
      { n: '03', title: 'Candidate stages instead of status chaos', body: 'Track stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected and On Hold without maintaining a fragile spreadsheet workflow.' },
      { n: '04', title: 'Candidate detail pages instead of scattered context', body: 'Review the resume, metadata, score, role association and stage from one candidate detail view.' },
    ],
  },

  featureCompare: {
    heading: 'Spreadsheets vs HireSort feature comparison',
    rows: [
      { need: 'Resume storage', competitor: 'External links or folders', hiresort: 'Central resume repository' },
      { need: 'Candidate metadata', competitor: 'Manual entry', hiresort: 'Parsed candidate information' },
      { need: 'Resume screening', competitor: 'Manual reading', hiresort: 'AI-assisted rubric-based screening' },
      { need: 'Candidate ranking', competitor: 'Manual sorting', hiresort: 'Ranked shortlists' },
      { need: 'Stage tracking', competitor: 'Manual status column', hiresort: 'Simple candidate stage tracking' },
      { need: 'Candidate reuse', competitor: 'Difficult across old files', hiresort: 'Reusable candidate records' },
      { need: 'Search and filters', competitor: 'Basic spreadsheet filters', hiresort: 'Candidate filters by name, role, stage, score and date' },
    ],
  },

  chooseHiresort: {
    title: 'When should you move from spreadsheets to HireSort?',
    bullets: [
      'You receive more resumes than your team can review manually',
      'You are hiring for multiple roles at once',
      'You want to reuse candidates from previous jobs',
      'Hiring managers are asking for clearer shortlist reasoning',
      'Your spreadsheet has become the hiring process instead of supporting it',
    ],
    suitableForTitle: 'Where spreadsheets still work',
    suitableFor: [
      'Very early hiring with a few candidates',
      'One-off roles where tracking complexity is low',
      'Simple candidate lists that do not require scoring, evidence or reuse',
      'Teams that need a temporary tracker before formalizing the process',
    ],
  },

  chooseCompetitor: {
    title: 'Spreadsheets may still be enough if',
    bullets: [
      'You only have a handful of candidates across one or two roles',
      'You do not need consistent scoring or evidence',
      'You are not reusing past candidates for new roles',
      'No one else needs visibility into the hiring pipeline',
      'You expect to hire infrequently for the foreseeable future',
    ],
    closing:
      'Spreadsheets are a fine starting point. HireSort takes over when the spreadsheet starts becoming the hiring process instead of supporting it.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Move beyond spreadsheet hiring',
    body: 'Use HireSort to screen resumes, organize candidates and track hiring stages in one lightweight workspace.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'replace-spreadsheet',
      question: 'Can HireSort fully replace our hiring spreadsheet?',
      answer: [
        'For early-stage screening, resume management and stage tracking, yes. Some teams may still export data to spreadsheets for reporting or offline review.',
      ],
    },
    {
      id: 'harder-than-spreadsheet',
      question: 'Is HireSort harder to use than a spreadsheet?',
      answer: [
        'HireSort is designed to stay simple and table-driven for MVP workflows, while adding structure that spreadsheets cannot provide.',
      ],
    },
    {
      id: 'export',
      question: 'Can we export candidate data?',
      answer: [
        'CSV export is planned as part of the paid workflow for teams that need reporting or offline analysis.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
    { href: '/resources/best/recruitment-software-for-small-business', label: 'Best Recruitment Software for Small Business' },
    { href: '/pricing', label: 'Pricing' },
  ],

  disclaimer:
    'This comparison page is for informational purposes only and reflects HireSort’s own product positioning. Feature availability may change over time.',
};
