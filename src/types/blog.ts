export type BlogMetadata = {
  title: string;
  slug: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string[];
  estimatedReadingTime: string;
};

export type BlogSection =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: string;
    }
  | {
      type: "numbered_section";
      title: string;
      content: string[];
    }
  | {
      type: "cta";
      title: string;
      description: string;
      actionText: string;
    };

export type Blog = {
  metadata: BlogMetadata;
  content: BlogSection[];
};