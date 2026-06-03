// Single hardcoded sample posting used by the /careers test harness.
// Internal file (not a route) — safe to delete with the rest of the harness.
// Public-facing values intentionally contain NO "test" wording so the live
// posting reads as a genuine job to Google / Indeed crawlers.

export const TEST_JOB = {
  id: "HS-001",
  title: "Senior Backend Engineer",
  company: {
    name: "hiresort",
    url: "https://hiresort.ai",
    logo: "https://ui-avatars.com/api/?name=hiresort&size=200&background=0D8ABC&color=fff",
  },
  location: {
    street: "12 MG Road",
    city: "Bengaluru",
    state: "KA",
    postalCode: "560001",
    country: "IN",
  },
  description: `<h3>About the Role</h3>
<p>We are looking for a Senior Backend Engineer to design and build scalable APIs and microservices.</p>
<h3>Responsibilities</h3>
<ul>
<li>Design and implement RESTful APIs and background job systems</li>
<li>Own the deployment pipeline (CI/CD, monitoring, alerting)</li>
<li>Collaborate with the AI/ML team on model-serving infrastructure</li>
</ul>
<h3>Requirements</h3>
<ul>
<li>5+ years backend experience (Node.js / Python / Go)</li>
<li>Strong with PostgreSQL, Redis, message queues</li>
<li>Experience with cloud infrastructure (AWS / GCP)</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>₹18-28 LPA</li>
<li>Remote-flexible with Bengaluru office</li>
<li>Health insurance for family</li>
</ul>`,
  salary: { min: 1800000, max: 2800000, currency: "INR" },
  employmentType: "FULL_TIME",
  datePosted: new Date().toISOString().split("T")[0],
  validThrough: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
} as const;

export type TestJob = typeof TEST_JOB;
