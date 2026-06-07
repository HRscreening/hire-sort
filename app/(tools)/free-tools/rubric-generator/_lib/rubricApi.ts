"use client";

// Client for the public "Generate a rubric from a JD" tool. Like the other tool
// clients (see ../../../_lib/api.ts) it's called straight from the browser so the
// per-visitor IP rate limit applies, and never sends an Authorization header.
//
// Contract: see /trash/rubric-generator.md.
//  - POST /api/v1/rubric/generate (multipart: jd_text OR jd_file) → { rubric }
//  - GET  /api/v1/rubric/{session_id}/download → .xlsx workbook
// Both key off the connecting IP; an anonymous ToolSession is reused across the
// generate/download pair via the session id surfaced in the response headers.
import type { GeneratedRubric } from "../../../types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const GENERATE_ENDPOINT = "/api/v1/rubric/generate";
// {session_id} is interpolated before use.
const DOWNLOAD_ENDPOINT = "/api/v1/rubric/{session_id}/download";

// Shown when fetch itself rejects (server unreachable, DNS, CORS, offline) — the
// browser's bare "Failed to fetch" is meaningless to a visitor, so we replace it.
const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the server. Check your connection and try again in a moment.";

// A failed rubric request. `isLimit` is set when the visitor has spent their quota
// (a 403/429), so the UI can show the reset time instead of a generic error.
export class RubricApiError extends Error {
  status: number;
  isLimit: boolean;
  resetsAt: Date | null;

  constructor(message: string, opts: { status?: number; isLimit?: boolean; resetsAt?: Date | null } = {}) {
    super(message);
    this.name = "RubricApiError";
    this.status = opts.status ?? 0;
    this.isLimit = opts.isLimit ?? false;
    this.resetsAt = opts.resetsAt ?? null;
  }
}

// Quota/session metadata the endpoint surfaces via custom response headers. Each
// field is null when the backend didn't send it (or didn't expose it via CORS).
export interface RubricGenerateMeta {
  // The rubric session id; pass it back on the next generate / use it to download.
  sessionId: string | null;
  attemptsLeft: number | null;
  maxAttempts: number | null;
  resetsAt: Date | null;
}

function parseMeta(res: Response): RubricGenerateMeta {
  const attempts = res.headers.get("X-Rubric-Attempts-Left");
  const max = res.headers.get("X-Rubric-Max-Attempts");
  const resets = res.headers.get("X-Rubric-Session-Resets-At");
  const resetsDate = resets ? new Date(resets) : null;
  return {
    sessionId: res.headers.get("X-Rubric-Session-Id"),
    attemptsLeft: attempts != null && attempts !== "" ? Number(attempts) : null,
    maxAttempts: max != null && max !== "" ? Number(max) : null,
    resetsAt: resetsDate && !Number.isNaN(resetsDate.getTime()) ? resetsDate : null,
  };
}

// Pull a human-readable message out of a parsed error body, tolerating the
// shapes FastAPI emits: a string `detail`, an array of `{ msg }`, or `message`/`error`.
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

/** Turn a non-ok response into a RubricApiError, surfacing the backend's message. */
async function toError(res: Response): Promise<RubricApiError> {
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
  return new RubricApiError(message, { status: res.status, isLimit, resetsAt: meta.resetsAt });
}

/** Append ?session_id= when we have one, so the same session/budget is reused. */
function withSession(endpoint: string, sessionId: string | null): string {
  const url = `${API_BASE}${endpoint}`;
  return sessionId ? `${url}?session_id=${encodeURIComponent(sessionId)}` : url;
}

/**
 * POST /api/v1/rubric/generate — build a screening rubric from a JD. Send exactly
 * one of `jdText` / `jdFile` (the file wins if both are given). Let the browser
 * set the multipart boundary — never set Content-Type by hand. Pass the prior
 * `sessionId` to reuse the same per-IP session/budget. Resolves with the rubric
 * plus the quota/session metadata.
 */
export async function generateRubric(input: {
  jdText?: string;
  jdFile?: File;
  sessionId?: string | null;
}): Promise<{ rubric: GeneratedRubric; meta: RubricGenerateMeta }> {
  const fd = new FormData();
  if (input.jdFile) fd.append("jd_file", input.jdFile);
  else if (input.jdText?.trim()) fd.append("jd_text", input.jdText.trim());

  let res: Response;
  try {
    res = await fetch(withSession(GENERATE_ENDPOINT, input.sessionId ?? null), {
      method: "POST",
      body: fd,
      credentials: "include",
    });
  } catch {
    // fetch only rejects on a network failure, never on an HTTP error status.
    throw new RubricApiError(NETWORK_ERROR_MESSAGE);
  }
  if (!res.ok) throw await toError(res);

  const data = (await res.json().catch(() => null)) as { rubric?: GeneratedRubric } | null;
  if (!data?.rubric) {
    throw new RubricApiError("The server didn't return a rubric. Please try again.");
  }
  return { rubric: data.rubric, meta: parseMeta(res) };
}

/** Pull the filename out of a Content-Disposition header, if present. */
function filenameFromDisposition(disposition: string | null): string | null {
  const match = disposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
  return match ? decodeURIComponent(match[1].trim()) : null;
}

/**
 * GET /api/v1/rubric/{session_id}/download — fetch the rubric as a 2-sheet .xlsx
 * and trigger a browser download. Lookup-only: the session must already hold a
 * rubric (generate first). A spent/forbidden session surfaces as a RubricApiError.
 */
export async function downloadRubricExcel(sessionId: string): Promise<void> {
  const endpoint = DOWNLOAD_ENDPOINT.replace("{session_id}", encodeURIComponent(sessionId));
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, { method: "GET", credentials: "include" });
  } catch {
    throw new RubricApiError(NETWORK_ERROR_MESSAGE);
  }
  if (!res.ok) throw await toError(res);

  const filename =
    filenameFromDisposition(res.headers.get("Content-Disposition")) ?? `rubric_${sessionId}.xlsx`;
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
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
