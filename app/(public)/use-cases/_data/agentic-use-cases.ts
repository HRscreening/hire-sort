import type { ProductPage } from '@/app/(public)/product/_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

const sharedWorkflow = [
  { n: '01', title: 'Share role details', body: 'Add the role, location, budget, must-haves, and hiring timeline.' },
  { n: '02', title: 'Create the JD', body: 'HireSort turns the brief into a clear JD and screening criteria.' },
  { n: '03', title: 'Post and source', body: 'Agentic workflows bring candidates into the role pipeline.' },
  { n: '04', title: 'Screen resumes', body: 'AI resume screening ranks candidates against the same criteria.' },
  { n: '05', title: 'Run phone screens', body: 'Qualified candidates get a preliminary AI phone screen.' },
  { n: '06', title: 'Interview top fits', body: 'Strong candidates move to a deeper first-round interview.' },
  { n: '07', title: 'Review shortlist', body: 'You receive structured notes, scores, and best-fit candidates.' },
];

const sharedFaqs = [
  {
    id: 'how-much-time',
    question: 'How much time can HireSort save?',
    answer: ['HireSort is designed to reduce manual recruiting time and effort by 50%-90% across sourcing, screening, calls, interviews, and shortlist preparation.'],
  },
  {
    id: 'ai-phone-screening',
    question: 'How does AI phone screening work?',
    answer: ['AI phone screening calls qualified candidates, asks preliminary fit questions, and turns the answers into structured notes for review.'],
  },
  {
    id: 'structured-data',
    question: 'What hiring data does HireSort structure?',
    answer: ['HireSort organizes candidate profiles, funnel stages, turnaround time, screening criteria, resume notes, interview notes, and assessment summaries.'],
  },
];

export const recruiterInTheLoop: ProductPage = {
  slug: 'recruiter-in-the-loop',
  product: 'Recruiter-in-the-Loop Hiring',
  heroIcon: 'users',
  publishedAt: '2026-08-26',
  updatedAt: '2026-08-26',
  meta: {
    title: 'Recruiter-in-the-Loop Agentic Hiring | HireSort',
    description:
      'Use HireSort with your recruiter in the loop. AI creates JDs, posts jobs, sources candidates, screens resumes, runs phone screens, and prepares shortlists for review.',
    keywords: [
      'recruiter in the loop',
      'agentic hiring workflow',
      'AI recruiting agents',
      'AI resume screening',
      'AI phone screening',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'Recruiter-in-the-loop hiring with HireSort',
  },
  hero: {
    eyebrow: 'Recruiter-in-the-loop',
    titlePrefix: 'AI handles the work. ',
    titleAccent: 'Your recruiter stays in control.',
    lead: [
      'HireSort automates the repetitive hiring workflow while your recruiter reviews, approves, and makes final decisions.',
    ],
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'See workflow', href: '#how-it-works' },
    supporting:
      'Best for teams that want agentic sourcing, AI resume screening, phone screening, and interviews with human oversight.',
  },
  sections: [
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'Recruiter review at every key step',
      steps: sharedWorkflow,
    },
    {
      type: 'features',
      eyebrow: 'Control',
      title: 'What your recruiter can review',
      items: [
        { icon: 'fileText', title: 'JD and criteria', body: 'Review the job description and screening rubric before candidates are evaluated.' },
        { icon: 'search', title: 'Sourcing results', body: 'See where candidates came from and decide who should move forward.' },
        { icon: 'sparkles', title: 'Resume scores', body: 'Review AI resume screening scores with evidence, strengths, and gaps.' },
        { icon: 'clock', title: 'Phone-screen notes', body: 'Check fit, interest, compensation, location, and availability notes.' },
        { icon: 'clipboardCheck', title: 'Interview assessments', body: 'Review structured first-round interview summaries before shortlisting.' },
        { icon: 'ganttChart', title: 'Hiring funnel', body: 'Track stages, turnaround time, and shortlist decisions in one place.' },
      ],
    },
    {
      type: 'callout',
      title: 'Built for trust',
      body: 'HireSort helps recruiters move faster without turning hiring into a black box.',
    },
  ],
  cta: {
    eyebrow: 'Start simple',
    title: 'Give your recruiter an agentic workflow',
    body: 'Use HireSort to reduce manual recruiting work while keeping human review in the process.',
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'View product', href: '/product/agentic-hiring-platform' },
  },
  faqs: [
    {
      id: 'can-review',
      question: 'Can recruiters approve AI agent work?',
      answer: ['Yes. Recruiters can review the JD, sourcing results, resume scores, phone-screen notes, interview notes, and shortlists before making decisions.'],
    },
    ...sharedFaqs,
  ],
  internalLinks: [
    { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    { href: '/use-cases/done-for-you-hiring', label: 'Done-for-You Hiring' },
  ],
};

export const doneForYouHiring: ProductPage = {
  slug: 'done-for-you-hiring',
  product: 'Done-for-You Hiring',
  heroIcon: 'handCoins',
  publishedAt: '2026-08-26',
  updatedAt: '2026-08-26',
  meta: {
    title: 'Done-for-You Hiring with Agentic Workflows | HireSort',
    description:
      'Hand the role to HireSort. Our human recruiters understand your requirements and use proprietary agentic workflows to share best-fit candidates in days.',
    keywords: [
      'done for you hiring',
      'recruitment agency AI',
      'agentic recruiting workflow',
      'AI hiring service',
      'candidate shortlist service',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'Done-for-you hiring with HireSort',
  },
  hero: {
    eyebrow: 'Done-for-you hiring',
    titlePrefix: 'Hand the role to ',
    titleAccent: 'HireSort.',
    lead: [
      'HireSort’s fleet of human recruiters understands your requirements, then uses proprietary agentic workflows to share the best-fit candidates in a matter of days.',
    ],
    primary: { label: 'Talk to HireSort', href: '/contact' },
    secondary: { label: 'See workflow', href: '#how-it-works' },
    supporting:
      'Best for teams that want shortlists fast without managing sourcing, screening, calls, and first-round interviews themselves.',
  },
  sections: [
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'We run the hiring workflow for you',
      steps: sharedWorkflow,
    },
    {
      type: 'features',
      eyebrow: 'Service plus platform',
      title: 'Human recruiters, agentic workflows',
      items: [
        { icon: 'users', title: 'Requirement intake', body: 'HireSort recruiters understand the role, budget, location, must-haves, and hiring bar.' },
        { icon: 'workflow', title: 'Proprietary workflows', body: 'Our team uses HireSort’s agentic sourcing, screening, and interview workflows.' },
        { icon: 'sparkles', title: 'AI screening', body: 'Candidates are screened consistently against role-specific criteria.' },
        { icon: 'clock', title: 'Fast turnaround', body: 'Shortlists are prepared in a matter of days, depending on role complexity.' },
        { icon: 'fileText', title: 'Structured notes', body: 'You receive resume notes, phone-screen notes, interview notes, and assessments.' },
        { icon: 'clipboardCheck', title: 'Best-fit candidates', body: 'The output is a focused shortlist, not a raw resume dump.' },
      ],
    },
    {
      type: 'callout',
      title: 'Best when speed matters',
      body: 'Use this mode when you want qualified candidates without building the workflow yourself.',
    },
  ],
  cta: {
    eyebrow: 'Hand us the role',
    title: 'Get best-fit candidates in days',
    body: 'HireSort recruiters use our agentic platform to source, screen, interview, and share candidates for your role.',
    primary: { label: 'Talk to HireSort', href: '/contact' },
    secondary: { label: 'View product', href: '/product/agentic-hiring-platform' },
  },
  faqs: [
    {
      id: 'what-delivered',
      question: 'What does HireSort deliver in done-for-you hiring?',
      answer: ['HireSort delivers a structured shortlist of best-fit candidates with resume notes, phone-screen notes, interview notes, and assessment summaries.'],
    },
    ...sharedFaqs,
  ],
  internalLinks: [
    { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
    { href: '/use-cases/recruiter-in-the-loop', label: 'Recruiter-in-the-Loop Hiring' },
  ],
};
