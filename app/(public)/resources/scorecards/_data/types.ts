export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type CriterionRow = {
  criterion: string;
  weight: string;
  whatToLookFor: string;
};

export type ScoringRow = {
  score: string;
  meaning: string;
};

export type ScorecardPage = {
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

  problemSection: {
    title: string;
    body: string[];
  };

  criteria: {
    title: string;
    intro: string;
    rows: CriterionRow[];
  };

  scoringScale: {
    title: string;
    intro: string;
    rows: ScoringRow[];
  };

  redFlags: {
    title: string;
    items: string[];
  };

  interviewQuestions: {
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
