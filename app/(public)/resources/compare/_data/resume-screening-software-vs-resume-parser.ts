import type { CompetitorPage } from './types';

export const resumeScreeningVsParser: CompetitorPage = {
  slug: 'resume-screening-software-vs-resume-parser',
  competitor: 'Resume Parser',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-10',

  meta: {
    title: 'Resume Screening Software vs Resume Parser | HireSort',
    description:
      'Learn the difference between resume parser tools and resume screening software. See when to use parsing, scoring, ranking and AI shortlisting.',
    keywords: [
      'resume screening software vs resume parser',
      'resume parser vs resume screening',
      'AI resume screening software',
      'resume parsing software',
      'candidate ranking software',
      'resume scoring software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'Resume screening software vs resume parser',
  },

  hero: {
    eyebrow: 'Parser vs screening software',
    titlePrefix: 'A resume parser extracts data. ',
    titleAccent: 'Screening software evaluates candidates.',
    lead: [
      'Resume parsers and resume screening tools are often confused, but they solve different problems.',
      'A resume parser turns an unstructured resume into structured fields. Resume screening software uses those fields, resume text and job requirements to evaluate candidate fit.',
    ],
    primaryCta: { label: 'Get started for free', href: '/pricing' },
    secondaryCta: { label: 'Compare features', href: '#feature-compare' },
    supporting:
      'HireSort uses parsing as one part of a larger screening workflow that scores and ranks candidates against the role.',
  },

  quickCompare: {
    heading: 'Parser vs screening software at a glance',
    rows: [
      { area: 'Extract candidate data', competitor: 'Yes', hiresort: 'Yes' },
      { area: 'Parse PDF/DOCX resumes', competitor: 'Yes', hiresort: 'Yes' },
      { area: 'Evaluate role fit', competitor: 'No', hiresort: 'Yes' },
      { area: 'Generate scoring rubric', competitor: 'No', hiresort: 'Yes, from the JD workflow' },
      { area: 'Rank candidates', competitor: 'No', hiresort: 'Yes' },
      { area: 'Provide score explanations', competitor: 'No', hiresort: 'Evidence-backed scoring and summaries' },
      { area: 'Track candidate stages', competitor: 'No', hiresort: 'Lightweight stage tracking' },
      { area: 'Best fit', competitor: 'Data extraction', hiresort: 'Screening plus candidate management' },
    ],
  },

  positioning: {
    eyebrow: 'What each one does',
    title: 'Different jobs in the resume workflow',
    body: [
      'A resume parser extracts candidate name, email and phone number; identifies skills, education, experience and current role; converts PDF or DOCX resumes into structured data; helps teams store and search resume information; and feeds data into ATS, CRM or hiring workflows.',
      'Resume screening software reads the job description and role requirements; creates or applies a screening rubric; scores candidates against the role; ranks candidates into a shortlist; and explains strengths, gaps and evidence behind each score.',
    ],
    closing:
      'HireSort uses resume parsing as one part of a larger screening workflow. It extracts key candidate information, then evaluates resumes against a job-specific rubric and creates ranked shortlists.',
  },

  featureCompare: {
    heading: 'Capability comparison: Parser vs Screening vs HireSort',
    rows: [
      { need: 'Extract candidate data', competitor: 'Yes', hiresort: 'Yes' },
      { need: 'Parse PDF/DOCX resumes', competitor: 'Yes', hiresort: 'Yes' },
      { need: 'Evaluate role fit', competitor: 'No', hiresort: 'Yes' },
      { need: 'Generate scoring rubric', competitor: 'No', hiresort: 'Yes, from the JD workflow' },
      { need: 'Rank candidates', competitor: 'No', hiresort: 'Yes' },
      { need: 'Provide score explanations', competitor: 'No', hiresort: 'Evidence-backed scoring and summaries' },
      { need: 'Track candidate stages', competitor: 'No', hiresort: 'Lightweight stage tracking' },
    ],
  },

  chooseHiresort: {
    title: 'When you need resume screening software',
    bullets: [
      'You need to compare candidates against a job description',
      'You want to rank candidates by fit',
      'You need evidence-backed shortlists for hiring managers',
      'You want to reduce manual first-pass screening',
      'You need a reusable candidate repository and stage tracking',
    ],
    suitableForTitle: 'When a resume parser is enough',
    suitableFor: [
      'You only need to extract structured data from resumes',
      'You already have a complete ATS or screening workflow',
      'You are building an internal HR system that needs resume ingestion',
      'You do not need candidate ranking or evaluation',
    ],
  },

  chooseCompetitor: {
    title: 'A resume parser may be the right tool if',
    bullets: [
      'You only need structured candidate fields, not evaluation',
      'You already have a screening or ranking layer in place',
      'You are powering an internal HR or CRM system that needs resume ingestion',
      'You do not need shortlists, scoring rubrics, or evidence',
    ],
    closing:
      'Parsing tells you what is inside a resume. Screening helps you decide what to do with it. For most hiring teams, the screening step is where the real time savings happen.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Go beyond resume parsing',
    body: 'Use HireSort to parse resumes, screen candidates, create ranked shortlists and manage candidate stages in one workflow.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'is-parser',
      question: 'Is HireSort a resume parser?',
      answer: [
        'HireSort includes resume parsing capabilities, but it is not only a parser. It also supports AI screening, candidate scoring, ranked shortlists and candidate tracking.',
      ],
    },
    {
      id: 'parser-rank',
      question: 'Can a parser rank candidates?',
      answer: [
        'A parser alone usually extracts information but does not evaluate candidate fit. Ranking requires a screening layer that understands the role requirements.',
      ],
    },
    {
      id: 'need-both',
      question: 'Do I need both parsing and screening?',
      answer: [
        'Most recruiting teams do. Parsing structures the resume. Screening evaluates and prioritizes the candidate.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/pricing', label: 'Pricing' },
  ],

  disclaimer:
    'This comparison page is for informational purposes only and reflects HireSort’s own product positioning. Feature availability across resume parser and screening tools may change over time.',
};
