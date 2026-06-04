import { SITE_URL } from "@/lib/seo";
import { TEST_JOB } from "@/lib/test-job";

const cdata = (v: string) => `<![CDATA[${v}]]>`;

// Indeed XML job feed. Every URL is absolute and the apply post URL is
// percent-encoded inside the indeed-apply-data block.
export async function GET() {
  const jobUrl = `${SITE_URL}/careers/${TEST_JOB.id}`;
  const postUrl = `${SITE_URL}/api/careers/webhooks/indeed-apply`;
  const lastBuild = new Date().toUTCString(); // RFC 1123 / RFC 2822 compatible
  const datePosted = new Date(TEST_JOB.datePosted).toUTCString();

  const applyData = [
    `indeed-apply-jobid=${TEST_JOB.id}`,
    `indeed-apply-jobtitle=${encodeURIComponent(TEST_JOB.title)}`,
    `indeed-apply-jobcompanyname=${encodeURIComponent(TEST_JOB.company.name)}`,
    `indeed-apply-joblocation=${encodeURIComponent(
      `${TEST_JOB.location.city}, ${TEST_JOB.location.state}, India`,
    )}`,
    `indeed-apply-apitoken=PLACEHOLDER_TOKEN`,
    `indeed-apply-postUrl=${encodeURIComponent(postUrl)}`,
    `indeed-apply-resumefieldsrequired=true`,
  ].join("&");

  const salary = `${TEST_JOB.salary.currency} ${TEST_JOB.salary.min}-${TEST_JOB.salary.max} per year`;

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<source>
  <publisher>hiresort</publisher>
  <publisherurl>${SITE_URL}</publisherurl>
  <lastBuildDate>${lastBuild}</lastBuildDate>
  <job>
    <title>${cdata(TEST_JOB.title)}</title>
    <date>${cdata(datePosted)}</date>
    <referencenumber>${cdata(TEST_JOB.id)}</referencenumber>
    <url>${cdata(jobUrl)}</url>
    <company>${cdata(TEST_JOB.company.name)}</company>
    <city>${cdata(TEST_JOB.location.city)}</city>
    <state>${cdata(TEST_JOB.location.state)}</state>
    <country>${cdata(TEST_JOB.location.country)}</country>
    <postalcode>${cdata(TEST_JOB.location.postalCode)}</postalcode>
    <email>${cdata("jobs@hiresort.ai")}</email>
    <description>${cdata(TEST_JOB.description)}</description>
    <salary>${cdata(salary)}</salary>
    <jobtype>${cdata("fulltime")}</jobtype>
    <category>${cdata("Engineering")}</category>
    <indeed-apply-data>${cdata(applyData)}</indeed-apply-data>
  </job>
</source>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
