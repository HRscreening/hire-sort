import type { Metadata } from "next";
import UploadFlow from "../../_components/uploadFlow";
import { SCREENING_CONFIG } from "../../_lib/api";

const TITLE = "Free Resume Screening Tool";
const DESCRIPTION =
  "Screen a resume against any job description and get an explainable, rubric-based fit score in seconds. Free, no signup — with the reasoning shown behind every point.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "free resume screening tool",
    "ai resume screener",
    "resume scoring tool",
    "resume vs job description checker",
    "screen resume online",
  ],
  alternates: { canonical: "/tools/screening" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/screening",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort free resume screening tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function ScreeningToolPage() {
  return <UploadFlow config={SCREENING_CONFIG} />;
}
