import type { ProductPage } from '@/app/(public)/product/_lib/types';
import redirectURL from '@/lib/mainsSiteRedirectUrl';

export const recruiters: ProductPage = {
  slug: 'recruiters',
  product: 'For Recruiters',
  heroIcon: 'userSearch',
  publishedAt: '2026-05-08',
  updatedAt: '2026-05-08',

  meta: {
    title: 'Resume Screening and Candidate Tracking for Recruiters | HireSort',
    description:
      'HireSort helps recruiters screen resumes faster, create ranked shortlists, track candidates, and reuse candidate profiles across roles with AI-powered resume screening and lightweight applicant tracking.',
    keywords: [
      'resume screening for recruiters',
      'AI resume screening for recruiters',
      'recruiter software',
      'recruitment software for recruiters',
      'candidate shortlisting software',
      'applicant tracking for recruiters',
      'resume management software',
    ],
    ogImage: '/logo.png',
    ogImageAlt: 'HireSort — resume screening for recruiters',
  },

  hero: {
    eyebrow: 'For recruiters',
    titlePrefix: 'Resume screening and candidate tracking ',
    titleAccent: 'for recruiters.',
    lead: [
      'Turn large applicant pools into structured, reviewable shortlists without living in spreadsheets.',
      'HireSort helps recruiters upload resumes in bulk, screen candidates against job-specific rubrics, review evidence-backed scores, and track candidates in one lightweight recruitment workspace.',
    ],
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'See how HireSort works', href: '#how-it-works' },
    supporting:
      'A screening-first workflow for recruiters who need to move faster, align better with hiring managers, and keep candidate records reusable across future roles.',
  },

  sections: [
    {
      type: 'problem',
      eyebrow: 'The problem',
      title: 'Recruiters are expected to move fast, but the workflow is still manual',
      intro:
        'Recruiters are often judged on speed, quality of shortlist, and hiring-manager satisfaction. But the tools they use for early-stage screening are frequently scattered across inboxes, job boards, folders, spreadsheets, and chat threads.',
      bullets: [
        'Every resume needs to be opened and reviewed manually',
        'Hiring managers may not agree with recruiter screening criteria',
        'Candidate status is tracked in spreadsheets that quickly become outdated',
        'Strong candidates from older roles are difficult to find again',
        'Shortlist decisions are hard to explain if the screening process was unstructured',
        'Recruiters spend too much time on repetitive resume triage instead of candidate engagement',
      ],
      closing:
        'HireSort gives recruiters a structured way to move from resume volume to ranked shortlist, while keeping candidates organized for future hiring needs.',
    },
    {
      type: 'positioning',
      eyebrow: 'Positioning',
      title: 'Built for the recruiter’s most painful workflow: first-pass screening',
      body: [
        'HireSort is not just a resume upload tool. It combines AI resume screening, candidate scoring, resume management, and basic stage tracking into a simple workflow for recruiters.',
        'The goal is to help recruiters answer three questions faster:',
      ],
      flow: ['Who should I review first?', 'Why does this candidate fit or not fit the role?', 'Where does this candidate stand in the hiring process?'],
      closing:
        'That makes HireSort especially useful for recruiters who manage multiple roles, high resume volumes, and frequent hiring-manager alignment conversations.',
    },
    {
      type: 'workflow',
      eyebrow: 'How it works',
      title: 'How HireSort works for recruiters',
      steps: [
        { n: '01', title: 'Create a job', body: 'Start with a job description or JD file. HireSort uses the role requirements as the foundation for screening.' },
        { n: '02', title: 'Generate a role-specific rubric', body: 'HireSort creates a structured rubric from the JD so every resume is evaluated against the same criteria.' },
        { n: '03', title: 'Upload resumes in bulk', body: 'Upload PDF or DOCX resumes and let HireSort parse candidate information.' },
        { n: '04', title: 'Review ranked candidates', body: 'See candidates ranked by role fit with scores, strengths, missing elements, and evidence from the resume.' },
        { n: '05', title: 'Open candidate detail view', body: 'Review resume preview, parsed metadata, role association, score, and current hiring stage in one place.' },
        { n: '06', title: 'Update candidate stage', body: 'Move candidates through simple stages such as New, Shortlisted, Round 1, Offer Made, Hired, Rejected, or On Hold.' },
        { n: '07', title: 'Reuse candidates later', body: 'Store candidates in a central resume repository so strong profiles can be considered again for future roles.' },
      ],
    },
    {
      type: 'features',
      eyebrow: 'Recruiter features',
      title: 'Recruiter-focused features',
      items: [
        { icon: 'layers', title: 'Bulk resume upload', body: 'Upload multiple resumes and reduce repetitive first-pass review effort.' },
        { icon: 'sparkles', title: 'Rubric-first AI screening', body: 'Evaluate candidates against job-specific criteria generated from the JD, not just keywords.' },
        { icon: 'listChecks', title: 'Ranked shortlist', body: 'Quickly identify the strongest candidates for a role based on structured scoring.' },
        { icon: 'fileSearch', title: 'Explainable scoring', body: 'See evidence, strengths, missing elements, and score breakdowns so recruiter decisions are easier to explain.' },
        { icon: 'tags', title: 'Candidate metadata extraction', body: 'Capture candidate name, email, phone, current role, current company, skills, and experience.' },
        { icon: 'database', title: 'Central resume repository', body: 'Store all uploaded resumes in one reusable candidate library.' },
        { icon: 'search', title: 'Search and filtering', body: 'Find candidates by name, role, stage, score range, or date added.' },
        { icon: 'workflow', title: 'Candidate stage tracking', body: 'Track each candidate’s status for each role through simple manual stage movement.' },
        { icon: 'ganttChart', title: 'Funnel customization', body: 'Rename, add, remove, and reorder stages to match your team’s hiring process.' },
        { icon: 'refreshCcw', title: 'Resume reuse', body: 'Attach existing candidates to new roles and rescreen them when relevant opportunities open.' },
      ],
    },
    {
      type: 'fieldList',
      eyebrow: 'Candidate repository',
      title: 'Keep every resume useful after the first screening',
      intro:
        'Recruiters often review good candidates for one role but lose track of them once that role closes. HireSort is designed to make uploaded resumes reusable. Each candidate record can include:',
      cardLabel: 'Candidate record',
      cardIcon: 'userSearch',
      fields: [
        'Candidate name, email, and phone number',
        'Current role and current company',
        'Key skills and years of experience',
        'Date added and source of upload',
        'Role or JD associated with the resume',
        'Latest score for that role',
        'Current candidate stage',
      ],
      closing:
        'This helps recruiters build a candidate database that becomes more valuable over time instead of starting from zero for every new role.',
    },
    {
      type: 'stages',
      eyebrow: 'Stage tracking',
      title: 'Track candidate progress without spreadsheet chaos',
      intro:
        'After screening, recruiters need to know what happened next. HireSort supports simple stage tracking so recruiters can keep candidate status visible without maintaining separate trackers.',
      items: ['New', 'Shortlisted', 'Round 1', 'Round 2', 'Round 3', 'Offer Made', 'Hired', 'Rejected', 'On Hold'],
      closing:
        'Stages are tracked per candidate per role, so a candidate can be shortlisted for one role, rejected for another, and kept on hold for a future opportunity.',
    },
    {
      type: 'useCases',
      eyebrow: 'Recruiter workflows',
      title: 'Recruiter workflow use cases',
      items: [
        { icon: 'fileText', title: 'Inbound application triage', body: 'When a role receives a large volume of resumes, HireSort helps recruiters prioritize who to review first.' },
        { icon: 'clipboardCheck', title: 'Hiring-manager shortlist preparation', body: 'Recruiters can share a clearer shortlist supported by scores, evidence, and role-fit explanations.' },
        { icon: 'database', title: 'Resume database cleanup', body: 'Move past resumes into a central repository with searchable candidate metadata.' },
        { icon: 'refreshCcw', title: 'Multi-role candidate reuse', body: 'Strong candidates can be mapped to future jobs instead of being forgotten after one screening workflow.' },
        { icon: 'building', title: 'Agency shortlisting', body: 'Recruiters handling multiple client requirements can process larger resume pools and create ranked candidate lists faster.' },
      ],
    },
    {
      type: 'comparison',
      eyebrow: 'Manual vs HireSort',
      title: 'Manual recruiter workflow vs HireSort',
      columns: ['Recruiter workflow', 'Manual / spreadsheet process', 'HireSort workflow'],
      accentColIndex: 2,
      rows: [
        ['First-pass screening', 'Open every resume manually and rely on quick judgment', 'Upload resumes and get AI-assisted ranking against a structured rubric'],
        ['Shortlist quality', 'Shortlists depend heavily on reviewer memory and subjective impressions', 'Candidates are compared against the same role-specific criteria'],
        ['Hiring-manager alignment', 'Recruiters explain selections through notes, calls, or spreadsheets', 'Hiring managers see score breakdowns, evidence, strengths, and missing elements'],
        ['Candidate tracking', 'Stages are updated manually in trackers and often become stale', 'Candidate stage is visible in the candidate list and detail view'],
        ['Resume reuse', 'Past resumes are buried in old folders or previous job posts', 'Candidates can be stored in a central repository and reused for future roles'],
        ['Auditability', 'Difficult to explain why one candidate moved forward and another did not', 'Rubric-based scoring gives a clearer evaluation trail'],
      ],
    },
    {
      type: 'plansSplit',
      eyebrow: 'Free vs paid',
      title: 'Useful for solo recruiters. Stronger for growing recruiting teams.',
      free: {
        heading: 'Free / MVP workflow',
        bullets: [
          'Central resume repository',
          'Candidate metadata extraction and storage',
          'Resume-to-role association',
          'Reuse of stored resumes for future screenings',
          'Basic search and filtering',
          'Manual stage movement through dropdowns',
          'Basic funnel stage customization',
          'Candidate detail page with score and stage',
        ],
      },
      paid: {
        heading: 'Paid / expanded workflow',
        bullets: [
          'Saved talent pools',
          'Saved filters and saved searches',
          'CSV export of candidate lists with stage, role, and score',
          'Candidate notes and recruiter comments',
          'Advanced repository search',
          'Custom candidate table columns',
          'Kanban board view by stage',
          'Bulk stage movement',
          'Multiple funnel templates',
          'Deeper candidate history across roles',
        ],
      },
    },
    {
      type: 'paragraph',
      eyebrow: 'Scope clarity',
      title: 'A lightweight recruiter workspace, not a heavy enterprise ATS',
      body: [
        'HireSort is focused on the recruiter workflows closest to resume screening and candidate management: resume storage, metadata extraction, AI screening, ranked shortlists, stage tracking, search, filters, and candidate reuse.',
        'It is not currently positioned as a full enterprise hiring suite with interview scheduling, offer letters, candidate messaging, background checks, onboarding, or complete CRM-style candidate nurturing.',
      ],
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Ready to screen resumes faster?',
    body: 'Use HireSort to create structured shortlists, track candidate stages, and build a reusable resume repository for future roles.',
    primary: { label: 'Get started for free', href: redirectURL },
    secondary: { label: 'View pricing', href: '/pricing' },
  },

  faqs: [
    {
      id: 'what-is',
      question: 'What is resume screening software for recruiters?',
      answer: ['Resume screening software helps recruiters evaluate applications faster by extracting candidate information, applying screening criteria, and prioritizing candidates for review.'],
    },
    {
      id: 'how-helps',
      question: 'How does HireSort help recruiters?',
      answer: ['HireSort helps recruiters upload resumes, generate role-specific rubrics, screen candidates with AI, review ranked shortlists, track stages, and reuse candidates for future roles.'],
    },
    {
      id: 'only-recruiters',
      question: 'Is HireSort only for recruiters?',
      answer: ['No. HireSort can also be used by founders, hiring managers, recruitment agencies, and small teams. This page focuses specifically on recruiter workflows.'],
    },
    {
      id: 'replace-spreadsheets',
      question: 'Can HireSort replace spreadsheets?',
      answer: ['Yes. HireSort is designed to reduce spreadsheet dependency by giving recruiters a central place to manage resumes, scores, stages, and candidate records.'],
    },
    {
      id: 'keyword-matching',
      question: 'Does HireSort use keyword matching?',
      answer: ['HireSort is designed to go beyond keyword matching by evaluating resumes against a structured rubric generated from the job description.'],
    },
    {
      id: 'customize-funnel',
      question: 'Can recruiters customize the hiring funnel?',
      answer: ['Yes. The MVP workflow supports basic funnel customization, including renaming stages, adding stages, removing unused stages, and reordering stages.'],
    },
    {
      id: 'reuse-candidates',
      question: 'Can candidates be reused across roles?',
      answer: ['Yes. HireSort is designed around a central resume repository so recruiters can reuse candidate records for future screening workflows.'],
    },
    {
      id: 'scheduling',
      question: 'Does HireSort include interview scheduling?',
      answer: ['No. Interview scheduling is outside the near-term scope. HireSort is focused on resume screening, candidate management, stage tracking, and shortlist creation.'],
    },
  ],

  internalLinks: [
    { href: '/use-cases/hiring-managers', label: 'For Hiring Managers' },
    { href: '/use-cases/recruitment-agencies', label: 'For Recruitment Agencies' },
    { href: '/use-cases/high-volume-hiring', label: 'High-Volume Hiring' },
    { href: '/product/applicant-tracking-system', label: 'Applicant Tracking System' },
    { href: '/product/resume-parser', label: 'Resume Screening Software' },
    { href: '/product/resume-management', label: 'Resume Management' },
    { href: '/pricing', label: 'Pricing' },
  ],
};
