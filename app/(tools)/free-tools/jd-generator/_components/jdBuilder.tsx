"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clipboard,
  Download,
  FileText,
  Loader2,
  Lock,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginCtaBar from "../../../_components/loginCtaBar";
import { stashJdForRubric } from "../../../_lib/rubricHandoff";
import {
  downloadJdPdf,
  formatResetTime,
  generateJdStream,
  type JdGenerateInput,
  type JdGenerateMeta,
  JdApiError,
  normalizeUrl,
} from "../_lib/jdApi";
import { useTypewriter } from "../_lib/useTypewriter";
import Toast, { type ToastData } from "../../../_components/toast";

const ease = [0.22, 1, 0.36, 1] as const;

const WORK_ARRANGEMENTS = ["Remote", "Hybrid", "On-site"] as const;

// Trust/feature pills shown above the panels — quick reassurance on what the
// tool does without re-introducing a heading.
const FEATURES = [
  { Icon: Sparkles, label: "Streams live as it writes", color: "text-accent" },
  { Icon: Wand2, label: "Structured & inclusive", color: "text-accent" },
  { Icon: Download, label: "Export to PDF", color: "text-accent" },
  { Icon: Check, label: "No signup needed", color: "text-success" },
] as const;

const fieldClass =
  "w-full h-10 px-3 rounded-lg border border-line bg-ivory text-charcoal text-sm placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed";
const labelClass = "block text-xs font-medium text-charcoal-md mb-1";

export default function JdBuilder() {
  const router = useRouter();

  // ── Form state — the structured details that ground generation ──
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [location, setLocation] = useState("");
  const [yrsExperience, setYrsExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [prompt, setPrompt] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(true);

  // ── Generation / output state ──
  const [jdText, setJdText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Whether the active error is a spent-quota (403/429) limit, so the toast can
  // render the softer "limit" flavour even when no reset time came back.
  const [errorIsLimit, setErrorIsLimit] = useState(false);
  const [limitResetsAt, setLimitResetsAt] = useState<Date | null>(null);

  // ── Quota / session, from the response headers ──
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [maxAttempts, setMaxAttempts] = useState<number | null>(null);
  const [resetsAt, setResetsAt] = useState<Date | null>(null);
  // Reused on refines/downloads to stay on the same attempt window even when the
  // cross-site cookie is blocked. A ref so the latest id is read without
  // re-running effects.
  const sessionIdRef = useRef<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const outOfAttempts = attemptsLeft !== null && attemptsLeft <= 0;
  const resetLabel = formatResetTime(resetsAt);
  // The backend requires these four; gate generation on them so we show a clear
  // hint instead of bouncing off a 422.
  const detailsComplete =
    Boolean(companyName.trim()) &&
    Boolean(companyUrl.trim()) &&
    Boolean(workArrangement.trim()) &&
    Boolean(location.trim());
  const canGenerate =
    Boolean(jobTitle.trim()) && detailsComplete && !generating && !outOfAttempts;
  const canDownload =
    Boolean(jobTitle.trim()) &&
    Boolean(jdText.trim()) &&
    detailsComplete &&
    !generating &&
    !downloading;

  // Reveal streamed text at a steady typewriter pace rather than in the big
  // bursts the backend sends. `generating` stays true until the reveal drains.
  const typewriter = useTypewriter({
    onReveal: setJdText,
    onDone: () => setGenerating(false),
  });

  // Keep the output pinned to the latest line while it types out, so it reads
  // top-to-bottom like a chat response. Stops once generation ends.
  useEffect(() => {
    if (!generating) return;
    const el = textareaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [jdText, generating]);

  // Assemble the structured `jd_details` shared by generation and PDF export.
  // Optional numeric/text fields collapse to null when blank.
  function buildJdDetails(): JdGenerateInput {
    const trimmedYrs = yrsExperience.trim();
    const parsedYrs = trimmedYrs ? Number(trimmedYrs) : null;
    return {
      job_title: jobTitle.trim(),
      company_name: companyName.trim(),
      company_url: normalizeUrl(companyUrl),
      employment_type_work_arrangement: workArrangement.trim(),
      location: location.trim(),
      yrs_experience: parsedYrs !== null && !Number.isNaN(parsedYrs) ? parsedYrs : null,
      salary_compensation_info: salary.trim() || null,
      skills: skills.trim() || null,
    };
  }

  // Apply quota headers; each field only when present so a missing (unexposed)
  // header doesn't blank out a known value. Always capture a fresh session id.
  function applyMeta(meta: JdGenerateMeta) {
    if (meta.sessionId) sessionIdRef.current = meta.sessionId;
    if (meta.attemptsLeft !== null) setAttemptsLeft(meta.attemptsLeft);
    if (meta.maxAttempts !== null) setMaxAttempts(meta.maxAttempts);
    if (meta.resetsAt !== null) setResetsAt(meta.resetsAt);
  }

  // Surface the API's own message for either call. `source` matters because the
  // quota headers describe the *generation* window — a download rate-limit must
  // not zero out the visitor's remaining generations.
  function handleError(err: unknown, source: "generate" | "download") {
    if (err instanceof JdApiError) {
      setError(err.message);
      setErrorIsLimit(err.isLimit);
      setLimitResetsAt(err.resetsAt);
      if (source === "generate") {
        if (err.isLimit) setAttemptsLeft(0);
        if (err.resetsAt) setResetsAt(err.resetsAt);
      }
    } else {
      const fallback =
        source === "download"
          ? "Couldn't download the PDF. Please try again."
          : "Couldn't generate the job description. Please try again.";
      setError(err instanceof Error ? err.message : fallback);
      setErrorIsLimit(false);
      setLimitResetsAt(null);
    }
  }

  async function handleGenerate() {
    if (!canGenerate) return;
    setError(null);
    setLimitResetsAt(null);
    setGenerating(true);
    // Capture the JD to refine before we clear the output for the new stream.
    const currentJd = jdText;
    typewriter.reset();
    setJdText("");
    try {
      const meta = await generateJdStream(
        {
          jd_details: buildJdDetails(),
          user_input: prompt.trim(),
          current_Jd: currentJd,
        },
        sessionIdRef.current,
        (fullText) => typewriter.push(fullText),
      );
      setHasGenerated(true);
      applyMeta(meta);
      // Let the typewriter finish revealing what's still buffered; it flips
      // `generating` off via onDone.
      typewriter.finish();
    } catch (err) {
      // Restore the prior JD so a failed refine doesn't wipe the user's work.
      typewriter.cancel();
      setJdText(currentJd);
      setGenerating(false);
      handleError(err, "generate");
    }
  }

  async function handleDownload() {
    if (!canDownload) return;
    setError(null);
    setLimitResetsAt(null);
    setDownloading(true);
    try {
      const { blob, filename, meta } = await downloadJdPdf(
        {
          jd_details: buildJdDetails(),
          user_input: prompt.trim(),
          current_Jd: jdText,
        },
        sessionIdRef.current,
      );
      applyMeta(meta);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename ?? `${jobTitle.trim() || "job-description"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      handleError(err, "download");
    } finally {
      setDownloading(false);
    }
  }

  const showOutputMeta = hasGenerated || jdText.trim().length > 0;

  // Surface the active error as a top-right toast. A spent quota (either call)
  // reads as the softer "limit" flavour; anything else is a plain error.
  const toast: ToastData | null = error
    ? {
        message: error,
        variant: errorIsLimit || outOfAttempts ? "limit" : "error",
        resetLabel: formatResetTime(limitResetsAt),
      }
    : null;

  function dismissToast() {
    setError(null);
    setErrorIsLimit(false);
    setLimitResetsAt(null);
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-ivory overflow-hidden">
      {/* Errors & limit notices surface as a top-right toast */}
      <Toast toast={toast} onClose={dismissToast} />

      {/* Homepage hero–style grid background with a radial fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,180,160,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,180,160,0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 25%, transparent 80%)",
        }}
      />

      {/* Warm ambient glows for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 z-0 h-120 w-120 rounded-full blur-3xl opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #C85A17 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-40 z-0 h-136 w-136 rounded-full blur-3xl opacity-[0.10]"
        style={{ background: "radial-gradient(circle, #C85A17 0%, transparent 70%)" }}
      />

      {/* Floating hero-style cards in the wide margins (ultrawide only) */}
      <FloatingDecor />

      <LoginCtaBar text="Build a job description in seconds — then save it, screen resumes, and rank your pipeline." />

      <main className="relative z-10 flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-8 sm:py-10">
          {/* Feature pills */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-medium text-charcoal-md shadow-soft backdrop-blur-sm"
              >
                <f.Icon className={`h-3.5 w-3.5 ${f.color}`} />
                {f.label}
              </span>
            ))}
          </div>

          {/* Two panels — centered in the viewport */}
          <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
            {/* ── Left — the form ── */}
            <section className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-soft">
              {/* Job title */}
              <div className="mb-5">
                <label htmlFor="jd-title" className="block text-sm font-semibold text-charcoal mb-1.5">
                  Job title <span className="text-accent">*</span>
                </label>
                <input
                  id="jd-title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={generating}
                  placeholder="e.g. Node JS Developer"
                  className={fieldClass}
                />
              </div>

              {/* Job description mode */}
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="block text-sm font-semibold text-charcoal">
                  Job description <span className="text-accent">*</span>
                </span>
                <SegmentedTabs />
              </div>

              {/* Job details — collapsible */}
              <div className="rounded-xl border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setDetailsOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left"
                  aria-expanded={detailsOpen}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                    Job details
                    {!detailsComplete && (
                      <span className="rounded-full bg-[#FBE9E7] px-2 py-0.5 text-[10px] font-semibold text-[#a70c0c]">
                        Required
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-charcoal-lt transition-transform ${detailsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {detailsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-x-3 gap-y-3 px-4 pb-4 sm:grid-cols-2">
                        <Field
                          id="jd-company-name"
                          label="Company name"
                          required
                          value={companyName}
                          onChange={setCompanyName}
                          disabled={generating}
                          placeholder="e.g. HireSort"
                        />
                        <Field
                          id="jd-company-url"
                          label="Company website"
                          required
                          value={companyUrl}
                          onChange={setCompanyUrl}
                          disabled={generating}
                          placeholder="e.g. acme.com"
                          inputMode="url"
                        />
                        <div>
                          <label htmlFor="jd-work" className={labelClass}>
                            Work arrangement <span className="text-accent">*</span>
                          </label>
                          <select
                            id="jd-work"
                            value={workArrangement}
                            onChange={(e) => setWorkArrangement(e.target.value)}
                            disabled={generating}
                            className={`${fieldClass} ${workArrangement ? "" : "text-charcoal-xlt"}`}
                          >
                            <option value="" disabled>
                              Select…
                            </option>
                            {WORK_ARRANGEMENTS.map((opt) => (
                              <option key={opt} value={opt} className="text-charcoal">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Field
                          id="jd-location"
                          label="Location"
                          required
                          value={location}
                          onChange={setLocation}
                          disabled={generating}
                          placeholder="e.g. Bengaluru, India"
                        />
                        <Field
                          id="jd-yrs"
                          label="Years of experience"
                          optional
                          type="number"
                          value={yrsExperience}
                          onChange={setYrsExperience}
                          disabled={generating}
                          placeholder="e.g. 3"
                        />
                        <Field
                          id="jd-salary"
                          label="Salary / compensation"
                          optional
                          value={salary}
                          onChange={setSalary}
                          disabled={generating}
                          placeholder="e.g. ₹18–24 LPA"
                        />
                        <div className="sm:col-span-2">
                          <Field
                            id="jd-skills"
                            label="Required skills"
                            optional
                            value={skills}
                            onChange={setSkills}
                            disabled={generating}
                            placeholder="e.g. Python, FastAPI, PostgreSQL, AWS"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Prompt + generate */}
              <div className="mt-5">
                <label htmlFor="jd-prompt" className={labelClass}>
                  {hasGenerated ? "Refine the job description" : "Describe the role you want to hire for"}
                  <span className="ml-1.5 font-normal text-charcoal-xlt">(optional)</span>
                </label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                  <input
                    id="jd-prompt"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleGenerate();
                      }
                    }}
                    disabled={generating || outOfAttempts}
                    placeholder={
                      hasGenerated
                        ? "Optional — e.g. add a section on team leadership"
                        : "Optional — e.g. 2 yrs experience, scalable systems, strong communication"
                    }
                    className="flex-1 h-11 px-3.5 rounded-xl border border-line bg-ivory text-charcoal text-sm placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    type="button"
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    whileTap={canGenerate ? { scale: 0.97 } : {}}
                    className="h-11 px-5 bg-copper text-white text-sm font-semibold rounded-xl hover:bg-copper-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    {generating ? (
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {generating ? "Generating…" : hasGenerated ? "Regenerate" : "Generate"}
                  </motion.button>
                </div>
                {!jobTitle.trim() ? (
                  <p className="mt-1.5 text-xs text-[#a70c0c]">Enter a job title above to start generating.</p>
                ) : !detailsComplete ? (
                  <p className="mt-1.5 text-xs text-[#a70c0c]">
                    Fill in the required job details above to start generating.
                  </p>
                ) : (
                  !hasGenerated && (
                    <p className="mt-1.5 text-xs text-charcoal-xlt">
                      Leave the prompt blank to generate from the details above, or add notes to guide the AI.
                    </p>
                  )
                )}
              </div>
            </section>

            {/* ── Right — streaming output ── */}
            <section className="flex flex-col rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-soft">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <FileText className="h-4 w-4 text-accent" />
                  Generated job description
                </span>
                <div className="flex items-center gap-2">
                  {generating && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Writing…
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!canDownload}
                    className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border bg-charcoal text-xs font-semibold text-ivory hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Downloading…
                      </>
                    ) : (
                      <>
                        <Download size={13} />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative flex-1 min-h-96">
                <textarea
                  ref={textareaRef}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  readOnly={generating}
                  placeholder="Your AI-generated job description will appear here. You can edit it freely before downloading."
                  className="w-full h-full px-4 py-3.5 rounded-xl border border-line bg-ivory text-charcoal text-sm leading-relaxed placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none read-only:cursor-default"
                />
                {generating && !jdText && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-ivory/80">
                    <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <p className="text-xs font-medium text-charcoal-lt">Writing your job description…</p>
                  </div>
                )}
              </div>

              {/* Meta bar — char count, attempts, reset */}
              {showOutputMeta && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs text-charcoal-xlt">
                  <span>{jdText.length.toLocaleString()} characters</span>
                  {attemptsLeft !== null && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                          outOfAttempts ? "bg-[#FBE9E7] text-[#a70c0c]" : "bg-ivory-medium text-charcoal-md"
                        }`}
                      >
                        {maxAttempts !== null ? `${attemptsLeft} / ${maxAttempts}` : attemptsLeft}
                        <span className="font-normal text-charcoal-xlt">left</span>
                      </span>
                      {resetLabel && <span>Resets {resetLabel}</span>}
                    </div>
                  )}
                </div>
              )}

              {/* Cross-sell — carry this JD into the rubric generator. Stash the
                  current draft, then route; the rubric tool reads it into its
                  "Paste JD" box. */}
              {hasGenerated && !generating && (
                <button
                  type="button"
                  onClick={() => {
                    stashJdForRubric(jdText);
                    // The is_routed flag tells the rubric page this navigation came
                    // from here, so it knows to pull the stashed JD into its box.
                    router.push("/free-tools/rubric-generator?is_routed=true");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 h-12 rounded-xl bg-charcoal text-white text-sm font-semibold hover:bg-copper-dark transition-colors"
                >
                  Generate scoring rubric
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  required = false,
  optional = false,
  type = "text",
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  type?: string;
  inputMode?: "url" | "text" | "numeric";
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-accent"> *</span>}
        {optional && <span className="ml-1.5 font-normal text-charcoal-xlt">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        min={type === "number" ? 0 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

// The public tool only generates with AI. Paste / Upload are shown (to match the
// full product) but login-gated, so they read as disabled here.
function SegmentedTabs() {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-ivory-medium p-0.5 text-xs font-medium">
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-charcoal-xlt cursor-not-allowed">
        <Clipboard className="h-3 w-3" />
        <span className="hidden sm:inline">Paste</span>
        <Lock className="h-2.5 w-2.5" />
      </span>
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-charcoal-xlt cursor-not-allowed">
        <Upload className="h-3 w-3" />
        <span className="hidden sm:inline">Upload</span>
        <Lock className="h-2.5 w-2.5" />
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-charcoal shadow-soft">
        <Sparkles className="h-3 w-3 text-accent" />
        Build with AI
      </span>
    </div>
  );
}

const SECTIONS = ["Company overview", "Responsibilities", "Requirements", "Benefits"] as const;

// Decorative floating cards that fill the wide empty margins on ultrawide
// screens, echoing the homepage hero. Purely cosmetic (aria-hidden,
// pointer-events-none) and hidden below 1800px so they never crowd the panels.
function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden min-[1800px]:block">
      {/* Left — sections checklist */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease, delay: 0.2 } }}
        className="absolute left-10 top-1/2 -translate-y-1/2"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-56 rounded-2xl border border-line-soft bg-white/80 p-4 shadow-lg backdrop-blur">
            <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-xlt">
              Sections included
            </div>
            <ul className="space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs text-charcoal-md">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-success-bg">
                    <Check className="h-2.5 w-2.5 text-success" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Right — quality note */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease, delay: 0.3 } }}
        className="absolute right-10 top-1/2 -translate-y-1/2"
      >
        <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
          <div className="w-52 rounded-2xl border border-line-soft bg-white/80 p-4 shadow-lg backdrop-blur">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10">
                <Wand2 className="h-3.5 w-3.5 text-accent" />
              </span>
              <span className="text-xs font-bold text-charcoal">Written for you</span>
            </div>
            <p className="text-[11px] leading-relaxed text-charcoal-lt">
              Inclusive language, clear structure, and a recruiter-ready tone — in seconds.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
