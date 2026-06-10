import type { ToolDetail } from './types';

export const jobDescriptionGenerator: ToolDetail = {
  slug: 'job-description-generator',
  name: 'Job Description Generator',
  publishedAt: '2026-06-08',
  updatedAt: '2026-06-08',
  appHref: '/free-tools/jd-generator',

  meta: {
    title: 'Free AI Job Description Generator — Write a JD in Minutes',
    description:
      'Turn a role and a few details into a clear, structured job description — written by AI and streamed as you watch. Refine it, edit it, and download a PDF. Free, no signup.',
    keywords: [
      'job description generator',
      'ai job description writer',
      'jd generator',
      'free job description template',
      'build job description with ai',
      'write a job description',
    ],
  },

  hero: {
    eyebrow: 'Free tool',
    titlePrefix: 'Write a clear, structured',
    titleAccent: 'job description in minutes',
    lead: 'Give the generator a role title and a few specifics — seniority, must-have skills, team, and location — and it drafts a complete, well-structured job description you can publish or refine. Watch it stream, edit it, and download a PDF.',
    ctaLabel: 'Generate a job description',
  },

  intro: [
    'A blank page is the slowest part of opening a role. The free Job Description Generator gets you past it: describe the role in a few details and it writes a complete, well-organized JD — responsibilities, requirements, qualifications, and the right level of detail — in consistent structure and inclusive language every time.',
    'You stay in control. The draft streams as it’s written so you can steer it, edit any section, and download a clean PDF. And because it’s built for hiring, the JD maps cleanly to a screening rubric later — so the same role description carries through to how you evaluate candidates. Free, no signup.',
  ],

  howItWorks: {
    title: 'How the job description generator works',
    intro: 'From a role title to a publish-ready JD in three steps.',
    steps: [
      {
        title: 'Describe the role',
        body: 'Enter the title and a few specifics — seniority, must-have skills, team, and location.',
      },
      {
        title: 'Watch it draft',
        body: 'The generator streams a structured JD with consistent sections and inclusive language.',
      },
      {
        title: 'Edit and download',
        body: 'Refine any section, then download a clean PDF ready to post — or take it straight into a rubric.',
      },
    ],
  },

  features: {
    title: 'What you get',
    items: [
      {
        title: 'Role-aware, structured drafts',
        body: 'Sections and detail tuned to the role and seniority you describe — not a generic template.',
      },
      {
        title: 'Inclusive, consistent language',
        body: 'Consistent tone and inclusive phrasing across every posting, so your JDs read as one voice.',
      },
      {
        title: 'Editable and ready to post',
        body: 'Edit any section inline and download a polished PDF you can publish right away.',
      },
      {
        title: 'Pairs with screening rubrics',
        body: 'The JD maps cleanly to a weighted rubric, so the role description carries into how you screen.',
      },
    ],
  },

  whenToUse: {
    title: 'When to reach for it',
    items: [
      'You’re opening a new role and need a polished JD fast.',
      'You want consistent structure and tone across every job posting.',
      'You’re starting from a blank page and want a strong first draft.',
      'You need a JD that maps cleanly to a screening rubric later.',
    ],
  },

  faqs: [
    {
      question: 'Is the job description generator free?',
      answer: [
        'Yes. You can generate complete job descriptions for free, with no signup, and download them as a PDF.',
      ],
    },
    {
      question: 'Can I edit the generated job description?',
      answer: [
        'Yes. The draft streams as it’s written and every section is editable, so you can refine the wording and detail before you publish.',
      ],
    },
    {
      question: 'What details do I need to provide?',
      answer: [
        'Just the basics to start — a role title, seniority, key skills, team, and location. The more context you add, the more tailored the draft.',
      ],
    },
    {
      question: 'Can I turn the job description into a screening rubric?',
      answer: [
        'Yes. The JD is structured so it maps cleanly to HireSort’s Rubric Generator, letting you turn the role description into weighted screening criteria.',
      ],
    },
  ],

  related: [
    { label: 'Rubric Generator', href: '/free-tools/generate-rubric', note: 'Turn the JD into a weighted rubric' },
    { label: 'Resume Screening Tool', href: '/free-tools/resume-screening', note: 'Score a resume against the JD' },
    { label: 'Job description templates', href: '/resources/job-descriptions', note: 'Role-ready JDs to copy and customize' },
    { label: 'Interview questions by role', href: '/resources/interview-questions', note: 'Pair the JD with the right questions' },
    { label: 'Screening rubrics', href: '/resources/screening-rubrics', note: 'Turn the JD into weighted criteria' },
    { label: 'Recruitment software', href: '/product/recruitment-software', note: 'The full HireSort platform' },
    { label: 'Hiring blog', href: '/blog', note: 'Guides on writing better JDs' },
  ],
};
