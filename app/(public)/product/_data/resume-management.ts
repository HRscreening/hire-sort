import type { ProductPage } from '../_lib/types';

export const resumeManagement: ProductPage = {
  slug: 'resume-management',
  product: 'Resume Management',
  heroIcon: 'database',
  publishedAt: '2026-05-03',
  updatedAt: '2026-05-03',

  meta: {
    title: 'Resume Management Software for Recruiters | HireSort',
    description:
      'HireSort resume management software helps recruiters store resumes, organize candidate profiles, track hiring stages, and reuse candidates across roles with AI-powered screening.',
    keywords: [
      'resume management software',
      'candidate management software',
      'resume repository',
      'candidate tracking software',
      'AI resume management',
      'recruiting database',
      'applicant tracking software',
      'resume screening software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — Resume Management Software',
  },

  hero: {
    eyebrow: 'Resume management software',
    titlePrefix: 'Resume management software that turns every resume ',
    titleAccent: 'into a reusable candidate record.',
    lead: [
      'HireSort helps recruiters move beyond one-time resume uploads and spreadsheet tracking. Store resumes in a central repository, view parsed candidate details, connect candidates to jobs, track hiring stages, and reuse strong profiles for future roles.',
      'Built for recruiters, founders, hiring managers, and agencies that want practical candidate management without the complexity of a full enterprise ATS.',
    ],
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'See how it works', href: '#how-it-works' },
    supporting:
      'Stop treating every resume screening as a one-off task. Build a searchable candidate workspace that becomes more valuable with every upload.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Recruiters should not have to restart from zero for every role.',
      intro:
        'Most recruiting workflows lose value after each screening. A recruiter uploads resumes for one job, reviews them once, and then the profiles often disappear into folders, spreadsheets, old email threads, or disconnected ATS exports. That creates avoidable problems:',
      bullets: [
        'Past resumes are hard to find when a new role opens',
        'Candidate information is scattered across different jobs and files',
        'Recruiters repeat the same resume review work across roles',
        'Candidate status is tracked manually in spreadsheets',
        'Strong candidates are forgotten after one hiring cycle',
        'Hiring teams cannot easily see where a candidate stands',
        'There is no clean history of which role a resume was screened for',
      ],
      closing:
        'HireSort Resume Management solves this by turning uploaded resumes into structured, searchable, reusable candidate records.',
    },
    {
      type: 'positioning',
      eyebrow: 'AI + Management',
      title: 'AI resume screening + lightweight resume management.',
      body: [
        'HireSort is not just a JD-to-score workflow. It is evolving into a lightweight candidate workspace where recruiters can store resumes, search candidate records, associate candidates with roles, track hiring stages, and reuse profiles across future screenings.',
        'The goal is simple: make HireSort useful before, during, and after AI screening.',
      ],
      flow: ['Upload resumes', 'Build repository', 'Screen with AI', 'Track stages', 'Reuse candidates'],
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From resume upload to reusable candidate database.',
      steps: [
        {
          n: '01',
          title: 'Upload resumes',
          body: 'Upload resumes in PDF or DOCX format as part of a screening workflow or candidate intake process.',
        },
        {
          n: '02',
          title: 'Extract candidate information',
          body: 'HireSort parses key candidate details such as name, email, phone number, current role, company, skills, and years of experience.',
        },
        {
          n: '03',
          title: 'Add resumes to a central repository',
          body: 'Every uploaded resume becomes part of a central resume repository instead of staying locked inside a single screening event.',
        },
        {
          n: '04',
          title: 'Connect candidates to jobs',
          body: 'Associate candidates with the role or JD they were uploaded for. The same candidate can later be attached to another job for a new screening.',
        },
        {
          n: '05',
          title: 'Review AI screening results',
          body: 'If screening has been run, see the candidate score, rank, strengths, missing elements, and role-specific evaluation.',
        },
        {
          n: '06',
          title: 'Track candidate stage',
          body: 'Move candidates through stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, or On Hold using a simple dropdown.',
        },
        {
          n: '07',
          title: 'Reuse candidates for future roles',
          body: 'When a new role opens, search the repository and reuse existing profiles instead of uploading and reviewing the same resumes again.',
        },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Core features',
      title: 'Everything you need to manage resumes after upload.',
      items: [
        {
          icon: 'database',
          title: 'Central resume repository',
          body: 'Keep all uploaded resumes in one searchable workspace. View candidate records even outside a single screening workflow.',
        },
        {
          icon: 'userSearch',
          title: 'Parsed candidate profiles',
          body: 'Capture structured candidate information including name, contact details, current role, company, key skills, years of experience, and upload date.',
        },
        {
          icon: 'workflow',
          title: 'Role and JD association',
          body: 'See which role or job description each candidate was considered for, along with the score for that role if screening was run.',
        },
        {
          icon: 'listChecks',
          title: 'Candidate stage tracking',
          body: 'Track candidate status per role using simple stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, and On Hold.',
        },
        {
          icon: 'search',
          title: 'Search and filtering',
          body: 'Find candidates by name, role, stage, score range, or date added.',
        },
        {
          icon: 'fileText',
          title: 'Candidate detail view',
          body: 'Open a candidate profile with resume preview, parsed metadata, role association, latest score, and current stage.',
        },
        {
          icon: 'refreshCcw',
          title: 'Resume reuse',
          body: 'Attach an existing candidate record to a new job and screen the same resume against a different role.',
        },
        {
          icon: 'layers',
          title: 'Basic funnel customization',
          body: 'Customize the default hiring funnel by renaming, adding, removing, and reordering stages.',
        },
      ],
    },
    {
      type: 'fieldList',
      eyebrow: 'Central repository',
      title: 'A single place for every resume your team uploads.',
      intro:
        'The central repository is the foundation of HireSort Resume Management. Instead of keeping resumes trapped inside individual jobs, HireSort gives recruiters one place to view and manage candidate records.',
      cardLabel: 'Candidate record',
      cardIcon: 'database',
      fields: [
        'Candidate name',
        'Email and phone number',
        'Current role or job title',
        'Current company',
        'Key skills',
        'Years of experience',
        'Date entered into the system',
        'Source of upload or originating screening',
        'Role or JD associated with the upload',
        'Score for that role, if screening was run',
        'Current stage for that role',
      ],
      closing:
        'This helps recruiters build a reusable talent database over time instead of relying on disconnected files and spreadsheets.',
    },
    {
      type: 'comparison',
      eyebrow: 'Stage tracking',
      title: 'Know what happened after screening.',
      columns: ['Default stage', 'Use case'],
      rows: [
        ['New', 'Candidate has entered the system'],
        ['Shortlisted', 'Candidate meets the initial screen'],
        ['Round 1', 'Candidate is in the first interview round'],
        ['Round 2', 'Candidate has moved to the next round'],
        ['Round 3', 'Candidate is in a later evaluation round'],
        ['Offer Made', 'Offer discussion has started'],
        ['Hired', 'Candidate has been selected'],
        ['Rejected', 'Candidate is no longer being considered'],
        ['On Hold', 'Candidate may be revisited later'],
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Detail view',
      title: 'A complete candidate view in one place.',
      body: [
        'The candidate detail page is the main management screen for recruiters. It brings together the resume, parsed profile, job association, score, and stage in a single view.',
        '• Resume preview or file access',
        '• Parsed candidate metadata',
        '• Associated role or JD',
        '• Latest AI screening score for that role',
        '• Current hiring stage dropdown',
        '• Score breakdown and evidence if AI screening was run',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Search and Filtering',
      title: 'Find the right candidates faster.',
      body: [
        'As the repository grows, recruiters need quick ways to find relevant profiles. HireSort should support simple search and filtering in the free version and more advanced search in the paid version.',
        '**MVP search and filters:**',
        '• Search by candidate name',
        '• Filter by role or JD',
        '• Filter by stage',
        '• Filter by score range',
        '• Filter by date added',
        '',
        '**Expanded search and filters:**',
        '• Search by keywords, skills, company, or job title',
        '• Advanced filtering combinations',
        '• Saved searches and saved filters',
        '• AI-assisted or natural-language search across the repository',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Advanced Workflows',
      title: 'When your recruiting operation needs more structure.',
      body: [
        'As teams grow, recruiters need more than a simple list of resumes. The expanded HireSort Resume Management workflow adds deeper organization, collaboration, and operational control.',
        '**Advanced repository:**',
        '• Saved talent pools, searches, and filters',
        '• CSV export with stage, role, and score',
        '• Candidate notes and recruiter comments',
        '• Richer candidate history across multiple roles',
        '• Advanced repository search by skills, company, role, score, and stage',
        '',
        '**Advanced funnel management:**',
        '• Kanban or board view by stage with drag-and-drop movement',
        '• Bulk stage updates and history',
        '• Pipeline filters by recruiter, role, stage, and score range',
        '• Multiple funnel templates for different teams or roles',
        '',
        '**Custom candidate tables:**',
        '• Add, rename, and reorder custom columns',
        '• Set column data types (text, number, select, date, checkbox, URL)',
        '• Use different table configurations for different jobs',
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Use cases',
      title: 'Built for recruiters who want candidate continuity.',
      items: [
        {
          icon: 'building',
          title: 'For startup recruiters',
          body: 'Store and reuse every resume while managing multiple roles without spreadsheets.',
        },
        {
          icon: 'rocket',
          title: 'For founders',
          body: 'Create a lightweight hiring system before investing in a full enterprise ATS.',
        },
        {
          icon: 'clipboardCheck',
          title: 'For hiring managers',
          body: 'Review candidates with clear role association, score, stage, and resume context.',
        },
        {
          icon: 'handCoins',
          title: 'For recruitment agencies',
          body: 'Maintain a searchable database of candidates and reuse profiles across client roles.',
        },
        {
          icon: 'users',
          title: 'For small teams',
          body: 'Keep candidate tracking simple while still adding structure, search, and AI screening.',
        },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison',
      title: 'HireSort vs spreadsheets and full ATS platforms.',
      columns: ['Capability', 'Spreadsheets', 'Full ATS', 'HireSort Resume Management'],
      accentColIndex: 3,
      rows: [
        ['Central resume repository', 'Manual and messy', 'Yes', 'Yes'],
        ['Parsed candidate metadata', 'Manual entry', 'Usually yes', 'Yes'],
        ['AI resume screening', 'No', 'Varies', 'Core workflow'],
        ['Role-specific scoring', 'Manual', 'Varies', 'Rubric-based'],
        ['Candidate stage tracking', 'Manual', 'Yes', 'Simple dropdown-based tracking'],
        ['Resume reuse across roles', 'Difficult', 'Usually yes', 'Core workflow'],
        ['Setup complexity', 'Low but unstructured', 'Often high', 'Lightweight'],
        ['Best fit', 'Very early hiring', 'Mature hiring teams', 'Screening-first recruiting teams'],
      ],
    },
    {
      type: 'why',
      eyebrow: 'Why HireSort',
      title: 'Why resume management should sit next to AI screening.',
      items: [
        {
          title: 'Recruiters get value before screening',
          body: 'Even before running AI scoring, the repository helps organize resumes and candidate records.',
        },
        {
          title: 'Every upload becomes reusable',
          body: 'Candidates can be mapped to future roles instead of being forgotten after one job.',
        },
        {
          title: 'Screening context is preserved',
          body: 'Scores, stages, and role associations remain connected to the candidate record.',
        },
        {
          title: 'Teams reduce spreadsheet dependency',
          body: 'Candidate data, stages, and scores live in one structured workspace.',
        },
        {
          title: 'The product becomes stickier over time',
          body: 'As the repository grows, recruiters have more reason to return to HireSort for future hiring needs.',
        },
      ],
    },
    {
      type: 'plansSplit',
      eyebrow: 'Plans',
      title: 'Useful for solo recruiters. More powerful for teams.',
      free: {
        label: 'Free / MVP',
        heading: 'Core resume management.',
        bullets: [
          'Resume repository',
          'Candidate metadata extraction',
          'Resume-to-role association',
          'Resume reuse',
          'Basic search and filtering',
          'Manual stage movement',
          'Basic funnel customization',
        ],
      },
      paid: {
        label: 'Paid / Expanded',
        heading: 'Advanced recruitment operations.',
        bullets: [
          'Candidate notes and comments',
          'Saved talent pools',
          'Saved filters and searches',
          'CSV export',
          'Advanced repository search',
          'Custom table columns',
          'Kanban board',
          'Bulk stage movement',
          'Multiple funnel templates',
        ],
      },
    },
    {
      type: 'scope',
      eyebrow: 'Scope clarity',
      title: 'What it is — and what it is not.',
      inLabel: 'Focused on',
      inItems: [
        'Resume storage',
        'Candidate metadata',
        'Role association',
        'AI screening context',
        'Stage tracking',
        'Resume reuse',
      ],
      outLabel: 'Not in near-term scope',
      outItems: [
        'Interview scheduling',
        'Offer letter workflows',
        'Candidate communication',
        'Calendar integrations',
        'Onboarding',
        'Background checks',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready to build a reusable candidate workspace?',
    title: 'Ready to make recruiting more structured?',
    body: 'Use HireSort to store resumes, screen candidates, track stages, and reuse strong profiles across future roles.',
    primary: { label: 'Get started for free', href: '/pricing' },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is resume management software?',
      answer: [
        'Resume management software helps recruiters store, organize, search, and reuse resumes across hiring workflows. It gives teams a structured candidate database instead of scattered files and spreadsheets.',
      ],
    },
    {
      id: 'how-different',
      question: 'How is HireSort Resume Management different from resume screening?',
      answer: [
        'Resume screening evaluates candidates for a specific role. Resume management stores candidate records so they can be searched, tracked, and reused across multiple roles over time.',
      ],
    },
    {
      id: 'repository',
      question: 'Does HireSort create a central resume repository?',
      answer: [
        'Yes. Every uploaded resume can be added to a central repository with parsed candidate information, role association, score, stage, and date added.',
      ],
    },
    {
      id: 'reuse',
      question: 'Can I reuse a candidate for another job?',
      answer: [
        'Yes. HireSort is designed to let recruiters attach or map an existing resume to a new job role and run a new screening workflow.',
      ],
    },
    {
      id: 'stages',
      question: 'Can I track candidate stages?',
      answer: [
        'Yes. HireSort supports manual stage tracking using stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, and On Hold.',
      ],
    },
    {
      id: 'customization',
      question: 'Can I customize the hiring funnel?',
      answer: [
        'Yes. The MVP includes basic funnel customization, including renaming, adding, removing, and reordering stages.',
      ],
    },
    {
      id: 'kanban',
      question: 'Does HireSort include Kanban boards?',
      answer: [
        'Kanban boards are planned for the expanded paid workflow. The MVP stays simple with a table or list view and dropdown-based stage movement.',
      ],
    },
    {
      id: 'export',
      question: 'Can I export candidate data?',
      answer: [
        'CSV export is planned as part of the paid workflow, along with saved filters, talent pools, notes, comments, advanced search, and custom columns.',
      ],
    },
    {
      id: 'is-ats',
      question: 'Is HireSort a full ATS?',
      answer: [
        'HireSort is a lightweight, screening-first candidate management system. It includes resume repository, stage tracking, and AI screening, but it is not currently positioned as a full enterprise ATS.',
      ],
    },
    {
      id: 'who-for',
      question: 'Who should use HireSort Resume Management?',
      answer: [
        'HireSort is best for recruiters, founders, hiring managers, agencies, and small teams that need a simple way to organize resumes, screen candidates, and track early hiring stages.',
      ],
    },
  ],

  internalLinks: [
    { href: '/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/recruitment-software', label: 'Recruitment Software' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
