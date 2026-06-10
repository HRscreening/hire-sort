"use client";

import SampleResume from "../_sample_data/scored_resume.json";
import SampleRubric from "../_sample_data/sample-rubric.json";
import type { Rubric, ScoredResume } from "../types";

// The tool endpoints are rate-limited per visitor IP, so they must be called
// directly from the browser (a server-side proxy would collapse every visitor
// onto one IP). Point this at the public API host.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Scoring runs JD extraction + rubric build + resume scoring in one request, so
// it can legitimately take a while. Give it a long ceiling before we give up,
// rather than leaning on whatever default the browser/proxy happens to apply.
const SCORE_TIMEOUT_MS = 120_000;

// ─── Tool configuration ──────────────────────────────────────────────────────
//
// The demo and the standalone screening tool share this entire client. They
// differ only in: the endpoints they hit, the response headers the server sets
// (each tool namespaces its own rate-limit/session headers), whether the
// built-in sample shortcuts are offered, and where their result pages live.

/** Names of the response headers a tool uses for its rate-limit/session metadata. */
export type ToolHeaderNames = {
  sessionId: string;
  attemptsLeft: string;
  resetsAt: string;
};

export type ToolConfig = {
  /** Stable identity for the tool (e.g. "demo" / "screening"). */
  key: string;
  /** POST endpoint that builds the rubric + scores the resume in one call. */
  scoreEndpoint: string;
  /** GET endpoint base for re-fetching a session by id (no trailing slash). */
  sessionEndpoint: string;
  /** Route prefix the result page lives under, e.g. "/demo" or "/tools/screening". */
  resultBase: string;
  /** Whether the built-in sample JD/resume shortcuts are offered. */
  allowSample: boolean;
  /** Response header names this tool's API populates. */
  headers: ToolHeaderNames;
};

export const DEMO_CONFIG: ToolConfig = {
  key: "demo",
  scoreEndpoint: "/api/v1/demo",
  sessionEndpoint: "/api/v1/session",
  resultBase: "/demo",
  allowSample: true,
  headers: {
    sessionId: "X-Demo-Session-Id",
    attemptsLeft: "X-Attempts-Left",
    resetsAt: "X-Demo-Session-Resets-At",
  },
};

export const SCREENING_CONFIG: ToolConfig = {
  key: "screening",
  scoreEndpoint: "/api/v1/screening",
  sessionEndpoint: "/api/v1/session",
  resultBase: "/tools/screening",
  allowSample: false,
  headers: {
    sessionId: "X-Screen-Session-Id",
    attemptsLeft: "X-Screen-Resume-Attempts-Left",
    resetsAt: "X-Screen-Session-Resets-At",
  },
};

/** Public URLs of the JD/resume used. Optional and possibly partial (see API guide). */
export type DemoUrls = { jd_url?: string; resume_url?: string } | null;

export type SessionPayload = {
  rubric: Rubric;
  resume: ScoredResume | null;
  urls?: DemoUrls;
};

// Each side is either an upload (carries a File) or the built-in sample (no File —
// the server fills it in via the is_sample_* flags). All four combinations are valid
// for the demo; the screening tool only ever sends uploads.
export type CreateSessionInput = {
  jd: { isSampleSelected: true } | { isSampleSelected: false; file: File };
  resume: { isSampleSelected: true } | { isSampleSelected: false; file: File };
};

// ─── Errors ────────────────────────────────────────────────────────────────

export type DemoErrorCode =
  | "TOOL_SESSION_ATTEMPT_LIMIT_REACHED"
  | "DEMO_INPUT_INVALID"
  | "NO_VALID_RESUMES"
  | "RESUME_PARSE_ERROR"
  | "JD_EXTRACTION_FAILED"
  | "SCORING_ERROR"
  // Real code returned by GET /<tool>/session/:id when the id is unknown or the
  // session has no score_card. SESSION_NOT_FOUND is our own synthesized variant.
  | "TOOL_SESSION_NOT_FOUND"
  | "SESSION_NOT_FOUND"
  // FastAPI request-validation failure (malformed multipart, a non-bool query
  // flag, or a session id that isn't a valid UUID) — 422 with no `error` code.
  | "VALIDATION_FAILED"
  | "UNKNOWN";

export class DemoApiError extends Error {
  code: DemoErrorCode;
  status: number;
  resetsAt: string | null;
  attemptsLeft: string | null;

  constructor(
    code: DemoErrorCode,
    message: string,
    opts: { status?: number; resetsAt?: string | null; attemptsLeft?: string | null } = {},
  ) {
    super(message);
    this.name = "DemoApiError";
    this.code = code;
    this.status = opts.status ?? 0;
    this.resetsAt = opts.resetsAt ?? null;
    this.attemptsLeft = opts.attemptsLeft ?? null;
  }
}

/** Turn a non-ok tool response into a typed error, preserving rate-limit headers. */
async function toToolError(res: Response, headerNames: ToolHeaderNames): Promise<DemoApiError> {
  let body: { error?: string; message?: string; detail?: string } | null = null;
  try {
    body = await res.json();
  } catch {
    // Non-JSON error body — fall back to status text below.
  }

  const headers = {
    resetsAt: res.headers.get(headerNames.resetsAt),
    attemptsLeft: res.headers.get(headerNames.attemptsLeft),
  };

  // FastAPI request-validation errors don't carry our `error` code — they come
  // back as 422 with {"detail":"Validation failed","errors":[…]}. Map them to a
  // single VALIDATION_FAILED code instead of leaking the raw status text.
  if (!body?.error && res.status === 422) {
    return new DemoApiError("VALIDATION_FAILED", body?.detail || "Validation failed", {
      status: res.status,
      ...headers,
    });
  }

  const code = (body?.error as DemoErrorCode | undefined) ??
    (res.status === 403 ? "TOOL_SESSION_ATTEMPT_LIMIT_REACHED" : "UNKNOWN");
  return new DemoApiError(code, body?.message || res.statusText || "Request failed", {
    status: res.status,
    ...headers,
  });
}

// ─── Low-level endpoint clients ──────────────────────────────────────────────

type DemoScoreResponse = { rubric: Rubric; scored_resume: ScoredResume; urls?: DemoUrls };

/** Parsed tool result plus the rate-limit/session headers the API exposes. */
export type ScoreDemoResult = {
  rubric: Rubric;
  scored_resume: ScoredResume;
  urls: DemoUrls;
  sessionId: string | null;
  attemptsLeft: string | null;
  resetsAt: string | null;
};

// ─── Tool API factory ────────────────────────────────────────────────────────
//
// Every sample/upload combination runs through the tool's score endpoint, which
// mints a real session id. That id is the route key, and the result is re-fetched
// from GET <sessionEndpoint>/:id — the single source of truth, so reloads and
// shared links work across devices.

export type ToolApi = ReturnType<typeof createToolApi>;

export function createToolApi(config: ToolConfig) {
  /**
   * POST <scoreEndpoint> — build a rubric (or reuse the sample one, for the demo)
   * and score a resume against it, in one call. Sample sides are selected via the
   * `is_sample_*` query flags; the matching form field must then be omitted. For an
   * uploaded JD send exactly one of `jdFile`/`jdText`. Counts against the per-IP
   * budget on a successful 200 only. Let the browser set the multipart boundary —
   * never set Content-Type by hand.
   */
  async function scoreTool(args: {
    resumeFile?: File;
    jdFile?: File;
    jdText?: string;
    isSampleResume?: boolean;
    isSampleJd?: boolean;
  }): Promise<ScoreDemoResult> {
    const { isSampleResume = false, isSampleJd = false } = args;

    const params = new URLSearchParams();
    if (isSampleResume) params.set("is_sample_resume", "true");
    if (isSampleJd) params.set("is_sample_jd", "true");
    const qs = params.toString();

    const fd = new FormData();
    // Omit `resume_file` when the sample resume is requested; otherwise it's required.
    if (!isSampleResume && args.resumeFile) fd.append("resume_file", args.resumeFile);
    // Omit `jd_file`/`jd_text` when the sample JD is requested; otherwise send one.
    if (!isSampleJd) {
      if (args.jdFile) fd.append("jd_file", args.jdFile);
      else if (args.jdText) fd.append("jd_text", args.jdText);
    }

    let res: Response;
    try {
      res = await fetch(`${API_BASE}${config.scoreEndpoint}${qs ? `?${qs}` : ""}`, {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(SCORE_TIMEOUT_MS),
      });
    } catch (err) {
      // A timeout surfaces as an AbortError/TimeoutError; normalize it so the UI
      // shows a retryable message instead of a raw DOMException.
      if (err instanceof DOMException && (err.name === "TimeoutError" || err.name === "AbortError")) {
        throw new DemoApiError("SCORING_ERROR", "Scoring took too long. Please try again.", {
          status: 408,
        });
      }
      throw err;
    }
    if (!res.ok) throw await toToolError(res, config.headers);

    const data = (await res.json()) as DemoScoreResponse;
    return {
      rubric: data.rubric,
      scored_resume: data.scored_resume,
      urls: data.urls ?? null,
      sessionId: res.headers.get(config.headers.sessionId),
      attemptsLeft: res.headers.get(config.headers.attemptsLeft),
      resetsAt: res.headers.get(config.headers.resetsAt),
    };
  }

  async function createSession(input: CreateSessionInput): Promise<{ session_id: string }> {
    const isSampleJd = input.jd.isSampleSelected;
    const isSampleResume = input.resume.isSampleSelected;

    // One call covers all four combinations; the is_sample_* flags tell the server
    // which sides to take from the built-in sample vs. the uploaded files.
    const result = await scoreTool({
      isSampleJd,
      isSampleResume,
      jdFile: isSampleJd ? undefined : (input.jd as { file: File }).file,
      resumeFile: isSampleResume ? undefined : (input.resume as { file: File }).file,
    });

    // The session id is the route key and the only handle for re-fetching the
    // result from the server. A 200 without it means the API host isn't exposing
    // its session-id header (CORS Access-Control-Expose-Headers) — fail loudly
    // rather than route to a random id that can never resolve.
    if (!result.sessionId) {
      throw new DemoApiError(
        "UNKNOWN",
        `Scoring succeeded but no session id was returned (check that "${config.headers.sessionId}" is in the API's Access-Control-Expose-Headers).`,
      );
    }
    return { session_id: result.sessionId };
  }

  /**
   * GET <sessionEndpoint>/:id — re-fetch a previously computed result.
   * Returns the same shape as the POST score endpoint (rubric + scored_resume + urls).
   */
  async function fetchSession(id: string): Promise<SessionPayload> {
    const res = await fetch(`${API_BASE}${config.sessionEndpoint}/${encodeURIComponent(id)}`);
    if (!res.ok) throw await toToolError(res, config.headers);
    const data = (await res.json()) as DemoScoreResponse;
    return { rubric: data.rubric, resume: data.scored_resume, urls: data.urls ?? null };
  }

  async function getSession(id: string): Promise<SessionPayload> {
    if (config.allowSample && id === "sample") {
      return { rubric: SampleRubric as Rubric, resume: SampleResume as ScoredResume };
    }

    // The server is the single source of truth (survives reloads on any device).
    try {
      return await fetchSession(id);
    } catch (err) {
      // This endpoint isn't rate-limited and only fails meaningfully with a 404
      // (TOOL_SESSION_NOT_FOUND), a 422 on a non-UUID id, or an uncaught 500 — all
      // of which read as "no such session" to the visitor. Normalize them so the
      // page always shows the same recoverable guidance.
      throw new DemoApiError(
        "SESSION_NOT_FOUND",
        "We couldn't find this session — it may have expired or been opened on another device.",
        { status: err instanceof DemoApiError ? err.status : 404 },
      );
    }
  }

  return { config, scoreTool, createSession, getSession };
}

// ─── Scorecard download ──────────────────────────────────────────────────────

/** Pull a filename out of a Content-Disposition header, if the server sent one. */
function filenameFromContentDisposition(header: string | null): string | null {
  if (!header) return null;
  // Prefer RFC 5987 filename* (carries an encoding), fall back to plain filename.
  const star = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(header);
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1].replace(/["']/g, "").trim());
    } catch {
      // Malformed encoding — fall through to the plain filename below.
    }
  }
  const plain = /filename="?([^";]+)"?/i.exec(header);
  return plain?.[1]?.trim() ?? null;
}

/**
 * GET <scoreEndpoint>/:id/download-scorecard — download a session's scorecard as
 * a file. We stream the response into a blob and trigger the download ourselves
 * (rather than navigating an `<a href>`) so a non-200 surfaces as a typed error
 * and the cross-origin API host's filename header is honored when exposed via
 * CORS. Defaults to the demo route; pass another tool's config to reuse it.
 */
export async function downloadScorecard(
  sessionId: string,
  config: ToolConfig = DEMO_CONFIG,
): Promise<void> {
  const res = await fetch(
    `${API_BASE}${config.scoreEndpoint}/${encodeURIComponent(sessionId)}/download-scorecard`,
  );
  if (!res.ok) throw await toToolError(res, config.headers);

  const blob = await res.blob();
  const filename =
    filenameFromContentDisposition(res.headers.get("Content-Disposition")) ??
    `scorecard-${sessionId}.pdf`;

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

// ─── UI helpers ──────────────────────────────────────────────────────────────

const ERROR_MESSAGES: Record<DemoErrorCode, string> = {
  TOOL_SESSION_ATTEMPT_LIMIT_REACHED: "You've used your free try for now.",
  DEMO_INPUT_INVALID: "Please provide both a job description and a resume.",
  NO_VALID_RESUMES: "That file isn't supported. Upload a PDF or DOCX under 20 MB.",
  RESUME_PARSE_ERROR: "We couldn't read any text from that file. Try a text-based PDF or DOCX.",
  JD_EXTRACTION_FAILED: "That job description is too short. Add more detail and try again.",
  SCORING_ERROR: "Something went wrong while scoring. Please try again.",
  TOOL_SESSION_NOT_FOUND:
    "We couldn't find this session — it may have expired or been opened on another device.",
  SESSION_NOT_FOUND: "We couldn't find this session.",
  VALIDATION_FAILED: "Something about that request wasn't valid. Please try again.",
  UNKNOWN: "Something went wrong. Please try again.",
};

export type DemoErrorView = {
  message: string;
  isLimit: boolean;
  resetsAt: string | null;
};

/** Map any thrown value to a user-facing message + rate-limit metadata. */
export function demoErrorView(err: unknown): DemoErrorView {
  if (err instanceof DemoApiError) {
    const isLimit = err.code === "TOOL_SESSION_ATTEMPT_LIMIT_REACHED" || err.status === 403;
    // Session errors carry a bespoke message; everything else uses the map.
    const message =
      err.code === "SESSION_NOT_FOUND" ? err.message : ERROR_MESSAGES[err.code] ?? err.message;
    return { message, isLimit, resetsAt: err.resetsAt };
  }
  return { message: ERROR_MESSAGES.UNKNOWN, isLimit: false, resetsAt: null };
}

/** "May 31, 2026, 2:30 PM" style, or null if the timestamp is missing/invalid. */
export function formatResetTime(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Scoring a resume on its own needs a JD, which the atomic score flow never
 * persists. Sessions are always created pre-scored, so this is only hit via a
 * stale/expired session link — guide the visitor to start over.
 */
export async function scoreResume(_sessionId: string, _file: File): Promise<ScoredResume> {
  throw new DemoApiError(
    "SESSION_NOT_FOUND",
    "We couldn't find the job description for this session. Start over to score a resume.",
    { status: 404 },
  );
}
