import type { ProductPage } from '../_lib/types';

export const resumeParser: ProductPage = {
  slug: 'resume-parser',
  product: 'Resume Parser',
  heroIcon: 'fileScan',
  publishedAt: '2026-05-03',
  updatedAt: '2026-05-03',

  meta: {
    title: 'Resume Parser for Recruiters & Hiring Teams | HireSort',
    description:
      'HireSort resume parser extracts candidate details from PDF and DOCX resumes, turns resumes into structured profiles, and connects parsing directly to AI screening, shortlists, and candidate tracking.',
    keywords: [
      'resume parser',
      'resume parsing software',
      'AI resume parser',
      'resume parser for recruiters',
      'CV parser',
      'resume data extraction',
      'recruitment resume parser',
      'candidate profile extraction',
      'resume screening software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — AI Resume Parser',
  },

  hero: {
    eyebrow: 'Resume parser',
    titlePrefix: 'Resume parser built for ',
    titleAccent: 'hiring workflows.',
    lead: [
      'HireSort turns uploaded resumes into structured candidate profiles, so recruiters can stop manually copying names, emails, skills, experience, and role details into spreadsheets.',
      'Upload PDF or DOCX resumes, extract key candidate information, store profiles in a reusable candidate workspace, and move directly from parsing to AI-powered screening and ranked shortlists.',
    ],
    primary: { label: 'Parse resumes for free', href: 'https://app.hiresort.ai/login' },
    secondary: { label: 'See how it works', href: '#how-it-works' },
    supporting:
      'A resume parser for recruiters and growing teams that need clean candidate data, faster first-pass review, and less manual resume handling.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Manual resume data entry slows down hiring.',
      intro:
        'Recruiters should not have to open every resume just to find basic information. But in many hiring teams, resume review still starts with repetitive manual work: downloading files, opening PDFs, copying candidate details, scanning for skills, and updating spreadsheets.',
      bullets: [
        'Candidate details are copied manually and inconsistently',
        'Resumes are difficult to search once they are uploaded',
        'Recruiters spend time on data entry instead of candidate evaluation',
        'PDF and DOCX files remain trapped as unstructured documents',
        'Strong candidates are hard to rediscover for future roles',
        'Screening and shortlisting become slower because candidate data is not organized',
      ],
      closing:
        'HireSort solves this by converting resumes into structured candidate records that can be searched, screened, ranked, and reused.',
    },
    {
      type: 'paragraph',
      eyebrow: 'Positioning',
      title: 'Not just parsing. Parsing connected to screening.',
      body: [
        'Many resume parsers stop after extracting text or candidate fields. HireSort goes further by connecting parsing directly to the hiring workflow.',
      ],
    },
    {
      type: 'comparison',
      title: 'Hiring Workflow Integration',
      columns: ['Step', 'What happens'],
      rows: [
        ['1. Upload resumes', 'Recruiters upload PDF or DOCX resumes.'],
        ['2. Parse candidate data', 'HireSort extracts text, metadata, and candidate details.'],
        ['3. Store candidate records', 'Parsed resumes become structured candidate profiles in a central workspace.'],
        ['4. Screen against a JD', 'Candidates can be evaluated against a job-specific rubric.'],
        ['5. Review ranked results', 'Recruiters see scores, strengths, missing elements, and evidence.'],
        ['6. Reuse for future roles', 'Candidate records can be mapped to new roles and screened again.'],
      ],
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From upload to structured data.',
      steps: [
        {
          n: '01',
          title: 'Upload resumes in bulk',
          body: 'Upload resumes in PDF or DOCX format. HireSort is designed for recruiter workflows where multiple resumes need to be processed together.',
        },
        {
          n: '02',
          title: 'Extract resume text',
          body: 'HireSort extracts text from resumes so candidate information can be used for search, screening, scoring, and analysis.',
        },
        {
          n: '03',
          title: 'Capture candidate details',
          body: 'The parser helps identify candidate information such as name, email, phone number, current job title, role, company, skills, and experience.',
        },
        {
          n: '04',
          title: 'Handle different formats',
          body: 'The parsing workflow is designed around common recruiting file formats such as PDF and DOCX. For scanned PDFs, OCR fallback is supported.',
        },
        {
          n: '05',
          title: 'Store structured metadata',
          body: 'Parsed resumes can store useful metadata such as page count, character count, extraction method, and parsed text status.',
        },
        {
          n: '06',
          title: 'Move into AI screening',
          body: 'Once the resume is parsed, HireSort can score the candidate against the job-specific rubric and generate a ranked shortlist.',
        },
        {
          n: '07',
          title: 'Reuse the candidate profile',
          body: 'Parsed candidate records can become part of a reusable resume repository, so recruiters can consider the same person for future roles.',
        },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Features',
      title: 'Resume parsing features built for recruiters.',
      items: [
        {
          icon: 'fileText',
          title: 'PDF and DOCX parsing',
          body: 'Extract resume text and candidate details from the file types recruiters commonly receive.',
        },
        {
          icon: 'fileScan',
          title: 'OCR fallback',
          body: 'Support scanned PDFs where text extraction is not straightforward.',
        },
        {
          icon: 'userSearch',
          title: 'Candidate extraction',
          body: 'Capture candidate name, email, phone number, current job title, company, skills, and experience signals.',
        },
        {
          icon: 'layers',
          title: 'Structured metadata',
          body: 'Store parsed text, page count, character count, extraction method, and processing status.',
        },
        {
          icon: 'database',
          title: 'Central candidate records',
          body: 'Turn parsed resumes into reusable candidate profiles instead of one-time files.',
        },
        {
          icon: 'search',
          title: 'Search-ready data',
          body: 'Make resumes easier to search by candidate name, role, skills, stage, score, or date added.',
        },
        {
          icon: 'sparkles',
          title: 'Screening-ready outputs',
          body: 'Use parsed resume data as the foundation for AI scoring, ranked shortlists, and candidate analysis.',
        },
        {
          icon: 'fileSearch',
          title: 'Candidate detail view',
          body: 'Review resume file access, parsed metadata, role association, latest score, and candidate stage in one place.',
        },
        {
          icon: 'refreshCcw',
          title: 'Reusable repository',
          body: 'Keep past resumes available for future screening instead of losing them inside old job folders.',
        },
      ],
    },
    {
      type: 'fieldList',
      eyebrow: 'Data Extraction',
      title: 'What HireSort can extract from resumes.',
      intro:
        'HireSort’s resume parser is designed to convert unstructured resume files into structured candidate information that recruiters can actually use.',
      cardLabel: 'Extracted Fields',
      cardIcon: 'fileSearch',
      fields: [
        'Candidate name',
        'Email address',
        'Phone number',
        'Current job title or current role',
        'Current company',
        'Key skills',
        'Years of experience',
        'Resume text',
        'Resume file metadata',
        'Role or JD association',
        'Latest screening score',
        'Current hiring stage',
      ],
      closing: 'This makes candidate data easier to search, filter, compare, and reuse across roles.',
    },
    {
      type: 'paragraph',
      eyebrow: 'AI Screening',
      title: 'From parsed resume to ranked shortlist.',
      body: [
        'Parsing alone does not tell you who to interview. HireSort connects parsing with AI resume screening, so candidate data can be evaluated against the actual job requirements.',
        'The workflow is simple:',
        '• Create a job and generate a role-specific scoring rubric',
        '• Upload resumes in bulk',
        '• Parse candidate details and resume text',
        '• Score candidates against the rubric',
        '• Review ranked shortlists with evidence and explanations',
        '• Move qualified candidates into the next hiring stage',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Resume Repository',
      title: 'Build a reusable resume database.',
      body: [
        'Every parsed resume can become part of a central candidate repository. Instead of treating every upload as a one-time screening event, HireSort helps teams build a reusable candidate workspace.',
        'Recruiters can use this repository to:',
        '• View all uploaded resumes in one place',
        '• Search resumes by candidate name',
        '• Filter candidates by role or JD',
        '• Filter candidates by stage, score range, or date added',
        '• Open a candidate detail view',
        '• Attach or map a resume to a job role for screening',
        '• Reuse an existing resume in a new screening workflow',
      ],
    },
    {
      type: 'why',
      eyebrow: 'Repository Features',
      title: 'Centralize your hiring intelligence.',
      items: [
        { title: 'View all resumes', body: 'See every uploaded resume in one central workspace.' },
        { title: 'Search by name', body: 'Quickly find candidates by name across the entire repository.' },
        { title: 'Filter by role', body: 'Group candidates by the job title or description they were originally uploaded for.' },
        { title: 'Filter by outcomes', body: 'Sort by stage, score range, or date added to find the right profile at the right time.' },
        { title: 'Detail view access', body: 'Open a complete candidate profile with resume preview and history.' },
        { title: 'Screening reuse', body: 'Attach or map an existing resume to a new job role for fresh screening workflows.' },
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Use cases',
      title: 'Who should use HireSort Resume Parser?',
      items: [
        {
          icon: 'building',
          title: 'Startup recruiters',
          body: 'Parse and organize resumes faster when hiring across multiple open roles.',
        },
        {
          icon: 'rocket',
          title: 'Founders',
          body: 'Avoid spreadsheet-heavy resume tracking while hiring the first few team members.',
        },
        {
          icon: 'clipboardCheck',
          title: 'Hiring managers',
          body: 'Review structured candidate profiles instead of manually scanning raw resumes.',
        },
        {
          icon: 'handCoins',
          title: 'Recruitment agencies',
          body: 'Process large resume batches, extract candidate details, and reuse strong profiles across client roles.',
        },
        {
          icon: 'workflow',
          title: 'Recruiting operations',
          body: 'Create cleaner candidate data that can support screening, reporting, and workflow improvements.',
        },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison 1',
      title: 'HireSort Resume Parser vs manual resume review.',
      columns: ['Capability', 'Manual resume review', 'HireSort Resume Parser'],
      rows: [
        ['Extract details', 'Manual copy-paste', 'Structured extraction from resume files'],
        ['Handle files', 'Opened one by one', 'Designed for PDF and DOCX workflows'],
        ['Scanned support', 'Requires manual reading', 'OCR fallback available'],
        ['Search data', 'Difficult unless entered', 'Parsed data can be searched and filtered'],
        ['Screening', 'Separate manual step', 'Feeds directly into AI screening'],
        ['Candidate reuse', 'Often lost in folders', 'Stored in reusable candidate records'],
        ['Shortlisting', 'Manual judgment first', 'Can move into rubric-based scoring'],
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison 2',
      title: 'Resume parser vs resume screening software.',
      columns: ['Question', 'Resume Parser', 'Resume Screening Software'],
      rows: [
        ['What does it do?', 'Extracts data into structured fields.', 'Evaluates candidates against criteria.'],
        ['Main output', 'Profile, parsed text, metadata.', 'Score, rank, strengths, evidence.'],
        ['Best for', 'Organizing candidate data.', 'Deciding who moves forward.'],
        ['HireSort position', 'Parsing is the data layer.', 'Screening is the decision layer.'],
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Trust & Accuracy',
      title: 'Designed to support review, not replace judgment.',
      body: [
        'Resume parsing can improve speed and structure, but hiring teams should still review important candidate information before making final decisions.',
        'Trust principles:',
        '• Parsed candidate information remains reviewable by recruiters',
        '• AI screening provides explanations and evidence, not just scores',
        '• Human reviewers stay in control of hiring decisions',
      ],
    },
    {
      type: 'callout',
      title: 'Security and Privacy',
      body: 'HireSort helps teams manage candidate resumes in a private workspace. Resume files and parsed data are handled securely, with access limited to authorized users and workflows designed around recruiter-controlled review.',
    },
  ],

  cta: {
    eyebrow: 'Ready to automate your data entry?',
    title: 'Parse resumes. Build candidate profiles. Screen faster.',
    body: 'Use HireSort to turn resume files into structured candidate records and move from manual resume handling to AI-assisted shortlisting.',
    primary: { label: 'Parse resumes for free', href: 'https://app.hiresort.ai/login' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is a resume parser?',
      answer: [
        'A resume parser is software that extracts information from resumes and converts it into structured candidate data such as name, email, phone number, skills, experience, current role, and resume text.',
      ],
    },
    {
      id: 'formats',
      question: 'What file types does HireSort support?',
      answer: ['HireSort is designed around common recruiter file formats such as PDF and DOCX resumes.'],
    },
    {
      id: 'scanned',
      question: 'Can HireSort parse scanned resumes?',
      answer: [
        "HireSort's parsing workflow can use OCR fallback for scanned PDFs where normal text extraction is not available.",
      ],
    },
    {
      id: 'extract',
      question: 'What candidate information can HireSort extract?',
      answer: [
        'HireSort can help extract candidate details such as name, email, phone, current job title, current company, skills, years of experience, parsed text, and resume metadata.',
      ],
    },
    {
      id: 'diff',
      question: 'Is resume parsing the same as resume screening?',
      answer: [
        'No. Resume parsing extracts data from resumes. Resume screening evaluates candidates against role-specific criteria. HireSort connects both workflows.',
      ],
    },
    {
      id: 'reuse',
      question: 'Can parsed resumes be reused for future roles?',
      answer: [
        "Yes. HireSort's resume management layer is designed to store resumes as reusable candidate records that can be mapped to future jobs and screenings.",
      ],
    },
    {
      id: 'keywords',
      question: 'Does HireSort only use keywords?',
      answer: [
        'No. HireSort is designed to support structured, rubric-first screening after parsing, so candidates can be evaluated against the job requirements rather than simple keyword matches.',
      ],
    },
    {
      id: 'who-for',
      question: 'Who should use HireSort Resume Parser?',
      answer: [
        'HireSort Resume Parser is useful for recruiters, founders, hiring managers, recruitment agencies, and recruiting operations teams that need faster resume processing and cleaner candidate data.',
      ],
    },
    {
      id: 'search',
      question: 'Can I search parsed resumes?',
      answer: [
        'Yes. Parsed candidate data can support search and filtering by candidate name, role, stage, score range, and date added as part of the candidate repository workflow.',
      ],
    },
    {
      id: 'is-ats',
      question: 'Does HireSort replace a full ATS?',
      answer: [
        'HireSort is best positioned as a lightweight, screening-first hiring workspace. It focuses on parsing, resume management, AI screening, shortlists, and candidate tracking rather than full enterprise ATS workflows.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/resume-parser', label: 'AI Resume Screening' },
    { href: '/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/recruitment-software', label: 'Recruitment Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/resources/compare/resume-screening-software-vs-resume-parser', label: 'Resume Screening Software vs Resume Parser' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
