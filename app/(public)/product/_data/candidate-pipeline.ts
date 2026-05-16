import type { ProductPage } from '../_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const candidatePipeline: ProductPage = {
  slug: 'candidate-pipeline',
  product: 'Candidate Pipeline',
  heroIcon: 'ganttChart',
  publishedAt: '2026-05-03',
  updatedAt: '2026-05-14',

  meta: {
    title: 'Candidate Pipeline Software for Hiring Teams in 2026 | HireSort',
    description:
      'HireSort is candidate pipeline software for recruiters. Build a hiring pipeline connected to resume scores, track every candidate by stage, and move from shortlist to hire — all in one recruiting pipeline workspace.',
    keywords: [
      'candidate pipeline software',
      'candidate pipeline tool',
      'candidate pipeline tools',
      'candidate pipeline management tool',
      'recruiting pipeline software',
      'recruiting software with pipeline management',
      'talent pipeline software',
      'hiring pipeline software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — Candidate Pipeline Software',
  },

  hero: {
    eyebrow: 'Candidate pipeline software',
    titlePrefix: 'Candidate pipeline software for ',
    titleAccent: 'faster hiring workflows.',
    lead: [
      'HireSort helps recruiters move from resume screening to candidate action. Build a clear pipeline, track every candidate by stage, and keep your hiring workflow organized after the shortlist is created.',
      'Instead of managing shortlisted candidates in spreadsheets, scattered notes, and inbox reminders, HireSort gives your team a simple pipeline connected to resume scores, role associations, and candidate details.',
    ],
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View workflow', href: '#how-it-works' },
    supporting:
      'A lightweight candidate pipeline for recruiters, founders, hiring managers, and agencies that need to move applicants from “new” to “hired” without spreadsheet chaos or heavy ATS complexity.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Shortlisting is only half the hiring problem.',
      intro:
        'Most teams focus on finding the right candidates, but the process often breaks immediately after screening. Once a shortlist is created, teams still need to know who is new, who has been reviewed, who is in interviews, who is rejected, and who should be revisited later. Without a clear candidate pipeline, teams face common problems:',
      bullets: [
        'Shortlisted candidates are copied into spreadsheets manually',
        'Recruiters lose visibility into what happened after screening',
        'Hiring managers review candidates without clear stage context',
        'The same candidate may be considered for multiple roles without proper tracking',
        'Strong candidates are forgotten after one hiring cycle',
        'Stage updates are inconsistent across roles and recruiters',
        'Teams spend too much time asking “where is this candidate now?”',
      ],
      closing:
        'HireSort brings candidate pipeline tracking into the same workflow where resumes are uploaded, screened, scored, and ranked.',
    },
    {
      type: 'positioning',
      eyebrow: 'Positioning',
      title: 'A screening-first candidate pipeline.',
      body: [
        'HireSort is not trying to be an enterprise recruiting suite with every possible hiring workflow. It is built for teams that want a practical pipeline connected to the first real hiring bottleneck: resume screening.',
        'This makes HireSort especially useful for teams that want structure after screening but do not yet need a full enterprise ATS implementation.',
      ],
      flow: ['Upload resumes', 'Screen with AI', 'Review ranked shortlist', 'Move candidates by stage', 'Reuse candidates'],
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'From screening to hired.',
      steps: [
        {
          n: '01',
          title: 'Create or select a job',
          body: 'Start with a job description or an existing screening workflow.',
        },
        {
          n: '02',
          title: 'Upload and screen resumes',
          body: 'Use HireSort to parse, score, and rank resumes against a role-specific rubric.',
        },
        {
          n: '03',
          title: 'Review the ranked shortlist',
          body: 'Open candidate profiles to see resume details, score breakdowns, strengths, missing elements, and role fit.',
        },
        {
          n: '04',
          title: 'Move candidates across stages',
          body: 'Update candidate stages manually using a simple dropdown from the candidate list or detail page.',
        },
        {
          n: '05',
          title: 'Track stages per role',
          body: 'The same candidate can have different stages across different jobs, making the pipeline more accurate.',
        },
        {
          n: '06',
          title: 'Customize your funnel',
          body: 'Rename, add, remove, and reorder stages so the pipeline matches your hiring process.',
        },
        {
          n: '07',
          title: 'Reuse candidates later',
          body: 'Keep candidates in a central repository and map them to future roles when relevant.',
        },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Features',
      title: 'Candidate pipeline features built for practical recruiting.',
      items: [
        {
          icon: 'ganttChart',
          title: 'Candidate stage tracking',
          body: 'Track every candidate by stage after resume screening. Move candidates from New to Shortlisted, Interview, Offer, Hired, Rejected, or On Hold.',
        },
        {
          icon: 'users',
          title: 'Per-role candidate status',
          body: 'A candidate may be shortlisted for one role, rejected for another, and kept on hold for a future opportunity. HireSort tracks status per candidate per role.',
        },
        {
          icon: 'layers',
          title: 'Custom hiring funnel',
          body: 'Customize your default funnel by renaming stages, adding new stages, removing unused ones, and reordering the flow.',
        },
        {
          icon: 'fileSearch',
          title: 'Candidate detail view',
          body: 'Review resume preview, parsed candidate metadata, associated role, latest score, and current stage in one place.',
        },
        {
          icon: 'database',
          title: 'Resume repository connection',
          body: 'Every pipeline stage connects back to a central resume repository, so candidate information remains reusable.',
        },
        {
          icon: 'filter',
          title: 'Search and filtering',
          body: 'Filter candidates by role, stage, score range, or date added to quickly find the right profiles.',
        },
        {
          icon: 'sparkles',
          title: 'AI-ranked shortlist context',
          body: 'Move candidates through the pipeline with their screening score and evidence still visible.',
        },
        {
          icon: 'clock',
          title: 'Timestamped stage updates',
          body: 'Store the latest stage update timestamp so recruiters know when candidate progress changed.',
        },
      ],
    },
    {
      type: 'fieldList',
      eyebrow: 'Pipeline Stages',
      title: 'Default Candidate Stages',
      intro:
        'HireSort can start with a simple default candidate pipeline that most hiring teams already understand. These stages are intentionally simple so recruiters can start using the pipeline without workflow setup complexity.',
      cardLabel: 'Default Funnel',
      cardIcon: 'layers',
      fields: [
        'New — Candidate has entered the system',
        'Shortlisted — Candidate meets the initial screen',
        'Round 1 — Candidate is in the first interview round',
        'Round 2 — Candidate has moved to the next round',
        'Round 3 — Candidate is in a later evaluation round',
        'Offer Made — Offer discussion has started',
        'Hired — Candidate has been selected',
        'Rejected — Candidate is no longer being considered',
        'On Hold — Candidate may be revisited later',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Customization',
      title: 'Make the pipeline match your hiring process.',
      body: [
        'Different teams use different hiring stages. A startup may only need New, Shortlisted, Interview, Offer, and Hired. A recruitment agency may need Client Submitted, Client Review, Interview Scheduled, Selected, Rejected, and On Hold.',
        'HireSort lets users customize one default funnel for their workspace by allowing them to:',
        '• Rename stage labels',
        '• Add a new stage',
        '• Remove unused stages',
        '• Reorder stages',
        '• Define one default workspace funnel',
      ],
    },
    {
      type: 'paragraph',
      eyebrow: 'Contextual Action',
      title: 'Keep screening context attached to every candidate.',
      body: [
        'A candidate pipeline is more useful when it does not sit separately from screening. HireSort keeps the candidate’s stage connected to the resume, role, JD association, screening score, and shortlist rank.',
        'Recruiters can answer practical questions faster:',
        '• Who are the top-scoring candidates still in New stage?',
        '• Which shortlisted candidates have not moved to Round 1?',
        '• Which candidates scored highly but were placed On Hold?',
        '• Which resumes can be reused for a new role?',
        '• Which candidates were rejected for one role but may fit another?',
      ],
    },
    {
      type: 'plansSplit',
      eyebrow: 'Plans',
      title: 'Start simple. Add workflow depth when hiring grows.',
      free: {
        label: 'Free / MVP Pipeline',
        heading: 'Essential stage tracking.',
        bullets: [
          'Manual stage movement via dropdown',
          'One default customizable funnel',
          'Candidate stage visible in list and detail views',
          'Search and filter by role, stage, score, and date',
          'Candidate detail page with score and stage',
          'Resume reuse across jobs',
          'Simple table/list view',
        ],
      },
      paid: {
        label: 'Paid / Expanded Pipeline',
        heading: 'Advanced workflow operations.',
        bullets: [
          'Kanban board view by stage',
          'Multiple funnel templates for different roles or teams',
          'Detailed stage history and lifecycle tracking',
          'Advanced filtering combinations and saved filters',
          'Candidate notes, comments, and collaboration',
          'Saved talent pools and richer history',
          'Custom columns, bulk actions, and CSV export',
        ],
      },
    },
    {
      type: 'useCases',
      eyebrow: 'Use cases',
      title: 'Built for teams that need candidate movement.',
      items: [
        {
          icon: 'building',
          title: 'For startup recruiters',
          body: 'Track candidates across several open roles without creating separate spreadsheets for every job.',
        },
        {
          icon: 'rocket',
          title: 'For founders',
          body: 'Know which candidates are new, reviewed, shortlisted, rejected, or ready for final discussion.',
        },
        {
          icon: 'clipboardCheck',
          title: 'For hiring managers',
          body: 'Review candidates with stage, score, and resume context in one place.',
        },
        {
          icon: 'handCoins',
          title: 'For recruitment agencies',
          body: 'Move candidates through role-specific pipelines and reuse strong profiles across client requirements.',
        },
        {
          icon: 'users',
          title: 'For high-volume teams',
          body: 'Filter by stage and score to quickly identify which candidates need action next.',
        },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Comparison',
      title: 'HireSort vs spreadsheets vs traditional ATS pipelines.',
      columns: ['Capability', 'Spreadsheets', 'Traditional ATS', 'HireSort Candidate Pipeline'],
      accentColIndex: 3,
      rows: [
        ['Candidate stages', 'Manual updates', 'Usually available', 'Simple stage tracking'],
        ['Resume context', 'Separate files and links', 'Stored in candidate profile', 'Resume, score, rank, metadata, and stage together'],
        ['Per-role status', 'Difficult to manage', 'Usually supported', 'Tracked per candidate per role'],
        ['AI shortlist context', 'Not available', 'Varies', 'Built around scored and ranked shortlists'],
        ['Funnel customization', 'Manual columns', 'Often configurable', 'Simple default funnel customization'],
        ['Candidate reuse', 'Hard to search later', 'Usually supported', 'Central repository and reuse workflow'],
        ['Setup complexity', 'Low but messy', 'Often high', 'Lightweight and fast'],
        ['Best fit', 'Very early hiring', 'Mature recruiting operations', 'Growing teams that need screening-first pipeline management'],
      ],
    },
    {
      type: 'why',
      eyebrow: 'Why HireSort',
      title: 'Why choose a screening-first candidate pipeline?',
      items: [
        { title: 'Move faster after screening', body: 'Do not let strong candidates sit idle after the shortlist is created.' },
        { title: 'Keep context visible', body: 'Review score, evidence, resume data, role association, and stage together.' },
        { title: 'Reduce spreadsheet dependency', body: 'Replace manual candidate trackers with a lightweight pipeline workspace.' },
        { title: 'Improve recruiter follow-through', body: 'Filter by stage and score to see which candidates need action next.' },
        { title: 'Reuse strong candidates', body: 'Keep candidates searchable for future roles instead of losing them after one screening cycle.' },
        { title: 'Stay lightweight', body: 'Get practical pipeline tracking without adopting every workflow of an enterprise ATS.' },
      ],
    },
    {
      type: 'scope',
      eyebrow: 'Scope clarity',
      title: 'What it is — and what it is not.',
      inLabel: 'Designed for',
      inItems: [
        'Manual stage movement',
        'Basic funnel customization',
        'Candidate tracking by role',
        'Candidate detail review',
        'Resume repository connection',
        'AI screening context inside the pipeline',
      ],
      outLabel: 'Not in near-term scope',
      outItems: [
        'Interview scheduling',
        'Candidate messaging',
        'Offer letters',
        'Onboarding',
        'Background checks',
        'Full CRM-style nurturing',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready to manage candidates after screening?',
    title: 'Focus on hiring, not tracking.',
    body: 'Use HireSort to screen resumes, review ranked shortlists, track candidate stages, and build a reusable candidate pipeline.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is a candidate pipeline?',
      answer: [
        'A candidate pipeline is the set of stages a candidate moves through during hiring, such as New, Shortlisted, Interview, Offer, Hired, Rejected, or On Hold.',
      ],
    },
    {
      id: 'diff',
      question: 'How is a candidate pipeline different from resume screening?',
      answer: [
        'Resume screening helps decide which candidates should be reviewed first. A candidate pipeline helps track what happens after that screening decision.',
      ],
    },
    {
      id: 'track',
      question: 'Does HireSort track candidate stages?',
      answer: [
        'Yes. HireSort can track candidate stages manually through simple stage updates connected to each candidate and role.',
      ],
    },
    {
      id: 'per-role',
      question: 'Can the same candidate have different stages for different roles?',
      answer: [
        'Yes. A candidate may be shortlisted for one role, rejected for another, and kept on hold for a future opportunity.',
      ],
    },
    {
      id: 'custom',
      question: 'Can I customize the hiring funnel?',
      answer: [
        'Yes. The lightweight workflow can support renaming stages, adding stages, removing unused stages, reordering stages, and defining one default funnel.',
      ],
    },
    {
      id: 'kanban',
      question: 'Does HireSort include a Kanban board?',
      answer: [
        'The simple workflow is table-driven. A Kanban board is better suited for the expanded paid workflow.',
      ],
    },
    {
      id: 'spreadsheet',
      question: 'Can HireSort replace spreadsheet candidate tracking?',
      answer: [
        'Yes. HireSort is designed to reduce manual spreadsheet tracking by connecting resumes, scores, role associations, and stages in one workspace.',
      ],
    },
    {
      id: 'who-for',
      question: 'Who should use HireSort Candidate Pipeline?',
      answer: [
        'It is best for recruiters, founders, hiring managers, agencies, and growing teams that need practical candidate tracking after AI resume screening.',
      ],
    },
  ],

  internalLinks: [
    { href: '/product/resume-parser', label: 'AI Resume Screening' },
    { href: '/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/recruitment-software', label: 'Recruitment Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/product/resume-parser', label: 'Resume Parser' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
