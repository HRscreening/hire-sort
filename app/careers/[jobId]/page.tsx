import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, jsonLdString } from "@/lib/seo";
import Carousel from "./Carousel";
import Footer from "@/components/layout/Footer";
import ApplyForm from "./ApplyForm";
import type { ScreeningDetailsPublicResponseDTO } from "./types";

type Params = Promise<{ jobId: string }>;

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const API_BASE = process.env.NEXT_PUBLIC_API_URL


// Helper to fetch job details
const fetchJobDetails = cache(async (jobId: string): Promise<{ data: ScreeningDetailsPublicResponseDTO | null; status: number }> => {
  try {
    const url = `${API_BASE}/api/v1/screenings/${jobId}/get-job-details-public`
    const res = await fetch(url, {
      cache: "no-store",
    });


    if (res.status === 400 || res.status === 404) {
      return { data: null, status: res.status };
    }
    if (!res.ok) {
      return { data: null, status: res.status };
    }
    const data = await res.json();
    return { data, status: 200 };
  } catch (err) {
    console.error("Error fetching job details:", err);
    return { data: null, status: 500 };
  }
});

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { jobId } = await params;
  const { data: job } = await fetchJobDetails(jobId);

  if (!job) {
    return { title: "Job Not Found - HireSort", robots: { index: false, follow: false } };
  }

  const url = `/careers/${jobId}`;
  const title = `${job.title} ${job.company_name ? `at ${job.company_name}` : ""} | Careers`;
  const description = job.job_summary || `Apply for ${job.title} at ${job.company_name || "our team"}. Submit your application today.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [{ url: `${SITE_URL}/logo.png`, width: 1200, height: 630, alt: "HireSort" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

/**
 * JobPosting structured data for Google for Jobs.
 */
function buildJobPostingJsonLd(job: ScreeningDetailsPublicResponseDTO, jobId: string) {
  // Normalize employment type to Schema.org standards
  let empType = "FULL_TIME";
  const typeLower = (job.employment_type || "").toLowerCase();
  if (typeLower.includes("part")) empType = "PART_TIME";
  else if (typeLower.includes("contract")) empType = "CONTRACTOR";
  else if (typeLower.includes("intern")) empType = "INTERN";
  else if (typeLower.includes("temporary")) empType = "TEMPORARY";

  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.details || job.job_summary || job.title,
    identifier: {
      "@type": "PropertyValue",
      name: "HireSort",
      value: jobId,
    },
    datePosted: job.posted_at || new Date().toISOString(),
    employmentType: empType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name || "HireSort",
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Remote",
        addressCountry: "IN",
      },
    },
    directApply: true,
  };
}

// Helper to clean HTML, stripping <style> tags to prevent global CSS leak/pollution
function cleanDetailsHtml(html: string | null | undefined): string {
  if (!html) return "";
  // Strip style tags and their contents
  let clean = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  // Strip head and html tags if present, keeping body content
  const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(clean);
  if (bodyMatch && bodyMatch[1]) {
    clean = bodyMatch[1];
  }
  return clean.trim();
}

function HomeLogoLink() {
  return (
    <header className="absolute left-0 top-0 z-50 px-5 py-4 md:px-8 md:py-5">
      <Link href="/" aria-label="HireSort home" className="inline-flex items-center gap-2.5 text-charcoal no-underline">
        <Image src="/logo.png" alt="" width={30} height={30} priority sizes="30px" className="h-7 w-auto object-contain" />
        <span className="text-[18px] font-bold tracking-[-0.4px]">HireSort</span>
      </Link>
    </header>
  );
}

function JobTopBar({ job }: { job: ScreeningDetailsPublicResponseDTO }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ivory/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-6">
        <Link href="/" aria-label="HireSort home" className="inline-flex shrink-0 items-center gap-2.5 text-charcoal no-underline">
          <Image src="/logo.png" alt="" width={30} height={30} priority sizes="30px" className="h-7 w-auto object-contain" />
          <span className="hidden text-[20px] font-bold tracking-[-0.4px] sm:inline">HireSort</span>
        </Link>

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-base font-semibold text-charcoal md:text-lg">
            Applying for: {job.title}
          </p>
          <p className="hidden truncate text-sm font-medium text-charcoal-lt sm:block">
            {job.company_name || "Apply for this role"}
          </p>
        </div>

        <a
          href="#job-details"
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-charcoal px-4 text-[15px] font-semibold text-ivory no-underline transition-colors hover:bg-accent"
        >
          Apply Now
        </a>
      </div>
    </header>
  );
}

export default async function JobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const { data: job, status } = await fetchJobDetails(jobId);

  // If not found or client error
  if (status === 400 || status === 404) {
    notFound();
  }

  // Handle internal server error state beautifully
  if (status >= 500 || !job) {
    return (
      <>
        <HomeLogoLink />
        <Carousel />
        <main id="main" className="flex-1 flex items-center justify-center min-h-[60vh] bg-ivory px-6 py-20 text-center">
          <div className="max-w-md w-full rounded-2xl border border-line-soft bg-ivory-light p-8 shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-charcoal tracking-tight">Failed to load job details</h1>
            <p className="mt-3 text-sm text-charcoal-lt leading-relaxed">
              We encountered a temporary server error while retrieving this listing. Please reload or try again later.
            </p>
            <a
              href={`/careers/${jobId}`}
              aria-label="Reload page"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-charcoal px-4 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-accent focus:outline-none"
            >
              Reload Page
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cleanedDetails = cleanDetailsHtml(job.details);

  return (
    <>
      {/* Server-rendered JSON-LD — present in the raw HTML for Google crawl bots. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(buildJobPostingJsonLd(job, jobId)),
        }}
      />

      <JobTopBar job={job} />
      <Carousel />
      <main id="main" className="min-h-screen bg-ivory pb-16">
        
        {/* Sticky Header Section */}
        <section id="job-details" className="sticky top-16 z-30 scroll-mt-16 bg-ivory/95 backdrop-blur-md py-2 mb-3">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-line-soft bg-ivory-light p-5 md:p-6 shadow-soft">
              {/* Top row: info + buttons */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {job.department || "Engineering"}
                    </span>
                    {job.location && (
                      <span className="flex items-center gap-1.5 bg-charcoal/5 px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-md">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                    )}
                    {job.employment_type && (
                      <span className="flex items-center gap-1.5 bg-charcoal/5 px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-md">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.employment_type}
                      </span>
                    )}
                    {job.work_arrangement && (
                      <span className="flex items-center gap-1.5 bg-charcoal/5 px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-md">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {job.work_arrangement}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
                    {job.title}
                  </h1>
                  <p className="mt-0.5 text-sm md:text-base font-medium text-charcoal-md">
                    {job.company_name || "HireSort"}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-row items-center gap-2.5 flex-shrink-0 mt-1 md:mt-0">
                  <ApplyForm jobId={jobId} />
                  {job.jd_url && (
                    <a
                      href={job.jd_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line-soft px-4 text-sm font-semibold text-charcoal no-underline transition-all hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] duration-200"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download JD
                    </a>
                  )}
                </div>
              </div>

              {/* Summary strip */}
              {job.job_summary && (
                <p className="mt-4 border-t border-line-soft pt-3 text-sm text-charcoal-md leading-relaxed">
                  {job.job_summary}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <section className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left description details */}
            <div className="lg:col-span-2 rounded-2xl border border-line-soft bg-ivory-light p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-line-soft pb-3">
                Job Description
              </h2>

              {/* Integrated Key Details Strip inside JD section */}
              <div className="mb-6 rounded-xl border border-line-soft bg-ivory/80 p-4 md:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Role Key Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Department</span>
                    <span className="font-bold text-charcoal text-sm mt-0.5 block">{job.department || "General"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Work Arrangement</span>
                    <span className="font-bold text-charcoal text-sm mt-0.5 block">{job.work_arrangement || "Remote"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Location</span>
                    <span className="font-bold text-charcoal text-sm mt-0.5 block">{job.location || "Remote"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Role Type</span>
                    <span className="font-bold text-charcoal text-sm mt-0.5 block">{job.employment_type || "Full-time"}</span>
                  </div>
                  {job.salary && (
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Salary Range</span>
                      <span className="font-bold text-accent text-sm mt-0.5 block">{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Prose styled details HTML */}
              <article
                className="prose prose-neutral max-w-none text-charcoal-md leading-relaxed
                           [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-charcoal [&_h2]:mt-6 [&_h2]:mb-3
                           [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-charcoal [&_h3]:mt-5 [&_h3]:mb-2
                           [&_p]:mb-4 [&_p]:text-sm
                           [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-sm
                           [&_li]:text-charcoal-md [&_li]:leading-normal
                           [&_strong]:font-semibold [&_strong]:text-charcoal"
                dangerouslySetInnerHTML={{ __html: cleanedDetails }}
              />
            </div>

            {/* Right sidebar info */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-[250px]">

              {/* About HireSort Card */}
              <div className="rounded-2xl border border-line-soft bg-ivory-light p-6 shadow-card">
                <div className="flex items-center gap-3 mb-3 border-b border-line-soft pb-3">
                  <Image
                    src="/logo.png"
                    alt="HireSort Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain shrink-0"
                  />
                  <h3 className="text-base font-bold text-charcoal tracking-tight">
                    About HireSort
                  </h3>
                </div>

                <div className="text-xs md:text-sm text-charcoal-md leading-relaxed space-y-3">
                  <p>
                    <strong className="font-bold text-charcoal">HireSort</strong> is a <strong className="font-bold text-charcoal">modern recruitment agency</strong> that helps companies find, evaluate, and hire the right candidates faster.
                  </p>
                  <p>
                    Our recruiters manage the hiring workflow end to end: understanding the role, sourcing candidates, screening applications, and building structured shortlists for hiring teams.
                  </p>
                  <p>
                    Behind the scenes, we use <strong className="font-bold text-charcoal">AI-powered workflows</strong> to move faster, evaluate more consistently, and help recruiters focus on candidate quality instead of repetitive manual work.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-4 mt-4 border-t border-line-soft">
                  <a
                    href="/contact"
                    className="flex-1 inline-flex h-9 items-center justify-center rounded-xl bg-charcoal px-4 text-xs font-semibold text-ivory no-underline transition-all hover:bg-accent hover:scale-[1.02] active:scale-[0.98] duration-200"
                  >
                    Book a Demo
                  </a>
                  <a
                    href="/free-tools"
                    className="flex-1 inline-flex h-9 items-center justify-center rounded-xl border border-line-soft bg-ivory px-4 text-xs font-semibold text-charcoal no-underline transition-all hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] duration-200"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
