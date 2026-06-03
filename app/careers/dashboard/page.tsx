import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

// Internal test console — never index on a live domain.
export const metadata: Metadata = {
  title: "Careers — Test Console",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
