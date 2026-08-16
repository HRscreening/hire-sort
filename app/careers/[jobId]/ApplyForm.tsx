"use client";

import { useState, useRef } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!selectedFile) {
      setStatus({
        kind: "error",
        message: "Please upload your resume.",
      });
      return;
    }

    formData.set("resume_file", selectedFile);
    formData.set("job_id", jobId);

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch(`${API_BASE}/api/v1/screenings/${jobId}/upload-resume`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errDetail = json.detail || json;
        const code = errDetail.error_code || errDetail.error || json.error_code;
        const msg = errDetail.message || json.message;

        // Custom domain error messages mapping
        if (code === "FILE_UPLOAD_ERROR") {
          throw new Error("An error occurred during file upload. Please try again.");
        } else if (code === "APPLICATION_ALREADY_EXISTS") {
          throw new Error("An application with the same email already exists for this screening.");
        } else if (code === "INVALID_FILE_TYPE") {
          throw new Error("Invalid file type. Only PDF and DOCX files are allowed.");
        } else if (code === "FILE_SIZE_EXCEEDED") {
          throw new Error("File size exceeded the maximum limit of 5MB.");
        } else if (code === "ALREADY_APPLIED") {
          throw new Error("You have already applied for this screening.");
        } else if (res.status === 409) {
          throw new Error("An application with this email already exists.");
        } else if (res.status === 413) {
          throw new Error("File size limit exceeded. Please upload a file smaller than 5MB.");
        } else {
          throw new Error(msg || `Submission failed with status ${res.status}`);
        }
      }

      setStatus({
        kind: "success",
        message: "Application submitted successfully! We’ll review your application and be in touch if you’re selected for the next stage.",
      });
      setSelectedFile(null);
      form.reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Try again.",
      });
    }
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Size check
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          kind: "error",
          message: "File size exceeds the 5MB limit.",
        });
        return;
      }
      setSelectedFile(file);
      setStatus({ kind: "idle" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          kind: "error",
          message: "File size exceeds the 5MB limit.",
        });
        return;
      }
      setSelectedFile(file);
      setStatus({ kind: "idle" });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputCls =
    "mt-1 block w-full rounded-xl border border-line-soft bg-ivory/30 px-3 py-2 text-sm text-charcoal shadow-soft focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 placeholder:text-charcoal-xlt/70";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Full name<span className="text-accent"> *</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
          className={inputCls}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Email address<span className="text-accent"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className={inputCls}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Phone number<span className="text-accent"> *</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          className={inputCls}
          autoComplete="tel"
        />
      </div>

      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
          Resume (PDF or DOCX)<span className="text-accent"> *</span>
        </span>

        {/* Drag and Drop Box */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center rounded-xl border border-dashed p-5 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-accent bg-accent/5"
              : selectedFile
              ? "border-success bg-success-bg/10"
              : "border-line bg-ivory/10 hover:border-accent hover:bg-ivory/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="resume"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2 text-left min-w-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-success flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-charcoal truncate">{selectedFile.name}</p>
                  <p className="text-[10px] text-neutral-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="rounded-lg p-1.5 text-neutral-500 hover:bg-charcoal/5 hover:text-accent transition-colors"
                aria-label="Remove file"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="text-accent mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-xs font-semibold text-charcoal">
                Click to upload or drag & drop
              </p>
              <p className="text-[10px] text-neutral-500 mt-1">
                PDF, DOCX up to 5MB
              </p>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-charcoal px-4 py-2.5 text-sm font-semibold text-ivory shadow-soft hover:bg-accent transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.kind === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4 text-ivory" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </button>

      {status.kind === "success" && (
        <div className="rounded-xl bg-success-bg p-3.5 border border-success/20 flex items-start gap-2.5 animate-fade-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-success mt-0.5 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-semibold text-success leading-normal">
            {status.message}
          </p>
        </div>
      )}

      {status.kind === "error" && (
        <div className="rounded-xl bg-red-50 p-3.5 border border-red-200 flex items-start gap-2.5 animate-fade-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-red-600 mt-0.5 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs font-semibold text-red-700 leading-normal">
            {status.message}
          </p>
        </div>
      )}
    </form>
  );
}
