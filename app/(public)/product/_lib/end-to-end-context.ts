import type { FaqItem, ProductBlock, ProductPage } from './types';

type EndToEndConfig = {
  title: string;
  body: string[];
  faqs: FaqItem[];
  links?: { href: string; label: string }[];
};

const updatedAt = '2026-08-27';

const flow = [
  'Role intake',
  'JD creation',
  'Job posting',
  'Candidate sourcing',
  'AI resume screening',
  'AI phone screening',
  'AI first-round interview',
  'Structured shortlist',
];

const journeySection = (config: EndToEndConfig): ProductBlock => ({
  type: 'positioning',
  eyebrow: 'End-to-end hiring journey',
  title: config.title,
  body: config.body,
  flow,
});

const mergeFaqs = (existing: FaqItem[], additions: FaqItem[]) => {
  const seen = new Set(existing.map((faq) => faq.id));
  return [
    ...existing,
    ...additions.filter((faq) => {
      if (seen.has(faq.id)) return false;
      seen.add(faq.id);
      return true;
    }),
  ];
};

const mergeLinks = (
  existing: ProductPage['internalLinks'],
  additions: ProductPage['internalLinks'] = [],
) => {
  const seen = new Set(existing.map((link) => link.href));
  return [
    ...existing,
    ...additions.filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    }),
  ];
};

const hasJourneySection = (sections: ProductBlock[]) =>
  sections.some((section) => section.type === 'positioning' && section.eyebrow === 'End-to-end hiring journey');

export const endToEndConfigs: Record<string, EndToEndConfig> = {
  'applicant-tracking-system': {
    title: 'ATS data connected to hiring automation',
    body: [
      'HireSort keeps this page focused on applicant tracking, candidate stages, and resume records.',
      'The same data can also power the full journey from role intake to sourcing, AI resume screening, AI phone screening, first-round interviews, and structured shortlists.',
    ],
    faqs: [
      {
        id: 'ats-end-to-end-automation',
        question: 'Can HireSort connect ATS tracking with end-to-end hiring automation?',
        answer: [
          'Yes. HireSort keeps candidate stages and records organized while connecting them to agentic sourcing, AI resume screening, AI phone screening, first-round interviews, and shortlist delivery.',
        ],
      },
      {
        id: 'ats-screening-interviews',
        question: 'Can candidates move from ATS stages into screening and interviews?',
        answer: [
          'Yes. Candidate records can move from application and screening stages into phone screening, first-round interviews, and hiring-manager review.',
        ],
      },
    ],
    links: [
      { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
      { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    ],
  },
  'recruitment-software': {
    title: 'Recruitment software for the full early funnel',
    body: [
      'HireSort keeps this page focused on recruitment software and AI-assisted hiring operations.',
      'Beyond resume screening, HireSort connects role intake, JD creation, job posting, sourcing, phone screening, first-round interviews, and shortlist delivery in one workflow.',
    ],
    faqs: [
      {
        id: 'recruitment-software-end-to-end',
        question: 'Does HireSort cover more than resume screening?',
        answer: [
          'Yes. HireSort supports agentic sourcing, AI resume screening, AI phone screening, first-round interviews, candidate tracking, and structured shortlist delivery.',
        ],
      },
      {
        id: 'recruitment-software-shortlists',
        question: 'Can HireSort deliver structured shortlists?',
        answer: [
          'Yes. HireSort can prepare shortlists with candidate profiles, resume notes, phone-screen notes, interview notes, scores, and assessment summaries.',
        ],
      },
    ],
    links: [
      { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
      { href: '/product/ai-first-round-interview', label: 'AI First-Round Interview' },
    ],
  },
  'resume-management': {
    title: 'Resume management across the hiring journey',
    body: [
      'HireSort keeps this page focused on storing, searching, and reusing candidate resumes.',
      'Those candidate profiles can also move into AI screening, phone screening, first-round interviews, funnel tracking, and final shortlist review.',
    ],
    faqs: [
      {
        id: 'resume-management-end-to-end',
        question: 'How does resume management connect to hiring automation?',
        answer: [
          'HireSort turns resumes into reusable candidate records that can be screened against roles, moved through phone screens and interviews, and tracked through the hiring funnel.',
        ],
      },
      {
        id: 'resume-management-interviews',
        question: 'Can stored resumes be used for future interviews?',
        answer: [
          'Yes. Recruiters can reuse candidate profiles for future roles, screen them against new criteria, and move strong matches into phone screening or first-round interviews.',
        ],
      },
    ],
    links: [
      { href: '/product/ai-phone-screening', label: 'AI Phone Screening' },
      { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    ],
  },
  'resume-parser': {
    title: 'Resume parsing that feeds the full funnel',
    body: [
      'HireSort keeps this page focused on extracting structured candidate data from resumes.',
      'After parsing, candidate data can flow into AI resume screening, phone screening, first-round interviews, stage tracking, and final shortlist delivery.',
    ],
    faqs: [
      {
        id: 'resume-parser-end-to-end',
        question: 'What happens after HireSort parses a resume?',
        answer: [
          'Parsed candidate data can be stored, searched, screened against a role, moved into AI phone screening, considered for first-round interviews, and included in structured shortlists.',
        ],
      },
      {
        id: 'resume-parser-phone-interviews',
        question: 'Can parsed candidates move into phone screens and interviews?',
        answer: [
          'Yes. Once a candidate is parsed and screened, suitable profiles can move into AI phone screening and first-round interview workflows.',
        ],
      },
    ],
    links: [
      { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
      { href: '/product/resume-management', label: 'Resume Management' },
    ],
  },
  'candidate-pipeline': {
    title: 'Pipeline stages across sourcing and interviews',
    body: [
      'HireSort keeps this page focused on candidate pipeline visibility and stage tracking.',
      'Pipeline stages can cover the full early hiring journey: sourced, screened, phone screened, first-round interviewed, shortlisted, and reviewed.',
    ],
    faqs: [
      {
        id: 'pipeline-end-to-end',
        question: 'Can HireSort track candidates across the full hiring journey?',
        answer: [
          'Yes. HireSort can track candidates from sourcing and resume screening through phone screening, first-round interviews, shortlist review, and final hiring stages.',
        ],
      },
      {
        id: 'pipeline-automation',
        question: 'Does the pipeline connect to AI screening and interviews?',
        answer: [
          'Yes. Candidate pipeline stages can sit alongside AI resume scores, phone-screen notes, interview assessments, and recruiter decisions.',
        ],
      },
    ],
    links: [
      { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
      { href: '/product/ai-first-round-interview', label: 'AI First-Round Interview' },
    ],
  },
  startups: {
    title: 'Startup ATS with end-to-end hiring support',
    body: [
      'HireSort keeps this page focused on lightweight ATS needs for startups.',
      'Startups can also use HireSort to create JDs, post jobs, source candidates, screen resumes, run phone screens, conduct first-round interviews, and review structured shortlists.',
    ],
    faqs: [
      {
        id: 'startup-ats-end-to-end',
        question: 'Can startups use HireSort beyond applicant tracking?',
        answer: [
          'Yes. Startups can use HireSort for role setup, job posting, sourcing, AI resume screening, phone screening, first-round interviews, and shortlist review.',
        ],
      },
      {
        id: 'startup-ats-human-review',
        question: 'Can founders or recruiters stay in control?',
        answer: [
          'Yes. Founders and recruiters can review AI work, approve candidates, and make final hiring decisions while HireSort handles repetitive workflow steps.',
        ],
      },
    ],
    links: [
      { href: '/use-cases/founder-led-hiring', label: 'Founder-Led Hiring' },
      { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    ],
  },
  smb: {
    title: 'Small-business ATS plus hiring automation',
    body: [
      'HireSort keeps this page focused on practical ATS needs for small businesses.',
      'Small teams can also use the same workspace for JD creation, sourcing, AI resume screening, phone screens, first-round interviews, and structured shortlists.',
    ],
    faqs: [
      {
        id: 'smb-ats-end-to-end',
        question: 'Can small businesses use HireSort for end-to-end hiring?',
        answer: [
          'Yes. Small businesses can use HireSort to manage applicant records and automate early hiring steps from role intake to structured shortlist.',
        ],
      },
      {
        id: 'smb-ats-time-saved',
        question: 'How does this help lean teams save time?',
        answer: [
          'HireSort reduces manual work by automating JD creation, sourcing support, resume screening, phone screening, interviews, and shortlist preparation.',
        ],
      },
    ],
    links: [
      { href: '/use-cases/high-volume-hiring', label: 'High-Volume Hiring' },
      { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    ],
  },
  'founder-led-hiring': {
    title: 'Founder-led hiring from role brief to shortlist',
    body: [
      'HireSort keeps this page focused on founders who need hiring structure before a large HR team.',
      'Founders can also use HireSort to create JDs, source candidates, screen resumes, run phone screens, interview strong fits, and review structured shortlists.',
    ],
    faqs: [
      {
        id: 'founder-end-to-end',
        question: 'Can founders use HireSort for the whole early hiring workflow?',
        answer: [
          'Yes. Founders can use HireSort to move from role brief to JD, sourcing, screening, phone screens, first-round interviews, and shortlist review.',
        ],
      },
      {
        id: 'founder-shortlist-speed',
        question: 'Can HireSort help founders shortlist faster?',
        answer: [
          'Yes. HireSort helps founders reduce manual resume review and focus on candidates with stronger evidence, phone-screen notes, and interview assessments.',
        ],
      },
    ],
    links: [
      { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
      { href: '/use-cases/recruiter-in-the-loop', label: 'Recruiter-in-the-Loop Hiring' },
    ],
  },
  'high-volume-hiring': {
    title: 'High-volume hiring beyond resume triage',
    body: [
      'HireSort keeps this page focused on high-volume screening and shortlist speed.',
      'For larger applicant pools, HireSort can connect sourcing, bulk AI resume screening, AI phone screening, first-round interviews, and funnel analytics in one workflow.',
    ],
    faqs: [
      {
        id: 'high-volume-end-to-end',
        question: 'Can high-volume teams automate more than resume screening?',
        answer: [
          'Yes. HireSort can help high-volume teams source candidates, screen resumes in bulk, call suitable candidates, run first-round interviews, and deliver structured shortlists.',
        ],
      },
      {
        id: 'high-volume-phone-screens',
        question: 'Can AI phone screening help with high applicant volume?',
        answer: [
          'Yes. AI phone screening can check basics such as interest, location, notice period, and compensation alignment before recruiters spend time on deeper review.',
        ],
      },
    ],
    links: [
      { href: '/product/ai-phone-screening', label: 'AI Phone Screening' },
      { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
    ],
  },
  recruiters: {
    title: 'Recruiter workflows from sourcing to shortlist',
    body: [
      'HireSort keeps this page focused on recruiter productivity, screening consistency, and candidate tracking.',
      'Recruiters can also run the full workflow across job posting, sourcing, AI resume screening, phone screens, first-round interviews, and shortlist delivery.',
    ],
    faqs: [
      {
        id: 'recruiter-end-to-end',
        question: 'Can recruiters use HireSort for end-to-end workflows?',
        answer: [
          'Yes. Recruiters can use HireSort to create role structure, source candidates, screen resumes, run phone screens, review first-round interviews, and share structured shortlists.',
        ],
      },
      {
        id: 'recruiter-control',
        question: 'Can recruiters approve AI agent work?',
        answer: [
          'Yes. Recruiters can review AI-created JDs, sourcing results, resume scores, phone-screen notes, interview notes, and shortlist recommendations.',
        ],
      },
    ],
    links: [
      { href: '/product/agentic-sourcing', label: 'Agentic Sourcing' },
      { href: '/use-cases/recruiter-in-the-loop', label: 'Recruiter-in-the-Loop Hiring' },
    ],
  },
  'hiring-managers': {
    title: 'Hiring-manager review with richer candidate context',
    body: [
      'HireSort keeps this page focused on hiring-manager clarity, scorecards, and better shortlist review.',
      'Hiring managers can review candidates with resume evidence, phone-screen notes, first-round interview notes, assessments, and funnel context in one place.',
    ],
    faqs: [
      {
        id: 'manager-end-to-end-context',
        question: 'What extra context do hiring managers get from the full workflow?',
        answer: [
          'Hiring managers can review resume scores, screening criteria, phone-screen summaries, first-round interview notes, assessment summaries, and current funnel stage.',
        ],
      },
      {
        id: 'manager-interview-notes',
        question: 'Can hiring managers see phone-screen and interview notes?',
        answer: [
          'Yes. HireSort can structure phone-screen notes and first-round interview assessments so hiring managers can review stronger candidates faster.',
        ],
      },
    ],
    links: [
      { href: '/product/ai-first-round-interview', label: 'AI First-Round Interview' },
      { href: '/product/automated-screening-and-interviews', label: 'Automated Screening and Interviews' },
    ],
  },
  'recruitment-agencies': {
    title: 'Agency workflows from intake to client shortlist',
    body: [
      'HireSort keeps this page focused on agencies that need faster, more consistent client shortlists.',
      'Agencies can also use HireSort for role intake, JD creation, job posting, sourcing, resume screening, AI phone screens, interviews, and shortlist delivery.',
    ],
    faqs: [
      {
        id: 'agency-end-to-end',
        question: 'Can recruitment agencies use HireSort for the full client role workflow?',
        answer: [
          'Yes. Agencies can use HireSort to manage role intake, sourcing, screening, phone screens, first-round interviews, notes, assessments, and client-ready shortlists.',
        ],
      },
      {
        id: 'agency-client-shortlists',
        question: 'Does HireSort help agencies create better client shortlists?',
        answer: [
          'Yes. HireSort structures resume evidence, phone-screen notes, interview notes, scores, and shortlist status so agencies can share clearer recommendations with clients.',
        ],
      },
    ],
    links: [
      { href: '/use-cases/done-for-you-hiring', label: 'Done-for-You Hiring' },
      { href: '/product/candidate-pipeline', label: 'Candidate Pipeline' },
    ],
  },
  'done-for-you-hiring': {
    title: 'Done-for-you hiring across the full journey',
    body: [
      'HireSort keeps this page focused on handing the role to HireSort.',
      'Our recruiter team uses proprietary agentic workflows across role intake, sourcing, screening, phone screens, interviews, and final shortlist delivery.',
    ],
    faqs: [
      {
        id: 'done-for-you-shortlist-time',
        question: 'How fast can HireSort share finalized shortlists?',
        answer: [
          'For done-for-you hiring, HireSort aims to share finalized shortlists in 3-7 days, depending on role complexity, location, compensation, and candidate supply.',
        ],
      },
      {
        id: 'done-for-you-workflow-coverage',
        question: 'What parts of hiring does HireSort handle?',
        answer: [
          'HireSort can handle role understanding, JD creation support, sourcing, AI resume screening, AI phone screening, first-round interviews, structured notes, and shortlist delivery.',
        ],
      },
    ],
    links: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    ],
  },
  'recruiter-in-the-loop': {
    title: 'Recruiter-in-the-loop across every hiring step',
    body: [
      'HireSort keeps this page focused on human review and recruiter control.',
      'Recruiters can approve or adjust AI work across JD creation, sourcing, resume screening, phone screens, first-round interviews, and final shortlist decisions.',
    ],
    faqs: [
      {
        id: 'recruiter-loop-steps',
        question: 'Where can recruiters stay in the loop?',
        answer: [
          'Recruiters can stay in the loop at role setup, JD review, sourcing review, resume screening review, phone-screen review, interview review, and shortlist approval.',
        ],
      },
      {
        id: 'recruiter-loop-end-to-end',
        question: 'Can HireSort automate work without removing recruiter judgment?',
        answer: [
          'Yes. HireSort is designed to automate repetitive steps while recruiters review evidence, approve next steps, and make final hiring decisions.',
        ],
      },
    ],
    links: [
      { href: '/use-cases/done-for-you-hiring', label: 'Done-for-You Hiring' },
      { href: '/product/agentic-hiring-platform', label: 'Agentic Hiring Platform' },
    ],
  },
};

export function withEndToEndContext(page: ProductPage): ProductPage {
  const config = endToEndConfigs[page.slug];
  if (!config) {
    return { ...page, updatedAt };
  }

  return {
    ...page,
    updatedAt,
    sections: hasJourneySection(page.sections)
      ? page.sections
      : [...page.sections, journeySection(config)],
    faqs: mergeFaqs(page.faqs, config.faqs),
    internalLinks: mergeLinks(page.internalLinks, config.links),
  };
}
