import type { ProductPage } from '../_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

type AgenticProductInput = {
  slug: string;
  product: string;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  keywords: string[];
  focus: string;
  steps: { n: string; title: string; body: string }[];
  features: { title: string; body: string }[];
};

const workflow = [
  'Role intake',
  'JD creation',
  'Job posting',
  'Candidate sourcing',
  'AI resume screening',
  'AI phone screening',
  'AI first-round interview',
  'Structured shortlist',
];

const commonControlFaq = {
  id: 'recruiter-review',
  question: 'Can recruiters review the AI work?',
  answer: [
    'Yes. Recruiters can review the JD, sourcing results, resume scores, phone-screen notes, interview notes, and shortlist recommendations before candidates move forward.',
  ],
};

const productFaqs: Record<string, ProductPage['faqs']> = {
  'agentic-hiring-platform': [
    {
      id: 'what-is-agentic-hiring',
      question: 'What is an agentic hiring platform?',
      answer: [
        'An agentic hiring platform uses AI agents to complete multi-step recruiting work such as JD creation, job posting, sourcing, resume screening, phone screening, interviews, and shortlist preparation.',
      ],
    },
    {
      id: 'role-to-shortlist',
      question: 'Can HireSort manage the full role-to-shortlist workflow?',
      answer: [
        'Yes. HireSort can turn role details into a JD, post jobs, source candidates, screen resumes, call suitable candidates, conduct first-round interviews, and prepare structured shortlists.',
      ],
    },
    commonControlFaq,
    {
      id: 'done-for-you',
      question: 'Can HireSort deliver candidates for us?',
      answer: [
        'Yes. HireSort can combine its fleet of human recruiters with proprietary agentic workflows to understand your role and share best-fit candidates in a matter of days.',
      ],
    },
    {
      id: 'time-saved',
      question: 'How much time can HireSort save?',
      answer: [
        'HireSort is designed to reduce manual recruiting time and effort by 50%-90% by automating repetitive work across sourcing, screening, calls, interviews, and shortlist preparation.',
      ],
    },
  ],
  'agentic-sourcing': [
    {
      id: 'what-is-agentic-sourcing',
      question: 'What is agentic sourcing?',
      answer: [
        'Agentic sourcing uses AI workflows to move from role intake to job posting, candidate sourcing, and screening-ready applications with less manual recruiter effort.',
      ],
    },
    {
      id: 'job-posting',
      question: 'Can HireSort post jobs for a role?',
      answer: [
        'HireSort helps turn role details into a job description and supports one-tap posting flows so teams can publish roles and capture candidates faster.',
      ],
    },
    {
      id: 'screening-after-sourcing',
      question: 'What happens after candidates are sourced?',
      answer: [
        'Sourced applicants flow into AI resume screening, where HireSort scores each candidate against role-specific criteria and prepares ranked shortlists for review.',
      ],
    },
    commonControlFaq,
    {
      id: 'agency-sourcing',
      question: 'Is agentic sourcing useful for recruitment agencies?',
      answer: [
        'Yes. Agencies can use HireSort to manage multiple roles, keep intake consistent, source candidates, and move resumes into structured screening workflows for client shortlists.',
      ],
    },
  ],
  'automated-screening-and-interviews': [
    {
      id: 'what-is-automated-screening',
      question: 'What is automated screening and interviews?',
      answer: [
        'Automated screening and interviews means HireSort screens resumes, calls qualified candidates, runs deeper first-round interviews, and prepares structured notes for recruiter review.',
      ],
    },
    {
      id: 'resume-screening',
      question: 'How does AI resume screening work?',
      answer: [
        'HireSort compares each resume against the same role-specific criteria, scores candidate fit, and explains the strengths and gaps behind the shortlist.',
      ],
    },
    {
      id: 'phone-to-interview',
      question: 'How are phone screens and interviews connected?',
      answer: [
        'Candidates who perform well in resume screening can move to AI phone screening. Strong phone-screen performers can then move to a deeper AI first-round interview.',
      ],
    },
    commonControlFaq,
    {
      id: 'consistent-criteria',
      question: 'Can the screening criteria stay consistent?',
      answer: [
        'Yes. HireSort keeps the rubric, resume notes, phone-screen notes, interview notes, and assessments tied to the same role so candidates are compared consistently.',
      ],
    },
  ],
  'ai-phone-screening': [
    {
      id: 'what-is-ai-phone-screening',
      question: 'What is AI phone screening?',
      answer: [
        'AI phone screening calls candidates who pass resume screening, asks preliminary fit questions, captures answers, and turns the call into structured recruiter notes.',
      ],
    },
    {
      id: 'who-gets-called',
      question: 'Who gets called by AI phone screening?',
      answer: [
        'HireSort is designed to call suitable candidates after AI resume screening, so recruiter time is focused on candidates who already match the role better.',
      ],
    },
    {
      id: 'phone-screen-questions',
      question: 'What questions can the phone screen ask?',
      answer: [
        'The phone screen can check basics such as interest, location, notice period, compensation alignment, availability, and role-specific must-haves.',
      ],
    },
    {
      id: 'phone-notes',
      question: 'Are phone-screen notes structured?',
      answer: [
        'Yes. HireSort turns candidate answers into structured notes, screening facts, scores, and next-step recommendations for recruiter review.',
      ],
    },
    commonControlFaq,
  ],
  'ai-first-round-interview': [
    {
      id: 'what-is-ai-first-round-interview',
      question: 'What is an AI first-round interview?',
      answer: [
        'An AI first-round interview is a structured interview for candidates who have already passed resume screening and preliminary phone screening.',
      ],
    },
    {
      id: 'role-specific-questions',
      question: 'Are the interview questions role-specific?',
      answer: [
        'Yes. HireSort can ask questions aligned to the role, screening criteria, and skills your team wants to assess before a hiring-manager round.',
      ],
    },
    {
      id: 'interview-assessment',
      question: 'What does HireSort produce after the interview?',
      answer: [
        'HireSort prepares interview notes, strengths, gaps, assessment summaries, and scores so recruiters can compare candidates without replaying every conversation.',
      ],
    },
    {
      id: 'human-decision',
      question: 'Does AI make the final interview decision?',
      answer: [
        'No. HireSort structures the first-round interview and assessment, but recruiters and hiring teams decide who moves forward.',
      ],
    },
    {
      id: 'best-fit-interviews',
      question: 'When should teams use AI first-round interviews?',
      answer: [
        'AI first-round interviews are useful when teams have many qualified candidates, need consistent early interviews, or want faster shortlist decisions for tech and white-collar roles.',
      ],
    },
  ],
};

const getProductFaqs = (slug: string) =>
  productFaqs[slug] ?? productFaqs['agentic-hiring-platform'];

const makeAgenticProduct = (input: AgenticProductInput): ProductPage => ({
  slug: input.slug,
  product: input.product,
  heroIcon: 'workflow',
  publishedAt: '2026-08-26',
  updatedAt: '2026-08-26',
  meta: {
    title: `${input.product} | HireSort`,
    description: input.description,
    keywords: input.keywords,
    ogImage: '/logo.png',
    ogImageAlt: `HireSort ${input.product}`,
  },
  hero: {
    eyebrow: input.eyebrow,
    titlePrefix: input.titlePrefix,
    titleAccent: input.titleAccent,
    lead: [
      input.description,
      'Use HireSort with your recruiter in the loop, or hand the role to HireSort and receive best-fit candidates in a matter of days.',
    ],
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'See workflow', href: '#how-it-works' },
    supporting:
      'Built for lean teams, recruitment agencies, and high-volume hiring teams that want 50%-90% less manual recruiting effort.',
  },
  sections: [
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From role details to shortlist',
      intro:
        'Enter the role, location, budget, and must-haves. HireSort turns that into a structured recruiting workflow.',
      steps: input.steps,
    },
    {
      type: 'features',
      eyebrow: 'What you get',
      title: 'Built for fast, structured hiring',
      intro:
        'Each workflow creates clean hiring data your team can review, reuse, and explain.',
      items: input.features.map((feature) => ({
        icon: 'sparkles',
        title: feature.title,
        body: feature.body,
      })),
    },
    {
      type: 'fieldList',
      eyebrow: 'Structured data',
      title: 'Every role becomes easier to manage',
      intro:
        'HireSort keeps the key hiring data organized from first screen to final shortlist.',
      cardLabel: 'Hiring record',
      cardIcon: 'database',
      fields: [
        'Candidate profile',
        'Resume score',
        'Screening criteria',
        'Phone-screen notes',
        'Interview notes',
        'Assessment summary',
        'Funnel stage',
        'Turnaround time',
        'Recruiter decision',
        'Shortlist status',
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Best fit',
      title: 'Useful when hiring work piles up',
      items: [
        {
          icon: 'users',
          title: 'Lean teams',
          body: 'Move faster without adding a large recruiting team.',
        },
        {
          icon: 'building',
          title: 'Recruitment agencies',
          body: 'Screen and shortlist more candidates across client roles.',
        },
        {
          icon: 'layers',
          title: 'High-volume hiring',
          body: 'Handle large applicant pools with consistent criteria.',
        },
        {
          icon: 'clipboardCheck',
          title: 'Recruiter review',
          body: 'Keep humans in the loop while AI does the repetitive work.',
        },
      ],
    },
    {
      type: 'positioning',
      eyebrow: 'End-to-end hiring journey',
      title: 'HireSort offers end-to-end hiring solutions',
      body: [
        'HireSort supports work across the candidate journey, from role intake to final shortlist.',
        'Use one workflow for sourcing, AI resume screening, AI phone screening, first-round interviews, and structured hiring data.',
      ],
      flow: workflow,
    },
  ],
  cta: {
    eyebrow: 'Ready when you are',
    title: 'Automate hiring from role to shortlist',
    body: 'Give HireSort a role and see how agentic workflows reduce manual recruiting effort.',
    primary: { label: 'Automate hiring', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },
  faqs: getProductFaqs(input.slug),
  internalLinks: [
    { href: '/product/recruitment-software', label: 'AI Recruitment Software' },
    { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
    { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    { href: '/product/ai-phone-screening', label: 'AI Phone Screening' },
    { href: '/product/ai-first-round-interview', label: 'AI First-Round Interview' },
    { href: '/resources/best/candidate-screening-software', label: 'Candidate Screening Software' },
    { href: '/resources/best/high-volume-hiring-software', label: 'High-Volume Hiring Software' },
  ],
});

export const agenticHiringPlatform = makeAgenticProduct({
  slug: 'agentic-hiring-platform',
  product: 'Agentic Hiring Platform',
  eyebrow: 'Agentic hiring platform',
  titlePrefix: 'Agentic hiring platform for ',
  titleAccent: 'faster shortlists.',
  description:
    'HireSort creates JDs, posts jobs, sources candidates, screens resumes, runs phone screens, conducts first-round interviews, and delivers structured shortlists.',
  keywords: [
    'agentic hiring platform',
    'AI recruiting agents',
    'AI hiring platform',
    'agentic hiring',
    'automated hiring platform',
    'AI recruitment software',
  ],
  focus: 'AI handles the hiring workflow. Recruiters stay in control.',
  steps: [
    { n: '01', title: 'Add role details', body: 'Enter the role, location, budget, must-haves, and hiring timeline.' },
    { n: '02', title: 'Create the JD', body: 'HireSort drafts a clear job description and screening criteria.' },
    { n: '03', title: 'Post and source', body: 'Jobs are posted and candidates are sourced through agentic workflows.' },
    { n: '04', title: 'Screen resumes', body: 'Candidates are scored against the same role-specific criteria.' },
    { n: '05', title: 'Run phone screens', body: 'Qualified candidates are called for preliminary screening.' },
    { n: '06', title: 'Interview strong fits', body: 'Top candidates move to an AI first-round interview.' },
    { n: '07', title: 'Review shortlist', body: 'Your team receives structured notes, scores, and best-fit candidates.' },
  ],
  features: [
    { title: 'End-to-end agentic workflow', body: 'Move from role intake to shortlist without stitching together separate tools.' },
    { title: 'Recruiter-in-the-loop control', body: 'Review and approve AI agent work before candidates move forward.' },
    { title: 'Done-for-you option', body: 'Let HireSort recruiters run the platform and deliver best-fit shortlists.' },
    { title: 'Structured hiring data', body: 'Keep criteria, stages, TAT, notes, and assessments organized.' },
    { title: 'Faster shortlists', body: 'Reduce manual hiring effort by 50%-90% across repetitive recruiting work.' },
    { title: 'Clear candidate evidence', body: 'Show why candidates moved forward with resume and interview notes.' },
  ],
});

export const agenticSourcing = makeAgenticProduct({
  slug: 'agentic-sourcing',
  product: 'Agentic Sourcing',
  eyebrow: 'Agentic sourcing',
  titlePrefix: 'Agentic sourcing for ',
  titleAccent: 'qualified candidates.',
  description:
    'HireSort turns role details into job posts, sources candidates, and sends the right resumes into AI screening workflows.',
  keywords: [
    'agentic sourcing',
    'AI sourcing tools',
    'AI sourcing agent',
    'candidate sourcing software',
    'AI recruiting agents',
  ],
  focus: 'Post roles and source candidates with less manual work.',
  steps: [
    { n: '01', title: 'Enter the role', body: 'Add must-haves, location, compensation, and hiring volume.' },
    { n: '02', title: 'Create the JD', body: 'AI turns intake notes into a clean job description.' },
    { n: '03', title: 'Post jobs', body: 'HireSort helps publish roles and capture incoming applicants.' },
    { n: '04', title: 'Source candidates', body: 'Agentic workflows pull candidates into the role pipeline.' },
    { n: '05', title: 'Screen automatically', body: 'Resumes are scored before recruiters spend time reviewing.' },
  ],
  features: [
    { title: 'One-tap posting flow', body: 'Move from role intake to posted job without rewriting the same details.' },
    { title: 'Candidate sourcing pipeline', body: 'Bring candidates from job posts into a structured review process.' },
    { title: 'Screening-ready resumes', body: 'Every sourced resume feeds into AI resume screening and ranking.' },
    { title: 'Agency-friendly workflow', body: 'Handle multiple roles and client requirements with consistent intake.' },
    { title: 'High-volume ready', body: 'Prioritize candidates when a role receives many applications.' },
    { title: 'Reusable profiles', body: 'Keep candidates available for future roles and similar searches.' },
  ],
});

export const automatedScreeningAndInterviews = makeAgenticProduct({
  slug: 'automated-screening-and-interviews',
  product: 'Automated Screening and Interviews',
  eyebrow: 'Automated screening and interviews',
  titlePrefix: 'Automated screening and interviews for ',
  titleAccent: 'faster hiring.',
  description:
    'HireSort screens resumes, calls qualified candidates, runs first-round interviews, and prepares structured notes for recruiter review.',
  keywords: [
    'automated screening and interviews',
    'automated candidate screening',
    'AI interview software',
    'AI candidate screening software',
    'AI resume screening',
  ],
  focus: 'Screen resumes and interview strong candidates automatically.',
  steps: [
    { n: '01', title: 'Define criteria', body: 'Create consistent screening criteria from the role brief and JD.' },
    { n: '02', title: 'Rank resumes', body: 'AI resume screening ranks candidates and explains fit.' },
    { n: '03', title: 'Call qualified candidates', body: 'AI phone screening checks basics such as interest, fit, and availability.' },
    { n: '04', title: 'Interview top performers', body: 'Candidates who pass the phone screen move to a deeper first-round interview.' },
    { n: '05', title: 'Share notes', body: 'Recruiters receive summaries, scores, and shortlist recommendations.' },
  ],
  features: [
    { title: 'AI resume screening', body: 'Score every resume against the same criteria before interviews.' },
    { title: 'AI phone screening', body: 'Automate preliminary calls and capture structured candidate notes.' },
    { title: 'First-round interviews', body: 'Run deeper interviews for candidates who perform well in phone screens.' },
    { title: 'Consistent scorecards', body: 'Compare every candidate against the same role-specific bar.' },
    { title: 'Recruiter review', body: 'Keep humans in control of who moves forward.' },
    { title: 'Shortlist delivery', body: 'Give hiring managers clear summaries instead of raw resume piles.' },
  ],
});

export const aiPhoneScreening = makeAgenticProduct({
  slug: 'ai-phone-screening',
  product: 'AI Phone Screening',
  eyebrow: 'AI phone screening',
  titlePrefix: 'AI phone screening for ',
  titleAccent: 'qualified candidates.',
  description:
    'HireSort calls candidates who pass resume screening, asks preliminary questions, and turns calls into structured recruiter notes.',
  keywords: [
    'AI phone screening',
    'AI screening phone calls',
    'phone screening software',
    'automated phone screening',
    'candidate phone screening',
  ],
  focus: 'Call qualified candidates before recruiters spend hours on screens.',
  steps: [
    { n: '01', title: 'Start with resume fit', body: 'Only suitable candidates from resume screening move to phone screening.' },
    { n: '02', title: 'Ask key questions', body: 'The call checks fit, interest, location, notice period, and compensation alignment.' },
    { n: '03', title: 'Capture notes', body: 'Answers are converted into structured screening notes.' },
    { n: '04', title: 'Score the screen', body: 'Recruiters can see who performed well and why.' },
    { n: '05', title: 'Move strong fits', body: 'Candidates who pass can move to a deeper first-round interview.' },
  ],
  features: [
    { title: 'Preliminary screening calls', body: 'Handle first-pass calls without blocking recruiter calendars.' },
    { title: 'Structured call notes', body: 'Turn candidate answers into searchable notes.' },
    { title: 'Fit and availability checks', body: 'Confirm basics before deeper interviews.' },
    { title: 'Consistent questions', body: 'Ask each candidate the same core questions for a role.' },
    { title: 'Recruiter review', body: 'Let recruiters approve who advances after the call.' },
    { title: 'Faster turnaround', body: 'Move qualified candidates forward in hours or days, not weeks.' },
  ],
});

export const aiFirstRoundInterview = makeAgenticProduct({
  slug: 'ai-first-round-interview',
  product: 'AI First-Round Interview',
  eyebrow: 'AI first-round interview',
  titlePrefix: 'AI first-round interviews for ',
  titleAccent: 'shortlist-ready candidates.',
  description:
    'HireSort conducts deeper first-round interviews after resume and phone screening, then prepares structured assessments for recruiter review.',
  keywords: [
    'AI first round interview',
    'AI interview software',
    'agentic voice interview',
    'AI interviewing platform',
    'automated interview software',
  ],
  focus: 'Interview strong candidates with a consistent first-round process.',
  steps: [
    { n: '01', title: 'Select strong fits', body: 'Candidates move in after resume screening and phone screening.' },
    { n: '02', title: 'Run structured interviews', body: 'HireSort asks role-specific questions aligned to the screening criteria.' },
    { n: '03', title: 'Assess responses', body: 'Answers are summarized into strengths, gaps, and evaluation notes.' },
    { n: '04', title: 'Compare candidates', body: 'Recruiters can review interview performance using a consistent scorecard.' },
    { n: '05', title: 'Share shortlist', body: 'Best-fit candidates are prepared for hiring manager review.' },
  ],
  features: [
    { title: 'Role-specific questions', body: 'Interview questions are tied to the role and screening rubric.' },
    { title: 'Consistent first round', body: 'Each candidate is evaluated against the same expectations.' },
    { title: 'Interview notes', body: 'Capture summaries that are easy for recruiters and managers to review.' },
    { title: 'Assessment-ready output', body: 'Turn interviews into structured scores and decision support.' },
    { title: 'Human oversight', body: 'Recruiters decide who moves forward after reviewing the interview.' },
    { title: 'Shorter hiring cycles', body: 'Reduce repeated first-round interview effort for lean teams.' },
  ],
});
