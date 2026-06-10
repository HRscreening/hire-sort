"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clipboard,
  Download,
  FileText,
  Loader2,
  Sliders,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import LoginCtaBar from "../../../_components/loginCtaBar";
import StartScreeningCta from "../../../_components/startScreeningCta";
import Toast, { type ToastData } from "../../../_components/toast";
import { readStashedJd } from "../../../_lib/rubricHandoff";
import type { GeneratedRubric } from "../../../types";
import {
  downloadRubricExcel,
  formatResetTime,
  generateRubric,
  RubricApiError,
} from "../_lib/rubricApi";
import GeneratedRubricView from "./generatedRubricView";

const ease = [0.22, 1, 0.36, 1] as const;

type InputMode = "paste" | "upload";

// Trust/feature pills shown above the panels — quick reassurance on what the
// tool produces without re-introducing a heading.
const FEATURES = [
  { Icon: Sliders, label: "Weighted criteria", color: "text-accent" },
  { Icon: Wand2, label: "Must-have flags", color: "text-accent" },
  { Icon: FileText, label: "Editable & reusable", color: "text-accent" },
  { Icon: Download, label: "Download Rubric", color: "text-accent" },
  { Icon: Check, label: "No signup needed", color: "text-success" },
] as const;

export default function RubricBuilder() {
  const [mode, setMode] = useState<InputMode>("paste");
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  // Set when the JD was carried over from the JD generator, so we can show a
  // small "prefilled for you" hint above the textarea.
  const [fromJdGenerator, setFromJdGenerator] = useState(false);

  const [rubric, setRubric] = useState<GeneratedRubric | null>(null);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorIsLimit, setErrorIsLimit] = useState(false);
  const [limitResetsAt, setLimitResetsAt] = useState<Date | null>(null);

  // Session + quota surfaced by the generate response headers, reused for the
  // download call and shown in the meta bar under the rubric.
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [maxAttempts, setMaxAttempts] = useState<number | null>(null);
  const [resetsAt, setResetsAt] = useState<Date | null>(null);

  const outOfAttempts = attemptsLeft !== null && attemptsLeft <= 0;
  const resetLabel = formatResetTime(resetsAt);

  // Pick up a JD handed off from the JD generator and drop it into the "Paste JD"
  // box — but only when we arrived via its button, signalled by ?is_routed=true.
  // The read doesn't clear the stash, so a reload (flag still in the URL) keeps
  // the box populated; a fresh visit without the flag is left untouched.
  useEffect(() => {
    const routed = new URLSearchParams(window.location.search).get("is_routed") === "true";
    if (!routed) return;
    const stashed = readStashedJd();
    if (stashed) {
      setJdText(stashed);
      setMode("paste");
      setFromJdGenerator(true);
    }
  }, []);

  const canGenerate =
    (mode === "paste" ? jdText.trim().length > 0 : jdFile !== null) &&
    !generating &&
    !outOfAttempts;
  const canDownload = rubric !== null && sessionId !== null && !generating && !downloading;

  // Two-phase layout: phase 1 is a single, wider JD input box; once the user
  // kicks off a build (or a rubric already exists), the result panel slides in
  // beside it and the input narrows into a two-column layout.
  const showRubricPanel = generating || rubric !== null;

  // Surface the active error as a top-right toast — amber for a spent quota,
  // red for anything else.
  const toast: ToastData | null = error
    ? {
        message: error,
        variant: errorIsLimit || outOfAttempts ? "limit" : "error",
        resetLabel: formatResetTime(limitResetsAt),
      }
    : null;

  // Fold the latest quota/session headers into local state. The backend may omit
  // any field on a given call, so only overwrite when a value actually came back.
  function applyMeta(meta: {
    sessionId: string | null;
    attemptsLeft: number | null;
    maxAttempts: number | null;
    resetsAt: Date | null;
  }) {
    if (meta.sessionId) setSessionId(meta.sessionId);
    if (meta.attemptsLeft !== null) setAttemptsLeft(meta.attemptsLeft);
    if (meta.maxAttempts !== null) setMaxAttempts(meta.maxAttempts);
    if (meta.resetsAt !== null) setResetsAt(meta.resetsAt);
  }

  function dismissToast() {
    setError(null);
    setErrorIsLimit(false);
    setLimitResetsAt(null);
  }

  function handleError(err: unknown) {
    if (err instanceof RubricApiError) {
      setError(err.message);
      setErrorIsLimit(err.isLimit);
      setLimitResetsAt(err.resetsAt);
      // A 403 means the budget is spent: zero out the counter so the UI flips to
      // its limit state, and keep the reset time in the meta bar too.
      if (err.isLimit) setAttemptsLeft(0);
      if (err.resetsAt) setResetsAt(err.resetsAt);
    } else {
      setError(err instanceof Error ? err.message : "Couldn't generate the rubric. Please try again.");
      setErrorIsLimit(false);
      setLimitResetsAt(null);
    }
  }

  async function handleGenerate() {
    if (!canGenerate) return;
    setError(null);
    setErrorIsLimit(false);
    setLimitResetsAt(null);
    setGenerating(true);
    setRubric(null);
    try {
      const { rubric: result, meta } = await generateRubric(
        mode === "upload" && jdFile ? { jdFile, sessionId } : { jdText, sessionId },
      );
      setRubric(result);
      applyMeta(meta);
    } catch (err) {
      handleError(err);
    } finally {
      setGenerating(false);
    }
  }

  // "Generate new" — drop the rubric to slide back to the input phase. The JD
  // text/file is kept so the user can tweak it and rebuild, not start from blank.
  function handleStartNew() {
    setRubric(null);
    dismissToast();
  }

  async function handleDownload() {
    if (!canDownload || !sessionId) return;
    setError(null);
    setErrorIsLimit(false);
    setLimitResetsAt(null);
    setDownloading(true);
    try {
      await downloadRubricExcel(sessionId);
    } catch (err) {
      handleError(err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-ivory overflow-clip">
      {/* Errors & limit notices surface as a top-right toast */}
      <Toast toast={toast} onClose={dismissToast} />

      {/* Once a rubric is in hand, nudge into the full product. Lifted above the
          sticky action bar so the two don't collide at the bottom-right. */}
      {rubric !== null && (
        <StartScreeningCta className="bottom-24 right-5 sm:bottom-24 sm:right-6" />
      )}

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

      <LoginCtaBar text="Turn any job description into a weighted screening rubric — then save it, screen resumes, and rank your pipeline." />

      <main className="relative z-10 flex flex-1 flex-col">
        {!showRubricPanel ? (
          /* ── Phase 1 — the JD input (centered card) ── */
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-4 sm:py-10">
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

              <div className="mx-auto max-w-2xl">
                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex flex-col rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-soft"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="block text-sm font-semibold text-charcoal">
                      Job description <span className="text-accent">*</span>
                    </span>
                    <SegmentedTabs mode={mode} onChange={setMode} />
                  </div>

                  {fromJdGenerator && mode === "paste" && (
                    <div className="mb-3 flex items-center gap-2 rounded-xl border border-success/30 bg-success-bg px-3.5 py-2.5 text-xs text-charcoal-md">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-success" />
                      We brought over the job description you just generated. Edit it freely before building the rubric.
                    </div>
                  )}

                  <div className="flex flex-1 flex-col min-h-0">
                    {mode === "paste" ? (
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        disabled={generating}
                        placeholder="Paste the full job description here — the more detail, the sharper the rubric."
                        className="w-full flex-1 min-h-80 px-4 py-3.5 rounded-xl border border-line bg-ivory text-charcoal text-sm leading-relaxed placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none disabled:opacity-60"
                      />
                    ) : (
                      <UploadBox file={jdFile} disabled={generating} onSelect={setJdFile} onClear={() => setJdFile(null)} />
                    )}
                  </div>

                  {/* Generate */}
                  <div className="mt-5">
                    <motion.button
                      type="button"
                      onClick={handleGenerate}
                      disabled={!canGenerate}
                      whileTap={canGenerate ? { scale: 0.97 } : {}}
                      className="h-11 w-full px-5 bg-copper text-white text-sm font-semibold rounded-xl hover:bg-copper-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      <Sliders className="h-4 w-4" />
                      Generate rubric
                    </motion.button>
                    {mode === "paste" && !jdText.trim() ? (
                      <p className="mt-1.5 text-xs text-charcoal-xlt">
                        Paste a job description above, or switch to upload.
                      </p>
                    ) : mode === "upload" && !jdFile ? (
                      <p className="mt-1.5 text-xs text-charcoal-xlt">
                        Upload a JD file (PDF or DOCX), or switch to paste.
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-charcoal-xlt">
                        We'll draft weighted categories, must-have flags, and scoring bands you can edit.
                      </p>
                    )}
                  </div>
                </motion.section>
              </div>
            </div>
          </div>
        ) : (
          /* ── Phase 2 — generated rubric, spread across the full page ── */
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className="w-full px-4 pt-5 pb-28 sm:px-6 sm:pt-6 lg:px-8"
          >
            <div className="mx-auto w-full max-w-7xl">
              {/* Header — title on the left, quota + reset timer on the right */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <Sliders className="h-4 w-4 text-accent" />
                  Generated rubric
                </span>
                <div className="flex items-center gap-2 text-xs text-charcoal-xlt">
                  {generating && (
                    <span className="flex items-center gap-1.5 font-medium text-accent">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Building…
                    </span>
                  )}
                  {attemptsLeft !== null && (
                    <>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                          outOfAttempts ? "bg-[#FBE9E7] text-[#a70c0c]" : "bg-ivory-medium text-charcoal-md"
                        }`}
                      >
                        {maxAttempts !== null ? `${attemptsLeft} / ${maxAttempts}` : attemptsLeft}
                        <span className="font-normal text-charcoal-xlt">left</span>
                      </span>
                      {resetLabel && <span>Resets {resetLabel}</span>}
                    </>
                  )}
                </div>
              </div>

              {rubric ? (
                <GeneratedRubricView rubric={rubric} />
              ) : (
                <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  <p className="text-xs font-medium text-charcoal-lt">Building your rubric…</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </main>

      {/* Sticky action bar — pinned to the bottom while the table scrolls above */}
      {showRubricPanel && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease, delay: 0.1 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-7xl gap-3 px-4 py-3 sm:justify-end sm:px-6 lg:px-8">
            <motion.button
              type="button"
              onClick={handleStartNew}
              disabled={generating}
              whileTap={!generating ? { scale: 0.97 } : {}}
              className="h-11 flex-1 px-5 border border-line bg-white text-charcoal text-sm font-semibold rounded-xl hover:bg-ivory hover:border-charcoal-xlt disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 sm:flex-none sm:min-w-48"
            >
              <Wand2 className="h-4 w-4 text-accent" />
              Generate new
            </motion.button>
            <motion.button
              type="button"
              onClick={handleDownload}
              disabled={!canDownload}
              whileTap={canDownload ? { scale: 0.97 } : {}}
              className="h-11 flex-1 px-5 bg-copper text-white text-sm font-semibold rounded-xl hover:bg-copper-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 sm:flex-none sm:min-w-48"
            >
              {downloading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {downloading ? "Downloading…" : "Download Excel"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function SegmentedTabs({ mode, onChange }: { mode: InputMode; onChange: (m: InputMode) => void }) {
  const tabs: { key: InputMode; Icon: typeof Clipboard; label: string }[] = [
    { key: "paste", Icon: Clipboard, label: "Paste JD" },
    { key: "upload", Icon: Upload, label: "Upload JD" },
  ];
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-ivory-medium p-0.5 text-xs font-medium">
      {tabs.map((t) => {
        const active = mode === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${
              active ? "bg-white text-charcoal shadow-soft" : "text-charcoal-lt hover:text-charcoal"
            }`}
          >
            <t.Icon className={`h-3 w-3 ${active ? "text-accent" : ""}`} />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function UploadBox({
  file,
  disabled,
  onSelect,
  onClear,
}: {
  file: File | null;
  disabled?: boolean;
  onSelect: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (disabled) return;
      const f = e.dataTransfer.files?.[0];
      if (f) onSelect(f);
    },
    [disabled, onSelect],
  );

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      initial={false}
      animate={{
        borderColor: dragOver ? "#c85a17" : file ? "#1a1a1a" : "#e0dcd4",
        backgroundColor: dragOver ? "rgba(200,90,23,0.06)" : "#faf9f6",
      }}
      transition={{ duration: 0.18, ease }}
      className={`flex-1 min-h-80 flex items-center justify-center rounded-xl border-2 border-dashed p-6 text-center ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        disabled={disabled}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onSelect(f);
        }}
        className="hidden"
      />
      <AnimatePresence mode="wait" initial={false}>
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease }}
            className="flex items-center gap-3"
          >
            <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-charcoal truncate max-w-44">{file.name}</p>
              <p className="text-xs text-charcoal-lt">{(file.size / 1024).toFixed(1)} KB · ready</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="h-8 w-8 rounded-lg border border-line text-charcoal-lt hover:text-red-600 hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition"
              aria-label="Remove file"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <div className="mx-auto h-12 w-12 rounded-2xl bg-copper flex items-center justify-center mb-3 shadow-md">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <p className="text-base font-semibold text-charcoal">
              {dragOver ? "Release to upload" : "Upload JD"}
            </p>
            <p className="text-sm text-charcoal-lt mt-1">
              Drag &amp; drop or <span className="text-accent font-medium">browse</span> · PDF, DOCX
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
