import type { ToolDetail } from './types';

export const resumeScreening: ToolDetail = {
  slug: 'resume-screening',
  name: 'Resume Screening Tool',
  publishedAt: '2026-06-08',
  updatedAt: '2026-06-08',
  appHref: '/free-tools/screening',

  meta: {
    title: 'Free Resume Screening Tool — Score a Resume Against Any JD',
    description:
      'Screen a resume against any job description and get an explainable, rubric-based fit score in seconds. Free, no signup — with the reasoning shown behind every point.',
    keywords: [
      'free resume screening tool',
      'ai resume screener',
      'resume scoring tool',
      'resume vs job description checker',
      'screen resume online',
      'resume match score',
    ],
  },

  hero: {
    eyebrow: 'Free tool',
    titlePrefix: 'Screen any resume against a JD,',
    titleAccent: 'with reasons you can read',
    lead: 'Paste or upload a job description and a resume. HireSort builds a screening rubric on the fly and grades the resume against it — an overall fit score, a criterion-by-criterion breakdown, and a plain-English explanation for every point.',
    ctaLabel: 'Screen a resume',
  },

  intro: [
    'Most resume screening is either a slow manual read or an opaque keyword filter that throws away good candidates for the wrong reasons. HireSort’s free resume screening tool does neither. It reads the job description, derives the criteria that actually matter for the role, and scores the resume against each one — then shows you exactly why it landed on that score.',
    'There is no black box and no signup. You get the same explainable engine that powers the full HireSort platform, available free for a single resume so you can see how AI screening reasons before you roll it out to your team.',
  ],

  howItWorks: {
    title: 'How the resume screener works',
    intro: 'Three steps, a few seconds, and a result you can defend.',
    steps: [
      {
        title: 'Add the job description',
        body: 'Paste the JD text or upload a PDF/DOCX. The tool extracts the must-have requirements and the criteria worth weighting.',
      },
      {
        title: 'Add the resume',
        body: 'Upload the candidate’s resume as a PDF or DOCX. HireSort parses it into structured experience, skills, and education.',
      },
      {
        title: 'Read the scored breakdown',
        body: 'Get an overall fit score plus a criterion-by-criterion view, each with a plain-English reason and the evidence it was drawn from.',
      },
    ],
  },

  features: {
    title: 'What you get',
    items: [
      {
        title: 'Auto-generated rubric',
        body: 'A weighted set of criteria derived from the JD — no need to write one yourself before you can score.',
      },
      {
        title: 'Explainable, criterion-level scoring',
        body: 'Every point traces back to a specific requirement and a specific line in the resume. Nothing is hidden.',
      },
      {
        title: 'Works with PDF and DOCX',
        body: 'Upload resumes and job descriptions in the formats you already have. No reformatting required.',
      },
      {
        title: 'No signup required',
        body: 'Run a full screen for free, instantly, without creating an account.',
      },
    ],
  },

  whenToUse: {
    title: 'When to reach for it',
    items: [
      'You have a single resume and want a fast, structured read before an interview.',
      'You want to see how AI screening scores a candidate before rolling it out to your team.',
      'You need an objective second opinion to sanity-check a gut-feel shortlist decision.',
      'You’re hiring solo and don’t have a recruiter or ATS to lean on.',
    ],
  },

  faqs: [
    {
      question: 'Is the resume screening tool really free?',
      answer: [
        'Yes. You can screen a resume against a job description for free, with no signup and no credit card. It runs the same explainable scoring engine that powers the full HireSort platform.',
      ],
    },
    {
      question: 'What file formats can I upload?',
      answer: [
        'Both the resume and the job description can be uploaded as PDF or DOCX. You can also paste the job description as plain text.',
      ],
    },
    {
      question: 'How is the fit score calculated?',
      answer: [
        'The tool builds a weighted rubric from the job description, scores the resume against each criterion, and combines those into an overall fit score. Every criterion shows the reasoning and the evidence behind its score, so the number is never a black box.',
      ],
    },
    {
      question: 'Does it just match keywords?',
      answer: [
        'No. Unlike keyword filters, it evaluates how well the candidate’s actual experience meets each requirement and explains its reasoning, so strong candidates aren’t dropped for missing an exact phrase.',
      ],
    },
  ],

  related: [
    { label: 'Rubric Generator', href: '/free-tools/generate-rubric', note: 'Turn a JD into a weighted screening rubric' },
    { label: 'Job Description Generator', href: '/free-tools/job-description-generator', note: 'Draft a structured JD with AI' },
    { label: 'Resume screening rubrics', href: '/resources/screening-rubrics', note: 'Ready-made weighted criteria by role' },
    { label: 'Resume screening checklist', href: '/blog/resume-screening-checklist', note: 'What to look for, step by step' },
    { label: 'AI resume screening tool guide', href: '/blog/ai-resume-screening-tool', note: 'How AI screening actually works' },
    { label: 'Best AI resume screening software', href: '/resources/best/ai-resume-screening-software', note: 'Compare the top tools' },
    { label: 'Resume parser', href: '/product/resume-parser', note: 'Extract structured data from resumes' },
  ],
};
