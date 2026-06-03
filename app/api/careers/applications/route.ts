import { applications } from "@/lib/test-store";

// Returns the in-memory applications (newest first), with the heavy base64
// resume blob omitted from the list payload — download it via /resume/[id].
export async function GET() {
  const list = [...applications].reverse().map((a) => ({
    id: a.id,
    apply_id: a.apply_id,
    source: a.source,
    job_id: a.job_id,
    full_name: a.full_name,
    email: a.email,
    phone: a.phone,
    has_resume_file: Boolean(a.resume_base64),
    resume_filename: a.resume_filename,
    resume_mime: a.resume_mime,
    has_resume_json: a.resume_json != null,
    has_resume_html: Boolean(a.resume_html),
    cover_letter: a.cover_letter,
    raw_payload: a.raw_payload,
    received_at: a.received_at,
  }));

  return Response.json(
    { count: list.length, applications: list },
    { headers: { "Cache-Control": "no-store" } },
  );
}
