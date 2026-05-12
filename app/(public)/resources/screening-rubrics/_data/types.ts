export type Cta = { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export type RubricCriterionRow = {
  criterion: string;
  weight: string;
  whatToLookFor: string;
  resumeEvidence: string;
};

export type ScoreInterpretationRow = {
  range: string;
  interpretation: string;
  action: string;
};

export type ScreeningRubricPage = {
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

  whatIsRubric: {
    title: string;
    body: string[];
  };

  rubric: {
    title: string;
    rows: RubricCriterionRow[];
  };

  mustHaveSignals: {
    title: string;
    intro: string;
    items: string[];
  };

  redFlags: {
    title: string;
    intro: string;
    items: string[];
  };

  scoreInterpretation: {
    title: string;
    rows: ScoreInterpretationRow[];
  };

  howToUse: {
    title: string;
    items: string[];
  };

  followUpQuestions: {
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
