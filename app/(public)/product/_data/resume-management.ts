import type { ProductPage } from '../_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const resumeManagement: ProductPage = {
  slug: 'resume-management',
  product: 'Resume Management',
  heroIcon: 'database',
  publishedAt: '2026-05-03',
  updatedAt: '2026-05-17',

  meta: {
    title: 'Resume & CV Management Software for Recruiters in 2026 | HireSort',
    description:
      'HireSort is resume and CV management software for recruiters and US hiring teams. Store resumes in one repository, build a reusable candidate database, track hiring stages, and screen profiles with AI — a faster resume management system than spreadsheets.',
    keywords: [
      'resume management software',
      'resume management system',
      'cv management software',
      'cv management solution',
      'cv management tool',
      'resume storage software',
      'candidate management software',
      'recruiting database',
      'AI resume management',
      'resume database software',
      'candidate database software',
      'cv shortlisting tool',
      'candidate resume database',
      'recruiter resume database',
      'resume repository software',
      'resume management software for agencies',
      'resume management software for startups',
      'candidate rediscovery software',
      'resume management software for US recruiters',
      'US candidate database software',
      'AI resume management for US hiring teams',
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
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'See how it works', href: '#how-it-works' },
    supporting:
      'Stop treating every resume screening as a one-off task. Build a searchable candidate workspace that becomes more valuable with every upload.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Recruiters Should Not Have to Restart From Zero for Every Role.',
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
      title: 'AI Resume Screening + Lightweight Resume Management.',
      body: [
        'HireSort is not just a JD-to-score workflow. It is evolving into a lightweight candidate workspace where recruiters can store resumes, search candidate records, associate candidates with roles, track hiring stages, and reuse profiles across future screenings.',
        'The goal is simple: make HireSort useful before, during, and after AI screening.',
      ],
      flow: ['Upload resumes', 'Build repository', 'Screen with AI', 'Track stages', 'Reuse candidates'],
    },
    {
      type: 'paragraph',
      eyebrow: 'Search intent',
      title: 'A Resume Management System for CV Storage, Shortlisting, and Reuse.',
      body: [
        'Teams searching for resume management software often need more than file storage. They need a CV management solution that can organize resumes, connect candidates to roles, preserve screening context, and make past applicants searchable again.',
        'HireSort combines resume management with AI screening so recruiters can store candidate records, review match scores, shortlist faster, and reuse strong profiles when a similar role opens later.',
      ],
    },
    {
      type: 'evidence',
      eyebrow: 'Market context',
      title: 'Why Resume Management Should Support Candidate Rediscovery.',
      intro:
        'A resume management system should do more than store files. The real value appears when recruiters can search past applicants, understand where they came from, see prior screening context, and quickly decide whether an existing candidate should be considered for a new role.',
      items: [
        {
          title: 'Past applicants can become an active talent pool',
          body:
            'Greenhouse describes talent rediscovery as a way to filter and search prospects and past applicants for current roles. That is the practical shift resume management software needs to support: old resumes should not sit as static records; they should become searchable candidates for future openings.',
          href: 'https://support.greenhouse.io/hc/en-us/articles/30184390692379-Talent-Rediscovery',
          label: 'Greenhouse Talent Rediscovery',
        },
        {
          title: 'Rediscovery can be faster than starting from scratch',
          body:
            'SeekOut positions rediscovering applicants as up to five times faster than sourcing from scratch because the candidates already exist in the system and carry useful application history. For recruiters, that makes resume reuse a direct productivity workflow, not just a database feature.',
          href: 'https://www.seekout.com/capabilities/rediscover-applicants/',
          label: 'SeekOut Rediscover Applicants',
        },
        {
          title: 'Search quality improves when history stays attached',
          body:
            'Gem explains that AI rediscovery can surface past applicants, CRM prospects, and net-new prospects in one search result, while showing past applications, interview scorecards, and related history. Resume management becomes more useful when candidate context stays connected to the profile.',
          href: 'https://help.gem.com/external/gem-ai-rediscovery-overview-getting-started',
          label: 'Gem AI Rediscovery overview',
        },
        {
          title: 'Structured profiles matter more than file storage',
          body:
            'SeekOut describes talent rediscovery as using AI to resurface candidates who previously applied but were not hired. That requires structured profiles, search, and matching context. A folder of PDFs is storage; a resume management system should help recruiters find and reuse the right people.',
          href: 'https://help.seekout.com/help/What-is-Talent-Rediscovery',
          label: 'SeekOut Talent Rediscovery explainer',
        },
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Who it is for',
      title: 'Resume Management Software for Recruiters, Agencies, Startups, and High-Volume Teams.',
      body: [
        'HireSort is useful when resumes arrive faster than the team can organize them. Startup teams can build a candidate database before they need a full ATS. Agencies can reuse candidate records across client requirements. High-volume teams can keep resumes searchable after the first screening cycle.',
        'The page is also built around CV management solution intent: store CVs, preserve screening evidence, track candidate status, and rediscover older profiles when a new role opens.',
        'For US and UK hiring teams, the practical benefit is control: recruiters can review candidate records, screening evidence, and stage history instead of relying on disconnected folders or black-box matching.',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'US hiring teams',
      title: 'Resume Management for US Recruiters Who Need Reviewable Candidate Records.',
      body: [
        'US recruiters need resume management software that does more than store files. They need searchable candidate records, role history, screening evidence, and stage context that can be reviewed before a candidate moves forward.',
        'HireSort keeps AI screening results attached to recruiter-managed candidate records, so teams can see the resume, parsed profile, role association, score, evidence, and hiring stage in one place.',
        'For startups, agencies, and high-volume teams in the US, this creates a practical candidate database that supports rediscovery while keeping human review at the center of AI-assisted screening.',
      ],
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From Resume Upload to Reusable Candidate Database.',
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
      title: 'Everything You Need to Manage Resumes After Upload.',
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
      title: 'A Single Place for Every Resume Your Team Uploads.',
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
      title: 'Know What Happened After Screening.',
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
      title: 'A Complete Candidate View in One Place.',
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
      title: 'Find the Right Candidates Faster.',
      body: [
        'As the repository grows, recruiters need quick ways to find relevant profiles. HireSort should support simple search and filtering in the free version and more advanced search in the paid version.',
        'MVP search and filters:',
        '• Search by candidate name',
        '• Filter by role or JD',
        '• Filter by stage',
        '• Filter by score range',
        '• Filter by date added',
        'Expanded search and filters:',
        '• Search by keywords, skills, company, or job title',
        '• Advanced filtering combinations',
        '• Saved searches and saved filters',
        '• AI-assisted or natural-language search across the repository',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Advanced Workflows',
      title: 'When Your Recruiting Operation Needs More Structure.',
      body: [
        'As teams grow, recruiters need more than a simple list of resumes. The expanded HireSort Resume Management workflow adds deeper organization, collaboration, and operational control.',
        'Advanced repository:',
        '• Saved talent pools, searches, and filters',
        '• CSV export with stage, role, and score',
        '• Candidate notes and recruiter comments',
        '• Richer candidate history across multiple roles',
        '• Advanced repository search by skills, company, role, score, and stage',
        'Advanced funnel management:',
        '• Kanban or board view by stage with drag-and-drop movement',
        '• Bulk stage updates and history',
        '• Pipeline filters by recruiter, role, stage, and score range',
        '• Multiple funnel templates for different teams or roles',
        'Custom candidate tables:',
        '• Add, rename, and reorder custom columns',
        '• Set column data types (text, number, select, date, checkbox, URL)',
        '• Use different table configurations for different jobs',
      ],
    },
    {
      type: 'useCases',
      eyebrow: 'Use cases',
      title: 'Built for Recruiters Who Want Candidate Continuity.',
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
          icon: 'search',
          title: 'For high-volume hiring',
          body: 'Keep large resume batches searchable so strong applicants can be rediscovered later.',
        },
        {
          icon: 'users',
          title: 'For US hiring teams',
          body: 'Review resume evidence, candidate status, and screening context in one recruiter-controlled workspace.',
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
      title: 'HireSort vs Folders, Spreadsheets, and Full ATS Platforms.',
      columns: ['Capability', 'Folders / Spreadsheets', 'Full ATS', 'HireSort Resume Management'],
      accentColIndex: 3,
      rows: [
        ['Central resume repository', 'Manual and messy', 'Yes', 'Yes'],
        ['Parsed candidate metadata', 'Manual entry', 'Usually yes', 'Yes'],
        ['AI resume screening', 'No', 'Varies', 'Core workflow'],
        ['Role-specific scoring', 'Manual', 'Varies', 'Rubric-based'],
        ['Candidate stage tracking', 'Manual', 'Yes', 'Simple dropdown-based tracking'],
        ['Resume reuse across roles', 'Difficult', 'Usually yes', 'Core workflow'],
        ['Candidate rediscovery', 'Manual search', 'Usually available', 'Searchable candidate records with screening context'],
        ['Screening evidence', 'Not preserved', 'Varies', 'Connected to candidate records'],
        ['Setup complexity', 'Low but unstructured', 'Often high', 'Lightweight'],
        ['Best fit', 'Very early hiring', 'Mature hiring teams', 'Screening-first recruiting teams'],
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Use-case fit',
      title: 'Which Resume Management Workflow Fits Your Team?',
      columns: ['Team type', 'Resume management problem', 'What to prioritize', 'Where HireSort fits'],
      accentColIndex: 3,
      rows: [
        ['Startup recruiting', 'Resumes are spread across email, folders, and spreadsheets', 'Simple candidate database and reusable records', 'Lightweight resume repository plus screening context'],
        ['Recruitment agency', 'Candidates need to be reused across many client roles', 'Search, role association, and candidate rediscovery', 'Reusable candidate records tied to jobs and scores'],
        ['High-volume hiring', 'Large batches become impossible to revisit later', 'Bulk organization and fast filtering', 'Central repository with stage, score, and role filters'],
        ['Hiring manager-led process', 'Managers lack context on why candidates were saved or rejected', 'Shared candidate view and stage history', 'Candidate detail pages with resume, score, role, and status'],
        ['US hiring team', 'AI workflows need recruiter control and reviewable context', 'Human oversight and preserved evidence', 'AI screening results stored next to recruiter-managed candidate records'],
      ],
    },
    {
      type: 'why',
      eyebrow: 'Why HireSort',
      title: 'Why Resume Management Should Sit Next to AI Screening.',
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
      title: 'Useful for Solo Recruiters. More Powerful for Teams.',
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
      title: 'What It Is — and What It Is Not.',
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
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What Is Resume Management Software?',
      answer: [
        'Resume management software helps recruiters store, organize, search, and reuse resumes across hiring workflows. It gives teams a structured candidate database instead of scattered files and spreadsheets.',
      ],
    },
    {
      id: 'how-different',
      question: 'How Is HireSort Resume Management Different From Resume Screening?',
      answer: [
        'Resume screening evaluates candidates for a specific role. Resume management stores candidate records so they can be searched, tracked, and reused across multiple roles over time.',
      ],
    },
    {
      id: 'cv-management-solution',
      question: 'What Is a CV Management Solution?',
      answer: [
        'A CV management solution helps recruiters store, search, organize, and reuse CVs or resumes. HireSort adds AI screening context so each candidate record can include role fit, scores, evidence, and stage history.',
      ],
    },
    {
      id: 'resume-database',
      question: 'Can HireSort Work as Resume Database Software?',
      answer: [
        'Yes. HireSort is designed to turn uploaded resumes into structured candidate records that can be searched, associated with jobs, tracked through stages, and reused for future openings.',
      ],
    },
    {
      id: 'repository',
      question: 'Does HireSort Create a Central Resume Repository?',
      answer: [
        'Yes. Every uploaded resume can be added to a central repository with parsed candidate information, role association, score, stage, and date added.',
      ],
    },
    {
      id: 'reuse',
      question: 'Can I Reuse a Candidate for Another Job?',
      answer: [
        'Yes. HireSort is designed to let recruiters attach or map an existing resume to a new job role and run a new screening workflow.',
      ],
    },
    {
      id: 'stages',
      question: 'Can I Track Candidate Stages?',
      answer: [
        'Yes. HireSort supports manual stage tracking using stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, and On Hold.',
      ],
    },
    {
      id: 'customization',
      question: 'Can I Customize the Hiring Funnel?',
      answer: [
        'Yes. The MVP includes basic funnel customization, including renaming, adding, removing, and reordering stages.',
      ],
    },
    {
      id: 'kanban',
      question: 'Does HireSort Include Kanban Boards?',
      answer: [
        'Kanban boards are planned for the expanded paid workflow. The MVP stays simple with a table or list view and dropdown-based stage movement.',
      ],
    },
    {
      id: 'export',
      question: 'Can I Export Candidate Data?',
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
      id: 'candidate-rediscovery',
      question: 'What Is Candidate Rediscovery?',
      answer: [
        'Candidate rediscovery means finding and reusing past applicants when a new role opens. A resume management system helps by keeping candidate records searchable with role history, stage, score, and screening context.',
      ],
    },
    {
      id: 'agencies-startups',
      question: 'Is Resume Management Software Useful for Agencies and Startups?',
      answer: [
        'Yes. Agencies can reuse candidates across client roles, while startups can create a lightweight candidate database before they need a full ATS. Both teams benefit from searchable resumes and preserved screening context.',
      ],
    },
    {
      id: 'us-hiring-teams',
      question: 'How Should US Hiring Teams Manage Resumes With AI?',
      answer: [
        'US hiring teams should keep recruiters in control, preserve evidence, and review AI screening context before making decisions. HireSort keeps resume records, scores, and stages together so AI-assisted screening remains reviewable.',
      ],
    },
    {
      id: 'us-recruiters',
      question: 'What Should US Recruiters Look For in Resume Management Software?',
      answer: [
        'US recruiters should look for resume management software that centralizes candidate records, preserves screening context, supports human review, and makes it easy to search and rediscover past applicants without losing role history or evidence.',
      ],
    },
    {
      id: 'who-for',
      question: 'Who Should Use HireSort Resume Management?',
      answer: [
        'HireSort is best for recruiters, founders, hiring managers, agencies, and small teams that need a simple way to organize resumes, screen candidates, and track early hiring stages.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/recruitment-software', label: 'Recruitment Software' },
    { href: '/resources/best/candidate-screening-software', label: 'Candidate Screening Software' },
    { href: '/resources/best/ai-resume-screening-software', label: 'AI Resume Screening Software' },
    { href: '/resources/best/resume-screening-software', label: 'Best Resume Screening Software' },
    { href: '/resources/compare/ai-resume-screening-vs-ats', label: 'AI Resume Screening vs ATS' },
    { href: '/blog/resume-screening-checklist', label: 'Resume Screening Checklist' },
    { href: '/blog/how-to-shortlist-candidates-faster', label: 'How to Shortlist Candidates Faster' },
    { href: '/blog/ai-resume-screening-tool', label: 'AI Resume Screening Tool' },
    { href: '/blog/candidate-scorecard-template', label: 'Candidate Scorecard Template' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
