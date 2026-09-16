import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://resume-saas-uat.up.railway.app";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const formData = await req.formData();

    const targetUrl = `${API_BASE}/api/v1/screenings/${jobId}/upload-resume`;

    const backendRes = await fetch(targetUrl, {
      method: "POST",
      body: formData,
    });

    const data = await backendRes.json().catch(() => ({}));

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("Error in proxy upload-resume route:", err);
    return NextResponse.json(
      { detail: err instanceof Error ? err.message : "Failed to connect to application server." },
      { status: 500 }
    );
  }
}
