import type { CompetitorPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

type CompetitorInput = {
  slug: string;
  competitor: string;
  category: string;
  competitorFit: string;
  hiresortAngle: string;
  href: string;
};

const makeCompetitorPage = (input: CompetitorInput): CompetitorPage => ({
  slug: input.slug,
  competitor: input.competitor,
  publishedAt: '2026-08-26',
  updatedAt: '2026-08-26',
  meta: {
    title: `HireSort vs ${input.competitor}: Agentic Hiring Comparison`,
    description: `Compare HireSort and ${input.competitor} for AI recruiting, agentic sourcing, resume screening, phone screening, interviews, and shortlist delivery.`,
    keywords: [
      `HireSort vs ${input.competitor}`,
      `${input.competitor} alternative`,
      `${input.competitor} competitor`,
      'AI recruiting software comparison',
      'agentic hiring platform',
      'AI resume screening',
    ],
    ogImage: '/logo.png',
    ogImageAlt: `HireSort vs ${input.competitor}`,
  },
  hero: {
    eyebrow: `${input.competitor} alternative`,
    titlePrefix: `HireSort vs ${input.competitor}: `,
    titleAccent: 'which hiring workflow fits?',
    lead: [
      `${input.competitor} is commonly evaluated for ${input.category}. HireSort is built for teams that want agentic workflows from role brief to structured shortlist.`,
      'Use this page to compare sourcing, screening, AI phone screening, first-round interviews, recruiter review, and shortlist delivery.',
    ],
    primaryCta: { label: 'Automate hiring', href: redirectURL },
    secondaryCta: { label: 'See HireSort workflow', href: '/product/agentic-hiring-platform' },
    supporting:
      'This comparison is written for lean teams, recruitment agencies, and high-volume hiring teams that need faster shortlists.',
  },
  quickCompare: {
    heading: `HireSort vs ${input.competitor} at a glance`,
    rows: [
      { area: 'Best-known fit', competitor: input.competitorFit, hiresort: input.hiresortAngle },
      { area: 'Core workflow', competitor: input.category, hiresort: 'Role brief -> sourcing -> screening -> phone screen -> first-round interview -> shortlist' },
      { area: 'Resume screening', competitor: 'Depends on product configuration', hiresort: 'Core workflow with explainable AI resume screening' },
      { area: 'Phone screening', competitor: 'May require a specific module or workflow', hiresort: 'Built into the agentic screening flow' },
      { area: 'First-round interviews', competitor: 'May be interview-led or ATS-led', hiresort: 'Structured first-round interviews after phone screening' },
      { area: 'Recruiter oversight', competitor: 'Varies by setup', hiresort: 'Recruiter-in-the-loop review and approval' },
      { area: 'Done-for-you option', competitor: 'Varies by vendor or services partner', hiresort: 'Human recruiters plus proprietary agentic workflows' },
    ],
  },
  positioning: {
    eyebrow: 'Positioning',
    title: `When HireSort may fit better than ${input.competitor}`,
    body: [
      'Choose HireSort when the main goal is to reduce the manual work between opening a role and receiving a qualified shortlist.',
      'HireSort combines agentic sourcing, AI resume screening, AI phone screening, first-round interviews, structured notes, and recruiter review.',
    ],
    quote: 'Give HireSort the role. Get a structured shortlist faster.',
  },
  workflow: {
    eyebrow: 'HireSort workflow',
    title: 'From role brief to shortlist',
    steps: [
      { n: '01', title: 'Add role details', body: 'Enter the role, location, budget, must-haves, and hiring timeline.' },
      { n: '02', title: 'Create JD and criteria', body: 'HireSort drafts the JD and builds a consistent screening rubric.' },
      { n: '03', title: 'Post and source', body: 'Agentic workflows bring candidates into the role pipeline.' },
      { n: '04', title: 'Screen resumes', body: 'AI resume screening ranks candidates and explains fit.' },
      { n: '05', title: 'Run phone screens', body: 'Qualified candidates are called and summarized.' },
      { n: '06', title: 'Interview top fits', body: 'Strong candidates complete a deeper first-round interview.' },
      { n: '07', title: 'Share shortlist', body: 'Recruiters and hiring managers get structured notes and recommendations.' },
    ],
  },
  featureCompare: {
    heading: `Compare ${input.competitor} and HireSort by hiring need`,
    rows: [
      { need: 'Agentic sourcing', competitor: 'Check current product fit', hiresort: 'Core workflow' },
      { need: 'AI resume screening', competitor: 'Check current product fit', hiresort: 'Core workflow' },
      { need: 'AI phone screening', competitor: 'Check current product fit', hiresort: 'Core workflow' },
      { need: 'AI first-round interview', competitor: 'Check current product fit', hiresort: 'Core workflow' },
      { need: 'Structured hiring data', competitor: 'Varies by platform', hiresort: 'Candidate profiles, stages, TAT, notes, criteria, and assessments' },
      { need: 'Recruiter-in-the-loop', competitor: 'Varies by setup', hiresort: 'Designed for human review and approval' },
      { need: 'Done-for-you hiring', competitor: 'Usually a services question', hiresort: 'HireSort recruiters can run the workflow for you' },
    ],
  },
  chooseHiresort: {
    title: 'Choose HireSort if you want',
    bullets: [
      'One workflow from role brief to shortlist',
      'Agentic sourcing and job posting support',
      'AI resume screening with clear evidence',
      'AI phone screening before recruiter calls',
      'AI first-round interviews for strong candidates',
      'Human recruiter review and approval',
      'Structured candidate data and funnel visibility',
      '50%-90% less manual recruiting effort',
    ],
    suitableForTitle: 'Especially suitable for',
    suitableFor: [
      'Lean hiring teams',
      'Recruitment agencies',
      'High-volume hiring teams',
      'Founders and hiring managers who need faster shortlists',
    ],
  },
  chooseCompetitor: {
    title: `${input.competitor} may be better if`,
    bullets: [
      `Your team specifically needs ${input.competitor}'s existing ecosystem or workflows.`,
      'You already run hiring operations inside that platform.',
      'Your priority is a broader system rather than a focused shortlist workflow.',
    ],
    closing:
      'The right choice depends on whether you need a broad platform, a sourcing-first tool, an interview-first tool, or a role-to-shortlist workflow.',
  },
  cta: {
    eyebrow: 'Try it',
    title: 'Compare with your next role',
    body: 'Give HireSort a role and see how fast it can create structured screening and interview output.',
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },
  faqs: [
    {
      id: 'difference',
      question: `How is HireSort different from ${input.competitor}?`,
      answer: [
        `HireSort focuses on agentic workflows from role intake to shortlist. ${input.competitor} may be a better fit for teams that specifically need its ${input.category} focus.`,
      ],
    },
    {
      id: 'recruiter-loop',
      question: 'Can HireSort work with a recruiter in the loop?',
      answer: [
        'Yes. Recruiters can review AI-created JDs, sourcing results, resume scores, phone-screen notes, interview notes, and final shortlists.',
      ],
    },
    {
      id: 'done-for-you',
      question: 'Can HireSort deliver candidates for us?',
      answer: [
        'Yes. HireSort’s fleet of human recruiters can understand your requirements and use proprietary agentic workflows to share best-fit candidates in a matter of days.',
      ],
    },
    {
      id: 'time-saved',
      question: 'How much time can HireSort save?',
      answer: [
        'HireSort is designed to reduce manual recruiting time and effort by 50%-90% across sourcing, screening, calls, interviews, and shortlist preparation.',
      ],
    },
  ],
  internalLinks: [
    { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
    { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    { href: '/resources/best/ai-recruiting-software', label: 'Best AI Recruiting Software' },
    { href: '/resources/best/ai-recruiting-agents', label: 'Best AI Recruiting Agents' },
  ],
  externalReferences: [
    {
      href: input.href,
      label: `${input.competitor} official site`,
      description: `Official ${input.competitor} product information for buyers to verify current features.`,
    },
  ],
  disclaimer:
    `${input.competitor} is a trademark of its respective owner. This page is for informational comparison only and is based on public product positioning plus HireSort's own positioning. Verify current capabilities before purchase.`,
});

export const agenticCompetitorPages = [
  makeCompetitorPage({
    slug: 'hiresort-vs-hirevue',
    competitor: 'HireVue',
    category: 'AI interviews and assessments',
    competitorFit: 'Enterprise interviewing and assessment workflows',
    hiresortAngle: 'Agentic sourcing, screening, phone screening, interviews, and shortlist delivery',
    href: 'https://www.hirevue.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-paradox',
    competitor: 'Paradox',
    category: 'conversational recruiting and high-volume hiring automation',
    competitorFit: 'High-volume candidate communication and scheduling',
    hiresortAngle: 'Role-to-shortlist workflows with resume screening and interviews',
    href: 'https://www.paradox.ai/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-hireez',
    competitor: 'hireEZ',
    category: 'outbound sourcing and talent intelligence',
    competitorFit: 'Sourcing-first recruiting teams',
    hiresortAngle: 'Sourcing plus screening, phone screens, interviews, and shortlists',
    href: 'https://hireez.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-peoplebox',
    competitor: 'Peoplebox',
    category: 'AI interview and screening workflows',
    competitorFit: 'Interview-heavy AI hiring workflows',
    hiresortAngle: 'End-to-end agentic hiring with recruiter review and done-for-you options',
    href: 'https://www.peoplebox.ai/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-contrario',
    competitor: 'Contrario',
    category: 'AI recruiting and candidate discovery',
    competitorFit: 'Teams evaluating AI recruiting assistants',
    hiresortAngle: 'Structured role-to-shortlist workflows with interviews and notes',
    href: 'https://www.contrario.ai/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-juicebox',
    competitor: 'Juicebox',
    category: 'AI sourcing and talent search',
    competitorFit: 'AI candidate search and outreach',
    hiresortAngle: 'Sourcing connected to screening, phone screens, interviews, and shortlists',
    href: 'https://juicebox.ai/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-linkedin-recruiter',
    competitor: 'LinkedIn Recruiter',
    category: 'professional network sourcing',
    competitorFit: 'Recruiters sourcing from LinkedIn’s talent network',
    hiresortAngle: 'Post-sourcing screening, calls, interviews, and shortlist delivery',
    href: 'https://business.linkedin.com/talent-solutions/recruiter',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-ashby',
    competitor: 'Ashby',
    category: 'ATS, scheduling, analytics, and recruiting operations',
    competitorFit: 'Teams building a complete recruiting operating system',
    hiresortAngle: 'Focused agentic workflows for faster shortlists',
    href: 'https://www.ashbyhq.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-manatal',
    competitor: 'Manatal',
    category: 'recruitment CRM and ATS workflows',
    competitorFit: 'Agencies that need CRM-style candidate management',
    hiresortAngle: 'Agentic screening and interview workflows for shortlist delivery',
    href: 'https://www.manatal.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-recruit-crm',
    competitor: 'Recruit CRM',
    category: 'ATS and CRM for recruitment agencies',
    competitorFit: 'Agencies managing clients, jobs, candidates, and sales workflows',
    hiresortAngle: 'AI-assisted sourcing, screening, interviewing, and shortlists',
    href: 'https://recruitcrm.io/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-metaview',
    competitor: 'Metaview',
    category: 'interview notes and recruiting intelligence',
    competitorFit: 'Teams that want better interview capture and summaries',
    hiresortAngle: 'Workflow before and after interviews, including sourcing and screening',
    href: 'https://www.metaview.ai/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-mercor',
    competitor: 'Mercor',
    category: 'AI recruiting and talent matching',
    competitorFit: 'Teams evaluating AI-native hiring and talent matching',
    hiresortAngle: 'Recruiter-reviewed workflows from role details to structured shortlists',
    href: 'https://mercor.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-turing',
    competitor: 'Turing',
    category: 'global technical talent and vetting',
    competitorFit: 'Companies hiring vetted global engineering talent',
    hiresortAngle: 'Flexible agentic workflows for roles beyond one talent marketplace',
    href: 'https://www.turing.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-deel',
    competitor: 'Deel',
    category: 'global hiring, payroll, and HR operations',
    competitorFit: 'Global employment, payroll, compliance, and HR workflows',
    hiresortAngle: 'Candidate sourcing, screening, interviews, and shortlists before employment setup',
    href: 'https://www.deel.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-remote',
    competitor: 'Remote',
    category: 'global employment, payroll, and contractor management',
    competitorFit: 'Companies managing international employment and payroll',
    hiresortAngle: 'Front-of-funnel hiring workflows before payroll or EOR setup',
    href: 'https://remote.com/',
  }),
  makeCompetitorPage({
    slug: 'hiresort-vs-fabrichq',
    competitor: 'FabricHQ',
    category: 'agentic hiring workflows',
    competitorFit: 'Teams exploring AI-native hiring agents',
    hiresortAngle: 'Agentic hiring workflows plus human recruiter delivery options',
    href: 'https://fabrichq.ai/',
  }),
];
