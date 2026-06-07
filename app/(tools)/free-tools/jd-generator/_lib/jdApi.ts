// Client for the public "Build a JD with AI" tool. Mirrors the authenticated
// app's contract (jd_details + user_input + current_Jd in, plain-text stream
// out) but points at the no-auth, IP-rate-limited tool endpoints and never
// sends an Authorization header.
//
// Like the scoring tools (see ../../../_lib/api.ts), these endpoints are
// rate-limited per visitor IP, so they're called straight from the browser —
// a server proxy would collapse every visitor onto one IP.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const STREAM_ENDPOINT = "/api/v1/generate-jd/stream";
const DOWNLOAD_ENDPOINT = "/api/v1/download-generate-jd";

// Structured job details the backend grounds the JD on. Mirrors the backend's
// JdGenerateInput. The string fields are required (non-empty); yrs_experience,
// salary_compensation_info and skills may be null but the keys must still be
// present. `company_url` must include an http(s):// scheme — callers normalize
// before sending (see normalizeUrl).
export interface JdGenerateInput {
  job_title: string;
  company_name: string;
  company_url: string;
  employment_type_work_arrangement: string;
  location: string;
  yrs_experience: number | null;
  salary_compensation_info: string | null;
  skills: string | null;
}

// `current_Jd` casing is intentional — it matches the backend contract. Send the
// current draft back here to refine an existing JD ("" on the first pass).
export type JdGenerateBody = {
  jd_details: JdGenerateInput;
  user_input: string;
  current_Jd: string;
};

// Quota/session metadata the JD endpoints surface via custom response headers.
// Each field is null when the backend didn't send it (or, cross-origin, didn't
// expose it via Access-Control-Expose-Headers).
export interface JdGenerateMeta {
  // The JD-generation session id; pass it back on the next call so the attempt
  // window stays consistent even when the httponly cookie is blocked cross-site.
  sessionId: string | null;
  // Reprompts remaining in the current window.
  attemptsLeft: number | null;
  // Total reprompts allowed per window (for "x / y" displays).
  maxAttempts: number | null;
  // When the attempt window resets; null if unknown.
  resetsAt: Date | null;
}

// A failed JD request. `isLimit` is set when the visitor has spent their quota
// (a 403/429), so the UI can show the reset time instead of a generic error.
export class JdApiError extends Error {
  status: number;
  isLimit: boolean;
  resetsAt: Date | null;

  constructor(message: string, opts: { status?: number; isLimit?: boolean; resetsAt?: Date | null } = {}) {
    super(message);
    this.name = "JdApiError";
    this.status = opts.status ?? 0;
    this.isLimit = opts.isLimit ?? false;
    this.resetsAt = opts.resetsAt ?? null;
  }
}

function parseMeta(res: Response): JdGenerateMeta {
  const attempts = res.headers.get("X-Attempts-Left");
  const max = res.headers.get("X-Max-Attempts");
  const resets = res.headers.get("X-Jd-Generate-Session-Resets-At");
  const resetsDate = resets ? new Date(resets) : null;
  return {
    sessionId: res.headers.get("X-Jd-Generate-Session-Id"),
    attemptsLeft: attempts != null && attempts !== "" ? Number(attempts) : null,
    maxAttempts: max != null && max !== "" ? Number(max) : null,
    // Guard against an empty / unparseable date string.
    resetsAt: resetsDate && !Number.isNaN(resetsDate.getTime()) ? resetsDate : null,
  };
}

// Pull a human-readable message out of a parsed error body, tolerating the
// shapes FastAPI emits: a string `detail` (HTTPException), an array of
// `{ msg }` (validation errors), or a top-level `message` / `error`.
function messageFromBody(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const b = body as { detail?: unknown; message?: unknown; error?: unknown };
  if (typeof b.detail === "string" && b.detail.trim()) return b.detail.trim();
  if (Array.isArray(b.detail)) {
    const msgs = b.detail
      .map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : ""))
      .filter(Boolean);
    if (msgs.length) return msgs.join(" ");
  }
  if (typeof b.message === "string" && b.message.trim()) return b.message.trim();
  if (typeof b.error === "string" && b.error.trim()) return b.error.trim();
  return undefined;
}

/**
 * Turn a non-ok response into a JdApiError, preserving the limit/reset hints.
 * Reads the body once as text (so we can fall back to raw text when it isn't
 * JSON), then surfaces the backend's own message verbatim — both endpoints
 * return a human-readable reason on 4xx/5xx, and that's what the UI shows.
 */
async function toError(res: Response): Promise<JdApiError> {
  let raw = "";
  try {
    raw = await res.text();
  } catch {
    // No readable body — fall back to status text below.
  }
  let parsed: unknown = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Non-JSON body — the raw text becomes the last-resort message.
    }
  }
  const meta = parseMeta(res);
  const isLimit = res.status === 403 || res.status === 429;
  const message =
    messageFromBody(parsed) ||
    (parsed === null ? raw.trim() : "") ||
    (isLimit ? "You've used your free generations for now." : res.statusText) ||
    "Something went wrong. Please try again.";
  return new JdApiError(message, { status: res.status, isLimit, resetsAt: meta.resetsAt });
}

/** Append ?session_id= when we have one, so the attempt window is reused. */
function withSession(endpoint: string, sessionId: string | null): string {
  const url = `${API_BASE}${endpoint}`;
  return sessionId ? `${url}?session_id=${encodeURIComponent(sessionId)}` : url;
}

// Shown when fetch itself rejects (server unreachable, DNS, CORS, offline) — the
// browser's bare "Failed to fetch" is meaningless to a visitor, so we replace it.
const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the server. Check your connection and try again in a moment.";

/**
 * POST a JD body to one of the tool endpoints. fetch only rejects on a network
 * failure (never on HTTP error status), so a rejection here means the request
 * never reached the backend — surface that as a friendly JdApiError instead of
 * leaking the raw "Failed to fetch". HTTP-level errors are left for the caller.
 */
async function postJd(endpoint: string, body: JdGenerateBody, sessionId: string | null): Promise<Response> {
  try {
    return await fetch(withSession(endpoint, sessionId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
  } catch {
    throw new JdApiError(NETWORK_ERROR_MESSAGE, { status: 0 });
  }
}

/**
 * POST /api/v1/tool/generate-jd/stream — generate (or refine) a JD with AI,
 * streamed as plain text. `onChunk` fires with the full accumulated text so far
 * (not the delta), so callers can bind it straight to a textarea/typewriter.
 *
 * Pass the prior `sessionId` (from a previous meta) to keep refines on the same
 * attempt window. `credentials: "include"` lets the backend's jd_session_id
 * cookie ride along too. Resolves with the quota/session metadata once the
 * stream is fully drained.
 */
export async function generateJdStream(
  body: JdGenerateBody,
  sessionId: string | null,
  onChunk: (fullText: string) => void,
): Promise<JdGenerateMeta> {
  const res = await postJd(STREAM_ENDPOINT, body, sessionId);

  if (!res.ok || !res.body) throw await toError(res);

  const meta = parseMeta(res);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    onChunk(text);
  }
  // Flush any trailing multi-byte character left in the decoder.
  text += decoder.decode();
  onChunk(text);

  return meta;
}

/**
 * POST /api/v1/tool/download-generate-jd — render the current JD prose to a PDF.
 * Same payload as generateJdStream; the backend grounds the document on whatever
 * the user currently has in `current_Jd`. Shares the generation session window,
 * so it returns the same quota headers. Downloads are rate-limited separately;
 * a spent quota comes back as a 429 with a human-readable message.
 */
export async function downloadJdPdf(
  body: JdGenerateBody,
  sessionId: string | null,
): Promise<{ blob: Blob; filename: string | null; meta: JdGenerateMeta }> {
  const res = await postJd(DOWNLOAD_ENDPOINT, body, sessionId);
  if (!res.ok) throw await toError(res);

  const disposition = res.headers.get("Content-Disposition");
  const match = disposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
  const filename = match ? decodeURIComponent(match[1].trim()) : null;
  return { blob: await res.blob(), filename, meta: parseMeta(res) };
}

// The backend rejects a company_url without an http(s):// scheme, so accept a
// bare domain in the UI and prepend https:// before sending.
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** "Jun 6, 3:45 PM" style; null when the date is missing. */
export function formatResetTime(date: Date | null): string | null {
  if (!date) return null;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
