import type { Metadata } from "next";
import InterviewKitBuilder from "./_components/interview_kit";

const TITLE = "Free AI Interview Questions & Scorecard Generator - HireSort";
const DESCRIPTION =
  "Generate role-specific interview questions, screening questions, scorecards, and answer signals from any job description. Free, editable, and no signup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "interview questions generator",
    "ai interview questions generator",
    "screening questions generator",
    "interview scorecard generator",
    "candidate interview questions",
    "role-specific interview questions",
    "structured interview questions",
  ],
  alternates: { canonical: "/free-tools/interview-kit" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/free-tools/interview-kit",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort AI Interview Questions Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function BuildInterviewKitToolPage() {
  return <InterviewKitBuilder />;
}
