import type { ProductPage } from '@/app/(public)/product/_lib/types';

export const hiringManagers: ProductPage = {
  slug: 'hiring-managers',
  product: 'For Hiring Managers',
  heroIcon: 'clipboardCheck',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'Resume Screening Software for Hiring Managers | HireSort',
    description:
      'HireSort helps hiring managers define role criteria, review AI-ranked shortlists, and evaluate candidates with evidence-based resume scoring.',
    keywords: [
      'resume screening software for hiring managers',
      'hiring manager recruiting software',
      'candidate scorecards',
      'AI resume screening',
      'structured hiring',
      'applicant tracking for hiring managers',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — resume screening for hiring managers',
  },

  hero: {
    eyebrow: 'For hiring managers',
    titlePrefix: 'Resume screening built for hiring managers ',
    titleAccent: 'who know what good looks like.',
    lead: [
      'HireSort helps hiring managers turn job requirements into structured screening criteria, review ranked candidates, and understand why each resume is a strong or weak fit.',
    ],
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'See how candidate scoring works', href: '#how-it-works' },
    supporting:
      'Define the screening bar before resumes are reviewed — and spend more time with the candidates who actually match the role.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Why hiring managers need more control over screening',
      intro:
        'Hiring managers often receive resumes that look relevant on the surface but do not match the actual role requirements. The problem is rarely effort. It is usually translation: the hiring manager knows what the role needs, but that knowledge gets converted into a job description, then a recruiter interpretation, then a shortlist. HireSort gives hiring managers a clearer way to define the screening bar before candidates are reviewed.',
      bullets: [
        'Define what matters for a role before screening starts',
        'Review candidates against a consistent rubric',
        'See ranked shortlists instead of scattered resumes',
        'Understand strengths, gaps, and evidence behind each score',
        'Align faster with recruiters on what a good candidate looks like',
      ],
      closing:
        'HireSort is designed to make resume review more structured without forcing hiring managers into a heavy ATS workflow.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'The hiring manager workflow',
      steps: [
        { n: '01', title: 'Create or review the JD', body: 'Start with a job description that captures the actual requirements of the role.' },
        { n: '02', title: 'Generate a rubric from the JD', body: 'HireSort turns the JD into a structured screening rubric.' },
        { n: '03', title: 'Adjust criteria and weights', body: 'Tune the rubric to match must-have skills, experience signals, qualifications, and role fit.' },
        { n: '04', title: 'Upload or review resumes', body: 'Upload resumes directly or review candidates added by the recruiter.' },
        { n: '05', title: 'See ranked candidate results', body: 'Review candidates ranked by fit, with score breakdowns and evidence.' },
        { n: '06', title: 'Open candidate detail views', body: 'Drill into resume preview, parsed metadata, and score breakdowns for deeper review.' },
        { n: '07', title: 'Move candidates or send feedback', body: 'Move strong candidates to the next stage or share feedback with the recruiter.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Capabilities',
      title: 'What hiring managers can do with HireSort',
      items: [
        { icon: 'listChecks', title: 'Turn requirements into a structured rubric', body: 'Use a role-specific rubric that separates must-have skills, experience signals, qualifications, and role fit.' },
        { icon: 'sparkles', title: 'Review ranked shortlists', body: 'Candidates are ranked by fit so hiring managers can focus attention on the strongest profiles first.' },
        { icon: 'fileSearch', title: 'See evidence, not just scores', body: 'Score explanations, strengths, missing elements, and resume evidence make the shortlist easier to trust and discuss.' },
        { icon: 'gitCompare', title: 'Compare candidates consistently', body: 'Every candidate is evaluated against the same criteria, reducing the noise of ad hoc resume review.' },
        { icon: 'workflow', title: 'Track candidate stage by role', body: 'Stage is tied to a role, so the same candidate can have different statuses across different jobs.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Before / after',
      title: 'Before and after HireSort',
      columns: ['Hiring manager pain point', 'Without HireSort', 'With HireSort'],
      accentColIndex: 2,
      rows: [
        ['Screening criteria', 'Shared informally or hidden in the JD', 'Converted into a structured rubric'],
        ['Shortlist quality', 'Depends on manual interpretation', 'Based on role-specific scoring'],
        ['Candidate comparison', 'Subjective and inconsistent', 'Comparable scorecards and evidence'],
        ['Feedback to recruiter', 'Often vague or delayed', 'Grounded in scores, strengths, and gaps'],
        ['Resume review time', 'Every resume needs manual attention', 'Top candidates are surfaced first'],
        ['Candidate tracking', 'Tracked in spreadsheets or memory', 'Stage is visible by candidate and role'],
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Best suited for',
      title: 'Best suited for',
      items: [
        { icon: 'building', title: 'Engineering managers', body: 'Hiring for technical roles where rubric specificity matters.' },
        { icon: 'handCoins', title: 'Sales leaders', body: 'Evaluating revenue roles consistently across reps.' },
        { icon: 'users', title: 'Functional heads', body: 'Hiring for their own teams without delegating screening blindly.' },
        { icon: 'rocket', title: 'Startup leaders', body: 'Direct control over screening before a recruiting team exists.' },
        { icon: 'gitCompare', title: 'Recruiter alignment', body: 'Hiring managers who want better alignment with recruiters on shortlist quality.' },
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Review better shortlists, faster',
    body: 'Use HireSort to define the screening bar, rank candidates against it, and spend more time with the applicants who actually match the role.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'customize-criteria',
      question: 'Can hiring managers customize screening criteria?',
      answer: ['Yes. HireSort is designed around a rubric-first workflow where criteria can be reviewed and adjusted before resumes are screened.'],
    },
    {
      id: 'replace-judgment',
      question: 'Does HireSort replace recruiter judgment?',
      answer: ['No. HireSort supports human judgment by making first-pass screening more structured, explainable, and consistent.'],
    },
    {
      id: 'why-ranked',
      question: 'Can hiring managers see why a candidate was ranked highly?',
      answer: ['Yes. Candidate results include score breakdowns, evidence, strengths, and missing elements.'],
    },
    {
      id: 'with-recruiters',
      question: 'Is this useful if we already have recruiters?',
      answer: ['Yes. HireSort helps recruiters and hiring managers align faster on what the role requires and which candidates deserve deeper review.'],
    },
    {
      id: 'tracking',
      question: 'Can candidates be tracked after screening?',
      answer: ['Yes. Candidates can be moved through simple hiring stages, with stage tracked per candidate per role.'],
    },
  ],

  internalLinks: [
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/use-cases/founder-led-hiring', label: 'Founder-Led Hiring' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
