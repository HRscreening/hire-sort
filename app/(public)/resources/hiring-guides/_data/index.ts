export type Cta = { label: string; href: string; context: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type InterviewQuestion = {
  question: string;
  strongSignal: string;
  watchOutFor: string;
};

export type ScorecardCriterion = {
  criterion: string;
  weight: number;
  whatToAssess: string;
};

export type HiringGuidePage = {
  slug: string;
  role: string;
  department: string;
  publishedAt: string;
  updatedAt: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    ogImageAlt?: string;
  };
  summary: {
    whatTheyDo: string;
    whenToHire: string;
    strongCandidatesShow: string[];
    bestFor: string[];
  };
  screening: {
    mustHave: string[];
    niceToHave: string[];
    redFlags: string[];
  };
  interviewQuestions: InterviewQuestion[];
  scorecard: {
    intro: string;
    criteria: ScorecardCriterion[];
    scoringAnchors: string[];
  };
  hiringProcess: string[];
  intake: {
    mustHaveRequirements: string[];
    trainableRequirements: string[];
    prompts: string[];
  };
  workSample: {
    task: string;
    timeLimit: string;
    howToScore: string[];
  };
  variants: string[];
  seniorityAdjustments: string[];
  falsePositives: string[];
  outcomes: {
    thirty: string[];
    sixty: string[];
    ninety: string[];
  };
  toolLinks: Cta[];
  relatedResources: { href: string; label: string; description: string }[];
  faqs: FaqItem[];
};

const appUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.hiresort.ai';

export const FREE_TOOLS = {
  jd: {
    label: 'Free AI JD Generator',
    href: '/free-tools/job-description-generator',
  },
  rubric: {
    label: 'Free AI Rubric Generator',
    href: '/free-tools/generate-rubric',
  },
  screening: {
    label: 'Free AI Resume Screening',
    href: '/free-tools/resume-screening',
  },
  spreadsheet: {
    label: 'Free Hiring Analytics Spreadsheet',
    href: '/free-tools/hiring-analytics-spreadsheet',
  },
  interview: {
    label: 'Interview questions by role',
    href: '/resources/interview-questions',
  },
};

const scoreAnchors = [
  '5 = strong evidence, directly relevant experience, and clear ownership.',
  '4 = good evidence with minor gaps that can be validated in interview.',
  '3 = meets the basic bar but needs a focused follow-up.',
  '2 = partial evidence with important missing signals.',
  '1 = little evidence or a clear mismatch for the role.',
];

export const softwareEngineer: HiringGuidePage = {
  slug: 'software-engineer',
  role: 'Software Engineer',
  department: 'Engineering',
  publishedAt: '2026-07-12',
  updatedAt: '2026-07-12',
  meta: {
    title: 'Software Engineer Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire software engineers faster with a practical screening checklist, interview questions, scorecard, work sample guidance, and free AI hiring tools.',
    keywords: [
      'software engineer hiring guide',
      'how to hire a software engineer',
      'software engineer screening checklist',
      'software engineer interview questions',
      'software engineer scorecard',
      'software engineer resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Software engineers build, test, ship, and maintain product or platform code.',
    whenToHire:
      'Hire when your roadmap needs reliable delivery, production quality, and clear code ownership.',
    strongCandidatesShow: [
      'Clear examples of shipped software, not only coursework or tutorials.',
      'Strong debugging habits and comfort explaining technical tradeoffs.',
      'Evidence of code quality, testing, collaboration, and production ownership.',
    ],
    bestFor: [
      'Product engineering teams',
      'Backend, frontend, or full-stack ownership',
      'Platform reliability and internal tooling',
      'Startup teams moving beyond founder-led engineering',
    ],
  },
  screening: {
    mustHave: [
      'Recent production software experience in a relevant stack.',
      'Evidence of owning features from requirements through release.',
      'Comfort with APIs, data models, tests, debugging, and review.',
      'Clear explanation of technical tradeoffs.',
    ],
    niceToHave: [
      'Experience with performance, security, observability, or distributed systems.',
      'Open-source work, technical writing, or strong portfolio projects.',
      'Mentoring, architecture ownership, or cross-functional product work.',
    ],
    redFlags: [
      'Many languages listed, but no shipped projects or impact.',
      'No evidence of testing, maintainability, or production debugging.',
      'Only individual work when the role requires team collaboration.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through a feature you shipped end to end. What tradeoffs did you make?',
      strongSignal: 'Shows ownership, constraints, release discipline, and outcome.',
      watchOutFor: 'Vague “we built” answers with no personal ownership or tradeoff.',
    },
    {
      question: 'Describe a production bug you investigated. How did you isolate the cause?',
      strongSignal: 'Uses logs, hypotheses, mitigation, and prevention steps.',
      watchOutFor: 'Jumping straight to fixes without explaining diagnosis.',
    },
    {
      question: 'How do you decide when code is ready to merge?',
      strongSignal: 'Mentions tests, review, readability, and edge cases.',
      watchOutFor: 'Only says “when it works” without quality or review signals.',
    },
    {
      question: 'Tell me about a time you disagreed with a technical direction.',
      strongSignal: 'Balances technical judgment with collaboration.',
      watchOutFor: 'Blames others or cannot explain the business context.',
    },
    {
      question: 'Design a simple API for a candidate shortlist workflow.',
      strongSignal: 'Clarifies scope, models data, and covers errors.',
      watchOutFor: 'Over-engineers before clarifying the basic workflow.',
    },
    {
      question: 'What would you improve in a slow page or endpoint?',
      strongSignal: 'Profiles first and avoids premature optimization.',
      watchOutFor: 'Guesses a fix without measuring the bottleneck.',
    },
    {
      question: 'How do you learn an unfamiliar codebase?',
      strongSignal: 'Starts with flows, tests, logs, and small changes.',
      watchOutFor: 'Relies only on reading code without running or testing it.',
    },
    {
      question: 'What engineering habit has most improved your work?',
      strongSignal: 'Shows self-awareness and a concrete habit.',
      watchOutFor: 'Gives a generic productivity answer with no behavior change.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare evidence, not interviewer vibes.',
    criteria: [
      {
        criterion: 'Role-relevant coding experience',
        weight: 25,
        whatToAssess: 'Shipped features, stack match, code quality, and problem complexity.',
      },
      {
        criterion: 'System and product judgment',
        weight: 20,
        whatToAssess: 'Tradeoffs, architecture choices, and ability to simplify.',
      },
      {
        criterion: 'Debugging and reliability',
        weight: 20,
        whatToAssess: 'Incident handling, root-cause analysis, tests, and observability.',
      },
      {
        criterion: 'Collaboration and communication',
        weight: 20,
        whatToAssess: 'Reviews, cross-functional work, documentation, and clarity.',
      },
      {
        criterion: 'Learning velocity',
        weight: 15,
        whatToAssess: 'Adaptability, curiosity, and ability to ramp in new codebases.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes against must-have engineering signals.',
    'Check motivation, role fit, and compensation alignment.',
    'Run a technical interview on shipped work and debugging.',
    'Use a realistic coding or work-sample task.',
    'Assess communication, review style, and tradeoffs.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Core stack and product area they will work in.',
      'Seniority level and expected ownership.',
      'Production or customer-facing experience expectations.',
      'Whether the role is frontend, backend, full-stack, or platform-focused.',
    ],
    trainableRequirements: [
      'Specific framework versions or internal libraries.',
      'Company-specific domain terminology.',
      'Internal deployment, observability, and incident processes.',
    ],
    prompts: [
      'Which systems will this person own in the first 90 days?',
      'What must they be able to ship without heavy supervision?',
      'Which gaps are acceptable if the candidate has strong fundamentals?',
    ],
  },
  workSample: {
    task: 'Ask for a small realistic feature, bug fix, or narrow system design.',
    timeLimit: '60–90 minutes live, or 2–3 hours take-home maximum.',
    howToScore: [
      'Correctness and handling of edge cases.',
      'Readable structure and maintainable choices.',
      'Testing approach and debugging habits.',
      'Clear tradeoff explanation.',
    ],
  },
  variants: [
    'Frontend engineer: prioritize UI quality, accessibility, state management, and product polish.',
    'Backend engineer: prioritize APIs, data modeling, reliability, and scalability tradeoffs.',
    'Full-stack engineer: prioritize end-to-end feature ownership and practical product judgment.',
    'Platform engineer: prioritize internal tooling, reliability, observability, and developer experience.',
  ],
  seniorityAdjustments: [
    'Junior: focus on fundamentals, learning speed, and coachability.',
    'Mid-level: focus on independent feature ownership and reliable delivery.',
    'Senior: focus on architecture, ambiguity, mentoring, and production judgment.',
  ],
  falsePositives: [
    'Big-company brand without hands-on feature ownership.',
    'Long tool lists without depth or clear shipped work.',
      'Portfolio polish without maintainable production habits.',
  ],
  outcomes: {
    thirty: [
      'Understands codebase, product flows, and review process.',
      'Ships small fixes with review support.',
    ],
    sixty: [
      'Owns medium features with estimates, tests, and release notes.',
      'Improves tests, observability, or docs.',
    ],
    ninety: [
      'Delivers independently and joins technical planning.',
      'Raises quality through review and debugging discipline.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted engineering rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more role-specific questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/software-engineer',
      label: 'Software Engineer job description',
      description: 'Use this to align responsibilities, must-haves, and expectations before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/software-engineer',
      label: 'Software Engineer screening rubric',
      description: 'Use this to score resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/software-engineer',
      label: 'Software Engineer interview scorecard',
      description: 'Use this to compare candidates with evidence-based ratings.',
    },
    {
      href: '/resources/interview-questions/software-engineer',
      label: 'Software Engineer interview questions',
      description: 'Use this for a deeper role-specific question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a software engineer?',
      answer: [
        'Start with a clear job description, screen resumes against must-have engineering criteria, ask role-specific technical and collaboration questions, and compare candidates using a weighted scorecard.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a software engineer screening checklist?',
      answer: [
        'Include production coding experience, shipped projects, stack relevance, debugging habits, testing, API or UI experience, and collaboration signals.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good software engineer interview questions?',
      answer: [
        'Good questions ask candidates to explain shipped work, debug real problems, discuss tradeoffs, design scoped systems, and show how they collaborate in code reviews and releases.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen software engineer resumes?',
      answer: [
        'Yes. HireSort can turn the role requirements into a screening rubric, score software engineer resumes against that rubric, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const productManager: HiringGuidePage = {
  slug: 'product-manager',
  role: 'Product Manager',
  department: 'Product',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Product Manager Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire product managers faster with a practical screening checklist, interview questions, scorecard, work sample guidance, and free AI hiring tools.',
    keywords: [
      'product manager hiring guide',
      'how to hire a product manager',
      'product manager screening checklist',
      'product manager interview questions',
      'product manager scorecard',
      'product manager resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Product managers define problems, prioritize bets, align teams, and ship product outcomes.',
    whenToHire:
      'Hire when your team needs sharper prioritization, customer discovery, roadmap ownership, and cross-functional execution.',
    strongCandidatesShow: [
      'Clear examples of turning ambiguous problems into shipped product decisions.',
      'Strong prioritization judgment using customer, business, and technical context.',
      'Evidence of working well with engineering, design, sales, support, and leadership.',
    ],
    bestFor: [
      'Product-led growth teams',
      'B2B SaaS or marketplace products',
      'Founder-led teams adding product discipline',
      'Teams with roadmap prioritization bottlenecks',
    ],
  },
  screening: {
    mustHave: [
      'Evidence of owning product discovery, prioritization, and delivery.',
      'Clear examples of customer insight influencing roadmap decisions.',
      'Comfort using data, user feedback, and tradeoffs to make decisions.',
      'Strong written communication across product, design, engineering, and GTM.',
    ],
    niceToHave: [
      'Experience in your product motion, such as PLG, enterprise, marketplace, or mobile.',
      'Analytics, SQL, experimentation, product ops, or technical background.',
      'Experience launching zero-to-one products or scaling mature product areas.',
    ],
    redFlags: [
      'Lists roadmap ownership but cannot explain decisions or tradeoffs.',
      'Over-indexes on stakeholder management without customer or data evidence.',
      'Only project management experience when the role requires product judgment.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through a product decision you made with incomplete information.',
      strongSignal: 'Clarifies assumptions, weighs tradeoffs, and explains the decision path.',
      watchOutFor: 'Claims certainty too early or cannot explain what evidence mattered.',
    },
    {
      question: 'Tell me about a product you shipped that did not perform as expected.',
      strongSignal: 'Owns the outcome, diagnoses causes, and explains what changed next.',
      watchOutFor: 'Blames execution without reflecting on discovery or prioritization.',
    },
    {
      question: 'How do you prioritize when sales, support, and engineering all want different things?',
      strongSignal: 'Uses customer impact, business value, effort, risk, and strategy.',
      watchOutFor: 'Defaults to the loudest stakeholder or leadership opinion.',
    },
    {
      question: 'Describe how you would improve activation for a B2B SaaS product.',
      strongSignal: 'Asks about users, funnel data, jobs-to-be-done, and experiment design.',
      watchOutFor: 'Jumps into features before diagnosing the drop-off.',
    },
    {
      question: 'How do you write requirements that help engineering move quickly?',
      strongSignal: 'Defines problem, user, scope, constraints, acceptance criteria, and risks.',
      watchOutFor: 'Writes solution-heavy specs without context or success criteria.',
    },
    {
      question: 'Tell me about a time you said no to a high-pressure request.',
      strongSignal: 'Shows prioritization discipline, communication, and stakeholder trust.',
      watchOutFor: 'Avoids conflict or says yes to everything.',
    },
    {
      question: 'What metrics would you use to judge whether a product area is healthy?',
      strongSignal: 'Chooses metrics tied to user value, retention, adoption, and business goals.',
      watchOutFor: 'Names vanity metrics without explaining decision use.',
    },
    {
      question: 'How do you build trust with engineering and design partners?',
      strongSignal: 'Shows clarity, context sharing, fast decisions, and respect for craft.',
      watchOutFor: 'Frames product as command-and-control rather than collaborative.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare product manager candidates on evidence, not presentation polish.',
    criteria: [
      {
        criterion: 'Product judgment',
        weight: 25,
        whatToAssess: 'Problem framing, prioritization, tradeoffs, and decision quality.',
      },
      {
        criterion: 'Customer and market insight',
        weight: 20,
        whatToAssess: 'Discovery habits, user empathy, segmentation, and market awareness.',
      },
      {
        criterion: 'Execution and delivery',
        weight: 20,
        whatToAssess: 'Roadmap ownership, launch discipline, scope management, and follow-through.',
      },
      {
        criterion: 'Data and outcome orientation',
        weight: 20,
        whatToAssess: 'Metric selection, experiment thinking, analysis, and learning loops.',
      },
      {
        criterion: 'Cross-functional leadership',
        weight: 15,
        whatToAssess: 'Communication, alignment, influence, and trust with partner teams.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes against product ownership and decision-making signals.',
    'Run a recruiter or founder screen for product scope, motivation, and domain fit.',
    'Use a product judgment interview focused on tradeoffs and shipped work.',
    'Give a realistic product case or work sample.',
    'Run a cross-functional interview with engineering or design.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Product area, business model, and customer segment.',
      'Seniority level and expected roadmap ownership.',
      'Discovery, analytics, and delivery expectations.',
      'Whether the role is growth, platform, core product, AI, or enterprise-focused.',
    ],
    trainableRequirements: [
      'Company-specific domain terminology.',
      'Internal planning, analytics, and release processes.',
      'Exact product management frameworks used by the team.',
    ],
    prompts: [
      'Which product decisions will this person own in the first 90 days?',
      'What customer or business problem must they improve first?',
      'Which gaps are acceptable if the candidate has strong product judgment?',
    ],
  },
  workSample: {
    task: 'Ask for a scoped product brief, prioritization memo, or activation improvement plan.',
    timeLimit: '60–90 minutes live, or 2–3 hours take-home maximum.',
    howToScore: [
      'Problem clarity and assumptions.',
      'Customer and business reasoning.',
      'Prioritization and tradeoff quality.',
      'Success metrics and next learning step.',
    ],
  },
  variants: [
    'Growth PM: prioritize funnel thinking, experimentation, activation, retention, and monetization.',
    'Platform PM: prioritize internal users, technical constraints, reliability, and leverage.',
    'Enterprise PM: prioritize stakeholder complexity, adoption, security, and implementation realities.',
    'AI PM: prioritize data, model limitations, evaluation, UX trust, and responsible rollout.',
  ],
  seniorityAdjustments: [
    'Associate PM: focus on structured thinking, learning speed, and execution support.',
    'Mid-level PM: focus on independent product area ownership and clear prioritization.',
    'Senior PM: focus on strategy, ambiguity, influence, and measurable business impact.',
  ],
  falsePositives: [
    'Polished storytelling without specific product decisions or outcomes.',
    'Project coordination experience presented as product ownership.',
    'Framework-heavy answers without customer, data, or tradeoff evidence.',
  ],
  outcomes: {
    thirty: [
      'Understands users, product flows, metrics, and team operating rhythm.',
      'Builds trust with engineering, design, and GTM partners.',
    ],
    sixty: [
      'Owns a prioritized roadmap slice with clear problem framing.',
      'Runs discovery or analysis that changes product direction.',
    ],
    ninety: [
      'Ships or meaningfully advances a product initiative.',
      'Improves decision quality through clearer metrics and prioritization.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen resumes against this PM checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted PM screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more product manager questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the PM JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/product-manager',
      label: 'Product Manager job description',
      description: 'Use this to align responsibilities, requirements, and success expectations before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/product-manager',
      label: 'Product Manager screening rubric',
      description: 'Use this to score resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/product-manager',
      label: 'Product Manager interview scorecard',
      description: 'Use this to compare PM candidates with evidence-based ratings.',
    },
    {
      href: '/resources/interview-questions/product-manager',
      label: 'Product Manager interview questions',
      description: 'Use this for a deeper role-specific PM question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a product manager?',
      answer: [
        'Start with the product area and ownership scope, screen for product judgment and shipped outcomes, ask tradeoff-based interview questions, and compare candidates using a weighted scorecard.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a product manager screening checklist?',
      answer: [
        'Include product ownership, customer discovery, prioritization, roadmap decisions, metrics, delivery, and cross-functional leadership signals.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good product manager interview questions?',
      answer: [
        'Good PM questions test product judgment, prioritization, customer insight, metric thinking, stakeholder management, and examples of shipped product decisions.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen product manager resumes?',
      answer: [
        'Yes. HireSort can turn the PM role requirements into a screening rubric, score resumes against that rubric, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const businessDevelopmentExecutive: HiringGuidePage = {
  slug: 'business-development-executive',
  role: 'Business Development Executive',
  department: 'Sales',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Business Development Executive Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire business development executives faster with a practical screening checklist, interview questions, scorecard, outreach work sample guidance, and free AI hiring tools.',
    keywords: [
      'business development executive hiring guide',
      'how to hire a business development executive',
      'business development executive screening checklist',
      'business development executive interview questions',
      'business development executive scorecard',
      'business development executive resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Business development executives generate pipeline through outreach, qualification, and early-stage sales conversations.',
    whenToHire:
      'Hire when you need more qualified meetings, faster prospecting, cleaner pipeline creation, and consistent outreach execution.',
    strongCandidatesShow: [
      'Evidence of prospecting discipline, activity volume, and qualified meeting creation.',
      'Clear understanding of ICP, buyer pain, qualification, and objection handling.',
      'Resilience, concise communication, and comfort learning from rejection.',
    ],
    bestFor: [
      'Outbound sales teams',
      'Founder-led teams building pipeline',
      'B2B SaaS or services sales motions',
      'Teams needing more qualified discovery calls',
    ],
  },
  screening: {
    mustHave: [
      'Experience in outbound prospecting, lead generation, inside sales, or customer-facing sales.',
      'Clear examples of booking meetings, qualifying leads, or creating pipeline.',
      'Comfort with CRM hygiene, email outreach, calls, follow-ups, and sales metrics.',
      'Strong written and verbal communication with a concise, buyer-focused style.',
    ],
    niceToHave: [
      'Experience selling to a similar ICP, industry, region, or deal size.',
      'Familiarity with tools like HubSpot, Salesforce, Apollo, LinkedIn, or sales engagement platforms.',
      'Experience with cold calling, social selling, events, partnerships, or account research.',
    ],
    redFlags: [
      'Claims pipeline ownership but cannot explain activity, conversion, or qualification metrics.',
      'Focuses only on scripts without showing buyer research or personalization.',
      'No examples of handling rejection, follow-up, or missed targets.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through how you prospect into a new account.',
      strongSignal: 'Defines ICP, researches triggers, identifies buyers, and sequences outreach.',
      watchOutFor: 'Starts blasting generic messages without account research.',
    },
    {
      question: 'Tell me about a month where you missed target. What did you change?',
      strongSignal: 'Owns the gap, analyzes activity and conversion, and adjusts behavior.',
      watchOutFor: 'Blames market, product, or leads without self-correction.',
    },
    {
      question: 'How do you qualify whether a lead is worth passing to sales?',
      strongSignal: 'Covers pain, fit, urgency, authority, budget, and next step clarity.',
      watchOutFor: 'Treats any interested reply as qualified pipeline.',
    },
    {
      question: 'Write a short outreach angle for a VP of HR at a 300-person SaaS company.',
      strongSignal: 'Uses buyer context, pain, relevance, and a simple call to action.',
      watchOutFor: 'Writes a product-heavy pitch with no buyer-specific reason.',
    },
    {
      question: 'How do you handle “send me more information”?',
      strongSignal: 'Clarifies interest, asks a follow-up question, and earns a next step.',
      watchOutFor: 'Sends a deck and lets the conversation die.',
    },
    {
      question: 'What metrics do you track to improve your prospecting?',
      strongSignal: 'Mentions activity, connect rate, reply rate, meeting rate, show rate, and quality.',
      watchOutFor: 'Only tracks total emails or calls without conversion insight.',
    },
    {
      question: 'Describe a time you personalized outreach and it worked.',
      strongSignal: 'Shows research quality, specific hook, and measurable response.',
      watchOutFor: 'Calls first-name insertion personalization.',
    },
    {
      question: 'How do you stay consistent during repetitive outbound work?',
      strongSignal: 'Has routines, prioritization, feedback loops, and resilience habits.',
      watchOutFor: 'Depends only on motivation or manager pressure.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare BDE candidates on pipeline evidence, not confidence alone.',
    criteria: [
      {
        criterion: 'Prospecting discipline',
        weight: 25,
        whatToAssess: 'Activity consistency, account research, sequencing, and follow-up habits.',
      },
      {
        criterion: 'Qualification judgment',
        weight: 20,
        whatToAssess: 'ICP fit, pain discovery, urgency, buyer relevance, and next-step clarity.',
      },
      {
        criterion: 'Communication quality',
        weight: 20,
        whatToAssess: 'Concise writing, call presence, buyer focus, and objection handling.',
      },
      {
        criterion: 'Sales metrics and learning',
        weight: 20,
        whatToAssess: 'Use of conversion data, target ownership, iteration, and CRM discipline.',
      },
      {
        criterion: 'Resilience and coachability',
        weight: 15,
        whatToAssess: 'Response to rejection, feedback adoption, consistency, and self-awareness.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for outbound activity, meeting creation, and qualification evidence.',
    'Run a recruiter screen for motivation, sales motion fit, and communication quality.',
    'Use a sales judgment interview focused on prospecting, qualification, and objections.',
    'Give a short outreach or call role-play work sample.',
    'Run a manager interview for coachability, targets, and operating rhythm.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Target ICP, region, segment, and buyer persona.',
      'Primary channel mix: email, calls, LinkedIn, events, partnerships, or inbound qualification.',
      'Meeting, pipeline, or activity expectations.',
      'Sales tools, CRM requirements, and handoff process to account executives or founders.',
    ],
    trainableRequirements: [
      'Company-specific messaging and objection handling.',
      'Product details, competitive positioning, and sales collateral.',
      'Internal CRM fields, sequences, and reporting process.',
    ],
    prompts: [
      'What does a qualified meeting mean for this role?',
      'Which activity and conversion metrics matter most in the first 90 days?',
      'Which sales behaviors are non-negotiable versus coachable?',
    ],
  },
  workSample: {
    task: 'Ask for a short prospecting plan, personalized email, and objection-handling role play.',
    timeLimit: '45–60 minutes live, or 90 minutes take-home maximum.',
    howToScore: [
      'ICP and account research quality.',
      'Message clarity and personalization.',
      'Qualification and next-step control.',
      'Coachability after feedback.',
    ],
  },
  variants: [
    'Outbound BDE: prioritize prospecting volume, personalization, sequencing, and call discipline.',
    'Inbound BDE: prioritize speed-to-lead, qualification, discovery, and handoff quality.',
    'Partnerships BDE: prioritize account mapping, relationship building, and mutual value framing.',
    'Enterprise BDE: prioritize account research, multi-threading, and executive relevance.',
  ],
  seniorityAdjustments: [
    'Entry-level: focus on communication, resilience, coachability, and activity discipline.',
    'Mid-level: focus on independent prospecting, qualification quality, and conversion improvement.',
    'Senior: focus on account strategy, playbook improvement, mentoring, and pipeline quality.',
  ],
  falsePositives: [
    'High energy without consistent activity or conversion evidence.',
    'Strong interview charisma but weak written outreach examples.',
    'Big logo sales experience without hands-on prospecting ownership.',
  ],
  outcomes: {
    thirty: [
      'Understands ICP, messaging, CRM workflow, and qualification rules.',
      'Runs consistent outreach with manager feedback.',
    ],
    sixty: [
      'Books qualified meetings from prioritized accounts or lead sources.',
      'Improves reply and meeting conversion through iteration.',
    ],
    ninety: [
      'Creates reliable pipeline and maintains clean CRM handoffs.',
      'Contributes learnings to messaging, targeting, and outbound playbooks.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen BDE resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted sales screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more BDE interview questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the BDE JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/business-development-executive',
      label: 'Business Development Executive job description',
      description: 'Use this to align responsibilities, sales motion, and target expectations before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/business-development-executive',
      label: 'Business Development Executive screening rubric',
      description: 'Use this to score BDE resumes consistently before interviews.',
    },
    {
      href: '/resources/interview-questions/business-development-executive',
      label: 'Business Development Executive interview questions',
      description: 'Use this for a deeper role-specific BDE question bank.',
    },
    {
      href: '/resources/scorecards',
      label: 'Interview scorecards',
      description: 'Use HireSort scorecard templates to compare candidates with structured ratings.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a business development executive?',
      answer: [
        'Start with your ICP, outreach channels, and qualification rules, then screen for prospecting evidence, communication quality, sales metrics, resilience, and coachability.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a BDE screening checklist?',
      answer: [
        'Include outbound experience, meeting creation, qualification judgment, CRM discipline, written outreach quality, call confidence, metrics ownership, and resilience.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good business development executive interview questions?',
      answer: [
        'Good questions test prospecting process, lead qualification, objection handling, target ownership, personalization, and learning from missed targets.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen BDE resumes?',
      answer: [
        'Yes. HireSort can turn BDE requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const hrExecutive: HiringGuidePage = {
  slug: 'hr-executive',
  role: 'HR Executive',
  department: 'Human Resources',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'HR Executive Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire HR executives faster with a practical screening checklist, interview questions, scorecard, HR operations work sample guidance, and free AI hiring tools.',
    keywords: [
      'hr executive hiring guide',
      'how to hire an hr executive',
      'hr executive screening checklist',
      'hr executive interview questions',
      'hr executive scorecard',
      'hr executive resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'HR executives support hiring, onboarding, employee operations, records, policies, and day-to-day people processes.',
    whenToHire:
      'Hire when your team needs reliable HR operations, cleaner employee documentation, smoother onboarding, and consistent candidate or employee coordination.',
    strongCandidatesShow: [
      'Clear examples of handling HR operations with accuracy, confidentiality, and follow-through.',
      'Strong communication with candidates, employees, managers, and external vendors.',
      'Evidence of organizing hiring, onboarding, payroll inputs, attendance, or employee records.',
    ],
    bestFor: [
      'Growing startups formalizing HR operations',
      'Teams with high hiring coordination needs',
      'Companies improving onboarding and employee records',
      'HR teams needing reliable execution support',
    ],
  },
  screening: {
    mustHave: [
      'Experience in HR operations, recruitment coordination, onboarding, employee records, or HR administration.',
      'Strong attention to detail with confidential employee or candidate information.',
      'Comfort using spreadsheets, HRMS/ATS tools, email, calendars, and documentation workflows.',
      'Clear communication and follow-through with employees, candidates, and managers.',
    ],
    niceToHave: [
      'Experience with payroll inputs, attendance, leave management, compliance, or employee engagement.',
      'Familiarity with HR tools, ATS platforms, background checks, or vendor coordination.',
      'Experience supporting hiring drives, campus hiring, or high-volume interview scheduling.',
    ],
    redFlags: [
      'Describes HR work only in vague coordination terms without ownership or accuracy examples.',
      'No evidence of confidentiality, documentation discipline, or follow-through.',
      'Poor written communication for a role that requires candidate and employee communication.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through an HR process you owned from start to finish.',
      strongSignal: 'Explains steps, stakeholders, documentation, timelines, and follow-through.',
      watchOutFor: 'Only says they coordinated without explaining ownership or outcomes.',
    },
    {
      question: 'How do you handle confidential employee information?',
      strongSignal: 'Shows discretion, access control, documentation hygiene, and escalation judgment.',
      watchOutFor: 'Treats confidentiality casually or gives broad sharing examples.',
    },
    {
      question: 'Describe a time you had to coordinate many interviews or HR tasks at once.',
      strongSignal: 'Uses prioritization, tracking, reminders, and clear communication.',
      watchOutFor: 'Relies only on memory or last-minute follow-ups.',
    },
    {
      question: 'How would you improve a messy onboarding process?',
      strongSignal: 'Maps steps, owners, documents, timelines, and feedback loops.',
      watchOutFor: 'Suggests more meetings without fixing process clarity.',
    },
    {
      question: 'Tell me about a difficult employee or candidate interaction you handled.',
      strongSignal: 'Stays calm, communicates clearly, documents facts, and escalates appropriately.',
      watchOutFor: 'Blames the person or shares sensitive details unnecessarily.',
    },
    {
      question: 'What HR data or trackers do you maintain, and how do you keep them accurate?',
      strongSignal: 'Mentions audits, naming rules, ownership, version control, and regular updates.',
      watchOutFor: 'Has no clear system for checking data quality.',
    },
    {
      question: 'How do you make sure managers complete their parts of an HR process on time?',
      strongSignal: 'Uses clear timelines, reminders, escalation paths, and stakeholder alignment.',
      watchOutFor: 'Waits passively or escalates too late.',
    },
    {
      question: 'What does a good candidate experience mean to you?',
      strongSignal: 'Focuses on clarity, responsiveness, respect, scheduling hygiene, and feedback loops.',
      watchOutFor: 'Equates candidate experience only with friendliness.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare HR executive candidates on operational reliability, not just people skills.',
    criteria: [
      {
        criterion: 'HR operations execution',
        weight: 25,
        whatToAssess: 'Process ownership, documentation, coordination, timelines, and follow-through.',
      },
      {
        criterion: 'Attention to detail and confidentiality',
        weight: 25,
        whatToAssess: 'Accuracy, data hygiene, discretion, record handling, and compliance awareness.',
      },
      {
        criterion: 'Communication and stakeholder management',
        weight: 20,
        whatToAssess: 'Candidate, employee, manager, and vendor communication quality.',
      },
      {
        criterion: 'Recruitment and onboarding support',
        weight: 15,
        whatToAssess: 'Scheduling, ATS usage, onboarding checklists, and candidate experience.',
      },
      {
        criterion: 'Problem solving and process improvement',
        weight: 15,
        whatToAssess: 'Ability to organize messy workflows and improve repeatable HR processes.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for HR operations, coordination, documentation, and confidentiality signals.',
    'Run a recruiter or HR screen for communication quality, availability, and role fit.',
    'Use a behavioral interview focused on HR process ownership and stakeholder handling.',
    'Give a practical HR coordination or onboarding work sample.',
    'Run a manager interview for confidentiality, judgment, and execution discipline.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Core HR processes this person will own or support.',
      'Tools used for ATS, HRMS, payroll inputs, attendance, documents, and communication.',
      'Expected hiring, onboarding, employee operations, or engagement workload.',
      'Confidentiality, compliance, and documentation expectations.',
    ],
    trainableRequirements: [
      'Company-specific HR policies and approval workflows.',
      'Internal templates, trackers, and naming conventions.',
      'Exact HRMS, ATS, or payroll system workflows.',
    ],
    prompts: [
      'Which HR processes are currently breaking or slowing the team down?',
      'What must this person handle independently in the first 90 days?',
      'Which tasks require high confidentiality or accuracy from day one?',
    ],
  },
  workSample: {
    task: 'Ask the candidate to build an onboarding checklist, clean a small HR tracker, or draft candidate communication.',
    timeLimit: '45–60 minutes live, or 90 minutes take-home maximum.',
    howToScore: [
      'Completeness and sequencing of steps.',
      'Accuracy and attention to detail.',
      'Clarity of employee or candidate communication.',
      'Escalation and confidentiality judgment.',
    ],
  },
  variants: [
    'Recruitment-focused HR executive: prioritize sourcing coordination, interview scheduling, ATS hygiene, and candidate experience.',
    'Operations-focused HR executive: prioritize records, onboarding, attendance, payroll inputs, and policy execution.',
    'Employee engagement HR executive: prioritize communication, events, feedback tracking, and employee support.',
    'Compliance-focused HR executive: prioritize documentation, audits, confidentiality, and process discipline.',
  ],
  seniorityAdjustments: [
    'Junior: focus on communication, detail orientation, follow-through, and coachability.',
    'Mid-level: focus on independent process ownership and reliable HR operations.',
    'Senior: focus on process improvement, manager partnership, confidentiality, and judgment.',
  ],
  falsePositives: [
    'Friendly personality without operational detail or follow-through evidence.',
    'Recruitment exposure without ownership of trackers, scheduling, or candidate communication.',
    'HR terminology without examples of confidential or accurate execution.',
  ],
  outcomes: {
    thirty: [
      'Understands HR tools, trackers, policies, and current employee/candidate workflows.',
      'Runs assigned coordination tasks with manager review.',
    ],
    sixty: [
      'Owns repeatable HR processes with fewer reminders and cleaner documentation.',
      'Improves candidate, onboarding, or employee communication consistency.',
    ],
    ninety: [
      'Handles core HR operations independently and keeps records accurate.',
      'Improves one or more HR workflows through better templates, trackers, or handoffs.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen HR executive resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted HR screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more HR executive questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the HR executive JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/hr-executive',
      label: 'HR Executive job description',
      description: 'Use this to align responsibilities, HR processes, and success expectations before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/hr-executive',
      label: 'HR Executive screening rubric',
      description: 'Use this to score HR executive resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/hr-executive',
      label: 'HR Executive interview scorecard',
      description: 'Use this to compare HR candidates with evidence-based ratings.',
    },
    {
      href: '/resources/interview-questions/hr-executive',
      label: 'HR Executive interview questions',
      description: 'Use this for a deeper role-specific HR question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire an HR executive?',
      answer: [
        'Start by defining the HR processes they will own, then screen for operational execution, attention to detail, confidentiality, communication, and process improvement evidence.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in an HR executive screening checklist?',
      answer: [
        'Include HR operations experience, onboarding, recruitment coordination, employee records, confidentiality, written communication, tool usage, and follow-through signals.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good HR executive interview questions?',
      answer: [
        'Good questions test HR process ownership, confidentiality, stakeholder communication, scheduling discipline, documentation accuracy, and candidate or employee experience.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen HR executive resumes?',
      answer: [
        'Yes. HireSort can turn HR executive requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const salesExecutive: HiringGuidePage = {
  slug: 'sales-executive',
  role: 'Sales Executive',
  department: 'Sales',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Sales Executive Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire sales executives faster with a practical screening checklist, interview questions, scorecard, sales role-play guidance, and free AI hiring tools.',
    keywords: [
      'sales executive hiring guide',
      'how to hire a sales executive',
      'sales executive screening checklist',
      'sales executive interview questions',
      'sales executive scorecard',
      'sales executive resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Sales executives convert qualified opportunities into revenue through discovery, demos, negotiation, and closing.',
    whenToHire:
      'Hire when you need stronger pipeline conversion, disciplined follow-up, clearer discovery, and reliable revenue ownership.',
    strongCandidatesShow: [
      'Clear examples of owning quota, pipeline, discovery, objections, and closed revenue.',
      'Strong buyer-focused communication and ability to diagnose business pain.',
      'Evidence of CRM discipline, forecast judgment, follow-up, and learning from lost deals.',
    ],
    bestFor: [
      'B2B sales teams scaling revenue',
      'Founder-led teams adding sales ownership',
      'Teams improving win rate and pipeline conversion',
      'Companies with consultative or solution-led sales motions',
    ],
  },
  screening: {
    mustHave: [
      'Experience carrying quota or owning revenue, pipeline, or closing conversations.',
      'Evidence of discovery, qualification, demos, negotiation, and follow-up discipline.',
      'Comfort using CRM data, sales stages, next steps, and forecasting basics.',
      'Strong verbal and written communication with buyer-focused messaging.',
    ],
    niceToHave: [
      'Experience selling to a similar ICP, segment, region, deal size, or sales cycle.',
      'Familiarity with sales methodologies such as MEDDICC, SPIN, Challenger, or consultative selling.',
      'Experience with renewals, upsells, channel sales, enterprise deals, or sales development.',
    ],
    redFlags: [
      'Claims strong sales results but cannot explain quota, pipeline, win rate, or deal examples.',
      'Talks mostly about product pitching without discovery or buyer pain.',
      'No evidence of CRM hygiene, follow-up, or structured next steps.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through a deal you won from first conversation to close.',
      strongSignal: 'Explains buyer pain, stakeholders, objections, next steps, and close path.',
      watchOutFor: 'Focuses on charisma or product features without sales process detail.',
    },
    {
      question: 'Tell me about a deal you lost. What did you learn?',
      strongSignal: 'Owns mistakes, diagnoses gaps, and shows changed behavior.',
      watchOutFor: 'Blames price, product, or procurement without reflection.',
    },
    {
      question: 'How do you run discovery with a new prospect?',
      strongSignal: 'Asks about goals, pain, urgency, impact, decision process, and success criteria.',
      watchOutFor: 'Rushes into a demo before understanding the buyer.',
    },
    {
      question: 'How do you handle a pricing objection?',
      strongSignal: 'Explores value, impact, alternatives, buying process, and tradeoffs.',
      watchOutFor: 'Discounts too quickly or argues instead of diagnosing.',
    },
    {
      question: 'What does good CRM hygiene look like to you?',
      strongSignal: 'Mentions stages, next steps, notes, dates, stakeholders, and forecast accuracy.',
      watchOutFor: 'Treats CRM updates as admin work only.',
    },
    {
      question: 'How do you decide which opportunities deserve your time?',
      strongSignal: 'Uses fit, urgency, pain, authority, timeline, and deal quality.',
      watchOutFor: 'Chases every lead equally or only follows the largest logo.',
    },
    {
      question: 'Role-play a follow-up after a demo where the buyer has gone quiet.',
      strongSignal: 'Creates relevance, asks a direct question, and proposes a clear next step.',
      watchOutFor: 'Sends generic “just checking in” messages.',
    },
    {
      question: 'How do you improve after missing quota?',
      strongSignal: 'Reviews activity, conversion, pipeline quality, messaging, and coaching feedback.',
      watchOutFor: 'Only says they will work harder without changing the system.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare sales executive candidates on sales evidence, not interview confidence alone.',
    criteria: [
      {
        criterion: 'Sales process and deal ownership',
        weight: 25,
        whatToAssess: 'Discovery, qualification, demo control, next steps, and closing discipline.',
      },
      {
        criterion: 'Buyer communication',
        weight: 20,
        whatToAssess: 'Listening, pain diagnosis, value framing, objection handling, and follow-up clarity.',
      },
      {
        criterion: 'Revenue and pipeline evidence',
        weight: 20,
        whatToAssess: 'Quota ownership, pipeline creation, conversion, win/loss learning, and forecast quality.',
      },
      {
        criterion: 'CRM and operating discipline',
        weight: 20,
        whatToAssess: 'Stage hygiene, notes, tasks, follow-up, prioritization, and reporting accuracy.',
      },
      {
        criterion: 'Coachability and resilience',
        weight: 15,
        whatToAssess: 'Response to missed targets, feedback adoption, consistency, and self-awareness.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for quota, pipeline, deal ownership, and sales process evidence.',
    'Run a recruiter screen for communication, motivation, and sales motion fit.',
    'Use a sales interview focused on discovery, objections, and deal examples.',
    'Give a realistic sales role-play or written follow-up task.',
    'Run a manager interview for forecast judgment, coachability, and target ownership.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Target ICP, buyer persona, deal size, sales cycle, and quota expectations.',
      'Sales motion: outbound, inbound, full-cycle, channel, transactional, SMB, mid-market, or enterprise.',
      'Required CRM, sales tools, reporting, and handoff process.',
      'Expected discovery, demo, negotiation, and closing ownership.',
    ],
    trainableRequirements: [
      'Company-specific pitch, positioning, objection handling, and competitive context.',
      'Internal CRM fields, sales stages, forecast process, and collateral.',
      'Exact product knowledge and industry terminology.',
    ],
    prompts: [
      'Which part of the sales process needs the most improvement?',
      'What does success look like in pipeline, win rate, and revenue after 90 days?',
      'Which sales behaviors are non-negotiable versus coachable?',
    ],
  },
  workSample: {
    task: 'Ask the candidate to run a short discovery role-play, handle one objection, and write a follow-up email.',
    timeLimit: '45–60 minutes live, or 90 minutes take-home maximum.',
    howToScore: [
      'Discovery depth and buyer focus.',
      'Value framing and objection handling.',
      'Clear next-step control.',
      'Follow-up quality and CRM thinking.',
    ],
  },
  variants: [
    'Inside sales executive: prioritize speed, volume, qualification, demos, and follow-up discipline.',
    'Field sales executive: prioritize territory planning, relationship building, and complex stakeholder management.',
    'Enterprise sales executive: prioritize account strategy, multi-threading, procurement, and long-cycle forecasting.',
    'Full-cycle sales executive: prioritize prospecting, discovery, closing, and post-demo follow-up ownership.',
  ],
  seniorityAdjustments: [
    'Junior: focus on communication, sales fundamentals, activity discipline, and coachability.',
    'Mid-level: focus on independent pipeline ownership, discovery quality, and quota progress.',
    'Senior: focus on complex deals, forecast judgment, account strategy, and mentoring.',
  ],
  falsePositives: [
    'High confidence without specific quota, deal, or pipeline evidence.',
    'Strong product pitch but weak discovery or qualification habits.',
    'Past sales title without clear ownership of revenue or next steps.',
  ],
  outcomes: {
    thirty: [
      'Understands ICP, pitch, CRM process, sales stages, and qualification rules.',
      'Runs calls or demos with manager feedback.',
    ],
    sixty: [
      'Owns active opportunities with clear next steps and clean CRM updates.',
      'Improves conversion through better discovery, follow-up, and objection handling.',
    ],
    ninety: [
      'Builds reliable pipeline movement and contributes to revenue targets.',
      'Improves forecast quality and shares learnings from wins and losses.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen sales executive resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted sales screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more sales executive questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the sales executive JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/sales-executive',
      label: 'Sales Executive job description',
      description: 'Use this to align responsibilities, quota expectations, and sales motion before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/sales-executive',
      label: 'Sales Executive screening rubric',
      description: 'Use this to score sales executive resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/sales-executive',
      label: 'Sales Executive interview scorecard',
      description: 'Use this to compare sales candidates with evidence-based ratings.',
    },
    {
      href: '/resources/interview-questions/sales-executive',
      label: 'Sales Executive interview questions',
      description: 'Use this for a deeper role-specific sales question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a sales executive?',
      answer: [
        'Start with your sales motion, quota expectations, ICP, and deal ownership needs, then screen for sales process, buyer communication, pipeline evidence, CRM discipline, and resilience.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a sales executive screening checklist?',
      answer: [
        'Include quota ownership, deal examples, discovery, qualification, demos, objections, CRM discipline, follow-up, pipeline metrics, and coachability.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good sales executive interview questions?',
      answer: [
        'Good questions test deal ownership, discovery, objection handling, pipeline prioritization, follow-up discipline, CRM hygiene, and learning from lost deals.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen sales executive resumes?',
      answer: [
        'Yes. HireSort can turn sales executive requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const dataAnalyst: HiringGuidePage = {
  slug: 'data-analyst',
  role: 'Data Analyst',
  department: 'Analytics',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Data Analyst Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire data analysts faster with a practical screening checklist, interview questions, scorecard, analytics work sample guidance, and free AI hiring tools.',
    keywords: [
      'data analyst hiring guide',
      'how to hire a data analyst',
      'data analyst screening checklist',
      'data analyst interview questions',
      'data analyst scorecard',
      'data analyst resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Data analysts turn business questions into clean analysis, useful reporting, and decision-ready insights.',
    whenToHire:
      'Hire when teams need reliable dashboards, cleaner metric definitions, sharper analysis, and faster answers from data.',
    strongCandidatesShow: [
      'Clear examples of using SQL, spreadsheets, BI tools, or Python/R to answer business questions.',
      'Strong data-quality instincts and comfort explaining assumptions, caveats, and tradeoffs.',
      'Evidence of turning analysis into decisions, not only producing charts or reports.',
    ],
    bestFor: [
      'Teams building KPI reporting',
      'Revenue, product, or operations analytics',
      'Companies cleaning up dashboards and metrics',
      'Founders moving beyond manual spreadsheet analysis',
    ],
  },
  screening: {
    mustHave: [
      'Hands-on experience querying, cleaning, analyzing, and presenting data.',
      'Comfort with SQL, spreadsheets, BI tools, and metric definitions.',
      'Examples of analysis that influenced a business, product, revenue, or operations decision.',
      'Clear communication of assumptions, limitations, and recommended next steps.',
    ],
    niceToHave: [
      'Experience with Python, R, dbt, data warehouses, experimentation, or product analytics.',
      'Domain experience in SaaS, marketplace, finance, operations, marketing, or HR analytics.',
      'Experience building dashboards, automated reports, or self-serve analytics systems.',
    ],
    redFlags: [
      'Lists tools without explaining business questions answered or decisions influenced.',
      'No evidence of data cleaning, validation, or metric-definition work.',
      'Creates charts but cannot explain interpretation, caveats, or actionability.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through an analysis you did that changed a decision.',
      strongSignal: 'Explains question, data, method, caveats, recommendation, and outcome.',
      watchOutFor: 'Describes a dashboard but not the decision it supported.',
    },
    {
      question: 'How do you check whether a dataset is trustworthy?',
      strongSignal: 'Mentions missing values, duplicates, joins, outliers, definitions, and source checks.',
      watchOutFor: 'Trusts exported data without validation.',
    },
    {
      question: 'Write the steps you would take to investigate a drop in weekly signups.',
      strongSignal: 'Segments by channel, geography, device, funnel stage, and time window.',
      watchOutFor: 'Jumps to one explanation without structured diagnosis.',
    },
    {
      question: 'How do you define a metric when stakeholders disagree?',
      strongSignal: 'Clarifies business use, numerator, denominator, exclusions, and owner.',
      watchOutFor: 'Picks a definition without aligning decision context.',
    },
    {
      question: 'Tell me about a dashboard you built. How did you decide what belonged on it?',
      strongSignal: 'Ties dashboard fields to users, decisions, cadence, and guardrails.',
      watchOutFor: 'Adds every available metric without prioritization.',
    },
    {
      question: 'How would you explain a technical analysis to a non-technical stakeholder?',
      strongSignal: 'Starts with answer, explains evidence, caveats, and business implication.',
      watchOutFor: 'Overloads the stakeholder with methodology before the answer.',
    },
    {
      question: 'Describe a time your first analysis was wrong or incomplete.',
      strongSignal: 'Shows validation, correction, transparency, and process improvement.',
      watchOutFor: 'Cannot name an example or hides uncertainty.',
    },
    {
      question: 'What makes a good SQL query or spreadsheet model maintainable?',
      strongSignal: 'Mentions clear naming, comments, tests/checks, modular logic, and reproducibility.',
      watchOutFor: 'Optimizes only for quick one-off output.',
    },
  ],
  scorecard: {
    intro: 'Use this scorecard to compare data analyst candidates on decision-quality evidence, not tool lists alone.',
    criteria: [
      {
        criterion: 'Analytical problem solving',
        weight: 25,
        whatToAssess: 'Question framing, structured diagnosis, assumptions, and recommendation quality.',
      },
      {
        criterion: 'Technical data skills',
        weight: 25,
        whatToAssess: 'SQL, spreadsheets, BI, data cleaning, joins, reproducibility, and tool fit.',
      },
      {
        criterion: 'Data quality and metric judgment',
        weight: 20,
        whatToAssess: 'Validation, metric definitions, caveats, source checks, and interpretation discipline.',
      },
      {
        criterion: 'Business communication',
        weight: 20,
        whatToAssess: 'Clear storytelling, stakeholder alignment, answer-first communication, and actionability.',
      },
      {
        criterion: 'Ownership and learning',
        weight: 10,
        whatToAssess: 'Follow-through, curiosity, documentation, and ability to improve analytics workflows.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for analysis impact, SQL/spreadsheet skills, and data-quality evidence.',
    'Run a recruiter or manager screen for communication, domain fit, and tool exposure.',
    'Use an analytics interview focused on problem framing and metric judgment.',
    'Give a realistic SQL, spreadsheet, or dashboard work sample.',
    'Run a stakeholder communication round using a short analysis presentation.',
    'Debrief with the same weighted scorecard.',
  ],
  intake: {
    mustHaveRequirements: [
      'Primary business area: product, revenue, marketing, operations, finance, or people analytics.',
      'Required tools: SQL, Excel/Sheets, BI tool, Python/R, warehouse, or analytics platform.',
      'Expected output: dashboards, ad hoc analysis, reporting, experimentation, or data cleanup.',
      'Metric ownership, stakeholder cadence, and decision-making context.',
    ],
    trainableRequirements: [
      'Company-specific schemas, metric definitions, and dashboards.',
      'Internal BI conventions, data warehouse structure, and reporting cadence.',
      'Domain-specific terminology and stakeholder workflows.',
    ],
    prompts: [
      'Which decisions should this person help the team make faster?',
      'Which dashboards or metrics are currently unreliable or missing?',
      'What level of SQL, BI, spreadsheet, or Python skill is truly required from day one?',
    ],
  },
  workSample: {
    task: 'Ask the candidate to analyze a small dataset, define key metrics, identify data-quality issues, and summarize recommendations.',
    timeLimit: '60–90 minutes live, or 2–3 hours take-home maximum.',
    howToScore: [
      'Problem framing and metric definitions.',
      'Data cleaning and validation approach.',
      'Accuracy of analysis and interpretation.',
      'Clarity of recommendation and caveats.',
    ],
  },
  variants: [
    'Product analyst: prioritize funnel analysis, retention, experimentation, and user behavior.',
    'Revenue analyst: prioritize pipeline, conversion, forecasting, pricing, and GTM metrics.',
    'Operations analyst: prioritize process metrics, capacity, cost, quality, and exception tracking.',
    'People analyst: prioritize hiring, retention, engagement, workforce planning, and privacy discipline.',
  ],
  seniorityAdjustments: [
    'Junior: focus on SQL/spreadsheet fundamentals, accuracy, curiosity, and communication.',
    'Mid-level: focus on independent analysis ownership and stakeholder-ready recommendations.',
    'Senior: focus on metric strategy, ambiguous problem solving, systems thinking, and analytics leadership.',
  ],
  falsePositives: [
    'Tool-heavy resume without business impact or decision examples.',
    'Beautiful dashboards that do not clarify decisions or metric definitions.',
    'Advanced modeling claims without data-quality or stakeholder communication evidence.',
  ],
  outcomes: {
    thirty: [
      'Understands key data sources, dashboards, metrics, and stakeholder questions.',
      'Completes small analyses with review and documents assumptions.',
    ],
    sixty: [
      'Owns recurring reporting or a focused analysis area with clear definitions.',
      'Improves data quality checks, dashboard usability, or metric documentation.',
    ],
    ninety: [
      'Delivers decision-ready analysis independently.',
      'Helps teams make faster decisions with clearer metrics and trusted reporting.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen data analyst resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted analytics screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more data analyst questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scores.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the data analyst JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/data-analyst',
      label: 'Data Analyst job description',
      description: 'Use this to align responsibilities, tools, and analytics ownership before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/data-analyst',
      label: 'Data Analyst screening rubric',
      description: 'Use this to score data analyst resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/data-analyst',
      label: 'Data Analyst interview scorecard',
      description: 'Use this to compare data analyst candidates with evidence-based ratings.',
    },
    {
      href: '/resources/interview-questions/data-analyst',
      label: 'Data Analyst interview questions',
      description: 'Use this for a deeper role-specific analytics question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a data analyst?',
      answer: [
        'Start by defining the business decisions they will support, then screen for analytical problem solving, SQL or spreadsheet ability, data-quality judgment, and clear stakeholder communication.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a data analyst screening checklist?',
      answer: [
        'Include SQL, spreadsheets, BI tools, data cleaning, metric definitions, dashboard experience, business impact, communication, and examples of decision-ready analysis.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good data analyst interview questions?',
      answer: [
        'Good questions test business problem framing, data-quality checks, SQL or spreadsheet thinking, metric definitions, dashboard design, and ability to explain findings clearly.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen data analyst resumes?',
      answer: [
        'Yes. HireSort can turn data analyst requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const operationsManager: HiringGuidePage = {
  slug: 'operations-manager',
  role: 'Operations Manager',
  department: 'Operations',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Operations Manager Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire operations managers faster with a practical screening checklist, interview questions, scorecard, work sample guidance, and free AI hiring tools.',
    keywords: [
      'operations manager hiring guide',
      'how to hire an operations manager',
      'operations manager screening checklist',
      'operations manager interview questions',
      'operations manager scorecard',
      'operations manager resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Operations managers turn messy workflows into reliable systems, clear owners, measurable processes, and smoother execution.',
    whenToHire:
      'Hire when work is falling through gaps, teams need stronger process ownership, or growth is creating quality, cost, speed, or coordination problems.',
    strongCandidatesShow: [
      'Clear examples of improving a process with measurable impact on speed, cost, quality, or reliability.',
      'Comfort owning operating metrics, cross-functional follow-through, vendors, escalations, and SOPs.',
      'Evidence of solving execution problems without adding unnecessary bureaucracy.',
    ],
    bestFor: [
      'Scaling teams with messy workflows',
      'Companies improving service quality or delivery speed',
      'Cross-functional projects with unclear ownership',
      'Teams moving from founder-led operations to repeatable systems',
    ],
  },
  screening: {
    mustHave: [
      'Examples of owning processes, SOPs, trackers, dashboards, or recurring operating rhythms.',
      'Measurable outcomes such as reduced turnaround time, fewer errors, lower cost, higher SLA performance, or better utilization.',
      'Experience coordinating across teams, vendors, leaders, or frontline operators.',
      'Clear judgment on when to standardize, automate, escalate, or redesign a process.',
    ],
    niceToHave: [
      'Experience with workforce planning, vendor management, procurement, logistics, customer operations, or business operations.',
      'Comfort with spreadsheets, dashboards, project management tools, CRM/ERP systems, or automation tools.',
      'Experience hiring, training, managing, or coaching operations teams.',
    ],
    redFlags: [
      'Resume says operations but shows only calendar coordination or admin support.',
      'No numbers around scale, volume, SLA, cost, error rate, team size, or impact.',
      'Lots of process language without examples of ownership, tradeoffs, or results.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through an operations process you improved end to end.',
      strongSignal:
        'Explains the starting problem, baseline metric, changes made, stakeholder management, and measurable outcome.',
      watchOutFor: 'Describes activity or coordination without a before/after result.',
    },
    {
      question: 'How do you identify the real bottleneck in a workflow?',
      strongSignal:
        'Looks at data, handoffs, queues, exceptions, capacity, incentives, and frontline context before recommending a fix.',
      watchOutFor: 'Assumes the bottleneck from intuition alone.',
    },
    {
      question: 'Tell me about a time execution was failing. What did you do first?',
      strongSignal:
        'Stabilizes the issue, clarifies owners, sets a cadence, removes blockers, and follows through until the metric improves.',
      watchOutFor: 'Blames other teams without showing ownership.',
    },
    {
      question: 'Which operating metrics have you owned, and how did you use them?',
      strongSignal:
        'Connects metrics to decisions, weekly management rhythm, root-cause review, and tradeoffs.',
      watchOutFor: 'Lists KPIs but cannot explain how they changed behavior.',
    },
    {
      question: 'How do you balance speed, cost, and quality when they conflict?',
      strongSignal:
        'Clarifies customer/business impact, constraints, risk tolerance, and the metric that matters most for the moment.',
      watchOutFor: 'Optimizes one dimension without naming the tradeoff.',
    },
    {
      question: 'Describe a stakeholder or vendor relationship you had to improve.',
      strongSignal:
        'Uses clear expectations, service levels, feedback loops, escalation paths, and documented agreements.',
      watchOutFor: 'Relies only on relationship-building without operating structure.',
    },
    {
      question: 'How do you decide whether a process needs an SOP, automation, or more training?',
      strongSignal:
        'Diagnoses frequency, risk, variance, skill gaps, tooling gaps, and failure modes before choosing a solution.',
      watchOutFor: 'Automates a broken process or writes SOPs nobody uses.',
    },
    {
      question: 'What would you do in your first 30 days in this operations role?',
      strongSignal:
        'Audits workflows, metrics, pain points, owners, existing tools, and quick wins before making big changes.',
      watchOutFor: 'Suggests sweeping redesign before understanding current operations.',
    },
  ],
  scorecard: {
    intro:
      'Use this scorecard to compare operations manager candidates on ownership, measurable improvement, and cross-functional execution.',
    criteria: [
      {
        criterion: 'Process improvement and systems thinking',
        weight: 25,
        whatToAssess:
          'Ability to map workflows, find bottlenecks, reduce waste, and build repeatable operating systems.',
      },
      {
        criterion: 'Metrics and operational judgment',
        weight: 20,
        whatToAssess:
          'Use of SLAs, quality, cost, throughput, error rates, capacity, and tradeoff-based decisions.',
      },
      {
        criterion: 'Cross-functional execution',
        weight: 20,
        whatToAssess:
          'Stakeholder management, follow-through, escalation handling, and dependency management.',
      },
      {
        criterion: 'Team, vendor, or frontline management',
        weight: 20,
        whatToAssess:
          'Ability to set expectations, coach teams, manage vendors, and maintain accountability.',
      },
      {
        criterion: 'Tooling and documentation discipline',
        weight: 15,
        whatToAssess:
          'Comfort with trackers, dashboards, SOPs, automation, project tools, and clean handoffs.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for measurable process ownership, operating metrics, and cross-functional scope.',
    'Run a recruiter or founder screen for role fit, operating context, and communication style.',
    'Use an operations interview focused on bottlenecks, metrics, tradeoffs, and execution examples.',
    'Give a practical workflow-improvement or operating-metrics work sample.',
    'Run a stakeholder round with a leader or team that depends on operations.',
    'Debrief with the same weighted scorecard for every candidate.',
  ],
  intake: {
    mustHaveRequirements: [
      'Operating area: customer ops, business ops, logistics, people ops, revenue ops, fulfillment, or general operations.',
      'Scale: team size, transaction volume, ticket volume, locations, vendors, or daily workflow complexity.',
      'Core metrics: SLA, turnaround time, cost, quality, error rate, utilization, throughput, or customer impact.',
      'Ownership scope: individual contributor, people manager, vendor owner, project lead, or site/process owner.',
    ],
    trainableRequirements: [
      'Company-specific tools, reporting formats, vendors, and operating cadences.',
      'Internal escalation paths, approval flows, and stakeholder communication norms.',
      'Domain-specific compliance, product knowledge, or customer context.',
    ],
    prompts: [
      'Which workflow is most painful today, and what would success look like in 90 days?',
      'Which metrics should this person own weekly?',
      'Where does the role need hands-on execution versus team or vendor management?',
    ],
  },
  workSample: {
    task:
      'Give the candidate a realistic broken workflow, operating dashboard, or escalation scenario and ask them to diagnose issues and propose a 30-day improvement plan.',
    timeLimit: '45–75 minutes live, or 2 hours take-home maximum.',
    howToScore: [
      'Quality of bottleneck diagnosis and prioritization.',
      'Use of metrics, tradeoffs, and operating cadence.',
      'Practicality of the proposed changes.',
      'Clarity of owners, timelines, and risk controls.',
    ],
  },
  variants: [
    'Business operations manager: prioritize analytics, planning, cross-functional projects, and executive-ready communication.',
    'Customer operations manager: prioritize SLAs, queues, staffing, quality control, and customer escalation handling.',
    'Logistics or fulfillment operations manager: prioritize throughput, cost, vendors, inventory, scheduling, and exception management.',
    'People operations manager: prioritize employee lifecycle workflows, compliance, systems, and service quality.',
  ],
  seniorityAdjustments: [
    'Junior: focus on process discipline, follow-through, spreadsheets, and strong ownership of assigned workflows.',
    'Mid-level: focus on independent process improvement, metrics ownership, and cross-functional execution.',
    'Senior: focus on operating strategy, team leadership, capacity planning, automation, and multi-team change management.',
  ],
  falsePositives: [
    'Polished project-management language without actual operating ownership.',
    'Big-company operations experience without evidence of hands-on problem solving.',
    'Tool familiarity that does not translate into better metrics, execution, or accountability.',
  ],
  outcomes: {
    thirty: [
      'Understands key workflows, owners, tools, metrics, and recurring operational pain points.',
      'Documents the current process and identifies quick wins with stakeholder alignment.',
    ],
    sixty: [
      'Improves one priority workflow with measurable progress.',
      'Creates or tightens operating cadence, dashboards, SOPs, or escalation paths.',
    ],
    ninety: [
      'Owns the operating rhythm independently and improves reliability, speed, quality, or cost.',
      'Builds repeatable systems that reduce founder or leadership firefighting.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen operations manager resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted operations screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more operations manager interview questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and scorecard ratings.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the operations manager JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/operations-manager',
      label: 'Operations Manager job description',
      description: 'Use this to define operating scope, metrics, responsibilities, and requirements before sourcing.',
    },
    {
      href: '/resources/scorecards/operations-manager',
      label: 'Operations Manager interview scorecard',
      description: 'Use this to compare candidates on process improvement, metrics, execution, and ownership.',
    },
    {
      href: '/resources/interview-questions',
      label: 'Interview questions by role',
      description: 'Use this broader question bank for additional structured interview prompts.',
    },
    {
      href: '/resources/screening-rubrics',
      label: 'Screening rubrics',
      description: 'Use this library to create consistent screening rubrics for operations and adjacent roles.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire an operations manager?',
      answer: [
        'Start by defining the workflow, metrics, and ownership scope. Then screen for measurable process improvement, cross-functional execution, operating judgment, and practical systems-building.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in an operations manager screening checklist?',
      answer: [
        'Include process ownership, operating metrics, workflow improvement, stakeholder management, vendor or team management, SOPs, dashboards, and examples of measurable impact.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good operations manager interview questions?',
      answer: [
        'Good questions test process improvement, bottleneck diagnosis, metric ownership, escalation handling, tradeoff judgment, stakeholder management, and first-90-day operating plans.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen operations manager resumes?',
      answer: [
        'Yes. HireSort can turn operations manager requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

export const customerSupportSpecialist: HiringGuidePage = {
  slug: 'customer-support-specialist',
  role: 'Customer Support Specialist',
  department: 'Customer Support',
  publishedAt: '2026-07-13',
  updatedAt: '2026-07-13',
  meta: {
    title: 'Customer Support Specialist Hiring Guide: Screening Checklist, Interview Questions & Scorecard',
    description:
      'Hire customer support specialists faster with a practical screening checklist, interview questions, scorecard, work sample guidance, and free AI hiring tools.',
    keywords: [
      'customer support specialist hiring guide',
      'how to hire a customer support specialist',
      'customer support screening checklist',
      'customer support interview questions',
      'customer support scorecard',
      'customer support resume screening',
    ],
  },
  summary: {
    whatTheyDo:
      'Customer support specialists help customers solve problems clearly, calmly, and quickly while protecting trust in the product and brand.',
    whenToHire:
      'Hire when ticket volume is growing, founders or product teams are handling too much support, or customers need faster and more consistent responses.',
    strongCandidatesShow: [
      'Clear examples of handling customer issues with empathy, accuracy, and follow-through.',
      'Strong written communication that is concise, warm, and easy for customers to act on.',
      'Evidence of learning product details quickly and spotting patterns in customer problems.',
    ],
    bestFor: [
      'Growing ticket queues',
      'SaaS or product-led support teams',
      'Teams improving response quality and consistency',
      'Companies moving support out of founder or product inboxes',
    ],
  },
  screening: {
    mustHave: [
      'Customer-facing experience in support, success, service, operations, or a similar role.',
      'Strong written communication with clear examples of explaining issues or resolving complaints.',
      'Comfort using helpdesk, CRM, chat, email, knowledge-base, or ticketing tools.',
      'Evidence of patience, ownership, follow-through, and ability to stay calm under pressure.',
    ],
    niceToHave: [
      'Experience with SaaS, technical support, billing support, onboarding, or high-volume queues.',
      'Ability to write or improve help-center articles, macros, templates, or internal notes.',
      'Experience tracking CSAT, first response time, resolution time, reopen rate, or escalation rate.',
    ],
    redFlags: [
      'Resume focuses on friendliness but not issue resolution, accuracy, or ownership.',
      'No examples of handling difficult customers, escalations, or recurring problems.',
      'Poor writing quality, vague communication, or excessive jargon in application materials.',
    ],
  },
  interviewQuestions: [
    {
      question: 'Walk me through a difficult customer issue you resolved.',
      strongSignal:
        'Explains the customer problem, tone used, steps taken, internal coordination, and final resolution.',
      watchOutFor: 'Focuses on calming the customer but not solving the underlying issue.',
    },
    {
      question: 'How would you respond if a customer is angry about a bug you cannot fix immediately?',
      strongSignal:
        'Acknowledges frustration, explains next steps honestly, sets expectations, and follows up.',
      watchOutFor: 'Overpromises, blames engineering, or uses a generic apology without action.',
    },
    {
      question: 'What makes a support reply easy for a customer to understand?',
      strongSignal:
        'Mentions plain language, structure, context, next steps, screenshots or links when useful, and a warm tone.',
      watchOutFor: 'Prioritizes speed over clarity or uses internal terminology.',
    },
    {
      question: 'Tell me about a recurring customer issue you noticed. What did you do with that pattern?',
      strongSignal:
        'Tracks patterns, tags issues, documents examples, and shares useful feedback with product or operations.',
      watchOutFor: 'Treats every ticket as isolated and never escalates patterns.',
    },
    {
      question: 'How do you prioritize tickets when everything feels urgent?',
      strongSignal:
        'Considers customer impact, severity, SLA, revenue risk, blocked workflows, and queue fairness.',
      watchOutFor: 'Only works newest tickets or loudest customers.',
    },
    {
      question: 'Describe a time you had to learn a product or policy quickly.',
      strongSignal:
        'Uses docs, testing, shadowing, examples, and careful escalation while building confidence.',
      watchOutFor: 'Guesses answers instead of checking or asking.',
    },
    {
      question: 'How do you know when to escalate a customer issue?',
      strongSignal:
        'Names severity, access risk, billing impact, technical uncertainty, policy exceptions, and clear handoff notes.',
      watchOutFor: 'Escalates everything or waits too long on serious issues.',
    },
    {
      question: 'Rewrite this confusing customer reply into a clearer response.',
      strongSignal:
        'Simplifies the message, keeps empathy, adds next steps, and avoids unsupported promises.',
      watchOutFor: 'Makes the reply longer without making it clearer.',
    },
  ],
  scorecard: {
    intro:
      'Use this scorecard to compare customer support candidates on communication, ownership, customer judgment, and product learning.',
    criteria: [
      {
        criterion: 'Written communication',
        weight: 25,
        whatToAssess:
          'Clarity, tone, structure, grammar, ability to explain steps, and customer-friendly writing.',
      },
      {
        criterion: 'Customer empathy and judgment',
        weight: 20,
        whatToAssess:
          'Ability to understand frustration, de-escalate issues, and choose the right response.',
      },
      {
        criterion: 'Issue resolution and ownership',
        weight: 25,
        whatToAssess:
          'Follow-through, troubleshooting discipline, prioritization, and resolution quality.',
      },
      {
        criterion: 'Product learning and process discipline',
        weight: 15,
        whatToAssess:
          'Ability to learn tools, use documentation, follow SOPs, and avoid unsupported answers.',
      },
      {
        criterion: 'Pattern spotting and collaboration',
        weight: 15,
        whatToAssess:
          'Ability to identify recurring issues, document feedback, and work with product or operations.',
      },
    ],
    scoringAnchors: scoreAnchors,
  },
  hiringProcess: [
    'Screen resumes for customer-facing experience, writing quality, ownership, and tool familiarity.',
    'Run a recruiter or manager screen for communication style, motivation, and support environment fit.',
    'Use a structured support interview focused on difficult customers, prioritization, and escalation judgment.',
    'Give a short writing or ticket-response work sample.',
    'Run a product-learning or mock support scenario if the role requires technical depth.',
    'Debrief with the same weighted scorecard for every candidate.',
  ],
  intake: {
    mustHaveRequirements: [
      'Support channel mix: email, chat, phone, social, community, or in-app support.',
      'Support complexity: billing, technical troubleshooting, onboarding, product usage, or policy questions.',
      'Expected queue metrics: response time, resolution time, CSAT, reopen rate, backlog, or escalation rate.',
      'Required tools: helpdesk, CRM, chat, documentation, bug tracker, or internal admin systems.',
    ],
    trainableRequirements: [
      'Company-specific product knowledge, macros, help-center articles, and escalation paths.',
      'Internal tone guidelines, policy details, billing rules, and troubleshooting steps.',
      'Support tooling workflows and tagging conventions.',
    ],
    prompts: [
      'Which customer problems will this person handle most often?',
      'What level of technical troubleshooting is required from day one?',
      'What does a great support response sound like for your brand?',
    ],
  },
  workSample: {
    task:
      'Give the candidate two realistic customer tickets: one simple how-to question and one frustrated escalation. Ask them to write replies and explain their prioritization.',
    timeLimit: '30–45 minutes live, or 60 minutes take-home maximum.',
    howToScore: [
      'Clarity, tone, empathy, and next-step quality.',
      'Accuracy and appropriate use of policy or product context.',
      'Escalation judgment and internal-note quality.',
      'Ability to keep the response concise and useful.',
    ],
  },
  variants: [
    'SaaS support specialist: prioritize product learning, troubleshooting, clear writing, and bug escalation.',
    'Technical support specialist: prioritize diagnosis, logs/screenshots, reproduction steps, and engineering handoffs.',
    'Customer service specialist: prioritize empathy, policy judgment, speed, and complaint resolution.',
    'Support operations specialist: prioritize macros, knowledge base, tagging, QA, workflows, and reporting.',
  ],
  seniorityAdjustments: [
    'Junior: focus on writing quality, empathy, coachability, process discipline, and basic ticket ownership.',
    'Mid-level: focus on independent queue ownership, escalation judgment, and stronger troubleshooting.',
    'Senior: focus on quality systems, knowledge-base improvement, mentoring, and customer-insight loops.',
  ],
  falsePositives: [
    'Friendly personality without clear writing or issue-resolution discipline.',
    'High-volume support experience without quality, CSAT, or ownership evidence.',
    'Technical vocabulary without customer-friendly explanation skills.',
  ],
  outcomes: {
    thirty: [
      'Understands core product flows, support tools, macros, policies, and escalation paths.',
      'Handles simple tickets with review and writes clear internal notes.',
    ],
    sixty: [
      'Owns a queue or channel with consistent quality and response-time discipline.',
      'Identifies recurring issues and contributes to help-center or macro improvements.',
    ],
    ninety: [
      'Resolves common issues independently and escalates complex cases with strong context.',
      'Improves customer experience through clearer responses, better documentation, or pattern feedback.',
    ],
  },
  toolLinks: [
    {
      ...FREE_TOOLS.screening,
      context: 'Screen customer support resumes against this checklist.',
    },
    {
      ...FREE_TOOLS.rubric,
      context: 'Generate a weighted customer support screening rubric.',
    },
    {
      ...FREE_TOOLS.interview,
      context: 'Find more customer support interview questions.',
    },
    {
      ...FREE_TOOLS.spreadsheet,
      context: 'Track candidates and support scorecard ratings.',
    },
    {
      ...FREE_TOOLS.jd,
      context: 'Create the customer support JD before posting.',
    },
  ],
  relatedResources: [
    {
      href: '/resources/job-descriptions/customer-support',
      label: 'Customer Support job description',
      description: 'Use this to define support channels, responsibilities, tools, and expectations before sourcing.',
    },
    {
      href: '/resources/screening-rubrics/customer-support',
      label: 'Customer Support screening rubric',
      description: 'Use this to score support resumes consistently before interviews.',
    },
    {
      href: '/resources/scorecards/customer-support',
      label: 'Customer Support interview scorecard',
      description: 'Use this to compare customer support candidates on writing, empathy, ownership, and judgment.',
    },
    {
      href: '/resources/interview-questions/customer-support',
      label: 'Customer Support interview questions',
      description: 'Use this for a deeper support-specific question bank.',
    },
  ],
  faqs: [
    {
      id: 'how-to-hire',
      question: 'How do I hire a customer support specialist?',
      answer: [
        'Start by defining the support channels, issue types, and quality bar. Then screen for writing, empathy, ownership, troubleshooting, prioritization, and ability to learn the product quickly.',
      ],
    },
    {
      id: 'screening-checklist',
      question: 'What should I include in a customer support screening checklist?',
      answer: [
        'Include customer-facing experience, writing quality, helpdesk or CRM tools, issue resolution, escalation judgment, product learning, empathy, and support metrics such as CSAT or response time.',
      ],
    },
    {
      id: 'interview-questions',
      question: 'What are good customer support specialist interview questions?',
      answer: [
        'Good questions test difficult customer handling, writing clarity, prioritization, escalation judgment, product learning, and ability to spot recurring customer problems.',
      ],
    },
    {
      id: 'hiresort-help',
      question: 'Can HireSort help screen customer support resumes?',
      answer: [
        'Yes. HireSort can turn customer support requirements into a screening rubric, score resumes consistently, and produce ranked shortlists with evidence.',
      ],
    },
  ],
};

const PAGES: Record<string, HiringGuidePage> = {
  [softwareEngineer.slug]: softwareEngineer,
  [productManager.slug]: productManager,
  [businessDevelopmentExecutive.slug]: businessDevelopmentExecutive,
  [hrExecutive.slug]: hrExecutive,
  [salesExecutive.slug]: salesExecutive,
  [dataAnalyst.slug]: dataAnalyst,
  [operationsManager.slug]: operationsManager,
  [customerSupportSpecialist.slug]: customerSupportSpecialist,
};

export const getHiringGuideSlugs = (): string[] => Object.keys(PAGES);

export const getHiringGuideBySlug = (slug: string): HiringGuidePage | null =>
  PAGES[slug] ?? null;

export const getAllHiringGuides = (): HiringGuidePage[] => Object.values(PAGES);

export const validateHiringGuides = () => {
  for (const page of getAllHiringGuides()) {
    const total = page.scorecard.criteria.reduce((sum, row) => sum + row.weight, 0);
    if (total !== 100) {
      throw new Error(`${page.slug} scorecard weights must total 100, received ${total}`);
    }
    if (page.screening.mustHave.length === 0 || page.interviewQuestions.length < 8) {
      throw new Error(`${page.slug} must include screening guidance and at least 8 interview questions`);
    }
    if (page.relatedResources.length < 2) {
      throw new Error(`${page.slug} must include at least two related resources`);
    }
    if (page.toolLinks.length < 2) {
      throw new Error(`${page.slug} must include at least two free tool links`);
    }
    if (!page.meta.title || !page.meta.description) {
      throw new Error(`${page.slug} must include metadata`);
    }
  }
};

validateHiringGuides();

export const hiresortAppUrl = appUrl;
