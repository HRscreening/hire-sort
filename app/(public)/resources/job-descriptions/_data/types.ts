export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type RubricRow = {
  criterion: string;
  weight: string;
  lookFor: string;
};

export type JobDescriptionPage = {
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

  roleOverview: {
    title: string;
    body: string[];
  };

  responsibilities: string[];
  requiredSkills: string[];
  preferredQualifications: string[];

  rubric: {
    title: string;
    intro: string;
    rows: RubricRow[];
  };

  interviewQuestions: {
    title: string;
    intro: string;
    items: string[];
  };

  redFlags: {
    title: string;
    items: string[];
  };

  howHireSortHelps: string[];

  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: Cta;
    secondary: Cta;
  };

  faqs: FaqItem[];

  internalLinks: { href: string; label: string }[];
};
