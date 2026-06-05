import type { Metadata } from "next";
import type { ReactNode } from "react";

// Per-session demo result pages are dynamic — keep them out of the index.
export const metadata: Metadata = {
  title: "Demo Result",
  description: "Your HireSort resume screening demo result.",
  robots: { index: false, follow: false },
};

export default function DemoResultLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
