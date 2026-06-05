import type { Metadata } from "next";
import type { ReactNode } from "react";

// Per-session result pages are private and dynamic — keep them out of the index.
export const metadata: Metadata = {
  title: "Screening Result",
  description: "Your explainable, rubric-based resume screening result.",
  robots: { index: false, follow: false },
};

export default function ScreeningResultLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
