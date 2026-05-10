import type { ProductPage } from '@/app/(public)/product/_lib/types';

export const atsForSmallBusinesses: ProductPage = {
  slug: 'smb',
  product: 'ATS for Small Businesses',
  heroIcon: 'briefcase',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'ATS for Small Businesses | Lightweight Applicant Tracking System | HireSort',
    description:
      'HireSort is a lightweight ATS for small businesses. Store resumes, screen candidates with AI, track hiring stages, and manage applicants without spreadsheet chaos.',
    keywords: [
      'ATS for small business',
      'small business applicant tracking system',
      'applicant tracking system for small business',
      'small business recruitment software',
      'lightweight ATS',
      'recruiting software for small business',
      'candidate tracking software',
      'resume screening software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — ATS for small businesses',
  },

  hero: {
    eyebrow: 'ATS for small businesses',
    titlePrefix: 'ATS for small businesses that need ',
    titleAccent: 'hiring to stay simple.',
    lead: [
      'HireSort helps small businesses move away from scattered resumes, email folders, and spreadsheet trackers into one simple applicant tracking workflow.',
      'Store resumes, screen candidates with AI, track hiring stages, and reuse strong profiles for future roles — without the complexity or cost of enterprise ATS software.',
    ],
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'See how it works', href: '#how-it-works' },
    supporting:
      'A lightweight applicant tracking system for small teams, founders, and lean HR teams that need faster shortlisting, cleaner candidate tracking, and less manual resume work.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Small-business hiring gets messy faster than expected',
      intro:
        'Most small businesses do not start with a formal recruiting system. Hiring usually begins with email, referrals, job-board applications, shared folders, and a spreadsheet. That setup works when you are hiring one person occasionally — but once applications increase or multiple people get involved, the process becomes difficult to control.',
      bullets: [
        'Resumes are scattered across inboxes, folders, and job posts',
        'Recruiters and founders spend hours reading every resume manually',
        'Candidate status is tracked in spreadsheets that quickly go out of date',
        'Hiring managers receive shortlists without a consistent evaluation method',
        'Past candidates are forgotten instead of being reused for future roles',
        'There is no clear record of who was shortlisted, rejected, hired, or placed on hold',
        'Traditional ATS platforms feel too heavy, expensive, or complicated for a small team',
      ],
      closing:
        'HireSort gives small businesses the structure they need without forcing them into a full enterprise recruiting suite.',
    },
    {
      type: 'positioning',
      eyebrow: 'Positioning',
      title: 'A screening-first ATS for lean hiring teams',
      body: [
        'HireSort is built for small businesses that care about one thing first: moving from resume volume to a clear, reviewable shortlist.',
        'Instead of trying to manage every possible hiring workflow from day one, HireSort focuses on the most important early-stage hiring needs.',
      ],
      flow: [
        'A central place to store resumes',
        'AI-assisted resume screening',
        'Job-specific candidate scoring',
        'Ranked shortlists',
        'Simple candidate stage tracking',
        'Reusable candidate profiles',
        'A lightweight workflow that small teams can actually adopt',
      ],
      closing:
        'It is more structured than spreadsheets, but simpler than a full-scale enterprise ATS.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'How HireSort works',
      intro:
        'Create job → Upload resumes → Build candidate repository → Screen with AI → Review shortlist → Track stages → Reuse candidates',
      steps: [
        { n: '01', title: 'Create a job', body: 'Paste your job description or upload a JD file. HireSort uses the role requirements to prepare the screening workflow.' },
        { n: '02', title: 'Generate a role-specific rubric', body: 'HireSort creates structured screening criteria from the JD. Review and edit the rubric before resumes are screened.' },
        { n: '03', title: 'Upload resumes', body: 'Upload PDF or DOCX resumes. HireSort parses candidate information and stores each resume as a candidate record.' },
        { n: '04', title: 'Screen candidates with AI', body: 'Candidates are evaluated against the role-specific rubric instead of simple keyword matching.' },
        { n: '05', title: 'Review ranked shortlists', body: 'See candidates ranked by fit, with scores, strengths, missing elements, and evidence from the resume.' },
        { n: '06', title: 'Track candidate stages', body: 'Move candidates across stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, or On Hold.' },
        { n: '07', title: 'Reuse candidates later', body: 'Keep strong candidate profiles in your repository and attach them to future roles when relevant.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Features',
      title: 'Everything a small business needs to organize early hiring',
      items: [
        { icon: 'database', title: 'Central resume repository', body: 'Keep all uploaded resumes in one place instead of spreading them across emails, folders, and job boards.' },
        { icon: 'tags', title: 'Candidate metadata extraction', body: 'Capture key details such as name, email, phone, current role, company, skills, and experience.' },
        { icon: 'sparkles', title: 'AI resume screening', body: 'Screen candidates against job-specific criteria and reduce repetitive first-pass review work.' },
        { icon: 'listChecks', title: 'Rubric-first evaluation', body: 'Apply the same structured criteria across every candidate for a role.' },
        { icon: 'filter', title: 'Ranked candidate shortlists', body: 'Quickly identify the strongest candidates and focus attention where it matters.' },
        { icon: 'fileSearch', title: 'Explainable scoring', body: 'Review score breakdowns, strengths, missing elements, and resume evidence.' },
        { icon: 'workflow', title: 'Candidate stage tracking', body: 'Track where each candidate stands using simple stage updates.' },
        { icon: 'ganttChart', title: 'Funnel customization', body: 'Rename, add, remove, reorder stages, and define one default funnel for your workspace.' },
        { icon: 'search', title: 'Search and filtering', body: 'Find candidates by name, role, stage, score range, or date added.' },
        { icon: 'refreshCcw', title: 'Resume reuse', body: 'Reuse previously uploaded resumes for new jobs and future screenings.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Small-business challenges',
      title: 'Built for small teams that cannot afford hiring chaos',
      columns: ['Small-business challenge', 'How HireSort helps'],
      accentColIndex: 1,
      rows: [
        ['Too many resumes to review manually', 'AI screening helps create ranked shortlists faster.'],
        ['No dedicated ATS admin', 'The workflow stays simple, table-driven, and easy to understand.'],
        ['Hiring tracked in spreadsheets', 'Candidate stages and scores are stored in one workspace.'],
        ['No consistent screening method', 'Rubrics create a shared evaluation standard for every role.'],
        ['Candidates get lost after one role', 'A central repository makes resumes reusable for future jobs.'],
        ['Hiring manager alignment is weak', 'Score breakdowns and evidence make shortlist discussions more objective.'],
      ],
    },
    {
      type: 'fieldList',
      eyebrow: 'Candidate repository',
      title: 'Create a reusable candidate database from every resume',
      intro:
        'Every resume uploaded into HireSort can become a reusable candidate record. This helps small businesses stop treating resume uploads as one-time files and start building a searchable candidate database.',
      cardLabel: 'Candidate record',
      cardIcon: 'userSearch',
      fields: [
        'Candidate name',
        'Email and phone number',
        'Current role and company',
        'Key skills',
        'Years of experience',
        'Date added',
        'Source of upload',
        'Role or JD association',
        'Latest screening score',
        'Current candidate stage',
      ],
      closing:
        'Over time, this repository becomes a useful talent memory for the business, especially when similar roles open again.',
    },
    {
      type: 'stages',
      eyebrow: 'Stage tracking',
      title: 'Know exactly where every candidate stands',
      intro:
        'HireSort helps small teams track candidates after screening without maintaining a separate spreadsheet. Default stage options can include:',
      items: ['New', 'Shortlisted', 'Round 1', 'Round 2', 'Round 3', 'Offer Made', 'Hired', 'Rejected', 'On Hold'],
      closing:
        'Stages are tracked per candidate per role. A candidate can be rejected for one job, shortlisted for another, and kept on hold for a future opening.',
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison',
      title: 'HireSort vs spreadsheets vs enterprise ATS software',
      columns: ['Capability', 'Spreadsheets / Email', 'Enterprise ATS', 'HireSort'],
      accentColIndex: 3,
      rows: [
        ['Resume storage', 'Scattered and manual', 'Centralized', 'Centralized and reusable'],
        ['Resume screening', 'Manual', 'Often manual or keyword-based', 'AI-assisted and rubric-based'],
        ['Candidate ranking', 'Manual sorting', 'Varies by platform', 'Built around ranked shortlists'],
        ['Candidate tracking', 'Manual updates', 'Full workflow tracking', 'Lightweight stage tracking'],
        ['Candidate reuse', 'Difficult', 'Usually available', 'Core repository workflow'],
        ['Setup effort', 'Low but messy', 'Often high', 'Lightweight and quick'],
        ['Cost / complexity fit', 'Cheap but unstructured', 'Built for larger teams', 'Built for small businesses and lean teams'],
        ['Best fit', 'Very early hiring', 'Mature recruiting operations', 'Small businesses that need structure without complexity'],
      ],
    },
    {
      type: 'plansSplit',
      eyebrow: 'Free vs paid',
      title: 'Simple to start. More powerful as hiring grows.',
      free: {
        heading: 'Free / MVP workflow',
        bullets: [
          'Central resume repository',
          'Candidate metadata extraction',
          'Resume-to-role association',
          'Resume reuse for future screening',
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
          'Saved filters and saved searches',
          'Advanced filtering',
          'CSV export',
          'Candidate notes and recruiter comments',
          'Collaboration workflows',
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
      type: 'why',
      eyebrow: 'Why HireSort',
      title: 'Why small businesses choose HireSort',
      items: [
        { title: 'Faster shortlisting', body: 'Spend less time reading every resume manually and more time engaging the right candidates.' },
        { title: 'Better organization', body: 'Keep resumes, scores, stages, and role associations in one workspace.' },
        { title: 'More consistent evaluation', body: 'Use role-specific rubrics instead of inconsistent gut-feel screening.' },
        { title: 'Less spreadsheet dependency', body: 'Track candidates without maintaining fragile manual trackers.' },
        { title: 'Reusable candidate database', body: 'Build a candidate repository that becomes more valuable with each role.' },
        { title: 'Small-team friendly workflow', body: 'Get practical ATS structure without heavy implementation or enterprise complexity.' },
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Scope clarity',
      title: 'Designed for small-business applicant tracking, not enterprise HR complexity',
      body: [
        'HireSort is focused on the workflows small businesses need most: resume storage, candidate metadata, AI screening, ranked shortlists, candidate stages, resume reuse, and simple funnel tracking.',
        'It is not currently positioned as a full enterprise suite with interview scheduling, offer-letter workflows, candidate messaging, background checks, onboarding, or complete CRM-style candidate nurturing.',
        'This focus keeps the product lightweight, easier to adopt, and better suited for small businesses that want to improve hiring without overcomplicating it.',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Ready to replace spreadsheet hiring?',
    body: 'Use HireSort to store resumes, screen candidates with AI, track hiring stages, and build a reusable candidate database for your small business.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is an ATS for small business?',
      answer: ['An ATS for small business is applicant tracking software that helps smaller teams store resumes, track candidates, manage hiring stages, and organize recruitment without relying on spreadsheets or scattered email threads.'],
    },
    {
      id: 'is-ats',
      question: 'Is HireSort an ATS for small businesses?',
      answer: ['Yes. HireSort can act as a lightweight ATS for small businesses that need resume management, AI screening, candidate tracking, and reusable candidate records.'],
    },
    {
      id: 'vs-enterprise',
      question: 'How is HireSort different from enterprise ATS software?',
      answer: ['Enterprise ATS platforms often manage complex workflows across large recruiting teams. HireSort focuses on the core early-stage hiring needs of small businesses: screening resumes, ranking candidates, tracking stages, and managing candidate records.'],
    },
    {
      id: 'replace-spreadsheets',
      question: 'Can HireSort replace spreadsheets?',
      answer: ['Yes. HireSort helps small businesses replace spreadsheet-based resume tracking with a central candidate repository, stage tracking, search, filters, and AI-assisted screening.'],
    },
    {
      id: 'screening',
      question: 'Does HireSort support AI resume screening?',
      answer: ['Yes. HireSort screens resumes against job-specific rubrics and creates ranked shortlists with score explanations and evidence.'],
    },
    {
      id: 'reuse',
      question: 'Can I reuse candidates for future roles?',
      answer: ['Yes. HireSort is designed to store uploaded resumes as reusable candidate records that can be mapped to future jobs and screened again.'],
    },
    {
      id: 'customize-stages',
      question: 'Can hiring stages be customized?',
      answer: ['Yes. The lightweight workflow can support basic funnel customization such as renaming stages, adding stages, removing unused stages, and reordering stages.'],
    },
    {
      id: 'very-small',
      question: 'Is HireSort good for very small teams?',
      answer: ['Yes. HireSort is especially useful for founders, small HR teams, solo recruiters, and small businesses that want hiring structure without a heavy ATS rollout.'],
    },
    {
      id: 'scope',
      question: 'Does HireSort include interview scheduling and offer management?',
      answer: ['No. HireSort is focused on resume screening, candidate management, stage tracking, and shortlist creation. Interview scheduling, offer management, candidate messaging, and onboarding are outside the near-term scope.'],
    },
  ],

  internalLinks: [
    { href: '/applicant-tracking-system/startups', label: 'ATS for Startups' },
    { href: '/use-cases/founder-led-hiring', label: 'Founder-Led Hiring' },
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
