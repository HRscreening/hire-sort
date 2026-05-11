import type { JobDescriptionPage } from './types';
import {
  buildStandardCta,
  buildStandardFaqs,
  buildStandardHeroCtas,
  PUBLISHED_AT,
  standardHowHireSortHelps,
  standardInternalLinks,
  UPDATED_AT,
} from './_shared';

export const softwareEngineer: JobDescriptionPage = {
  slug: 'software-engineer',
  role: 'Software Engineer',
  publishedAt: PUBLISHED_AT,
  updatedAt: UPDATED_AT,

  meta: {
    title: 'Software Engineer Job Description Template | HireSort',
    description:
      'Use this software engineer job description template to define responsibilities, skills, screening criteria, interview questions, and a hiring workflow for Software Engineer candidates.',
    keywords: [
      'software engineer job description',
      'software developer job description',
      'backend engineer job description',
      'engineering JD template',
    ],
  },

  hero: {
    eyebrow: 'Job description template',
    titlePrefix: 'Software Engineer ',
    titleAccent: 'Job Description',
    titleSuffix: ' Template',
    lead: [
      'Use this ready-to-customize software engineer job description template to define the role clearly, attract relevant candidates, and screen applicants against consistent criteria.',
    ],
    ...buildStandardHeroCtas(),
  },

  roleOverview: {
    title: 'Role overview',
    body: [
      'Software Engineers design, develop, test, and maintain software systems that solve user and business problems. This role requires strong programming ability, problem-solving skills, engineering judgment, and the ability to work in cross-functional product teams.',
    ],
  },

  responsibilities: [
    'Design, build, test, and maintain scalable software applications and backend or frontend components.',
    'Translate product requirements into technical specifications and implementation plans.',
    'Write clean, maintainable, well-documented code and participate in code reviews.',
    'Debug production issues, improve performance, and strengthen reliability.',
    'Collaborate with product managers, designers, QA, DevOps, and other engineers.',
    'Contribute to architecture discussions, sprint planning, and technical documentation.',
    'Follow engineering best practices for version control, testing, deployment, and monitoring.',
  ],

  requiredSkills: [
    'Strong proficiency in at least one programming language such as Python, JavaScript, Java, Go, C++, or TypeScript.',
    'Experience with data structures, algorithms, APIs, databases, and software design principles.',
    'Ability to write readable, modular, and testable code.',
    'Understanding of Git, CI/CD basics, debugging, and software development lifecycle.',
    'Good communication skills and ability to work in a team environment.',
  ],

  preferredQualifications: [
    'Experience with cloud platforms, containers, microservices, or distributed systems.',
    'Exposure to frontend frameworks, backend frameworks, or mobile development depending on role scope.',
    'Experience with automated testing, observability, and performance optimization.',
    'Prior experience in SaaS, marketplace, fintech, healthcare, or high-scale consumer products.',
  ],

  rubric: {
    title: 'Suggested screening rubric',
    intro:
      'Use this rubric as a first-pass evaluation structure for software engineer candidates. Adjust the weightings based on seniority, company stage, and role expectations.',
    rows: [
      { criterion: 'Core technical skills', weight: '30%', lookFor: 'Relevant languages, frameworks, architecture, databases, and engineering fundamentals.' },
      { criterion: 'Project impact', weight: '25%', lookFor: 'Evidence of shipping features, improving systems, reducing latency, or owning technical outcomes.' },
      { criterion: 'Problem-solving depth', weight: '20%', lookFor: 'Complexity of projects, debugging experience, system design thinking, and trade-off judgment.' },
      { criterion: 'Team collaboration', weight: '15%', lookFor: 'Cross-functional work, code reviews, documentation, mentoring, or agile practices.' },
      { criterion: 'Role fit', weight: '10%', lookFor: 'Domain, seniority, technology stack, location, and hiring context fit.' },
    ],
  },

  interviewQuestions: {
    title: 'Interview handoff questions',
    intro: 'Once candidates are shortlisted, hiring managers can use these questions to validate resume claims and assess role fit.',
    items: [
      'Tell me about a system or feature you built end to end.',
      'How do you approach debugging a production issue?',
      'What trade-offs did you make in a recent technical decision?',
      'How do you keep code maintainable as the product grows?',
      'Describe a time you improved performance, reliability, or developer productivity.',
    ],
  },

  redFlags: {
    title: 'Resume screening red flags',
    items: [
      'Resume lists many technologies but does not show project ownership or outcomes.',
      'No evidence of collaboration, testing, debugging, or production exposure.',
      'Responsibilities are vague and do not explain what the candidate actually built.',
      'Frequent job changes without explanation, especially where role expectations require long-term ownership.',
    ],
  },

  howHireSortHelps: standardHowHireSortHelps,
  cta: buildStandardCta('Software Engineer'),
  faqs: buildStandardFaqs('Software Engineer', 'software engineer'),
  internalLinks: standardInternalLinks,
};
