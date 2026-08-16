"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Download,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginCtaBar from "../../../_components/loginCtaBar";
import StartScreeningCta from "../../../_components/startScreeningCta";
import {
  generateinterviewKit,
  formatResetTime,
  type InterviewKitGenerateMeta,
  JdApiError,
} from "../_lib/api";
import type {
  InterviewKit,
  InterviewKitInput,
} from "../_lib/types";
import Toast, { type ToastData } from "../../../../../components/toast";
import JdFileUpload from "@/app/(tools)/free-tools/_interview-kit/_components/jdUpload";

const ease = [0.22, 1, 0.36, 1] as const;

const SENIORITIES = [
  "Intern",
  "Entry-level",
  "Mid-level",
  "Senior",
  "Lead/Manager",
  "Executive",
] as const;

const INTERVIEW_TYPES = [
  "Recruiter screen",
  "Hiring manager interview",
  "Technical/skills interview",
  "Culture/values interview",
  "Final round",
] as const;



const QUESTION_COUNTS = [5, 10, 15, 20] as const;
const DIFFICULTIES = ["Basic", "Balanced", "Advanced"] as const;

const FEATURES = [
  { Icon: Sparkles, label: "Role-specific questions", color: "text-accent" },
  { Icon: Wand2, label: "Answer scoring signals", color: "text-accent" },
  { Icon: Download, label: "Export to PDF", color: "text-accent" },
  { Icon: Check, label: "No signup needed", color: "text-success" },
] as const;

const fieldClass =
  "w-full h-10 px-3 rounded-lg border border-line bg-ivory text-charcoal text-sm placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed";
const textareaClass =
  "w-full px-3 py-2 rounded-lg border border-line bg-ivory text-charcoal text-sm placeholder:text-charcoal-xlt focus:outline-none focus:ring-2 focus:ring-accent transition-shadow disabled:opacity-60 disabled:cursor-not-allowed min-h-32 resize-y";
const labelClass = "block text-xs font-medium text-charcoal-md mb-1";

export default function InterviewKitBuilder() {
  const router = useRouter();

  // ── Form state ──
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [JdMode, setJdMode] = useState<"text" | "file">("text");
  const [seniority, setSeniority] = useState("Mid-level");
  const [department, setDepartment] = useState("");
  const [mustHaveSkills, setMustHaveSkills] = useState("");
  const [interviewType, setInterviewType] = useState("Hiring manager interview");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState("Balanced");
  const [includeScreening, setIncludeScreening] = useState(true);
  const [includeScorecard, setIncludeScorecard] = useState(true);
  const [includeRedFlags, setIncludeRedFlags] = useState(true);

  const [optionsOpen, setOptionsOpen] = useState(false);

  // ── Generation / output state ──
  const [kit, setKit] = useState<InterviewKit | null>(null);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // ── Error handling & rate limits ──
  const [error, setError] = useState<string | null>(null);
  const [errorIsLimit, setErrorIsLimit] = useState(false);
  const [limitResetsAt, setLimitResetsAt] = useState<Date | null>(null);

  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [maxAttempts, setMaxAttempts] = useState<number | null>(null);
  const [resetsAt, setResetsAt] = useState<Date | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const outOfAttempts = attemptsLeft !== null && attemptsLeft <= 0;
  const resetLabel = formatResetTime(resetsAt);

  const canGenerate = Boolean(jobTitle.trim()) && Boolean(jobDescription.trim()) && !generating && !outOfAttempts;
  const canDownload = kit !== null && !generating && !downloading;

  // Apply quota headers
  function applyMeta(meta: InterviewKitGenerateMeta) {
    if (meta.sessionId) sessionIdRef.current = meta.sessionId;
    if (meta.attemptsLeft !== null) setAttemptsLeft(meta.attemptsLeft);
    if (meta.maxAttempts !== null) setMaxAttempts(meta.maxAttempts);
    if (meta.resetsAt !== null) setResetsAt(meta.resetsAt);
  }

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
          : "Couldn't generate the interview kit. Please try again.";
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
    setCopied(false);

    const payload: InterviewKitInput = {
      job_title: jobTitle.trim(),
      job_description: jobDescription.trim(),
      seniority_level: seniority,
      departement_or_team: department.trim() || null,
      must_have_skills: mustHaveSkills.trim() || null,
      interview_type: interviewType || null,
      number_of_questions: numQuestions || null,
      difficulty_level: difficulty || null,
      include_screening_questions: includeScreening,
      include_scoring_scorecard: includeScorecard,
      include_red_flags: includeRedFlags,
    };

    try {
      const { data, meta } = await generateinterviewKit(payload, sessionIdRef.current);
      setKit(data);
      setHasGenerated(true);
      applyMeta(meta);
    } catch (err) {
      handleError(err, "generate");
    } finally {
      setGenerating(false);
    }
  }


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
      <Toast toast={toast} onClose={dismissToast} />

      {hasGenerated && <StartScreeningCta label="Start screening candidates now" />}

      {/* Grid background */}
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

      {/* Ambient glows */}
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

      <LoginCtaBar text="Build role-specific interview kits in seconds — then save them, screen resumes, and rank your pipeline." />

      <main className="relative z-10 flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-8 py-8 sm:py-10">

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



          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-soft flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-accent" />
                Define Role & Requirements
              </h2>

              {/* Job Title */}
              <div className="mb-4">
                <label htmlFor="job-title" className="block text-sm font-semibold text-charcoal mb-1.5">
                  Job title <span className="text-accent">*</span>
                </label>
                <input
                  id="job-title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={generating}
                  placeholder="e.g. Senior Frontend Engineer"
                  className={fieldClass}
                />
              </div>

              {/* Job Description */}
              <div className="mb-4 flex flex-col gap-2.5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="job-desc" className="block text-sm font-semibold text-charcoal mb-1.5">
                      Job description / Role brief <span className="text-accent">*</span>
                    </label>
                    <div className="flex flex-row items-center gap-2 text-xs text-charcoal-xlt">
                      <span onClick={() => setJdMode("text")} >Paste</span>
                      <span onClick={() => setJdMode("file")} >Upload File</span>
                    </div>
                  </div>
                  {JdMode === "text" ?
                    <textarea
                      id="job-desc"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      disabled={generating}
                      placeholder="Paste the job description, role overview, key responsibilities, and qualifications..."
                      className={textareaClass}
                    />
                    :
                    <JdFileUpload
                      file={null}
                      onRemove={() => { }}
                      onSelect={() => { }}

                    />
                  }

                </div>

                {/* Collapsible Options */}
                <div className="rounded-xl border border-line bg-white mb-4">
                  <button
                    type="button"
                    onClick={() => setOptionsOpen((o) => !o)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left"
                    aria-expanded={optionsOpen}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                      Tailor generator settings
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-charcoal-lt transition-transform ${optionsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {optionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-x-3 gap-y-3 px-4 pb-4 sm:grid-cols-2">

                          {/* Seniority */}
                          <div>
                            <label htmlFor="seniority" className={labelClass}>Seniority level</label>
                            <select
                              id="seniority"
                              value={seniority}
                              onChange={(e) => setSeniority(e.target.value)}
                              disabled={generating}
                              className={fieldClass}
                            >
                              {SENIORITIES.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Team / Department */}
                          <div>
                            <label htmlFor="department" className={labelClass}>Department / Team <span className="text-charcoal-xlt font-normal">(optional)</span></label>
                            <input
                              id="department"
                              type="text"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              disabled={generating}
                              placeholder="e.g. Product Engineering"
                              className={fieldClass}
                            />
                          </div>

                          {/* Interview Type */}
                          <div>
                            <label htmlFor="interview-type" className={labelClass}>Interview stage</label>
                            <select
                              id="interview-type"
                              value={interviewType}
                              onChange={(e) => setInterviewType(e.target.value)}
                              disabled={generating}
                              className={fieldClass}
                            >
                              {INTERVIEW_TYPES.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Difficulty */}
                          <div>
                            <label htmlFor="difficulty" className={labelClass}>Question difficulty</label>
                            <select
                              id="difficulty"
                              value={difficulty}
                              onChange={(e) => setDifficulty(e.target.value)}
                              disabled={generating}
                              className={fieldClass}
                            >
                              {DIFFICULTIES.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Number of Questions */}
                          <div>
                            <label htmlFor="num-questions" className={labelClass}>Target questions</label>
                            <select
                              id="num-questions"
                              value={numQuestions}
                              onChange={(e) => setNumQuestions(Number(e.target.value))}
                              disabled={generating}
                              className={fieldClass}
                            >
                              {QUESTION_COUNTS.map((opt) => (
                                <option key={opt} value={opt}>{opt} questions</option>
                              ))}
                            </select>
                          </div>

                          {/* Must-have Skills */}
                          <div>
                            <label htmlFor="must-have" className={labelClass}>Must-have skills <span className="text-charcoal-xlt font-normal">(optional)</span></label>
                            <input
                              id="must-have"
                              type="text"
                              value={mustHaveSkills}
                              onChange={(e) => setMustHaveSkills(e.target.value)}
                              disabled={generating}
                              placeholder="e.g. React, TypeScript, unit testing"
                              className={fieldClass}
                            />
                          </div>

                          {/* Toggles */}
                          <div className="sm:col-span-2 pt-2 border-t border-line mt-1 space-y-2.5">
                            <span className="block text-xs font-semibold text-charcoal-md mb-2">Sections to generate</span>

                            <div className="flex items-center justify-between">
                              <label htmlFor="inc-screening" className="text-xs text-charcoal-md font-medium cursor-pointer">
                                Include recruiter screening questions
                              </label>
                              <input
                                id="inc-screening"
                                type="checkbox"
                                checked={includeScreening}
                                onChange={(e) => setIncludeScreening(e.target.checked)}
                                disabled={generating}
                                className="h-4 w-4 rounded border-line text-accent focus:ring-accent accent-copper"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <label htmlFor="inc-scorecard" className="text-xs text-charcoal-md font-medium cursor-pointer">
                                Include evaluation scorecard & grading rubric
                              </label>
                              <input
                                id="inc-scorecard"
                                type="checkbox"
                                checked={includeScorecard}
                                onChange={(e) => setIncludeScorecard(e.target.checked)}
                                disabled={generating}
                                className="h-4 w-4 rounded border-line text-accent focus:ring-accent accent-copper"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <label htmlFor="inc-flags" className="text-xs text-charcoal-md font-medium cursor-pointer">
                                Include behavioral red flags to investigate
                              </label>
                              <input
                                id="inc-flags"
                                type="checkbox"
                                checked={includeRedFlags}
                                onChange={(e) => setIncludeRedFlags(e.target.checked)}
                                disabled={generating}
                                className="h-4 w-4 rounded border-line text-accent focus:ring-accent accent-copper"
                              />
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Generate button */}
              <div className="mt-4 pt-4 border-t border-line">
                <motion.button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  whileTap={canGenerate ? { scale: 0.98 } : {}}
                  className="w-full h-11 bg-copper text-white text-sm font-semibold rounded-xl hover:bg-copper-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {generating ? "Building your interview kit…" : hasGenerated ? "Regenerate Interview Kit" : "Generate Interview Kit"}
                </motion.button>

                {!jobTitle.trim() || !jobDescription.trim() ? (
                  <p className="mt-2 text-center text-xs text-[#a70c0c]">
                    Please enter both a Job Title and Description to generate the kit.
                  </p>
                ) : (
                  attemptsLeft !== null && (
                    <p className="mt-2 text-center text-xs text-charcoal-xlt">
                      Generations remaining: {attemptsLeft} / {maxAttempts || 3}
                      {resetLabel && ` (resets on ${resetLabel})`}
                    </p>
                  )
                )}
              </div>
            </div>
          </section>


        </div>
      </main>
    </div>
  );
}
