import type { BestPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const candidateScreeningSoftware: BestPage = {
  slug: 'candidate-screening-software',
  category: 'Candidate screening software',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-16',

  meta: {
    title: 'Best Candidate Screening Software in 2026 | HireSort',
    description:
      'Compare candidate screening software for resume review, AI shortlisting, assessments, interview screening, and high-volume applicant workflows.',
    keywords: [
      'best candidate screening software',
      'candidate screening software',
      'applicant screening software',
      'AI candidate screening',
      'hr screening software',
      'recruitment screening software',
      'intelligent applicant screening software',
      'resume shortlist software',
      'resume screening software',
      'pre-employment screening tools',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'Best candidate screening software',
  },

  hero: {
    eyebrow: 'Best candidate screening software',
    titlePrefix: 'Best candidate screening software for ',
    titleAccent: 'better shortlists.',
    lead: [
      'Candidate screening software helps hiring teams decide who should move forward before they spend time on interviews. The category includes resume screening tools, assessment platforms, video interview tools, conversational screening systems, and broader ATS platforms with screening features.',
      'The right tool depends on what you want to screen for: resume fit, skills, communication, availability, qualifications, fraud signals, or role-specific assessments.',
    ],
    primaryCta: { label: 'Screen candidates with HireSort', href: '/pricing' },
    secondaryCta: { label: 'View pricing', href: '/pricing' },
  },

  framework: {
    heading: 'Types of candidate screening software',
    columns: ['Screening type', 'Best for', 'Example workflow'],
    rows: [
      ['Resume screening', 'Large applicant pools and first-pass review', 'Score and rank resumes against a job description'],
      ['Skills assessment', 'Technical, cognitive, language, or job simulation evaluation', 'Send test or assessment before interview'],
      ['Video interview screening', 'Communication and behavioral review at scale', 'Candidates record responses or join structured video flows'],
      ['Conversational screening', 'Frontline and high-volume qualification checks', 'Chat or text asks knockout questions and schedules interviews'],
      ['ATS screening features', 'Teams wanting screening inside a full hiring system', 'Use scorecards, filters, knockout questions, and pipeline stages'],
    ],
  },

  toolsTable: {
    heading: 'Best candidate screening software options',
    rows: [
      { tool: 'HireSort', bestFit: 'Resume-first candidate screening and ranked shortlists', whyItMayWork: 'JD-based rubrics, AI resume scoring, evidence, candidate ranking, repository, and stage tracking', watchOut: 'Not a skills testing or video interview platform' },
      { tool: 'HireVue', bestFit: 'Skills validation, video interviews, assessments, and interview automation', whyItMayWork: 'Assessment software, virtual job tryouts, AI-powered interviews, and structured validation', watchOut: 'May be more than needed for simple resume shortlisting' },
      { tool: 'HiPeople', bestFit: 'AI hiring agents across screening, assessments, interviews, and references', whyItMayWork: 'Screening, assessments, interviews, references, and AI automation in one platform', watchOut: 'Broader platform scope may not fit teams that only need resume screening' },
      { tool: 'Eightfold AI', bestFit: 'Enterprise talent intelligence and candidate matching', whyItMayWork: 'AI-powered screening based on skills, qualifications, and talent network matching', watchOut: 'Generally enterprise-oriented' },
      { tool: 'Paradox', bestFit: 'High-volume conversational screening and scheduling', whyItMayWork: 'Chat/text screening, scheduling, reminders, offers, and onboarding automation', watchOut: 'Best fit for frontline/high-volume workflows' },
      { tool: 'Fountain', bestFit: 'Frontline candidate screening at scale', whyItMayWork: 'Mobile-first apply, AI screening, scheduling, messaging, analytics, and hourly hiring workflows', watchOut: 'Less focused on resume-heavy professional roles' },
      { tool: 'Workable', bestFit: 'Recruiting teams wanting screening inside a broader platform', whyItMayWork: 'Resume parser, screening assistant, interview questions, sourcing, scheduling, and HR features', watchOut: 'May not be the most specialized resume ranking tool' },
      { tool: 'Greenhouse', bestFit: 'Structured hiring and consistent interview evaluation', whyItMayWork: 'Scorecards, structured hiring workflows, AI features, reporting, and candidate trust controls', watchOut: 'Best when the organization wants broader ATS structure' },
    ],
  },

  howToChoose: {
    title: 'How to choose candidate screening software',
    items: [
      'Define the screening signal you care about most: resume fit, skills, availability, communication, or job readiness.',
      'Decide whether screening should happen before or after application submission.',
      'Check whether the tool explains its recommendations or only returns a score.',
      'Look for human review controls so recruiters can override or adjust decisions.',
      'Evaluate how screening results flow into candidate tracking and follow-up.',
      'For resume-heavy roles, prioritize explainable candidate ranking and shortlist review over generic keyword filters.',
    ],
  },

  positioning: {
    eyebrow: 'Where HireSort fits',
    title: 'A candidate screening tool for the resume review and shortlisting stage',
    body: [
      'HireSort is a candidate screening tool for the resume review stage. It is strongest when recruiters need to evaluate many resumes against a specific JD and produce a structured shortlist that hiring managers can trust.',
      'For teams searching for HR screening software or recruitment screening software, HireSort is the best fit when the bottleneck is resume volume, inconsistent first-pass review, or shortlists that are difficult to explain.',
    ],
  },

  cta: {
    eyebrow: 'Try it',
    title: 'Screen candidates before your team gets buried',
    body: 'Use HireSort to evaluate resumes against job-specific criteria and review ranked, explainable shortlists.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is candidate screening software?',
      answer: [
        'Candidate screening software helps teams evaluate applicants before interviews using resumes, assessments, knockout questions, interviews, or AI-assisted qualification workflows.',
      ],
    },
    {
      id: 'resume-vs-candidate',
      question: 'Is resume screening the same as candidate screening?',
      answer: [
        'Resume screening is one type of candidate screening. Candidate screening can also include assessments, video interviews, qualification questions, and background checks.',
      ],
    },
    {
      id: 'hr-screening-software',
      question: 'What is HR screening software used for?',
      answer: [
        'HR screening software helps recruiting teams evaluate applicants before interviews. It can screen resumes, run assessments, ask qualification questions, rank candidates, and help recruiters decide who should move forward.',
      ],
    },
    {
      id: 'recruitment-screening-software',
      question: 'What is the difference between recruitment screening software and an ATS?',
      answer: [
        'Recruitment screening software focuses on evaluating and shortlisting candidates. An ATS usually manages a broader hiring workflow such as applications, stages, communication, scheduling, and reporting. Some teams use both together.',
      ],
    },
    {
      id: 'resume-shortlist',
      question: 'Can candidate screening software create a resume shortlist?',
      answer: [
        'Yes. Resume-focused candidate screening software like HireSort can rank applicants against a job description, surface evidence, and help recruiters build a shortlist for hiring manager review.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'AI Applicant Tracking System' },
    { href: '/product/recruitment-software', label: 'AI Recruitment Software' },
    { href: '/product/resume-management', label: 'Resume Management Software' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline Software' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/resources/best/high-volume-hiring-software', label: 'Best High-Volume Hiring Software' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
  ],

  disclaimer:
    'This guide is for informational purposes only and is based on publicly available information and HireSort’s own product positioning. Tool capabilities may change over time.',
};
