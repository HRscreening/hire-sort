"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("job_id", jobId);

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }
      setStatus({
        kind: "success",
        message: "Application received. Thank you!",
      });
      form.reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong. Try again.",
      });
    }
  }

  const inputCls =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div>
        <label htmlFor="full_name" className="text-sm font-medium text-gray-700">
          Full name<span className="text-red-500"> *</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          className={inputCls}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email<span className="text-red-500"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputCls}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={inputCls}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="resume" className="text-sm font-medium text-gray-700">
          Resume<span className="text-red-500"> *</span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,.txt,.rtf"
          className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
        />
      </div>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.kind === "submitting" ? "Submitting…" : "Apply Now"}
      </button>

      {status.kind === "success" && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
          {status.message}
        </p>
      )}
      {status.kind === "error" && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {status.message}
        </p>
      )}
    </form>
  );
}
