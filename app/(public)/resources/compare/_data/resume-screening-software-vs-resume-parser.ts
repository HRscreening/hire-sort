import type { CompetitorPage } from './types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const resumeScreeningVsParser: CompetitorPage = {
  slug: 'resume-screening-software-vs-resume-parser',
  competitor: 'Resume Parser',
  publishedAt: '2026-05-10',
  updatedAt: '2026-05-19',

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
    primaryCta: { label: 'Get started for free', href: redirectURL },
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

  evidence: {
    eyebrow: 'Market context',
    title: 'Why Parsing and Screening Should Not Be Treated as the Same Job',
    intro:
      'Resume parsing is an important infrastructure layer, but it is not the same as candidate evaluation. A parser helps software understand what is inside a resume. Screening software helps hiring teams decide whether that resume matches the role.',
    items: [
      {
        title: 'Resume parsers turn resume text into structured data',
        body:
          'Textkernel describes parsing as extracting, classifying, and enriching data from resumes and job postings. That is valuable for searchable candidate records, but it does not by itself answer whether a candidate should move forward.',
        href: 'https://www.textkernel.com/products-solutions/parser/',
        label: 'Textkernel resume parser',
      },
      {
        title: 'Parsers often feed ATS, CRM, and hiring workflows',
        body:
          'Daxtra positions resume parsing as a way to convert resumes and jobs into structured data for ATS, CRM, job board, or other workflow integrations. In other words, parsing prepares the data layer; screening still needs role-specific evaluation.',
        href: 'https://www.daxtra.com/products/resume-parsing-software/',
        label: 'Daxtra resume parsing software',
      },
      {
        title: 'Parsing can enrich candidate records at scale',
        body:
          'RChilli describes its parser as identifying and enriching resume data using skills and job-profile taxonomies. That can make candidate databases easier to search, but hiring teams still need scoring criteria and shortlist reasoning.',
        href: 'https://docs.rchilli.com/kc/internal/c_RChilli_resume_parser',
        label: 'RChilli resume parser documentation',
      },
      {
        title: 'Screening decisions need oversight and clear criteria',
        body:
          'The EEOC explains that employment tests and selection procedures should be understood for their effectiveness, limitations, job relevance, and administration. That is why screening software should make criteria visible instead of treating extracted resume fields as the final decision.',
        href: 'https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures',
        label: 'EEOC selection procedure guidance',
      },
    ],
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
    primary: { label: 'Get started for free', href: redirectURL },
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
    { href: '/product/resume-parser', label: 'Resume Parser' },
    { href: '/product/resume-management', label: 'Resume Management Software' },
    { href: '/product/recruitment-software', label: 'AI Recruitment Software' },
    { href: '/product/applicant-tracking-system', label: 'AI Applicant Tracking System' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline Software' },
    { href: '/resources/compare/hiresort-vs-manual-screening', label: 'HireSort vs Manual Screening' },
    { href: '/resources/compare/hiresort-vs-spreadsheets', label: 'HireSort vs Spreadsheets' },
    { href: '/resources/compare/ai-resume-screening-vs-ats', label: 'AI Resume Screening vs ATS' },
    { href: '/resources/best/candidate-screening-software', label: 'Best Candidate Screening Software' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/resources/best/ai-resume-screening-software', label: 'Best AI Resume Screening Software' },
    { href: '/blog/resume-screening-checklist', label: 'Resume Screening Checklist' },
    { href: '/blog/how-to-shortlist-candidates-faster', label: 'How to Shortlist Candidates Faster' },
    { href: '/blog/ai-resume-screening-tool', label: 'AI Resume Screening Tool' },
  ],

  externalReferences: [
    {
      href: 'https://www.textkernel.com/products-solutions/parser/',
      label: 'Textkernel resume parser',
      description: 'Reference for resume and job parsing as structured data extraction.',
    },
    {
      href: 'https://www.daxtra.com/products/resume-parsing-software/',
      label: 'Daxtra resume parsing software',
      description: 'Reference for parser integrations into ATS, CRM, job board, and workflow systems.',
    },
    {
      href: 'https://docs.rchilli.com/kc/internal/c_RChilli_resume_parser',
      label: 'RChilli resume parser documentation',
      description: 'Reference for resume data identification, enrichment, skills, and job-profile taxonomies.',
    },
    {
      href: 'https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures',
      label: 'EEOC selection procedure guidance',
      description: 'Guidance on selection procedures, limitations, job relevance, and administration.',
    },
  ],

  disclaimer:
    "This comparison page is for informational purposes only and reflects HireSort's own product positioning. Feature availability across resume parser and screening tools may change over time.",
};
