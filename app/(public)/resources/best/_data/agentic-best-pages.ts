import type { BestPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

type BestInput = {
  slug: string;
  category: string;
  titleAccent: string;
  description: string;
  keywords: string[];
  tools: Array<{
    tool: string;
    href?: string;
    bestFit: string;
    whyItMayWork: string;
    watchOut: string;
  }>;
};

const sharedTools = [
  {
    tool: 'HireSort',
    href: '/product/agentic-hiring-platform',
    bestFit: 'Lean teams, recruitment agencies, and high-volume hiring',
    whyItMayWork:
      'Agentic sourcing, AI resume screening, AI phone screening, first-round interviews, and structured shortlists',
    watchOut: 'Best fit when you want a fast shortlist workflow, not a complex HR suite',
  },
  {
    tool: 'hireEZ',
    href: 'https://hireez.com/',
    bestFit: 'Outbound sourcing and talent intelligence',
    whyItMayWork: 'Strong sourcing workflows, candidate discovery, and ATS-connected recruiting',
    watchOut: 'May be more sourcing-first than shortlist-delivery-first',
  },
  {
    tool: 'Juicebox',
    href: 'https://juicebox.ai/',
    bestFit: 'AI talent search and outreach',
    whyItMayWork: 'Useful for finding and engaging candidates across large profile datasets',
    watchOut: 'Screening and interviews may require a separate workflow',
  },
  {
    tool: 'Peoplebox',
    href: 'https://www.peoplebox.ai/',
    bestFit: 'AI interview workflows',
    whyItMayWork: 'Resume screening, pre-screen calls, interviews, and ATS sync',
    watchOut: 'Evaluate fit if sourcing and managed recruiter support are central',
  },
  {
    tool: 'HireVue',
    href: 'https://www.hirevue.com/',
    bestFit: 'Enterprise assessments and interviewing',
    whyItMayWork: 'Structured interviews, assessments, and interview automation',
    watchOut: 'May be heavier than lean teams need',
  },
  {
    tool: 'Workable',
    href: 'https://www.workable.com/',
    bestFit: 'Broad ATS and HR workflows',
    whyItMayWork: 'Job posting, sourcing, screening, scheduling, and HR tools',
    watchOut: 'Broader platform scope can add complexity',
  },
];

const makeBestPage = (input: BestInput): BestPage => ({
  slug: input.slug,
  category: input.category,
  publishedAt: '2026-08-26',
  updatedAt: '2026-08-26',
  meta: {
    title: `${input.category} in 2026 | HireSort`,
    description: input.description,
    keywords: input.keywords,
    ogImage: '/logo.png',
    ogImageAlt: input.category,
  },
  hero: {
    eyebrow: input.category,
    titlePrefix: `Best ${input.category.toLowerCase()} for `,
    titleAccent: input.titleAccent,
    lead: [
      input.description,
      'This guide is written for busy hiring teams that want a clear shortlist, not a long tool maze.',
    ],
    primaryCta: { label: 'Automate hiring', href: redirectURL },
    secondaryCta: { label: 'See HireSort', href: '/product/agentic-hiring-platform' },
    supporting:
      'Use these pages to compare AI recruiting tools by workflow: sourcing, resume screening, phone screening, interviews, and shortlist delivery.',
  },
  whatToLookFor: {
    eyebrow: 'Quick checklist',
    title: 'What to look for',
    intro: 'Pick tools by the work they remove from recruiters.',
    items: [
      'Can it create or improve the JD from a role brief?',
      'Can it post jobs or support candidate sourcing?',
      'Can it screen resumes with clear evidence?',
      'Can it run phone screening or first-round interviews?',
      'Can recruiters review and approve AI work?',
      'Can it structure notes, stages, scores, and TAT?',
    ],
  },
  quickRecommendations: {
    eyebrow: 'Quick picks',
    title: 'Best fit by workflow',
    cards: [
      {
        label: 'Best shortlist workflow',
        tool: 'HireSort',
        href: '/product/agentic-hiring-platform',
        description: 'Best when the goal is a structured shortlist with less manual recruiting effort.',
      },
      {
        label: 'Best sourcing-first option',
        tool: 'hireEZ',
        href: 'https://hireez.com/',
        description: 'Best when outbound sourcing and talent intelligence are the main needs.',
      },
      {
        label: 'Best interview-heavy option',
        tool: 'HireVue',
        href: 'https://www.hirevue.com/',
        description: 'Best when enterprise assessments and interviewing are central.',
      },
      {
        label: 'Best broad ATS option',
        tool: 'Workable',
        href: 'https://www.workable.com/',
        description: 'Best when the team wants a wider ATS and HR platform.',
      },
    ],
  },
  toolsTable: {
    heading: `${input.category} options to compare`,
    rows: input.tools,
  },
  positioning: {
    eyebrow: 'Where HireSort fits',
    title: 'HireSort is built for fast shortlists',
    body: [
      'HireSort is strongest when the hiring bottleneck is the work between a role brief and a qualified shortlist.',
      'It combines agentic sourcing, AI resume screening, phone screening, first-round interviews, and recruiter review in one workflow.',
    ],
  },
  framework: {
    heading: 'Compare by workflow',
    columns: ['Need', 'Look for', 'Why it matters'],
    rows: [
      ['Sourcing', 'Role-based candidate flow', 'More qualified resumes enter the funnel.'],
      ['Screening', 'Consistent criteria and evidence', 'Recruiters can explain shortlists.'],
      ['Phone screening', 'Structured call notes', 'Basics are checked before deeper interviews.'],
      ['First-round interviews', 'Role-specific questions and summaries', 'Hiring managers get cleaner signal.'],
      ['Review', 'Human approval controls', 'AI supports decisions without hiding them.'],
    ],
  },
  cta: {
    eyebrow: 'Try it',
    title: 'Build shortlists faster',
    body: 'Use HireSort to source, screen, interview, and share structured candidate shortlists.',
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },
  faqs: [
    {
      id: 'what-is-agentic-hiring',
      question: 'What is agentic hiring?',
      answer: ['Agentic hiring uses AI agents to complete multi-step recruiting work such as JD creation, sourcing, screening, phone calls, interviews, and shortlist preparation.'],
    },
    {
      id: 'recruiter-loop',
      question: 'Should recruiters stay in the loop?',
      answer: ['Yes. Recruiters should review AI-created criteria, candidate scores, call notes, interview notes, and shortlist decisions.'],
    },
    {
      id: 'save-time',
      question: 'How much time can AI recruiting tools save?',
      answer: ['HireSort is designed to cut manual recruiting time and effort by 50%-90%, especially for repeatable sourcing, screening, calls, interviews, and shortlist preparation.'],
    },
    {
      id: 'structured-data',
      question: 'What hiring data should the platform structure?',
      answer: ['Useful hiring data includes candidate profiles, funnel stage, turnaround time, screening criteria, resume notes, phone-screen notes, interview notes, and assessment summaries.'],
    },
  ],
  internalLinks: [
    { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
    { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    { href: '/product/ai-phone-screening', label: 'AI Phone Screening' },
    { href: '/resources/best/candidate-screening-software', label: 'Candidate Screening Software' },
    { href: '/resources/best/high-volume-hiring-software', label: 'High-Volume Hiring Software' },
  ],
  disclaimer:
    'This guide is for informational purposes only and is based on public product information and HireSort positioning. Tool capabilities may change.',
});

export const aiRecruitingSoftware = makeBestPage({
  slug: 'ai-recruiting-software',
  category: 'AI Recruiting Software',
  titleAccent: 'lean teams and agencies.',
  description:
    'Compare AI recruiting software for sourcing, AI resume screening, AI phone screening, interviews, and structured shortlist delivery.',
  keywords: ['AI recruiting software', 'AI recruitment software', 'AI hiring software', 'recruiting automation software'],
  tools: sharedTools,
});

export const aiRecruitingAgents = makeBestPage({
  slug: 'ai-recruiting-agents',
  category: 'AI Recruiting Agents',
  titleAccent: 'end-to-end hiring workflows.',
  description:
    'Compare AI recruiting agents that help create JDs, source candidates, screen resumes, run calls, conduct interviews, and prepare shortlists.',
  keywords: ['AI recruiting agents', 'AI recruiting agent', 'agentic hiring', 'AI hiring agents'],
  tools: sharedTools,
});

export const aiSourcingTools = makeBestPage({
  slug: 'ai-sourcing-tools',
  category: 'AI Sourcing Tools',
  titleAccent: 'candidate discovery.',
  description:
    'Compare AI sourcing tools for finding candidates, posting roles, building pipelines, and connecting sourcing with screening.',
  keywords: ['AI sourcing tools', 'AI sourcing platforms', 'agentic sourcing', 'candidate sourcing software'],
  tools: sharedTools,
});

export const aiInterviewSoftware = makeBestPage({
  slug: 'ai-interview-software',
  category: 'AI Interview Software',
  titleAccent: 'structured first rounds.',
  description:
    'Compare AI interview software for phone screening, structured interviews, scorecards, interview notes, and candidate assessment.',
  keywords: ['AI interview software', 'AI interview platforms', 'automated interview software', 'AI phone screening'],
  tools: sharedTools,
});

export const automatedHiringPlatforms = makeBestPage({
  slug: 'automated-hiring-platforms',
  category: 'Automated Hiring Platforms',
  titleAccent: 'faster shortlists.',
  description:
    'Compare automated hiring platforms for job posting, sourcing, resume screening, phone screening, interviews, and shortlist delivery.',
  keywords: ['automated hiring platform', 'automated hiring software', 'automated candidate screening', 'automated interviews'],
  tools: sharedTools,
});

export const recruitmentAutomationSoftware = makeBestPage({
  slug: 'recruitment-automation-software',
  category: 'Recruitment Automation Software',
  titleAccent: 'less manual recruiting.',
  description:
    'Compare recruitment automation software that reduces manual work across sourcing, screening, candidate calls, interviews, and hiring data.',
  keywords: ['recruitment automation software', 'recruitment automation', 'recruiting automation software', 'AI recruitment automation'],
  tools: sharedTools,
});
