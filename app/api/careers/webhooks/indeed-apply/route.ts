import { randomUUID } from "crypto";
import {
  addApplication,
  hasApplication,
  type Application,
} from "@/lib/test-store";

// Shape of the payload Indeed Apply POSTs to this endpoint.
interface IndeedApplyPayload {
  id: string;
  job?: {
    jobId?: string;
    jobTitle?: string;
    jobCompany?: string;
    jobUrl?: string;
  };
  applicant?: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
  };
  resume?: {
    file?: { fileName?: string; mimeType?: string; data?: string };
    json?: unknown;
    html?: string;
  };
  coverletter?: { text?: string };
}

// Indeed retries on any non-200, so this handler ALWAYS responds 200 fast.
export async function POST(req: Request) {
  let payload: IndeedApplyPayload | null = null;
  try {
    payload = (await req.json()) as IndeedApplyPayload;
  } catch {
    // Malformed body: acknowledge anyway so Indeed doesn't hammer us.
    return Response.json({ status: "ignored", reason: "invalid_json" });
  }

  try {
    const id = payload?.id;
    if (!id) {
      return Response.json({ status: "ignored", reason: "missing_id" });
    }

    // Idempotency: same id already processed → skip, still 200.
    if (hasApplication(id)) {
      return Response.json({ status: "ok", duplicate: true });
    }

    const applicant = payload.applicant ?? {};
    const file = payload.resume?.file;

    const app: Application = {
      id,
      apply_id: randomUUID(),
      source: "indeed_apply",
      job_id: payload.job?.jobId ?? "unknown",
      full_name: applicant.fullName ?? "Unknown applicant",
      email: applicant.email ?? "",
      phone: applicant.phoneNumber || undefined,
      resume_base64: file?.data,
      resume_filename: file?.fileName,
      resume_mime: file?.mimeType,
      resume_json: file?.data ? undefined : payload.resume?.json,
      resume_html: file?.data ? undefined : payload.resume?.html,
      cover_letter: payload.coverletter?.text,
      raw_payload: payload,
      received_at: new Date().toISOString(),
    };
    addApplication(app);

    return Response.json({ status: "ok" });
  } catch {
    // Never surface a 500 to Indeed — acknowledge and move on.
    return Response.json({ status: "ok", note: "stored_with_errors" });
  }
}
