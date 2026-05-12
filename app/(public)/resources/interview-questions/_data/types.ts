export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type ScorecardRow = {
  area: string;
  weight: string;
  whatToAssess: string;
};

export type QuestionGroup = {
  title: string;
  questions: string[];
};

export type InterviewQuestionsPage = {
  slug: string;
  role: string;
  publishedAt: string;
  updatedAt: string;

  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    ogImageAlt?: string;
  };

  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix?: string;
    lead: string[];
    primaryCta: Cta;
    secondaryCta: Cta;
  };

  whatToEvaluate: {
    title: string;
    intro: string;
    items: string[];
  };

  questionGroups: QuestionGroup[];

  strongAnswers: {
    title: string;
    items: string[];
  };

  redFlags: {
    title: string;
    items: string[];
  };

  scorecard: {
    title: string;
    intro: string;
    rows: ScorecardRow[];
  };

  howToRun: {
    title: string;
    items: string[];
  };

  howHireSortHelps: {
    title: string;
    body: string[];
  };

  faqs: FaqItem[];

  internalLinks: { href: string; label: string }[];

  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
  };
};
