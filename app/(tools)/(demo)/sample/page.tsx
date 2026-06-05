import type { Metadata } from "next";
import DemoPageView from '../../_components/panelView'
import SampleRubric from "../../_sample_data/sample-rubric.json";
import SampleResume from "../../_sample_data/scored_resume.json";
import type { Rubric, ScoredResume } from "../../types";

const TITLE = "Sample Resume Screening Result";
const DESCRIPTION =
  "See an example of HireSort's explainable resume screening — a full sample score with the rubric, a criterion-by-criterion breakdown, and the reasoning behind every rating.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "resume screening example",
    "resume score example",
    "sample screening result",
    "ai resume score example",
  ],
  alternates: { canonical: "/sample" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/sample",
    siteName: "HireSort",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "HireSort sample resume screening result" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  // Static example output, thin/duplicate — keep crawlable but out of the index.
  robots: { index: false, follow: true },
};

const Page = () => {
  return (
    <div className="w-full flex flex-col md:h-screen md:overflow-hidden bg-ivory">
      <DemoPageView
        rubric={SampleRubric as Rubric}
        resume={SampleResume as ScoredResume}
        sessionId="sample"
      />
    </div>
  )
}

export default Page
