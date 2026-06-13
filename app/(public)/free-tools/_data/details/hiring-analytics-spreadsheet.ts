import type { ToolDetail } from './types';

const DOWNLOAD_HREF = '/hiring_analytics_tool/Hiring%20Analytics.xlsx';

export const hiringAnalyticsSpreadsheet: ToolDetail = {
  slug: 'hiring-analytics-spreadsheet',
  name: 'Hiring Analytics Spreadsheet',
  publishedAt: '2026-06-11',
  updatedAt: '2026-06-11',
  appHref: DOWNLOAD_HREF,
  schemaType: 'DigitalDocument',

  meta: {
    title: 'Free Hiring Analytics Excel Template - Recruiting Dashboard',
    description:
      'Download a free hiring analytics Excel template with a recruiting dashboard, requisition tracker, candidate pipeline, interview schedule, bottleneck alerts, and recommendations.',
    keywords: [
      'hiring analytics excel template',
      'recruiting dashboard excel',
      'recruitment analytics template',
      'candidate pipeline tracker excel',
      'hiring funnel dashboard',
      'requisition tracker spreadsheet',
      'free hiring analytics template',
    ],
  },

  hero: {
    eyebrow: 'Free Excel tool',
    titlePrefix: 'Download a',
    titleAccent: 'hiring analytics dashboard',
    titleSuffix: 'for Excel',
    lead: 'Use this free workbook to track open requisitions, candidate movement, interviews, recruiter workload, source performance, and hiring bottlenecks in one spreadsheet. It includes a dashboard plus structured tabs for requisitions, pipeline data, reference values, today\'s interviews, and recommendations.',
    ctaLabel: 'Download the Excel file',
  },

  intro: [
    'Hiring teams often have the data they need, but it is scattered across emails, interview notes, ATS exports, and recruiter spreadsheets. This free Hiring Analytics Excel template gives that information a cleaner operating system: one workbook for requisitions, candidate pipeline status, interview activity, funnel conversion, stale candidates, open roles, and source performance.',
    'The workbook is designed for recruiting teams that want useful hiring visibility without waiting for a full BI setup. Keep the input sheets updated, then use the dashboard to spot where candidates are slowing down, which sources convert, which roles are still open, and where recruiters or hiring managers need to take action.',
  ],

  howItWorks: {
    title: 'How to use the hiring analytics spreadsheet',
    intro: 'The workbook works best when you treat it as a weekly recruiting operating view, not a one-time report.',
    steps: [
      {
        title: 'Update requisitions first',
        body: 'Add each role to the Requisitions tab with role title, department, hiring manager, priority, location, open positions, budget, target close date, candidate counts, fill rate, days open, and comments.',
      },
      {
        title: 'Maintain the candidate pipeline',
        body: 'Use the Candidate Pipeline tab to track each candidate\'s applied date, current stage, screening result, interview round dates, offer status, joining status, compensation notes, source, and recruiter ownership.',
      },
      {
        title: 'Review the dashboard and act',
        body: 'Open the Dashboard and Recommendations tabs to review funnel drop-offs, stale candidates, open roles, recruiter workload, source effectiveness, priority distribution, and bottleneck alerts.',
      },
    ],
  },

  features: {
    title: 'What the Excel file provides',
    intro: 'The file includes six tabs: Dashboard, Today\'s Interviews, Requisitions, Candidate Pipeline, Reference Data, and Recommendations.',
    items: [
      {
        title: 'Executive hiring dashboard',
        body: 'Track total requisitions, open positions, filled positions, total candidates, average days open, candidates awaiting screening, stale candidates, average days in pipeline, and pending offers.',
      },
      {
        title: 'Hiring funnel and drop-off view',
        body: 'See how candidates move from applied to screening, interview rounds, final round, offer, and hired so you can find the stage where momentum is leaking.',
      },
      {
        title: 'Requisition and priority tracking',
        body: 'Monitor open, filled, cancelled, and on-hold roles by priority, department, location, hiring manager, recruiter, target close date, and days open.',
      },
      {
        title: 'Candidate pipeline tracker',
        body: 'Capture candidate profile details, tech stack, experience, location, compensation, notice period, source, round outcomes, offer status, joining status, and notes in one structured sheet.',
      },
      {
        title: 'Interview schedule for today',
        body: 'Use the Today\'s Interviews tab to see candidate names, roles, tech stack, experience, interview round, interview date, hiring manager, CV link, and feedback sheet link.',
      },
      {
        title: 'Bottleneck alerts and recommendations',
        body: 'Use built-in views for candidates stuck more than seven days, requisitions open more than 45 days, unfilled high-priority roles, pending offers, on-hold roles, and quick diagnostic benchmarks.',
      },
    ],
  },

  whenToUse: {
    title: 'When this spreadsheet is useful',
    items: [
      'You manage several open roles and need one recruiting dashboard for weekly review.',
      'You want to measure hiring funnel conversion without building a BI dashboard from scratch.',
      'Your ATS does not give recruiters and hiring managers an easy operational view.',
      'You need a simple candidate pipeline tracker for small teams, agencies, or startup hiring.',
      'You want to spot stale candidates, slow roles, pending offers, and recruiter workload issues quickly.',
      'You are preparing a hiring update for founders, HR leaders, department heads, or clients.',
    ],
  },

  faqs: [
    {
      question: 'What is included in the hiring analytics Excel template?',
      answer: [
        'The workbook includes a Dashboard, Today\'s Interviews, Requisitions, Candidate Pipeline, Reference Data, and Recommendations. Together, these tabs help you track requisitions, candidates, interview stages, source performance, recruiter workload, bottlenecks, and hiring outcomes.',
      ],
    },
    {
      question: 'Do I need advanced Excel skills to use it?',
      answer: [
        'No. Start by updating the Requisitions and Candidate Pipeline tabs. The dashboard is designed to summarize the hiring data for you, so most teams can use it as a practical tracker and review sheet without building formulas from scratch.',
      ],
    },
    {
      question: 'How often should I update the spreadsheet?',
      answer: [
        'For active hiring, update candidate movement after every screening decision, interview round, offer update, or joining update. At minimum, refresh it before your weekly hiring review so the dashboard reflects current bottlenecks and priorities.',
      ],
    },
    {
      question: 'Can this replace an ATS?',
      answer: [
        'It can work as a lightweight tracker for small teams, but it is not a full applicant tracking system. Use it to improve visibility, reporting, and recruiting discipline; use HireSort or your ATS for production candidate workflows at scale.',
      ],
    },
    {
      question: 'Is the hiring analytics spreadsheet free?',
      answer: [
        'Yes. The Excel workbook is free to download and use. You can adapt it for your own roles, recruiters, interview stages, hiring managers, locations, and reporting cadence.',
      ],
    },
  ],

  related: [
    { label: 'Resume Screening Tool', href: '/free-tools/resume-screening', note: 'Score a resume against any JD' },
    { label: 'Rubric Generator', href: '/free-tools/generate-rubric', note: 'Turn a JD into a weighted rubric' },
    { label: 'Job Description Generator', href: '/free-tools/job-description-generator', note: 'Draft a structured JD with AI' },
    { label: 'Interview scorecards', href: '/resources/scorecards', note: 'Standardize interview feedback' },
    { label: 'Screening rubrics', href: '/resources/screening-rubrics', note: 'Use consistent criteria for candidate review' },
    { label: 'Recruitment software', href: '/product/recruitment-software', note: 'Run the full hiring workflow in HireSort' },
  ],
};

