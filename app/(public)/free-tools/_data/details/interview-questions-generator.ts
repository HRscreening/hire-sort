import type { ToolDetail } from './types';

export const interviewQuestionsGenerator: ToolDetail = {
  slug: 'interview-questions-generator',
  name: 'Interview Questions Generator',
  publishedAt: '2026-07-18',
  updatedAt: '2026-07-18',
  appHref: '/free-tools/interview-kit',

  meta: {
    title:
      'Free AI Interview Questions Generator — Structured Questions & Scorecards - HireSort',
    description:
      'Generate role-specific interview questions, screening questions, scorecards, and answer signals from any job description. Free, editable, and no signup.',
    keywords: [
      'interview questions generator',
      'AI interview questions generator',
      'screening questions generator',
      'interview scorecard generator',
      'candidate interview questions',
      'role-specific interview questions',
      'structured interview questions',
      'interview questions for recruiters',
      'hiring manager interview questions',
    ],
  },

  hero: {
    eyebrow: 'Free tool',
    titlePrefix: 'Generate structured',
    titleAccent: 'interview questions',
    titleSuffix: 'from any job description',
    lead: 'Paste a job description or describe the role. HireSort generates a structured interview kit with screening questions, role-specific interview questions, scoring criteria, strong answer signals, weak answer signals, and red flags — ready to share with your hiring team.',
    ctaLabel: 'Generate interview questions',
  },

  intro: [
    'Hiring teams often know who they want to interview, but not how to interview them consistently. Generic question lists miss the role context, and unstructured interviews make candidates hard to compare.',
    'HireSort\'s free Interview Questions Generator reads the job description, extracts the role requirements, and turns them into a structured interview plan. You get questions, scoring guidance, and answer signals that connect back to the same criteria used for resume screening and rubrics.',
    'Free, no signup, and designed to fit into the rest of your hiring workflow.',
  ],

  howItWorks: {
    title: 'How the interview questions generator works',
    intro:
      'From a job description to a structured interview kit in seconds.',
    steps: [
      {
        title: 'Paste the job description',
        body: 'Add the role title and paste the JD or describe the role, responsibilities, and requirements. Optionally set seniority, interview type, and question count.',
      },
      {
        title: 'Get a structured interview kit',
        body: 'The generator builds screening questions, role-specific interview questions grouped by competency, answer signals, a weighted scorecard, red flags to probe, and a recommended interview flow.',
      },
      {
        title: 'Edit, copy, or download',
        body: 'Review the generated kit, copy it to your clipboard, or download a PDF. Share it with your hiring team so every interviewer asks the same questions against the same bar.',
      },
    ],
  },

  features: {
    title: 'What you get',
    items: [
      {
        title: 'Role-specific interview questions',
        body: 'Questions derived from the actual job description and grouped by competency — not generic lists copied from the internet.',
      },
      {
        title: 'Answer scoring signals',
        body: 'Each question includes strong, average, and weak answer signals so interviewers know what good looks like before the conversation starts.',
      },
      {
        title: 'Weighted scorecard',
        body: 'A ready-to-use scorecard with criteria, weights, and 1–5 scoring guidance so every interviewer evaluates candidates against the same bar.',
      },
      {
        title: 'Screening questions & red flags',
        body: 'Concise screening questions for recruiter calls, plus red flags framed as areas to probe — not automatic rejection reasons.',
      },
    ],
  },

  whenToUse: {
    title: 'When to reach for it',
    items: [
      'You need structured interview questions for a specific role and don\'t want to start from scratch.',
      'You want every interviewer asking the same questions against the same scoring criteria.',
      'You\'re preparing for a recruiter screen and need quick, role-specific screening questions.',
      'You need a scorecard to make candidate comparisons fair and defensible.',
      'You\'re a founder or hiring manager running interviews without a dedicated recruiter.',
      'You already generated a JD or rubric and need interview questions as the next step.',
    ],
  },

  faqs: [
    {
      question: 'Is the interview questions generator free?',
      answer: [
        'Yes. You can generate a structured interview kit from any job description for free, with no signup required. There is a daily generation limit for anonymous users.',
      ],
    },
    {
      question: 'Can I generate questions from a job description?',
      answer: [
        'Absolutely. Paste a full job description or describe the role in your own words. The generator extracts the requirements, responsibilities, and skills and turns them into targeted interview questions.',
      ],
    },
    {
      question: 'Does it include answer scoring guidance?',
      answer: [
        'Yes. Every interview question comes with strong, average, and weak answer signals, plus a follow-up probe. The scorecard section adds weighted criteria with 1–5 scoring bands.',
      ],
    },
    {
      question: 'Can I use it for screening calls?',
      answer: [
        'Yes. The generated kit includes a separate section of concise screening questions designed for recruiter phone screens, each with intent and pass/fail signal guidance.',
      ],
    },
    {
      question: 'Does it avoid illegal interview questions?',
      answer: [
        'Yes. The generator is designed to avoid questions about protected characteristics including age, marital status, religion, disability, pregnancy, and other protected attributes. It also flags biased requirements from the input and generates compliant alternatives.',
      ],
    },
    {
      question: 'Can I turn the questions into a scorecard?',
      answer: [
        'The generated kit already includes a weighted scorecard with criteria, weights, and scoring guidance. You can also take the job description into HireSort\'s Rubric Generator for a full screening rubric.',
      ],
    },
  ],

  related: [
    {
      label: 'Job Description Generator',
      href: '/free-tools/job-description-generator',
      note: 'Draft a structured JD with AI',
    },
    {
      label: 'Rubric Generator',
      href: '/free-tools/generate-rubric',
      note: 'Turn a JD into a weighted screening rubric',
    },
    {
      label: 'Resume Screening Tool',
      href: '/free-tools/resume-screening',
      note: 'Score a resume against any JD',
    },
    {
      label: 'Interview questions by role',
      href: '/resources/interview-questions',
      note: 'Role-specific question banks',
    },
    {
      label: 'Interview scorecard templates',
      href: '/resources/scorecards',
      note: 'Turn notes into comparable signals',
    },
    {
      label: 'Screening rubric templates',
      href: '/resources/screening-rubrics',
      note: 'By role, ready to copy',
    },
    {
      label: 'Resume screening checklist',
      href: '/blog/resume-screening-checklist',
      note: 'What to look for, step by step',
    },
    {
      label: 'Recruitment software',
      href: '/product/recruitment-software',
      note: 'The full HireSort platform',
    },
  ],
};
