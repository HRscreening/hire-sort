import type { Metadata } from "next";
import UploadFlow from "../../_components/uploadFlow";
import { SCREENING_CONFIG } from "../../_lib/api";

export const metadata: Metadata = {
  title: "Resume Screening Tool",
  description:
    "Upload a job description and a résumé to get an explainable, rubric-based screening score in seconds.",
  alternates: { canonical: "/tools/screening" },
};

export default function ScreeningToolPage() {
  return <UploadFlow config={SCREENING_CONFIG} />;
}
