import type { BestPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const resumeScreeningSoftware: BestPage = {
  slug: 'resume-screening-software',
  category: 'Resume screening software',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-10',

  meta: {
    title: 'Best Resume Screening Software in 2026 | HireSort',
    description:
      'Compare resume screening software for recruiters, agencies, startups, and hiring managers. Find tools for AI screening, resume ranking, and candidate shortlisting.',
    keywords: [
      'best resume screening software',
      'resume screening software',
      'automated resume screening',
      'resume ranking software',
      'AI resume screener',
      'candidate shortlisting software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'Best resume screening software',
  },

  hero: {
    eyebrow: 'Best resume screening software',
    titlePrefix: 'Resume screening software for ',
    titleAccent: 'faster candidate shortlists.',
    lead: [
      'Resume screening software helps hiring teams reduce manual review time and identify stronger candidates faster. The best tools do more than parse files or search for keywords. They help recruiters understand fit, compare candidates consistently, and explain why someone should move forward.',
      'This guide compares resume screening tools across different needs: dedicated AI resume screening, enterprise talent intelligence, ATS-based screening, assessment-led evaluation, and agency-friendly recruitment software.',
    ],
    primaryCta: { label: 'Turn resume review into ranked shortlists', href: 'https://app.hiresort.ai/login' },
  },

  whatToLookFor: {
    title: 'What to look for in resume screening software',
    items: [
      'Bulk upload and support for common resume formats',
      'Resume parsing and candidate information extraction',
      'JD-based or role-specific scoring',
      'Candidate ranking and shortlist creation',
      'Evidence and explanations for scores',
      'Search and filters by skills, role, stage, date, and score',
      'Candidate tracking after screening',
      'Export or handoff to hiring managers',
    ],
  },

  toolsTable: {
    heading: 'Best resume screening software options',
    rows: [
      { tool: 'HireSort', bestFit: 'Recruiters who need resume screening and shortlisting as the core workflow', whyItMayWork: 'AI scoring against JD-based rubrics, ranked shortlists, evidence, resume repository, candidate stages, and reuse across roles', watchOut: 'Not a complete ATS for scheduling/offers/onboarding' },
      { tool: 'Eightfold AI', bestFit: 'Enterprise teams using talent intelligence and skills-based matching', whyItMayWork: 'AI-powered candidate screening across talent networks with skills and qualifications matching', watchOut: 'Enterprise-oriented and broader than standalone resume review' },
      { tool: 'HiPeople', bestFit: 'Teams wanting AI hiring workflows beyond resumes', whyItMayWork: 'AI agents for screening, assessments, interviews, and references', watchOut: 'May be too broad if the only need is resume shortlisting' },
      { tool: 'Workable', bestFit: 'Teams wanting resume parsing and screening features inside a broader platform', whyItMayWork: 'Resume parser, screening assistant, sourcing, scheduling, job posting, and HR workflows', watchOut: 'May not focus primarily on dedicated resume ranking' },
      { tool: 'Zoho Recruit', bestFit: 'SMBs and agencies needing ATS plus resume/candidate management', whyItMayWork: 'ATS, recruitment CRM, AI assistant, automation, job boards, collaboration, and skill scoring features', watchOut: 'General recruiting platform rather than specialized resume screener' },
      { tool: 'Manatal', bestFit: 'Recruitment agencies and headhunters', whyItMayWork: 'Candidate enrichment, recruitment CRM, AI features, job posting, and pipeline management', watchOut: 'May require setup around screening criteria' },
      { tool: 'Greenhouse', bestFit: 'Teams emphasizing structured hiring process', whyItMayWork: 'Scorecards, structured interviews, reporting, responsible AI, candidate trust, and platform workflows', watchOut: 'Screening is part of a broader hiring operating system' },
      { tool: 'HireVue', bestFit: 'Teams combining screening with assessments and interviews', whyItMayWork: 'Skill validation, assessments, video interviewing, and workflow automation', watchOut: 'Resume screening is not the only or central category focus' },
    ],
  },

  positioning: {
    eyebrow: 'How HireSort approaches resume screening',
    title: 'JD → rubric → ranked shortlist',
    body: [
      'HireSort starts with the job description. It generates a scoring rubric, lets the recruiter review the criteria, processes uploaded resumes, and returns ranked candidates with score breakdowns, strengths, missing elements, and evidence. This helps teams screen consistently without treating the AI as a black box.',
    ],
  },

  framework: {
    heading: 'Resume screening software vs resume parser',
    columns: ['Capability', 'Resume parser', 'Resume screening software'],
    rows: [
      ['Extract name, email, phone', 'Yes', 'Yes'],
      ['Extract skills and experience', 'Yes', 'Yes'],
      ['Compare to job description', 'Usually limited', 'Yes'],
      ['Rank candidates', 'No or limited', 'Yes'],
      ['Explain fit and gaps', 'No or limited', 'Yes'],
      ['Create shortlist', 'No', 'Yes'],
    ],
  },

  cta: {
    eyebrow: 'Try it',
    title: 'Turn resume review into ranked shortlists',
    body: 'Use HireSort to screen resumes against role-specific criteria and review explainable candidate rankings.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is resume screening software?',
      answer: [
        'Resume screening software helps recruiters evaluate resumes, compare candidates, and create shortlists for a role. AI resume screening tools can also score and rank candidates based on job-specific criteria.',
      ],
    },
    {
      id: 'vs-keywords',
      question: 'What is the difference between resume screening and keyword matching?',
      answer: [
        'Keyword matching looks for specific words. Strong resume screening evaluates whether the candidate has evidence of the skills, experience, and role fit required for the job.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'AI Applicant Tracking System' },
    { href: '/product/resume-management', label: 'Resume Management Software' },
    { href: '/product/resume-parser', label: 'Resume Parser' },
    { href: '/resources/compare/resume-screening-software-vs-resume-parser', label: 'Resume Screening vs Resume Parser' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/resources/best/candidate-screening-software', label: 'Best Candidate Screening Software' },
  ],

  disclaimer:
    'This guide is for informational purposes only and reflects HireSort’s own product positioning. Tool capabilities may change over time.',
};
