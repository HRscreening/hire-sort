"use client";

import { useCallback, useEffect, useState } from "react";

interface AppRow {
  id: string;
  apply_id: string;
  source: "google_direct" | "indeed_apply" | "test";
  job_id: string;
  full_name: string;
  email: string;
  phone?: string;
  has_resume_file: boolean;
  resume_filename?: string;
  has_resume_json: boolean;
  has_resume_html: boolean;
  raw_payload?: unknown;
  received_at: string;
}

// 64-char hex id, matching the Indeed Apply idempotency key length.
function makeId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function buildSamplePayload(id: string) {
  return {
    id,
    job: {
      jobId: "HS-001",
      jobTitle: "Senior Backend Engineer",
      jobCompany: "hiresort",
      jobUrl: "/careers/HS-001",
    },
    applicant: {
      fullName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phoneNumber: "+91 98765 43210",
    },
    resume: {
      file: {
        fileName: "priya-sharma-resume.pdf",
        mimeType: "application/pdf",
        // Tiny placeholder bytes — enough to verify base64 decode round-trips.
        data: btoa("Sample resume content for a hiresort candidate."),
      },
    },
    coverletter: { text: "Excited to apply for the Senior Backend Engineer role." },
  };
}

const sourceStyles: Record<string, string> = {
  indeed_apply: "bg-green-100 text-green-800",
  google_direct: "bg-blue-100 text-blue-800",
  test: "bg-gray-100 text-gray-700",
};

export default function DashboardClient() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/careers/applications", {
        cache: "no-store",
      });
      const json = await res.json();
      setRows(json.applications ?? []);
      setCount(json.count ?? 0);
    } catch {
      // ignore transient fetch errors during polling
    }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 5000);
    return () => clearInterval(t);
  }, [refresh]);

  async function fire(id: string) {
    setBusy(true);
    setResponse("");
    try {
      const res = await fetch("/api/careers/webhooks/indeed-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildSamplePayload(id)),
      });
      const json = await res.json();
      setResponse(`HTTP ${res.status} · ${JSON.stringify(json)}`);
      await refresh();
    } catch (err) {
      setResponse(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  async function fireNew() {
    const id = makeId();
    setLastId(id);
    await fire(id);
  }

  async function fireDuplicate() {
    if (!lastId) {
      setResponse("Fire a sample application first, then send the duplicate.");
      return;
    }
    await fire(lastId);
  }

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", { hour12: false });

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Careers — Test Console</h1>
      <p className="mt-1 text-sm text-gray-500">
        In-memory only. Data resets on server restart.
      </p>

      {/* Section A — trigger */}
      <section className="mt-6 rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900">Fire Sample Application</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            onClick={fireNew}
            disabled={busy}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            Fire Sample Application
          </button>
          <button
            onClick={fireDuplicate}
            disabled={busy || !lastId}
            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
          >
            Fire Duplicate{lastId ? " (same id)" : ""}
          </button>
        </div>
        {lastId && (
          <p className="mt-3 break-all font-mono text-xs text-gray-500">
            last id: {lastId}
          </p>
        )}
        {response && (
          <pre className="mt-3 overflow-x-auto rounded-md bg-gray-900 px-3 py-2 text-xs text-green-300">
            {response}
          </pre>
        )}
      </section>

      {/* Section B — received */}
      <section className="mt-6 rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            Applications Received ({count})
          </h2>
          <button
            onClick={refresh}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Source</th>
                <th className="py-2 pr-3">Job</th>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Phone</th>
                <th className="py-2 pr-3">Resume</th>
                <th className="py-2 pr-3">Raw</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-400">
                    No applications yet.
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const hasResume =
                  r.has_resume_file || r.has_resume_json || r.has_resume_html;
                return (
                  <tr key={r.apply_id} className="border-b border-gray-100 align-top">
                    <td className="py-2 pr-3 whitespace-nowrap text-gray-600">
                      {fmtTime(r.received_at)}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          sourceStyles[r.source] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r.source}
                      </span>
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.job_id}</td>
                    <td className="py-2 pr-3">{r.full_name}</td>
                    <td className="py-2 pr-3 text-gray-600">{r.email}</td>
                    <td className="py-2 pr-3 text-gray-600">{r.phone ?? "—"}</td>
                    <td className="py-2 pr-3">
                      {hasResume ? (
                        <a
                          href={`/api/careers/resume/${r.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      <button
                        onClick={() =>
                          setExpanded(expanded === r.apply_id ? null : r.apply_id)
                        }
                        className="text-xs font-medium text-gray-500 hover:text-gray-800"
                      >
                        {expanded === r.apply_id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.map(
                (r) =>
                  expanded === r.apply_id && (
                    <tr key={`${r.apply_id}-raw`} className="border-b border-gray-100">
                      <td colSpan={8} className="py-2">
                        <pre className="max-h-72 overflow-auto rounded-md bg-gray-900 p-3 text-xs text-gray-200">
                          {JSON.stringify(r.raw_payload ?? r, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
