import type { Metadata } from "next";
import RubricBuilder from "./_components/rubricBuilder";

const TITLE = "Free AI Screening Rubric Generator";
const DESCRIPTION =
  "Turn any job description into a weighted, ready-to-score screening rubric — must-have requirements, weighted criteria, and clear scoring bands. Paste or upload a JD, edit the rubric, and reuse it. Free, no signup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "rubric generator",
    "screening rubric template",
    "hiring rubric maker",
    "candidate scoring rubric",
    "job description to rubric",
  ],
  alternates: { canonical: "/tools/generate-rubric" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/generate-rubric",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort AI screening rubric generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RubricGeneratorToolPage() {
  return <RubricBuilder />;
}
