import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function JobNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center min-h-[60vh] bg-ivory px-6 py-20 text-center">
        <div className="max-w-md w-full rounded-2xl border border-line-soft bg-ivory-light p-8 shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-6">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-charcoal tracking-tight">
            Job not found
          </h1>
          <p className="mt-3 text-sm text-charcoal-lt leading-relaxed">
            The job listing you&apos;re looking for doesn&apos;t exist or may have been removed. Please check the URL or browse our other openings.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-charcoal px-4 py-2.5 text-sm font-semibold text-ivory no-underline transition-colors hover:bg-accent focus:outline-none"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
