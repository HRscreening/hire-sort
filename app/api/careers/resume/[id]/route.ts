import { getApplication } from "@/lib/test-store";

type Params = Promise<{ id: string }>;

// Decodes the stored base64 resume and serves it as a file download. This is
// how we verify the base64 round-trips into a valid file.
export async function GET(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const app = getApplication(id);

  if (!app) {
    return Response.json({ error: "Application not found." }, { status: 404 });
  }

  // No file resume? Fall back to the Indeed HTML/JSON resume if present.
  if (!app.resume_base64) {
    if (app.resume_html) {
      return new Response(app.resume_html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    if (app.resume_json != null) {
      return Response.json(app.resume_json);
    }
    return Response.json(
      { error: "No resume attached to this application." },
      { status: 404 },
    );
  }

  let bytes: Buffer;
  try {
    bytes = Buffer.from(app.resume_base64, "base64");
  } catch {
    return Response.json({ error: "Resume could not be decoded." }, {
      status: 422,
    });
  }

  const filename = app.resume_filename || `resume-${id}`;
  const mime = app.resume_mime || "application/octet-stream";

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
      "Content-Length": String(bytes.length),
      "Cache-Control": "no-store",
    },
  });
}
