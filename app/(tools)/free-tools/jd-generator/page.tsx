import type { Metadata } from "next";
import JdBuilder from "./_components/jdBuilder";

const TITLE = "Free AI Job Description Generator";
const DESCRIPTION =
  "Turn a role and a few details into a clear, structured job description — written by AI and streamed as you watch. Refine it, edit it, and download a PDF. Free, no signup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "job description generator",
    "ai job description writer",
    "jd generator",
    "free job description template",
    "build job description with ai",
  ],
  alternates: { canonical: "/tools/build-jd" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/build-jd",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort AI job description generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function BuildJdToolPage() {
  return <JdBuilder />;
}
