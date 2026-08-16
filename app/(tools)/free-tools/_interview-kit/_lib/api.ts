// Client for the public "Build an Interview Kit with AI" tool.
// Like the other tools, these endpoints are rate-limited per visitor IP and called
// straight from the browser.

import type { InterviewKitInput, InterviewKit } from "./types";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const GENERATE_ENDPOINT = "/api/v1/generate-interview-kit";
const DOWNLOAD_ENDPOINT = "/api/v1/download-interview-kit";

// Quota/session metadata the endpoints surface via custom response headers.
export interface InterviewKitGenerateMeta {
  sessionId: string | null;
  attemptsLeft: number | null;
  maxAttempts: number | null;
  resetsAt: Date | null;
}

// A failed request. `isLimit` is set when the visitor has spent their quota.
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

function parseMeta(res: Response): InterviewKitGenerateMeta {
  const attempts = res.headers.get("X-Attempts-Left");
  const max = res.headers.get("X-Max-Attempts");
  const resets = res.headers.get("X-Jd-Generate-Session-Resets-At");
  const resetsDate = resets ? new Date(resets) : null;
  return {
    sessionId: res.headers.get("X-Jd-Generate-Session-Id"),
    attemptsLeft: attempts != null && attempts !== "" ? Number(attempts) : null,
    maxAttempts: max != null && max !== "" ? Number(max) : null,
    resetsAt: resetsDate && !Number.isNaN(resetsDate.getTime()) ? resetsDate : null,
  };
}

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

async function toError(res: Response): Promise<JdApiError> {
  let raw = "";
  try {
    raw = await res.text();
  } catch {
    // No readable body
  }
  let parsed: unknown = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Non-JSON body
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

function withSession(endpoint: string, sessionId: string | null): string {
  const url = `${API_BASE}${endpoint}`;
  return sessionId ? `${url}?session_id=${encodeURIComponent(sessionId)}` : url;
}

const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the server. Check your connection and try again in a moment.";

async function genearteAPI(endpoint: string, body: InterviewKitInput, sessionId: string | null): Promise<Response> {
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

async function downloadAPI(endpoint: string, body: InterviewKit, sessionId: string | null): Promise<Response> {
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
 * POST /api/v1/generate-interview-kit — generate role-specific interview kit.
 */
export async function generateinterviewKit(
  body: InterviewKitInput,
  sessionId: string | null,
): Promise<{ data: InterviewKit; meta: InterviewKitGenerateMeta }> {
  const res = await genearteAPI(GENERATE_ENDPOINT, body, sessionId);

  if (!res.ok) throw await toError(res);

  const data = (await res.json()) as InterviewKit;
  const meta = parseMeta(res);

  return { data, meta };
}

/**
 * POST /api/v1/download-interview-kit — render interview kit to PDF.
 */
export async function downloadInterviewKitPdf(
  body: InterviewKit,
  sessionId: string | null,
): Promise<{ blob: Blob; filename: string | null; meta: InterviewKitGenerateMeta }> {
  const res = await downloadAPI(DOWNLOAD_ENDPOINT, body, sessionId);
  if (!res.ok) throw await toError(res);

  const disposition = res.headers.get("Content-Disposition");
  const match = disposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
  const filename = match ? decodeURIComponent(match[1].trim()) : null;
  return { blob: await res.blob(), filename, meta: parseMeta(res) };
}

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function formatResetTime(date: Date | null): string | null {
  if (!date) return null;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
