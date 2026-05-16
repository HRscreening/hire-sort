import type { ProductPage } from '@/app/(public)/product/_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const founderLedHiring: ProductPage = {
  slug: 'founder-led-hiring',
  product: 'Founder-Led Hiring',
  heroIcon: 'rocket',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'Founder-Led Hiring Software for Startups | HireSort',
    description:
      'HireSort helps founders hire their first team members with structured resume screening, AI-ranked shortlists, and lightweight candidate tracking.',
    keywords: [
      'founder-led hiring software',
      'startup hiring software',
      'hiring first employees',
      'ATS for founders',
      'AI resume screening for startups',
      'lightweight ATS',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — founder-led hiring software',
  },

  hero: {
    eyebrow: 'Founder-led hiring',
    titlePrefix: 'Founder-led hiring without ',
    titleAccent: 'spreadsheet chaos.',
    lead: [
      'HireSort helps founders define what they need, screen resumes faster, compare candidates more consistently, and track hiring stages before building a full HR team.',
    ],
    primary: { label: 'Start hiring with structure', href: 'https://app.hiresort.ai/login' },
    secondary: { label: 'See how HireSort works', href: '#how-it-works' },
    supporting:
      'A lightweight workflow for founders hiring their first 5 to 20 employees — built for speed, clarity, and structured early hiring.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Founders need hiring structure before they need a large HR stack',
      intro:
        'In early-stage companies, founders often own hiring directly. They write the JD, review resumes, ask team members for opinions, schedule conversations, and decide who moves forward. That works at the start, but it quickly becomes messy when multiple roles open, applications increase, and candidate information starts living across email, spreadsheets, folders, and chat threads.',
      bullets: [
        'Define role requirements clearly before resume review starts',
        'Avoid ad hoc resume screening and inconsistent candidate decisions',
        'Move away from scattered resume folders and spreadsheets',
        'Review ranked shortlists instead of reading every resume deeply',
        'Keep a reusable candidate repository for future roles',
      ],
      closing:
        'HireSort gives founders the most important hiring structure first — without forcing them into heavy enterprise workflows.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'Founder-led hiring workflow with HireSort',
      intro:
        'Write JD → Generate rubric → Edit criteria → Upload resumes → Review ranked candidates → Open detail views → Move through funnel → Save profiles for future roles',
      steps: [
        { n: '01', title: 'Write or paste the job description', body: 'Start with a JD or upload a JD file. HireSort uses the role requirements as the foundation for screening.' },
        { n: '02', title: 'Generate a role-specific rubric', body: 'HireSort turns the JD into a structured screening rubric. You can review and edit the criteria before screening begins.' },
        { n: '03', title: 'Edit the rubric', body: 'Adjust criteria, weights, and role-fit expectations to reflect what the founder actually wants in this hire.' },
        { n: '04', title: 'Upload resumes', body: 'Upload resumes collected from referrals, inbound applications, or sourcing. PDF or DOCX both work.' },
        { n: '05', title: 'Review ranked candidates', body: 'See candidates ranked by fit, with scores, strengths, missing elements, and resume evidence.' },
        { n: '06', title: 'Open candidate detail views', body: 'Review parsed metadata, the full resume, score breakdowns, and current stage on a single page.' },
        { n: '07', title: 'Move through a hiring funnel', body: 'Track candidates through New, Shortlisted, Round 1, Round 2, Offer Made, Hired, Rejected, or On Hold.' },
        { n: '08', title: 'Save strong profiles for future roles', body: 'Candidates who are not right today stay searchable in the central repository for the next opening.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'What founders get',
      title: 'What founders get with HireSort',
      items: [
        { icon: 'listChecks', title: 'A clear screening bar', body: 'Convert a JD into a structured rubric so every candidate is judged against the same role requirements.' },
        { icon: 'sparkles', title: 'Faster first-pass review', body: 'Reduce time spent reading every resume manually and focus on candidates most likely to match the role.' },
        { icon: 'users', title: 'Better recruiter or intern delegation', body: 'When criteria are structured, founders can delegate screening without losing control over what good looks like.' },
        { icon: 'workflow', title: 'Simple candidate tracking', body: 'Move candidates through stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, or On Hold.' },
        { icon: 'database', title: 'Reusable candidate memory', body: 'Candidates who are not right today can still be stored and reused for future roles.' },
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'When it fits',
      title: 'When founders should use HireSort',
      items: [
        { icon: 'rocket', title: 'Hiring your first 5 to 20 employees', body: 'Add structure before recruiting volume becomes unmanageable.' },
        { icon: 'fileText', title: 'More resumes than you can review manually', body: 'Triage volume with AI-assisted ranking before reading deeply.' },
        { icon: 'clock', title: 'Not ready for a heavy ATS', body: 'Avoid enterprise implementation costs and time.' },
        { icon: 'users', title: 'Delegating screening to interns or hiring managers', body: 'Keep the screening bar consistent across reviewers.' },
        { icon: 'database', title: 'Avoiding lost candidates', body: 'Keep promising profiles searchable in a central repository.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Before / after',
      title: 'Founder-led hiring before and after HireSort',
      columns: ['Area', 'Without HireSort', 'With HireSort'],
      accentColIndex: 2,
      rows: [
        ['Role clarity', 'JD and expectations may not fully align', 'Rubric turns requirements into criteria'],
        ['Resume review', 'Founder reads manually late at night', 'AI-assisted ranking creates a first shortlist'],
        ['Team feedback', 'Unstructured comments and opinions', 'Shared scoring criteria and candidate evidence'],
        ['Candidate tracking', 'Spreadsheet, inbox, memory', 'Candidate stage by role'],
        ['Candidate reuse', 'Old applicants are forgotten', 'Central repository for future roles'],
        ['Process maturity', 'Ad hoc and founder-dependent', 'Lightweight system without enterprise overhead'],
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Why this is not overkill',
      title: 'Lightweight by design',
      body: [
        'HireSort is intentionally lightweight. It is designed to give founders the most important hiring structure first: resume screening, candidate scoring, central resume management, candidate detail views, and stage tracking.',
        'It does not force founders into heavy scheduling, offer, onboarding, or HR workflows before they need them.',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Make your first hires with more structure',
    body: 'Use HireSort to define the hiring bar, review ranked candidates, and build a reusable candidate system before your recruiting process becomes messy.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'no-hr-team',
      question: 'Is HireSort useful for founders without an HR team?',
      answer: ['Yes. HireSort is designed to help founders create a structured hiring workflow before they have a dedicated recruiting team.'],
    },
    {
      id: 'customize-ai',
      question: 'Can founders customize what the AI screens for?',
      answer: ['Yes. HireSort uses a rubric-first workflow where the criteria can be reviewed and customized before screening.'],
    },
    {
      id: 'too-complex',
      question: 'Is HireSort too complex for early-stage startups?',
      answer: ['No. The product is positioned as lightweight and screening-first, not as a full enterprise ATS.'],
    },
    {
      id: 'referrals-inbound',
      question: 'Can we use HireSort for referrals and inbound resumes?',
      answer: ['Yes. Resumes from different sources can be uploaded, stored, screened, and reused.'],
    },
    {
      id: 'first-10',
      question: 'Can HireSort help us hire our first 10 employees?',
      answer: ['Yes. It helps founders add structure to role definition, resume screening, shortlisting, and candidate tracking during early hiring.'],
    },
  ],

  internalLinks: [
    { href: '/applicant-tracking-system/startups', label: 'ATS for Startups' },
    { href: '/product/recruitment-software', label: 'Recruitment Software' },
    { href: '/product/resume-management', label: 'Resume Management Software' },
    { href: '/resources/best/candidate-screening-software', label: 'Candidate Screening Software' },
    { href: '/resources/best/ats-for-startups', label: 'Best ATS for Startups' },
    { href: '/blog/how-to-shortlist-candidates-faster', label: 'How to Shortlist Candidates Faster' },
    { href: '/use-cases/recruiters', label: 'For Recruiters' },
    { href: '/use-cases/hiring-managers', label: 'For Hiring Managers' },
  ],
};
