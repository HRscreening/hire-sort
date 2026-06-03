import { randomUUID } from "crypto";
import { addApplication, type Application } from "@/lib/test-store";
import { TEST_JOB } from "@/lib/test-job";

// Receives the on-page apply form (multipart FormData) and stores it in memory.
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const full_name = String(form.get("full_name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const job_id = String(form.get("job_id") ?? TEST_JOB.id).trim();

    if (!full_name || !email) {
      return Response.json(
        { success: false, error: "Name and email are required." },
        { status: 400 },
      );
    }

    const resume = form.get("resume");
    let resume_base64: string | undefined;
    let resume_filename: string | undefined;
    let resume_mime: string | undefined;

    if (resume instanceof File && resume.size > 0) {
      const bytes = Buffer.from(await resume.arrayBuffer());
      resume_base64 = bytes.toString("base64");
      resume_filename = resume.name;
      resume_mime = resume.type || "application/octet-stream";
    } else {
      return Response.json(
        { success: false, error: "A resume file is required." },
        { status: 400 },
      );
    }

    const id = randomUUID();
    const app: Application = {
      id,
      apply_id: id,
      source: "google_direct",
      job_id,
      full_name,
      email,
      phone: phone || undefined,
      resume_base64,
      resume_filename,
      resume_mime,
      raw_payload: { full_name, email, phone, job_id, resume_filename },
      received_at: new Date().toISOString(),
    };
    addApplication(app);

    return Response.json({ success: true, id });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unexpected error.",
      },
      { status: 500 },
    );
  }
}
