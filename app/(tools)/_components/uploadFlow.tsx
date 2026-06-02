"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Lock,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LoadingScreen from "@/components/tools/LoadingScreen";
import {
  createToolApi,
  type CreateSessionInput,
  demoErrorView,
  formatResetTime,
  type ToolConfig,
} from "../_lib/api";

const ease = [0.22, 1, 0.36, 1] as const;

const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || "https://app.hiresort.ai";

// Mocked latency floor so the loading screen always gets one satisfying cycle even
// on the fast path. The real call usually exceeds it; LoadingScreen owns the rest.
const SUBMIT_DELAY_MS = 3200;

type SourceMode = "upload" | "sample" | null;
type PdfKind = "jd" | "resume";
type LockedFeature = "ai" | "paste";

const SAMPLE_PDF: Record<PdfKind, { src: string; title: string }> = {
  jd: { src: "/sample/sample_jd.pdf", title: "Sample job description" },
  resume: { src: "/sample/sample_resume.pdf", title: "Sample resume" },
};

type UploadFlowProps = {
  config: ToolConfig;
};

export default function UploadFlow({ config }: UploadFlowProps) {
  const router = useRouter();
  const api = useMemo(() => createToolApi(config), [config]);
  const { allowSample } = config;

  const [jdMode, setJdMode] = useState<SourceMode>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeMode, setResumeMode] = useState<SourceMode>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<{ resetsAt: string | null } | null>(null);
  const [pdfPreview, setPdfPreview] = useState<PdfKind | null>(null);
  const [lockPopover, setLockPopover] = useState<LockedFeature | null>(null);

  const jdReady = jdMode === "sample" || (jdMode === "upload" && jdFile !== null);
  const resumeReady =
    resumeMode === "sample" || (resumeMode === "upload" && resumeFile !== null);
  const canContinue = jdReady && resumeReady && !submitting;

  // Resume can only be touched once a JD is provided — clear any stale resume
  // selection if the JD is removed so we never submit a resume without a JD.
  useEffect(() => {
    if (!jdReady) {
      setResumeMode(null);
      setResumeFile(null);
    }
  }, [jdReady]);

  async function handleContinue() {
    if (!canContinue) return;
    setSubmitting(true);
    setError(null);
    setLimit(null);
    try {
      const jd: CreateSessionInput["jd"] =
        jdMode === "sample"
          ? { isSampleSelected: true }
          : { isSampleSelected: false, file: jdFile! };
      const resume: CreateSessionInput["resume"] =
        resumeMode === "sample"
          ? { isSampleSelected: true }
          : { isSampleSelected: false, file: resumeFile! };

      const [{ session_id }] = await Promise.all([
        api.createSession({ jd, resume }),
        new Promise((r) => setTimeout(r, SUBMIT_DELAY_MS)),
      ]);
      router.push(`${config.resultBase}/${session_id}`);
    } catch (e) {
      console.error(e);
      const view = demoErrorView(e);
      setError(view.message);
      setLimit(view.isLimit ? { resetsAt: view.resetsAt } : null);
      setSubmitting(false);
    }
  }

  if (submitting) {
    return <LoadingScreen />;
  }

  return (
    <div className="md:h-screen w-full flex flex-col md:overflow-hidden bg-ivory">
      {/* Steps header */}
      <header className="shrink-0 sticky top-0 z-20 bg-ivory-light/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
          <Link href="/" aria-label="HireSort — home" className="inline-flex items-center gap-2.5 shrink-0 text-charcoal no-underline justify-self-start">
            <Image src="/logo.png" alt="" width={28} height={28} priority sizes="28px" />
            <span className="text-[19px] font-bold tracking-[-0.4px]">HireSort</span>
          </Link>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 justify-self-center">
            <StepPill index={1} label="Job description" active done={jdReady} />
            <div className={`h-0.5 w-5 sm:w-10 rounded-full transition-colors ${jdReady ? "bg-success/40" : "bg-line"}`} />
            <StepPill index={2} label="resume" active={jdReady} done={resumeReady} />
          </div>

          <a
            href={`${MAIN_APP_URL}/login`}
            className="inline-flex h-8 items-center rounded-full bg-charcoal px-4 text-[13px] font-semibold text-ivory no-underline transition-colors hover:bg-accent shrink-0 justify-self-end"
          >
            Log in
          </a>
        </div>
      </header>

      {/* Two panels */}
      <div className="flex-1 md:min-h-0 flex flex-col md:flex-row md:overflow-hidden">
        {/* Step 1 — JD */}
        <section className="flex flex-col md:flex-1 md:min-h-0 md:overflow-y-auto border-b md:border-b-0 md:border-r border-line">
          <div className="mx-auto w-full max-w-xl px-5 sm:px-8 py-6 sm:py-8 md:my-auto">
            <PanelHeading
              eyebrow="Step 1 · Job description"
              title="Start with the role"
              subtitle={
                allowSample
                  ? "Upload a JD or use our sample. We’ll turn it into a screening rubric."
                  : "Upload a job description. We’ll turn it into a screening rubric."
              }
            />

            <SourceBox
              mode={jdMode}
              file={jdFile}
              showSample={allowSample}
              uploadLabel="Upload JD"
              uploadHint="PDF, DOCX"
              sampleTitle="Use sample JD"
              sampleHint="Business Analyst role"
              onSelectUpload={(f) => {
                setJdMode("upload");
                setJdFile(f);
              }}
              onClearUpload={() => {
                setJdFile(null);
                setJdMode(null);
              }}
              onSelectSample={() => {
                setJdMode("sample");
                setJdFile(null);
              }}
              onViewSample={() => setPdfPreview("jd")}
            />

            {/* Locked, login-gated features */}
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-xlt mb-2">
                More ways to start
              </p>
              <div className="grid grid-cols-2 gap-2">
                <LockedRow
                  icon={<Wand2 className="h-4 w-4" />}
                  label="Build with AI"
                  open={lockPopover === "ai"}
                  onClick={() => setLockPopover((p) => (p === "ai" ? null : "ai"))}
                />
                <LockedRow
                  icon={<FileText className="h-4 w-4" />}
                  label="Paste JD text"
                  open={lockPopover === "paste"}
                  onClick={() => setLockPopover((p) => (p === "paste" ? null : "paste"))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 — resume */}
        <section className="relative flex flex-col md:flex-1 md:min-h-0 md:overflow-y-auto bg-ivory-light">
          <div className="mx-auto w-full max-w-xl px-5 sm:px-8 py-6 sm:py-8 md:my-auto">
            <PanelHeading
              eyebrow="Step 2 · resume"
              title="Add a candidate"
              subtitle={
                allowSample
                  ? "Upload a resume or use our sample. We’ll score it against the rubric."
                  : "Upload a resume. We’ll score it against the rubric."
              }
            />

         

            <div
              aria-disabled={!jdReady}
              className={!jdReady ? "opacity-50 pointer-events-none select-none" : ""}
            >
              <SourceBox
                mode={resumeMode}
                file={resumeFile}
                showSample={allowSample}
                uploadLabel="Upload resume"
                uploadHint="PDF, DOCX"
                sampleTitle="Use sample resume"
                sampleHint="Example candidate"
                onSelectUpload={(f) => {
                  setResumeMode("upload");
                  setResumeFile(f);
                }}
                onClearUpload={() => {
                  setResumeFile(null);
                  setResumeMode(null);
                }}
                onSelectSample={() => {
                  setResumeMode("sample");
                  setResumeFile(null);
                }}
                onViewSample={() => setPdfPreview("resume")}
              />
            </div>

               {!jdReady && (
              <div className="my-4 flex items-center gap-2 rounded-xl border border-line bg-ivory-medium px-3.5 py-2.5 text-xs text-charcoal-lt">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Add a job description first to unlock resume scoring.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 4, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 pb-2">
              {limit ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                  <Lock className="h-4 w-4 shrink-0" />
                  <span className="flex-1">
                    {error}
                    {formatResetTime(limit.resetsAt) && (
                      <> Your free try resets on {formatResetTime(limit.resetsAt)}.</>
                    )}
                  </span>
                  <a
                    href={MAIN_APP_URL}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-copper text-white font-semibold hover:bg-copper-dark transition-colors"
                  >
                    Sign up for full access
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue bar */}
      <footer className="shrink-0 sticky bottom-0 z-20 bg-ivory-light/85 backdrop-blur-md border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <div className="min-w-0 flex flex-wrap items-center gap-2">
            <SummaryChip label="JD" mode={jdMode} fileName={jdFile?.name} />
            <SummaryChip label="resume" mode={resumeMode} fileName={resumeFile?.name} locked={!jdReady} />
          </div>
          <motion.button
            type="button"
            whileHover={canContinue ? { scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.97 } : {}}
            onClick={handleContinue}
            disabled={!canContinue}
            className="h-12 px-6 sm:px-7 bg-copper text-white text-sm font-semibold rounded-xl hover:bg-copper-dark disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-md shrink-0"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </footer>

      <PdfDialog kind={pdfPreview} onClose={() => setPdfPreview(null)} />
    </div>
  );
}

function PanelHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold uppercase tracking-wider mb-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight leading-tight">
        {title}
      </h1>
      <p className="text-sm text-charcoal-lt mt-2">{subtitle}</p>
    </div>
  );
}

function StepPill({
  index,
  label,
  active,
  done,
}: {
  index: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        done
          ? "bg-success-bg text-success border border-success/30"
          : active
            ? "bg-copper text-white"
            : "bg-ivory-medium text-charcoal-xlt border border-line"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full inline-flex items-center justify-center text-[10px] ${
          done ? "bg-success text-white" : active ? "bg-white text-charcoal" : "bg-line text-white"
        }`}
      >
        {done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : index}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

function SummaryChip({
  label,
  mode,
  fileName,
  locked = false,
}: {
  label: string;
  mode: SourceMode;
  fileName?: string;
  locked?: boolean;
}) {
  const ready = mode === "sample" || (mode === "upload" && !!fileName);
  const value =
    mode === "sample" ? "Sample" : mode === "upload" ? (fileName ?? "File") : locked ? "Locked" : "Not set";

  return (
    <span
      className={`inline-flex items-center gap-1.5 max-w-[12rem] sm:max-w-[16rem] px-2.5 py-1.5 rounded-lg border text-xs font-medium ${
        ready
          ? "bg-success-bg border-success/30 text-success"
          : "bg-ivory-medium border-line text-charcoal-xlt"
      }`}
    >
      <span className="shrink-0">
        {ready ? (
          <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
        ) : locked ? (
          <Lock className="h-3 w-3" />
        ) : (
          <span className="block h-1.5 w-1.5 rounded-full bg-charcoal-xlt" />
        )}
      </span>
      <span className={`shrink-0 ${ready ? "font-bold text-charcoal" : ""}`}>{label}</span>
      <span className="text-charcoal-xlt">·</span>
      <span className="truncate">{value}</span>
    </span>
  );
}

type SourceBoxProps = {
  mode: SourceMode;
  file: File | null;
  /** When false, only the upload area is shown (no built-in sample shortcut). */
  showSample?: boolean;
  uploadLabel: string;
  uploadHint: string;
  sampleTitle: string;
  sampleHint: string;
  sampleDisabled?: boolean;
  sampleDisabledHint?: string;
  onSelectUpload: (file: File) => void;
  onClearUpload: () => void;
  onSelectSample: () => void;
  onViewSample: () => void;
};

function SourceBox({
  mode,
  file,
  showSample = true,
  uploadLabel,
  uploadHint,
  sampleTitle,
  sampleHint,
  sampleDisabled = false,
  sampleDisabledHint,
  onSelectUpload,
  onClearUpload,
  onSelectSample,
  onViewSample,
}: SourceBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onSelectUpload(f);
    },
    [onSelectUpload],
  );

  const uploadActive = mode === "upload";
  const sampleActive = mode === "sample";

  return (
    <div className="rounded-2xl border-2 border-line bg-white p-3 space-y-2.5 shadow-soft">
      {/* Sub-box A — upload */}
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        initial={false}
        animate={{
          borderColor: dragOver ? "#c85a17" : uploadActive ? "#1a1a1a" : "#e0dcd4",
          backgroundColor: dragOver ? "rgba(200,90,23,0.06)" : uploadActive ? "#faf9f6" : "#ffffff",
        }}
        transition={{ duration: 0.18, ease }}
        className="cursor-pointer rounded-xl border-2 border-dashed p-4 sm:p-6 text-center min-h-32 md:min-h-40 flex items-center justify-center"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSelectUpload(f);
          }}
          className="hidden"
        />

        <AnimatePresence mode="wait" initial={false}>
          {uploadActive && file ? (
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
                  onClearUpload();
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="h-8 w-8 rounded-lg border border-line text-charcoal-lt hover:text-red-600 hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition"
                aria-label="Remove file"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="mx-auto h-11 w-11 md:h-12 md:w-12 rounded-2xl bg-copper flex items-center justify-center mb-2 md:mb-3 shadow-md">
                <Upload className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-charcoal">
                {dragOver ? "Release to upload" : uploadLabel}
              </p>
              <p className="text-xs md:text-sm text-charcoal-lt mt-1">
                Drag &amp; drop or <span className="text-accent font-medium">browse</span> · {uploadHint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showSample && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-charcoal-xlt">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          {/* Sub-box B — sample */}
          <button
            type="button"
            onClick={onSelectSample}
            disabled={sampleDisabled}
            className={`w-full text-left rounded-xl border-2 p-3.5 transition-colors ${
              sampleDisabled
                ? "border-line bg-ivory-medium opacity-60 cursor-not-allowed"
                : sampleActive
                  ? "border-accent bg-accent/5"
                  : "border-line bg-white hover:border-charcoal-xlt"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  sampleDisabled
                    ? "bg-line text-charcoal-xlt"
                    : sampleActive
                      ? "bg-accent/15 text-accent"
                      : "bg-ivory-medium text-charcoal-lt"
                }`}
              >
                {sampleDisabled ? <Lock className="h-4 w-4" /> : <Sparkles className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-charcoal">{sampleTitle}</p>
                <p className="text-xs text-charcoal-lt">
                  {sampleDisabled ? (sampleDisabledHint ?? sampleHint) : sampleHint}
                </p>
              </div>
              {!sampleDisabled && (
                <span
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    sampleActive ? "border-accent bg-accent" : "border-line"
                  }`}
                >
                  {sampleActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
              )}
            </div>

            <AnimatePresence>
              {sampleActive && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="block overflow-hidden"
                >
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewSample();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        onViewSample();
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline underline-offset-2 cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View the sample file
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </>
      )}
    </div>
  );
}

function LockedRow({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-3 rounded-xl border border-line bg-ivory-medium px-4 py-2.5 text-left cursor-not-allowed"
      >
        <span className="h-8 w-8 rounded-lg bg-line text-charcoal-xlt flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="flex-1 text-sm font-medium text-charcoal-xlt">{label}</span>
        <Lock className="h-3.5 w-3.5 text-charcoal-xlt shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={onClick}
              className="fixed inset-0 z-30 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.15, ease }}
              className="absolute left-0 right-0 bottom-full z-40 mb-2 rounded-xl bg-copper text-white px-4 py-3 shadow-lg"
            >
              <p className="text-xs font-semibold">Log in to unlock</p>
              <p className="text-xs text-white/70 mt-0.5">
                Build with AI and pasting JD text are available once you sign in.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PdfDialog({ kind, onClose }: { kind: PdfKind | null; onClose: () => void }) {
  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kind, onClose]);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line">
              <h3 className="text-sm font-bold text-charcoal">{SAMPLE_PDF[kind].title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-lg border border-line text-charcoal-lt hover:text-charcoal hover:bg-ivory-medium flex items-center justify-center transition"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={SAMPLE_PDF[kind].src}
              title={SAMPLE_PDF[kind].title}
              className="w-full flex-1 min-h-[70vh] bg-ivory"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
