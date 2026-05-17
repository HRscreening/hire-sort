import type { BestPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const resumeScreeningSoftware: BestPage = {
  slug: 'resume-screening-software',
  category: 'Resume screening software',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-17',

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
      { tool: 'HireSort', href: '/product/resume-parser', bestFit: 'Recruiters who need resume screening and shortlisting as the core workflow', whyItMayWork: 'AI scoring against JD-based rubrics, ranked shortlists, evidence, resume repository, candidate stages, and reuse across roles', watchOut: 'Not a complete ATS for scheduling/offers/onboarding' },
      { tool: 'Eightfold AI', href: 'https://eightfold.ai/', bestFit: 'Enterprise teams using talent intelligence and skills-based matching', whyItMayWork: 'AI-powered candidate screening across talent networks with skills and qualifications matching', watchOut: 'Enterprise-oriented and broader than standalone resume review' },
      { tool: 'HiPeople', href: 'https://hipeople.io/', bestFit: 'Teams wanting AI hiring workflows beyond resumes', whyItMayWork: 'AI agents for screening, assessments, interviews, and references', watchOut: 'May be too broad if the only need is resume shortlisting' },
      { tool: 'Workable', href: 'https://help.workable.com/hc/en-us/articles/23685011706775-Using-the-Screening-Assistant-AI-powered', bestFit: 'Teams wanting resume parsing and screening features inside a broader platform', whyItMayWork: 'Resume parser, screening assistant, sourcing, scheduling, job posting, and HR workflows', watchOut: 'May not focus primarily on dedicated resume ranking' },
      { tool: 'Zoho Recruit', href: 'https://www.zoho.com/recruit/ai-recruitment.html', bestFit: 'SMBs and agencies needing ATS plus resume/candidate management', whyItMayWork: 'ATS, recruitment CRM, AI assistant, automation, job boards, collaboration, and skill scoring features', watchOut: 'General recruiting platform rather than specialized resume screener' },
      { tool: 'Manatal', href: 'https://www.manatal.com/', bestFit: 'Recruitment agencies and headhunters', whyItMayWork: 'Candidate enrichment, recruitment CRM, AI features, job posting, and pipeline management', watchOut: 'May require setup around screening criteria' },
      { tool: 'Greenhouse', href: 'https://support.greenhouse.io/hc/en-us/articles/33043749845403-Greenhouse-AI-features', bestFit: 'Teams emphasizing structured hiring process', whyItMayWork: 'Scorecards, structured interviews, reporting, responsible AI, candidate trust, and platform workflows', watchOut: 'Screening is part of a broader hiring operating system' },
      { tool: 'HireVue', href: 'https://www.hirevue.com/platform/assessment-software', bestFit: 'Teams combining screening with assessments and interviews', whyItMayWork: 'Skill validation, assessments, video interviewing, and workflow automation', watchOut: 'Resume screening is not the only or central category focus' },
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

  evidence: {
    eyebrow: 'Market context',
    title: 'Why Resume Screening Software Needs More Than Keyword Matching',
    intro:
      'Resume screening software is useful when it helps recruiters move from raw resume volume to a defensible shortlist. The strongest tools combine parsing, role-specific scoring, explainable recommendations, and human review instead of treating screening as a simple keyword search.',
    items: [
      {
        title: 'AI screening is becoming a recognizable hiring workflow',
        body:
          'Indeed describes AI resume screening as a way to analyze resumes, surface qualified candidates, and reduce manual review time. That supports the core buyer need for this category: faster first-pass review without losing candidate context.',
        href: 'https://www.indeed.com/hire/c/info/ai-resume-screening',
        label: 'Indeed guide to AI resume screening',
      },
      {
        title: 'Screening should connect to the actual job requirements',
        body:
          'Workable describes its AI screening assistant as a tool that reviews applications against job requirements and helps recruiters move candidates through the hiring workflow. The important pattern is not just AI; it is role-specific screening tied to the job.',
        href: 'https://help.workable.com/hc/en-us/articles/23685011706775-Using-the-Screening-Assistant-AI-powered',
        label: 'Workable Screening Assistant',
      },
      {
        title: 'Recruiters still need structured review, not black-box decisions',
        body:
          'Greenhouse frames its AI features around structured hiring, candidate trust, and recruiter workflows. Resume screening software should follow the same principle: use AI to organize evidence and recommendations, while keeping recruiters in control of decisions.',
        href: 'https://support.greenhouse.io/hc/en-us/articles/33043749845403-Greenhouse-AI-features',
        label: 'Greenhouse AI features',
      },
      {
        title: 'Responsible AI depends on transparency',
        body:
          'The World Economic Forum notes that AI-powered recruitment needs inclusion and transparency. For resume screening tools, that means showing why candidates were ranked, what evidence was used, and where human review fits into the workflow.',
        href: 'https://www.weforum.org/stories/2025/09/ai-powered-recruitment-inclusion-transparency/',
        label: 'World Economic Forum on AI recruiting',
      },
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
    { href: '/product/recruitment-software', label: 'AI Recruitment Software' },
    { href: '/product/resume-management', label: 'Resume Management Software' },
    { href: '/product/resume-parser', label: 'Resume Parser' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline Software' },
    { href: '/resources/compare/resume-screening-software-vs-resume-parser', label: 'Resume Screening vs Resume Parser' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
    { href: '/resources/compare/ai-resume-screening-vs-ats', label: 'AI Resume Screening vs ATS' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/resources/best/candidate-screening-software', label: 'Best Candidate Screening Software' },
    { href: '/blog/resume-screening-checklist', label: 'Resume Screening Checklist' },
    { href: '/blog/how-to-shortlist-candidates-faster', label: 'How to Shortlist Candidates Faster' },
    { href: '/blog/ai-resume-screening-tool', label: 'AI Resume Screening Tool' },
  ],

  externalReferences: [
    {
      href: 'https://www.indeed.com/hire/c/info/ai-resume-screening',
      label: 'Indeed guide to AI resume screening',
      description: 'Overview of AI resume screening and how employers use it to reduce manual review.',
    },
    {
      href: 'https://help.workable.com/hc/en-us/articles/23685011706775-Using-the-Screening-Assistant-AI-powered',
      label: 'Workable Screening Assistant',
      description: 'Example of AI screening inside a broader recruiting platform.',
    },
    {
      href: 'https://support.greenhouse.io/hc/en-us/articles/33043749845403-Greenhouse-AI-features',
      label: 'Greenhouse AI features',
      description: 'AI feature documentation framed around structured hiring and candidate trust.',
    },
    {
      href: 'https://www.weforum.org/stories/2025/09/ai-powered-recruitment-inclusion-transparency/',
      label: 'World Economic Forum on AI recruiting',
      description: 'Discussion of transparency and inclusion in AI-powered recruitment.',
    },
  ],

  disclaimer:
    'This guide is for informational purposes only and reflects HireSort’s own product positioning. Tool capabilities may change over time.',
};
