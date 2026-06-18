"use client";
import { motion } from "framer-motion";
import { Download, FileText, Loader2, ScanLine, Sparkles, Upload, Wand2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { demoErrorView, downloadScorecard, scoreResume } from "../_lib/api";
import type { BreakdownItem, Rubric, ScoredResume } from "../types";

function getTierLabel(score: number) {
  if (score >= 75) return { label: "Strong Match", color: "text-green-700", bg: "bg-green-50", border: "border-green-200", dot: "#22C55E" };
  if (score >= 55) return { label: "Potential", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", dot: "#EAB308" };
  if (score >= 35) return { label: "Risky", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", dot: "#F97316" };
  return { label: "Poor Fit", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "#EF4444" };
}

function criterionBarColor(score: number) {
  if (score >= 7) return "#22C55E";
  if (score >= 4) return "#EAB308";
  return "#EF4444";
}

/**
 * Look up a category's weight from the rubric. Tolerates minor label drift
 * between the rubric and the score's category labels (e.g. the server returns
 * "Technical Skills" while the rubric calls it "Technical Skills & Expertise").
 */
function weightForCategory(rubric: Rubric, category: string): number | null {
  const key = category.toLowerCase().trim();
  const match = rubric.categories.find((c) => {
    const name = c.name.toLowerCase().trim();
    return name === key || name.startsWith(key) || key.startsWith(name);
  });
  return match?.weight ?? null;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

type ScoreCardProps = {
  resume: ScoredResume | null;
  rubric: Rubric;
  sessionId: string;
  onResumeScored?: (resume: ScoredResume) => void;
}

export default function ScoreCard({ resume, rubric, sessionId, onResumeScored }: ScoreCardProps) {
  if (!resume) {
    return <ResumeUpload sessionId={sessionId} onResumeScored={onResumeScored} />;
  }
  return <ScoredView resume={resume} rubric={rubric} sessionId={sessionId} />;
}

type ScoredViewProps = { resume: ScoredResume; rubric: Rubric; sessionId: string };

function ScoredView({ resume, rubric, sessionId }: ScoredViewProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // The "sample" session is served from local JSON with no server-side
  // scorecard, so there's nothing to download for it.
  const canDownload = sessionId !== "" && sessionId !== "sample";

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadScorecard(sessionId);
    } catch (e) {
      console.error(e);
      setDownloadError(demoErrorView(e).message);
    } finally {
      setDownloading(false);
    }
  }

  const nonNegotiableSet = useMemo(() => {
    const set = new Set<string>();
    rubric.categories?.forEach((cat) =>
      cat.subcategories?.forEach((sub) => {
        if (sub.is_non_negotiable) set.add(sub.name);
      }),
    );
    return set;
  }, [rubric]);

  const categoryScores = useMemo<
    { name: string; weight: number | null; score: number | null }[]
  >(() => {
    // The server now returns per-category averages directly. Prefer them: its
    // criterion labels don't always mirror the rubric verbatim, so the
    // name-matching fallback below can under-count.
    const provided = resume.category_scores ?? [];
    if (provided.length > 0) {
      return provided.map((c) => ({
        name: c.category,
        weight: weightForCategory(rubric, c.category),
        score: c.avg_score,
      }));
    }

    // Fallback for payloads without category_scores: derive a weighted average
    // from the criterion breakdown.
    const breakdown = resume.score.breakdown ?? [];
    return rubric.categories.map((cat) => {
      let weighted = 0;
      let totalW = 0;
      for (const sub of cat.subcategories ?? []) {
        const match = breakdown.find(
          (b) => b.criterion.toLowerCase().trim() === sub.name.toLowerCase().trim(),
        );
        if (match) {
          weighted += match.score * sub.weight;
          totalW += sub.weight;
        }
      }
      return {
        name: cat.name,
        weight: cat.weight,
        score: totalW > 0 ? weighted / totalW : null,
      };
    });
  }, [rubric, resume]);

  const score = resume.score;
  const initials = (resume.candidate_name ?? resume.original_filename).slice(0, 2).toUpperCase();
  const tier = getTierLabel(score.overall_score);

  return (
    <div className="rounded-2xl border border-[#E8E5DF] bg-white">
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-[#E8E5DF]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-[#0F0F0F]">Candidate analysis</h2>
          {canDownload && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 rounded-lg border  bg-charcoal px-3 py-1.5 text-xs font-semibold text-ivory hover:border-[#C85A17] hover:text-[#C85A17] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {downloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {downloading ? "Preparing…" : "Download"}
            </button>
          )}
        </div>
        {downloadError && (
          <p className="mt-2 text-xs text-red-600">{downloadError}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${tier.bg} ${tier.border} ${tier.color}`}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tier.dot }} />
            {Math.round(score.overall_score)} · {tier.label}
            {score.rank != null && (
              <span className="text-[#737373] font-normal ml-1">#{score.rank}</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-[#F0EDE8] border border-[#E8E5DF] flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-[#404040]">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-[#0F0F0F] leading-tight">
              {resume.candidate_name ?? resume.original_filename}
            </h1>
            {resume.candidate_current_job && (
              <p className="text-sm text-[#404040] mt-0.5">{resume.candidate_current_job}</p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
              {resume.candidate_email && (
                <a
                  href={`mailto:${resume.candidate_email}`}
                  className="text-xs text-[#737373] hover:text-[#0F0F0F]"
                >
                  {resume.candidate_email}
                </a>
              )}
              {resume.candidate_phone && (
                <span className="text-xs text-[#737373]">{resume.candidate_phone}</span>
              )}
            </div>
          </div>
        </div>

        {score.overall_summary && (
          <div className="bg-[#F5F3EE] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#737373] uppercase tracking-wide mb-2">
              AI Summary
            </p>
            <p className="text-sm text-[#404040] leading-relaxed">{score.overall_summary}</p>
          </div>
        )}

        {categoryScores.some((c) => c.score !== null) && (
          <div>
            <p className="text-xs font-semibold text-[#737373] uppercase tracking-wide mb-2.5">
              Category Scores
            </p>
            <div className="grid grid-cols-3 gap-2">
              {categoryScores.map((cat) => (
                <div
                  key={cat.name}
                  className="rounded-xl border border-[#E8E5DF] bg-white px-3 py-3 flex flex-col items-center text-center"
                >
                  <p className="text-[10px] font-semibold text-[#737373] uppercase tracking-wide leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-[#BDB8AE] mt-0.5">(out of 10)</p>
                  {cat.weight != null && (
                    <p className="text-[10px] text-[#A0A0A0]">{cat.weight}%</p>
                  )}
                  {cat.score !== null ? (
                    <>
                      <span className="text-base font-bold text-[#0F0F0F] mt-2 leading-none">
                        {cat.score.toFixed(1)}
                      </span>
                      <div className="w-14 h-1.5 bg-[#E8E5DF] rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full rounded-full bg-[#C85A17]"
                          style={{ width: `${cat.score * 10}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-[#D4D4D4] mt-2">--</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {((score.strengths?.length ?? 0) > 0 || (score.missing_elements?.length ?? 0) > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(score.strengths?.length ?? 0) > 0 && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-2.5">
                  Strengths
                </p>
                <ul className="space-y-1.5">
                  {score.strengths!.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-900">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(score.missing_elements?.length ?? 0) > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2.5">
                  Missing
                </p>
                <ul className="space-y-1.5">
                  {score.missing_elements!.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-900">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-[#737373] uppercase tracking-wide mb-3">
            Criteria Breakdown
          </p>
          <div className="space-y-2">
            {[...score.breakdown]
              .sort((a, b) => {
                const aNn = nonNegotiableSet.has(a.criterion) ? 1 : 0;
                const bNn = nonNegotiableSet.has(b.criterion) ? 1 : 0;
                return bNn - aNn;
              })
              .map((cs, i) => (
                <CriterionCard
                  key={i}
                  cs={cs}
                  isNonNegotiable={nonNegotiableSet.has(cs.criterion)}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function CriterionCard({
  cs,
  isNonNegotiable = false,
}: {
  cs: BreakdownItem;
  isNonNegotiable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pct = cs.score * 10;
  const barColor = criterionBarColor(cs.score);
  const failed = isNonNegotiable && cs.score < 4;

  const borderClass = failed
    ? "border-red-400 bg-red-50"
    : isNonNegotiable
      ? "border-amber-300 bg-amber-50/30"
      : "border-[#E8E5DF] bg-white";

  return (
    <div className={`border rounded-xl overflow-hidden ${borderClass}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/5 transition-colors"
      >
        <div className="shrink-0 w-14">
          <span className="text-sm font-bold text-[#0F0F0F]">
            {cs.score}
            <span className="text-xs text-[#A0A0A0] font-normal">/10</span>
          </span>
          <div className="w-14 h-1.5 bg-[#E8E5DF] rounded-full overflow-hidden mt-1">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, backgroundColor: barColor }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#0F0F0F] truncate">{cs.criterion}</span>
            {isNonNegotiable && (
              <span
                className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded font-semibold ${failed ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 1L1 10h10L6 1z" />
                  <rect x="5.5" y="5" width="1" height="3" fill="white" rx="0.5" />
                  <circle cx="6" cy="9" r="0.6" fill="white" />
                </svg>
                Must Have{failed ? " · FAILED" : ""}
              </span>
            )}
          </div>
          {!open && cs.explanation && (
            <p className="text-xs text-[#737373] truncate mt-0.5">{cs.explanation}</p>
          )}
        </div>

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`shrink-0 text-[#A0A0A0] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 5l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[#E8E5DF] pt-3 space-y-3">
          {cs.explanation && (
            <p className="text-xs text-[#404040] leading-relaxed">{cs.explanation}</p>
          )}
          {cs.evidence.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-wide">
                Evidence
              </p>
              {cs.evidence.map((q, j) => (
                <blockquote
                  key={j}
                  className="border-l-2 border-[#C85A17] pl-3 text-xs text-[#404040] italic leading-relaxed"
                >
                  &ldquo;{q}&rdquo;
                </blockquote>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SCORING_PHASES = [
  { icon: ScanLine, label: "Parsing resume" },
  { icon: Sparkles, label: "Matching against rubric" },
  { icon: Wand2, label: "Computing final score" },
] as const;

const SCORING_PHASE_MS = 950;

type ResumeUploadProps = {
  sessionId: string;
  onResumeScored?: (resume: ScoredResume) => void;
};

function ResumeUpload({ sessionId, onResumeScored }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scoring) return;
    setPhaseIdx(0);
    const timers: number[] = [];
    for (let i = 1; i < SCORING_PHASES.length; i++) {
      timers.push(window.setTimeout(() => setPhaseIdx(i), SCORING_PHASE_MS * i));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [scoring]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  async function handleScore() {
    if (!file || scoring) return;
    setScoring(true);
    setError(null);
    try {
      const scored = await scoreResume(sessionId, file);
      onResumeScored?.(scored);
    } catch (e) {
      console.error(e);
      setError(demoErrorView(e).message);
      setScoring(false);
    }
  }

  if (scoring) {
    return (
      <div className="rounded-2xl border border-[#E8E5DF] bg-white p-8 sm:p-10 flex flex-col items-center text-center">
        <div className="relative h-20 w-20 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#E8E5DF]" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#C85A17", borderRightColor: "#C85A17" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              className="h-10 w-10 rounded-2xl bg-[#0F0F0F] flex items-center justify-center"
            >
              <FileText className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#0F0F0F] tracking-tight">Scoring resume</h3>
        <p className="text-xs text-[#737373] mt-1.5">This usually takes a few seconds.</p>

        <ul className="mt-8 w-full max-w-xs space-y-2.5 text-left">
          {SCORING_PHASES.map((phase, i) => {
            const Icon = phase.icon;
            const status: "done" | "active" | "pending" =
              i < phaseIdx ? "done" : i === phaseIdx ? "active" : "pending";
            return (
              <li
                key={phase.label}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-colors ${
                  status === "active"
                    ? "bg-white border-[#C85A17]/40 shadow-sm shadow-[#C85A17]/10"
                    : status === "done"
                      ? "bg-[#FAFAF7] border-[#E8E5DF]"
                      : "bg-transparent border-[#E8E5DF]/60"
                }`}
              >
                <span
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    status === "active"
                      ? "bg-[#C85A17]/10 text-[#C85A17]"
                      : status === "done"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#F0EDE8] text-[#A0A0A0]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span
                  className={`text-sm ${
                    status === "active"
                      ? "text-[#0F0F0F] font-semibold"
                      : status === "done"
                        ? "text-[#737373]"
                        : "text-[#A0A0A0]"
                  }`}
                >
                  {phase.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8E5DF] bg-white p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#0F0F0F]">Upload a resume</h3>
        <p className="text-xs text-[#737373] mt-0.5">
          Drop a PDF or DOC. We&rsquo;ll score it against the rubric on the left.
        </p>
      </div>

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: dragOver ? "#C85A17" : "#D4D4D4",
          backgroundColor: dragOver ? "rgba(200,90,23,0.06)" : "#FFFFFF",
          scale: dragOver ? 1.01 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center min-h-56 flex items-center justify-center"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />

        {file ? (
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#C85A17]/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-[#C85A17]" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-[#0F0F0F] truncate max-w-56">{file.name}</p>
              <p className="text-xs text-[#737373]">
                {(file.size / 1024).toFixed(1)} KB · ready to score
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="h-8 w-8 rounded-lg border border-[#E8E5DF] text-[#737373] hover:text-red-600 hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition"
              aria-label="Remove file"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div>
            <motion.div
              animate={{ y: dragOver ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="mx-auto h-12 w-12 rounded-2xl bg-[#0F0F0F] flex items-center justify-center mb-3 shadow-lg shadow-black/10"
            >
              <Upload className="h-4 w-4 text-white" />
            </motion.div>
            <p className="text-sm font-semibold text-[#0F0F0F]">
              {dragOver ? "Release to upload" : "Drag & drop a resume"}
            </p>
            <p className="text-xs text-[#737373] mt-1">
              or <span className="text-[#C85A17] font-medium">click to browse</span> · PDF, DOCX
            </p>
          </div>
        )}
      </motion.div>

      {error && (
        <div className="mt-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <motion.button
          type="button"
          whileHover={file ? { scale: 1.02 } : {}}
          whileTap={file ? { scale: 0.97 } : {}}
          onClick={handleScore}
          disabled={!file}
          className="h-11 px-5 bg-[#C85A17] text-white text-sm font-semibold rounded-xl hover:bg-[#A84A12] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-lg shadow-[#C85A17]/20"
        >
          Score resume
        </motion.button>
      </div>
    </div>
  );
}
