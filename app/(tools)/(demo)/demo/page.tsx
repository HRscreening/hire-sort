import type { Metadata } from "next";
import UploadFlow from "../../_components/uploadFlow";
import { DEMO_CONFIG } from "../../_lib/api";

const TITLE = "Resume Screening Demo";
const DESCRIPTION =
  "Try HireSort's explainable AI resume screening live. Upload a job description and a resume to see the auto-generated rubric and a criterion-by-criterion fit score.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "resume screening demo",
    "ai resume screening demo",
    "try resume screening",
    "resume scoring demo",
  ],
  alternates: { canonical: "/demo" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/demo",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort resume screening demo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  // Near-duplicate of /tools/screening — keep it crawlable but out of the index.
  robots: { index: false, follow: true },
};

export default function DemoUploadPage() {
  return <UploadFlow config={DEMO_CONFIG} />;
}
