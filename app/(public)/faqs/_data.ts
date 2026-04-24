export type FaqCategory = 'product' | 'platform' | 'data' | 'plans';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string[];
};

export const CATEGORIES: readonly { id: 'all' | FaqCategory; label: string }[] = [
  { id: 'all', label: 'All questions' },
  { id: 'product', label: 'Product & workflow' },
  { id: 'platform', label: 'Platform capabilities' },
  { id: 'data', label: 'Data & security' },
  { id: 'plans', label: 'Plans & getting started' },
] as const;

export const FAQS: FaqItem[] = [
  {
    id: 'what-does-it-do',
    category: 'product',
    question: 'What does your platform do?',
    answer: [
      'Our platform helps hiring teams screen resumes faster using AI-powered analysis and structured scoring. Recruiters can upload candidate resumes, apply role-specific evaluation criteria, and receive ranked outputs that make shortlisting quicker and more consistent.',
    ],
  },
  {
    id: 'who-is-it-for',
    category: 'product',
    question: 'Who is this product built for?',
    answer: [
      'It is designed for recruiters, hiring managers, staffing firms, and talent teams that handle high volumes of applications and want to reduce manual screening effort.',
    ],
  },
  {
    id: 'how-screening-works',
    category: 'product',
    question: 'How does the screening work?',
    answer: [
      'Users upload resumes and configure a role-specific rubric or screening criteria. The platform then analyzes each resume against those criteria and returns a structured assessment, score, and shortlist view to support decision-making.',
    ],
  },
  {
    id: 'customizable-scoring',
    category: 'product',
    question: 'Is the scoring customizable?',
    answer: [
      'Yes. Teams can configure scoring rubrics based on role requirements, skills, experience, qualifications, and other relevant hiring criteria. Depending on your plan, rubrics can also be revised and reused across hiring cycles.',
    ],
  },
  {
    id: 'speed',
    category: 'platform',
    question: 'How fast is the platform?',
    answer: [
      'Processing speed depends on file volume and system load, but resumes are typically analyzed within seconds. Bulk screening workflows are designed to support high-volume hiring without long manual turnaround times.',
    ],
  },
  {
    id: 'bulk-upload',
    category: 'platform',
    question: 'Can I upload multiple resumes at once?',
    answer: [
      'Yes. Bulk upload is supported so teams can screen many candidates in one workflow instead of reviewing resumes one by one.',
    ],
  },
  {
    id: 'replace-recruiter',
    category: 'product',
    question: 'Does the platform replace recruiter judgment?',
    answer: [
      'No. The platform is built to support recruiters, not replace them. It helps teams process information faster and more consistently, but final hiring decisions should always remain with human reviewers.',
    ],
  },
  {
    id: 'ats-integration',
    category: 'platform',
    question: 'Can it integrate with our ATS or hiring workflow?',
    answer: [
      'Depending on your plan and implementation scope, integrations may be supported. Please contact us if you want to connect the platform with your ATS, internal workflow, or hiring stack.',
    ],
  },
  {
    id: 'file-formats',
    category: 'platform',
    question: 'What file formats do you support?',
    answer: [
      'Common resume formats such as PDF and DOC/DOCX are typically supported. Exact support may vary by plan or deployment setup.',
    ],
  },
  {
    id: 'candidate-data',
    category: 'data',
    question: 'How do you handle candidate data?',
    answer: [
      'We take data security and confidentiality seriously. Candidate data is processed to provide the service and handled in accordance with our policies and applicable contractual commitments.',
      'For more details, please review our Privacy Policy or contact us directly.',
    ],
  },
  {
    id: 'enterprise',
    category: 'plans',
    question: 'Is the platform suitable for enterprise use?',
    answer: [
      'Yes. We support teams that need structured screening workflows, scalable processing, configurable evaluation logic, and higher-volume hiring operations.',
    ],
  },
  {
    id: 'agencies',
    category: 'plans',
    question: 'Can staffing agencies use this platform?',
    answer: [
      'Yes. Staffing firms and recruitment agencies can use the platform to improve candidate screening throughput and standardize evaluation before sharing shortlisted profiles with clients.',
    ],
  },
  {
    id: 'trial',
    category: 'plans',
    question: 'Is there a free trial or demo?',
    answer: [
      'Explore our product instantly with the live demo on our main page. You can also get started with our Free plan — no credit card required. For custom plans, contact us at support@hiresort.ai',
    ],
  },
  {
    id: 'outcomes',
    category: 'product',
    question: 'Do you guarantee hiring outcomes?',
    answer: [
      'No. The platform is a screening support tool. It helps teams save time and improve consistency, but it does not guarantee interview performance, hiring success, or candidate suitability.',
    ],
  },
  {
    id: 'get-started',
    category: 'plans',
    question: 'How do I get started?',
    answer: [
      'You can create an account, choose a plan, and begin uploading resumes for screening. For larger teams or enterprise deployments, our team can assist with onboarding.',
    ],
  },
];
