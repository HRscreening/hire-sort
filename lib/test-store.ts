// In-memory application store for the /careers test harness.
// Intentionally NOT persisted — resets on server restart. Test session only.
//
// Backed by globalThis so the array survives dev hot-reload (HMR) and any
// re-evaluation of this module within a single runtime. Note: on serverless
// platforms (e.g. Vercel) separate function instances do NOT share memory, so
// run the verification against a single long-lived server (`next start`).

export type ApplicationSource = "google_direct" | "indeed_apply" | "test";

export interface Application {
  id: string;
  apply_id: string;
  source: ApplicationSource;
  job_id: string;
  full_name: string;
  email: string;
  phone?: string;
  resume_base64?: string; // raw base64 so we can offer download
  resume_filename?: string;
  resume_mime?: string;
  resume_json?: unknown; // Indeed structured resume (alternative to file)
  resume_html?: string; // Indeed HTML resume (alternative to file)
  cover_letter?: string;
  raw_payload?: unknown;
  received_at: string;
}

const globalForStore = globalThis as unknown as {
  __careerApplications?: Application[];
};

// Single shared array. Plain in-memory list — test only.
export const applications: Application[] =
  globalForStore.__careerApplications ??
  (globalForStore.__careerApplications = []);

/** True if an application with this idempotency id already exists. */
export const hasApplication = (id: string): boolean =>
  applications.some((a) => a.id === id);

/** Append an application (newest stays findable by id). */
export const addApplication = (app: Application): void => {
  applications.push(app);
};

/** Look up a stored application by its id. */
export const getApplication = (id: string): Application | undefined =>
  applications.find((a) => a.id === id);
