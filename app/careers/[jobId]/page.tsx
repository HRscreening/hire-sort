import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, jsonLdString } from "@/lib/seo";
import { TEST_JOB } from "@/lib/test-job";
import ApplyForm from "./ApplyForm";

type Params = Promise<{ jobId: string }>;

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ jobId: TEST_JOB.id }];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { jobId } = await params;
  if (jobId !== TEST_JOB.id) {
    return { title: "Job not found", robots: { index: false, follow: false } };
  }
  const url = `/careers/${TEST_JOB.id}`;
  const title = `${TEST_JOB.title} — ${TEST_JOB.company.name}`;
  const description = `${TEST_JOB.title} at ${TEST_JOB.company.name}, ${TEST_JOB.location.city}. Apply now.`;
  return {
    title,
    description,
    // Test posting on a live domain: keep it OUT of the index / Google for Jobs.
    // The Rich Results Test still validates the JobPosting schema on a noindex page.
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url },
  };
}

/**
 * JobPosting structured data, rendered server-side as a raw <script> tag so it
 * appears in the initial HTML (View Source) and is seen by Google's crawler.
 */
function buildJobPostingJsonLd() {
  const { location: loc, salary } = TEST_JOB;
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: TEST_JOB.title,
    description: TEST_JOB.description,
    identifier: {
      "@type": "PropertyValue",
      name: "hiresort",
      value: TEST_JOB.id,
    },
    datePosted: TEST_JOB.datePosted,
    validThrough: TEST_JOB.validThrough,
    employmentType: TEST_JOB.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: TEST_JOB.company.name,
      sameAs: TEST_JOB.company.url,
      logo: TEST_JOB.company.logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.street,
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.postalCode,
        addressCountry: loc.country,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: salary.min,
        maxValue: salary.max,
        unitText: "YEAR",
      },
    },
    directApply: true,
  };
}

const formatSalary = () => {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
  return `${TEST_JOB.salary.currency} ${fmt(TEST_JOB.salary.min)}–${fmt(
    TEST_JOB.salary.max,
  )} / year`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function JobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  if (jobId !== TEST_JOB.id) notFound();

  const { company, location: loc } = TEST_JOB;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      {/* Server-rendered JSON-LD — present in the raw HTML for crawlers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(buildJobPostingJsonLd()),
        }}
      />

      <header className="flex items-center gap-4 border-b border-gray-200 pb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{TEST_JOB.title}</h1>
          <a
            href={company.url}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {company.name}
          </a>
        </div>
      </header>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-gray-500">Location</dt>
          <dd className="font-medium text-gray-900">
            {loc.city}, {loc.state}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Type</dt>
          <dd className="font-medium text-gray-900">Full-time</dd>
        </div>
        <div>
          <dt className="text-gray-500">Salary</dt>
          <dd className="font-medium text-gray-900">{formatSalary()}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Posted</dt>
          <dd className="font-medium text-gray-900">
            {formatDate(TEST_JOB.datePosted)}
          </dd>
        </div>
      </dl>

      <article
        className="prose prose-sm mt-8 max-w-none text-gray-800 [&_h3]:mt-6 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ul]:mt-2 [&_ul]:space-y-1"
        dangerouslySetInnerHTML={{ __html: TEST_JOB.description }}
      />

      <section
        id="apply"
        className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900">
          Apply for this role
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Submit your details and we&apos;ll be in touch.
        </p>
        <ApplyForm jobId={TEST_JOB.id} />
      </section>
    </main>
  );
}
