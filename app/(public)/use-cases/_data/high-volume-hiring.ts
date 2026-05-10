import type { ProductPage } from '@/app/(public)/product/_lib/types';

export const highVolumeHiring: ProductPage = {
  slug: 'high-volume-hiring',
  product: 'High-Volume Hiring',
  heroIcon: 'layers',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'High-Volume Hiring Software for Faster Resume Screening | HireSort',
    description:
      'HireSort helps teams screen large applicant pools faster with AI-ranked shortlists, structured rubrics, candidate tracking, and reusable resume management.',
    keywords: [
      'high-volume hiring software',
      'mass hiring software',
      'bulk resume screening',
      'high volume recruitment software',
      'AI resume screening',
      'candidate shortlisting software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — high-volume hiring software',
  },

  hero: {
    eyebrow: 'High-volume hiring',
    titlePrefix: 'High-volume hiring software for ',
    titleAccent: 'faster shortlists.',
    lead: [
      'When one role attracts hundreds of applications, HireSort helps your team move from resume overload to structured, ranked candidate shortlists.',
    ],
    primary: { label: 'Screen resumes faster', href: '/pricing' },
    secondary: { label: 'See the workflow', href: '#how-it-works' },
    supporting:
      'Combine AI-assisted resume screening, structured rubrics, ranked shortlists, and candidate tracking — and prioritize the right candidates first.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'High-volume hiring fails when screening is manual',
      intro:
        'Large applicant pools create a difficult trade-off: review every resume carefully and move slowly, or move quickly and risk missing strong candidates. HireSort is designed to reduce that trade-off.',
      bullets: [
        'Reduce time spent on repetitive first-pass resume review',
        'Apply the same screening standard to every candidate',
        'Surface high-fit profiles faster',
        'Avoid losing good candidates in spreadsheets and folders',
        'Track status after screening instead of starting over manually',
      ],
      closing:
        'By combining AI-assisted resume screening, structured rubrics, ranked shortlists, and candidate tracking, HireSort helps teams prioritize the right candidates first.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'High-volume workflow with HireSort',
      steps: [
        { n: '01', title: 'Create a role', body: 'Generate a structured screening rubric from the job description.' },
        { n: '02', title: 'Upload a batch of resumes', body: 'Bulk upload PDF or DOCX resumes for the role.' },
        { n: '03', title: 'Parse candidate details', body: 'HireSort parses resumes and extracts candidate metadata.' },
        { n: '04', title: 'Score against role criteria', body: 'Every candidate is evaluated against the same role-specific rubric.' },
        { n: '05', title: 'Review ranked results', body: 'Candidate results appear progressively as resumes are processed.' },
        { n: '06', title: 'Open candidate detail pages', body: 'Drill into evidence, score breakdowns, and current stage for deeper review.' },
        { n: '07', title: 'Move profiles forward', body: 'Move strong matches into Shortlist or Interview stages.' },
        { n: '08', title: 'Save records for future roles', body: 'Every candidate stays searchable in the central repository.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Features that matter',
      title: 'Features that matter for high-volume hiring',
      items: [
        { icon: 'layers', title: 'Bulk resume processing', body: 'Upload multiple resumes and let HireSort parse, score, and organize them into a structured candidate workflow.' },
        { icon: 'sparkles', title: 'Progressive ranked results', body: 'As resumes are processed, candidate results can appear progressively so teams do not have to wait until every profile is complete before reviewing early matches.' },
        { icon: 'listChecks', title: 'Consistent scoring rubric', body: 'Every candidate is evaluated against the same criteria, reducing inconsistent first-pass decisions.' },
        { icon: 'filter', title: 'Candidate tiers and shortlist focus', body: 'Hiring teams can prioritize strong matches and spend deeper review time where it matters most.' },
        { icon: 'database', title: 'Central candidate repository', body: 'Even when a candidate is not selected for the current role, the resume remains searchable and reusable for future hiring needs.' },
        { icon: 'workflow', title: 'Stage tracking by role', body: 'Move candidates across stages such as New, Shortlisted, Round 1, Offer Made, Rejected, or On Hold.' },
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Best fit',
      title: 'Best-fit hiring scenarios',
      items: [
        { icon: 'fileText', title: 'Roles with 100+ applications', body: 'Triage volume into reviewable shortlists.' },
        { icon: 'refreshCcw', title: 'Recurring high-volume hiring', body: 'Sales, support, operations, and entry-level roles.' },
        { icon: 'building', title: 'Recruitment agencies', body: 'Manage multiple high-volume client mandates.' },
        { icon: 'rocket', title: 'Startups and SMBs', body: 'Screen fast without hiring a large TA team.' },
        { icon: 'clipboardCheck', title: 'Spreadsheet replacement', body: 'Reduce spreadsheet-based resume triage.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Manual vs HireSort',
      title: 'Manual screening vs HireSort for high-volume roles',
      columns: ['High-volume challenge', 'Manual workflow', 'HireSort workflow'],
      accentColIndex: 2,
      rows: [
        ['Applicant volume', 'Every resume needs manual review', 'AI-assisted first-pass ranking'],
        ['Consistency', 'Different reviewers apply different standards', 'Same rubric across every candidate'],
        ['Speed', 'Shortlisting can take days', 'Ranked shortlist in a faster workflow'],
        ['Candidate evidence', 'Notes are often incomplete', 'Score breakdowns and evidence excerpts'],
        ['Status tracking', 'Spreadsheet updates', 'Candidate stage tracking'],
        ['Future reuse', 'Old resumes are hard to rediscover', 'Reusable central resume repository'],
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Scope clarity',
      title: 'Built for screening, not full enterprise mass hiring',
      body: [
        'HireSort focuses on screening, shortlisting, candidate organization, and basic stage tracking. It is not currently positioned as a full enterprise high-volume suite with automated scheduling, offer workflows, mass messaging, onboarding, or background checks.',
        'This focus keeps the workflow lightweight and fast.',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Turn resume volume into a ranked shortlist',
    body: 'Use HireSort to screen large applicant pools faster, apply consistent criteria, and move the right candidates forward with more confidence.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is high-volume hiring software?',
      answer: ['High-volume hiring software helps teams manage large applicant pools, screen candidates faster, and move qualified candidates through the hiring process.'],
    },
    {
      id: 'how-helps',
      question: 'How does HireSort help with high-volume hiring?',
      answer: ['HireSort helps by parsing resumes, applying role-specific rubrics, ranking candidates, and supporting candidate tracking after screening.'],
    },
    {
      id: 'batches',
      question: 'Can HireSort process resumes in batches?',
      answer: ['Yes. HireSort is designed around batch resume upload, parsing, scoring, and ranked results.'],
    },
    {
      id: 'lower-quality',
      question: 'Does high-volume screening mean lower quality?',
      answer: ['Not if the process is structured. HireSort uses consistent rubrics and explainable evidence to support faster but more disciplined screening.'],
    },
    {
      id: 'mass-hiring',
      question: 'Is HireSort suitable for mass hiring workflows?',
      answer: ['HireSort is suitable for the screening and candidate-management layer of mass hiring. It does not currently cover full scheduling, messaging, offer, or onboarding automation.'],
    },
  ],

  internalLinks: [
    { href: '/use-cases/recruitment-agencies', label: 'For Recruitment Agencies' },
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
