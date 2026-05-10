import type { ProductPage } from '@/app/(public)/product/_lib/types';

export const recruitmentAgencies: ProductPage = {
  slug: 'recruitment-agencies',
  product: 'For Recruitment Agencies',
  heroIcon: 'building',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'AI Resume Screening Software for Recruitment Agencies | HireSort',
    description:
      'HireSort helps recruitment agencies screen resume batches faster, rank candidates by role fit, manage reusable candidate records, and deliver stronger client shortlists.',
    keywords: [
      'resume screening software for recruitment agencies',
      'recruitment agency software',
      'staffing agency resume screening',
      'AI candidate shortlisting',
      'candidate database',
      'recruitment CRM alternative',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — AI resume screening for recruitment agencies',
  },

  hero: {
    eyebrow: 'For recruitment agencies',
    titlePrefix: 'AI resume screening for agencies handling ',
    titleAccent: 'high-volume roles.',
    lead: [
      'HireSort helps agencies process resume batches, build reusable candidate repositories, rank candidates against client JDs, and deliver clearer shortlists faster.',
    ],
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'Build your first shortlist', href: '#how-it-works' },
    supporting:
      'A screening-first workspace to evaluate candidates, reuse past resumes, and send better shortlists to clients.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Agency recruiting is a speed and quality game',
      intro:
        'Recruitment agencies are judged on how fast they can respond and how relevant their candidate submissions are. But when every client sends a different JD and every role attracts a large resume pool, manual screening becomes slow and inconsistent.',
      bullets: [
        'Screen large resume batches against client-specific requirements',
        'Create role-specific rubrics from each job description',
        'Rank candidates by fit instead of reading every resume manually',
        'Store resumes in a central reusable repository',
        'Track candidate status by client role or job requirement',
        'Reuse strong profiles across future roles',
      ],
      closing:
        'HireSort gives agencies a screening-first workspace to evaluate candidates, reuse past resumes, and send better shortlists to clients.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'Agency workflow with HireSort',
      steps: [
        { n: '01', title: 'Create a new client role', body: 'Add a new client requirement and paste the JD.' },
        { n: '02', title: 'Generate a screening rubric', body: 'HireSort turns the JD into a structured screening rubric.' },
        { n: '03', title: 'Review and edit criteria', body: 'Adjust criteria based on the client brief and any nuance not captured in the JD.' },
        { n: '04', title: 'Upload a batch of resumes', body: 'Bulk upload sourced resumes for the role.' },
        { n: '05', title: 'Get ranked candidates', body: 'See candidates ranked by fit with score breakdowns and evidence.' },
        { n: '06', title: 'Open candidate detail views', body: 'Drill into evidence and metadata for deeper review before submission.' },
        { n: '07', title: 'Move profiles forward', body: 'Move profiles to Shortlisted, Round 1, On Hold, Rejected, or Hired.' },
        { n: '08', title: 'Reuse stored candidates', body: 'When another similar client role opens, reuse stored candidates instead of starting from zero.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Agency features',
      title: 'Features for recruitment agencies',
      items: [
        { icon: 'listChecks', title: 'Client-specific candidate screening', body: 'Every role can have its own rubric, scorecard, and ranking logic based on the client JD.' },
        { icon: 'database', title: 'Central candidate repository', body: 'Uploaded resumes become reusable candidate records with metadata such as name, contact details, current role, company, skills, experience, source, score, and stage.' },
        { icon: 'refreshCcw', title: 'Candidate reuse across roles', body: 'Strong candidates should not disappear after one role closes. HireSort helps agencies reuse resumes for future searches.' },
        { icon: 'sparkles', title: 'Score-based shortlist creation', body: 'Ranked outputs help recruiters prepare client shortlists faster while still reviewing evidence before submission.' },
        { icon: 'layers', title: 'Paid workflow depth', body: 'As agency workflows grow, advanced features can include saved talent pools, saved filters, CSV export, notes, comments, Kanban views, bulk actions, multiple funnel templates, and custom candidate columns.' },
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Use cases',
      title: 'Agency use cases',
      items: [
        { icon: 'fileText', title: 'Screen 200 to 500 resumes per role', body: 'Process large applicant pools per client requirement.' },
        { icon: 'refreshCcw', title: 'Reuse candidates from past searches', body: 'Map sourced candidates to new client roles.' },
        { icon: 'listChecks', title: 'Build role-specific shortlists', body: 'Sales, support, tech, or operations hiring across clients.' },
        { icon: 'database', title: 'Maintain a sourced-resume database', body: 'Searchable record of every previously sourced resume.' },
        { icon: 'clipboardCheck', title: 'Send evidence-backed shortlists', body: 'Give hiring managers structured shortlists with score evidence.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Manual vs HireSort',
      title: 'HireSort vs manual agency screening',
      columns: ['Area', 'Manual agency workflow', 'HireSort workflow'],
      accentColIndex: 2,
      rows: [
        ['Resume review', 'Junior recruiters read and tag manually', 'AI-assisted rubric-based screening'],
        ['Shortlist quality', 'Depends on reviewer consistency', 'Standardized scoring by client JD'],
        ['Candidate reuse', 'Often depends on memory or spreadsheets', 'Central repository and reusable records'],
        ['Client explanation', 'Limited rationale for why candidates were selected', 'Evidence, strengths, gaps, and scores'],
        ['Candidate tracking', 'Spreadsheet columns and manual updates', 'Stage tracking by candidate and role'],
        ['Scale', 'Hard to manage many roles at once', 'Designed for repeat screening workflows'],
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Deliver better client shortlists in less time',
    body: 'Use HireSort to process resume batches, rank candidates by client fit, and build a reusable candidate repository that keeps working for future roles.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'agencies',
      question: 'Is HireSort useful for staffing and recruitment agencies?',
      answer: ['Yes. HireSort is useful for agencies that handle high resume volumes, multiple client roles, and recurring candidate reuse.'],
    },
    {
      id: 'per-client',
      question: 'Can we screen candidates separately for each client role?',
      answer: ['Yes. Candidates can be associated with specific roles or JDs and scored against role-specific rubrics.'],
    },
    {
      id: 'reuse-future',
      question: 'Can we reuse candidates for future client requirements?',
      answer: ['Yes. The resume repository is designed to make uploaded resumes searchable and reusable for future screenings.'],
    },
    {
      id: 'cross-role-status',
      question: 'Can candidates have different statuses across roles?',
      answer: ['Yes. Stage is tracked per candidate per role, so one candidate can be shortlisted for one role and on hold for another.'],
    },
    {
      id: 'crm',
      question: 'Does HireSort include full CRM-style candidate nurturing?',
      answer: ['Not in the near-term scope. HireSort is focused on resume screening, candidate tracking, and reusable resume management.'],
    },
  ],

  internalLinks: [
    { href: '/use-cases/high-volume-hiring', label: 'High-Volume Hiring' },
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
