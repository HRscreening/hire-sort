import type { ToolDetail } from './types';

export const generateRubric: ToolDetail = {
  slug: 'generate-rubric',
  name: 'Rubric Generator',
  publishedAt: '2026-06-08',
  updatedAt: '2026-06-08',
  appHref: '/free-tools/rubric-generator',

  meta: {
    title: 'Free AI Screening Rubric Generator — JD to Weighted Rubric',
    description:
      'Turn any job description into a weighted, ready-to-score screening rubric — must-have requirements, weighted criteria, and clear scoring bands. Paste or upload a JD, edit the rubric, and reuse it. Free, no signup.',
    keywords: [
      'rubric generator',
      'screening rubric template',
      'hiring rubric maker',
      'candidate scoring rubric',
      'job description to rubric',
      'weighted scoring rubric',
    ],
  },

  hero: {
    eyebrow: 'Free tool',
    titlePrefix: 'Turn a job description into a',
    titleAccent: 'weighted screening rubric',
    lead: 'Drop in a job description and the Rubric Generator drafts a structured screening rubric — must-have requirements, weighted criteria, and clear scoring bands — so every resume and every interviewer is judged against the same bar.',
    ctaLabel: 'Generate a rubric',
  },

  intro: [
    'A good screening rubric is the difference between structured hiring and gut feel. But writing one from scratch for every role is tedious, and inconsistent rubrics make candidates impossible to compare fairly. The Rubric Generator removes that friction: paste a job description and get a complete, weighted rubric you can edit, export, and reuse across the whole pipeline.',
    'Each rubric separates must-have requirements from nice-to-haves, assigns weights to the criteria that matter most, and defines clear scoring bands so two reviewers reach the same conclusion from the same evidence. It’s an audit-friendly, explainable basis for every screening decision — free, with no signup.',
  ],

  howItWorks: {
    title: 'How the rubric generator works',
    intro: 'From a job description to a defensible scoring framework in seconds.',
    steps: [
      {
        title: 'Add the job description',
        body: 'Paste the JD or upload a PDF/DOCX. The generator reads the responsibilities, requirements, and qualifications.',
      },
      {
        title: 'Get a weighted rubric',
        body: 'It drafts role-specific criteria, flags must-haves vs. nice-to-haves, and assigns weights and scoring bands.',
      },
      {
        title: 'Edit, export, and reuse',
        body: 'Tune the weights and wording to your bar, then reuse the rubric for every candidate on the role.',
      },
    ],
  },

  features: {
    title: 'What you get',
    items: [
      {
        title: 'Weighted, role-specific criteria',
        body: 'Criteria derived from the actual JD, with weights that reflect what matters most for the role.',
      },
      {
        title: 'Must-have vs. nice-to-have flags',
        body: 'Clear separation of hard requirements from preferences, so dealbreakers are never buried.',
      },
      {
        title: 'Clear scoring bands',
        body: 'Defined bands keep reviewers calibrated and make scores comparable across candidates.',
      },
      {
        title: 'Editable and reusable',
        body: 'Adjust anything, then reuse the same rubric across the whole pipeline for consistent decisions.',
      },
    ],
  },

  whenToUse: {
    title: 'When to reach for it',
    items: [
      'You’re standing up a structured hiring process and need a defensible scoring framework.',
      'You want every reviewer evaluating candidates against the same weighted criteria.',
      'You’re tired of writing rubrics from scratch for each new role.',
      'You need an audit-friendly, explainable basis for screening decisions.',
    ],
  },

  faqs: [
    {
      question: 'What is a screening rubric?',
      answer: [
        'A screening rubric is a structured set of weighted criteria used to evaluate candidates consistently. It defines what to look for, how much each factor matters, and how to score it — so every candidate is judged against the same bar.',
      ],
    },
    {
      question: 'Is the rubric generator free?',
      answer: [
        'Yes. You can generate a weighted screening rubric from any job description for free, with no signup required.',
      ],
    },
    {
      question: 'Can I edit the generated rubric?',
      answer: [
        'Absolutely. The draft is a starting point — adjust the criteria, weights, must-have flags, and scoring bands to match your team’s bar, then reuse it across the role.',
      ],
    },
    {
      question: 'How does the rubric connect to screening?',
      answer: [
        'The same rubric drives HireSort’s resume screening, so candidates are scored against the exact criteria you defined. You can take a generated rubric straight into the screening tool.',
      ],
    },
  ],

  related: [
    { label: 'Resume Screening Tool', href: '/free-tools/resume-screening', note: 'Score a resume against any JD' },
    { label: 'Job Description Generator', href: '/free-tools/job-description-generator', note: 'Draft a structured JD with AI' },
    { label: 'Screening rubric templates', href: '/resources/screening-rubrics', note: 'By role, ready to copy' },
    { label: 'Interview scorecards', href: '/resources/scorecards', note: 'Turn notes into comparable signals' },
    { label: 'Rubric template guide', href: '/blog/resume-screening-rubric-template', note: 'How to build one that holds up' },
    { label: 'Candidate scorecard template', href: '/blog/candidate-scorecard-template', note: 'Structured interview evaluation' },
    { label: 'Interview questions by role', href: '/resources/interview-questions', note: 'Pair criteria with the right questions' },
  ],
};
