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
    Wand2,
    Copy,
    Info,
    AlertTriangle,
    RefreshCw,
    Clock,
    HelpCircle,
    Flag,
    FileQuestion,
    Award
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginCtaBar from "../../../_components/loginCtaBar";
import StartScreeningCta from "../../../_components/startScreeningCta";
import {
    generateinterviewKit,
    downloadInterviewKitPdf,
    formatResetTime,
    type InterviewKitGenerateMeta,
    JdApiError,
    normalizeUrl,
} from "../_lib/api";
import type {
    InterviewKit,
    InterviewKitInput,
    RoleSummary,
    ScreeningQuestion,
    InterviewQuestion,
    ScorecardItem,
    RecommendedInterviewFlowItem
} from "../_lib/types";
import Toast, { type ToastData } from "../../../../../components/toast";

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
    const sessionIdRef = useRef<string | null>(null);


    const canDownload = kit !== null && !generating && !downloading;

    // Apply quota headers

    function handleError(err: unknown, source: "generate" | "download") {
        if (err instanceof JdApiError) {
            setError(err.message);
            setErrorIsLimit(err.isLimit);
            setLimitResetsAt(err.resetsAt);

            const fallback =
                source === "download"
                    ? "Couldn't download the PDF. Please try again."
                    : "Couldn't generate the interview kit. Please try again.";
            setError(err instanceof Error ? err.message : fallback);
            setErrorIsLimit(false);
            setLimitResetsAt(null);
        }


    }

    
    async function handleDownload() {
        if (!canDownload || !kit) return;
        setError(null);
        setLimitResetsAt(null);
        setDownloading(true);
        try {
            const { blob, filename, meta } = await downloadInterviewKitPdf(kit, sessionIdRef.current);
            //   applyMeta(meta);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename ?? `${"interview-kit"}.pdf`;
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

    async function handleCopy() {
        if (!kit) return;
        try {
            await navigator.clipboard.writeText(kit.copyable_summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    }

    const toast: ToastData | null = error
        ? {
            message: error,
            variant: "error",
            resetLabel: formatResetTime(limitResetsAt),
        }
        : null;

    function dismissToast() {
        setError(null);
        setErrorIsLimit(false);
        setLimitResetsAt(null);
    }

    function updateInterviewQuestion<K extends keyof InterviewQuestion>(
        index: number,
        field: K,
        value: InterviewQuestion[K],
    ) {
        setKit((current) => {
            if (!current) return current;
            const interview_questions = [...current.interview_questions];
            interview_questions[index] = { ...interview_questions[index], [field]: value };
            return { ...current, interview_questions };
        });
    }

    function updateScorecardItem<K extends keyof ScorecardItem>(
        index: number,
        field: K,
        value: ScorecardItem[K],
    ) {
        setKit((current) => {
            if (!current) return current;
            const scorecard = [...current.scorecard];
            scorecard[index] = { ...scorecard[index], [field]: value };
            return { ...current, scorecard };
        });
    }



    function updateFlowItem<K extends keyof RecommendedInterviewFlowItem>(
        index: number,
        field: K,
        value: RecommendedInterviewFlowItem[K],
    ) {
        setKit((current) => {
            if (!current) return current;
            const recommended_interview_flow = [...current.recommended_interview_flow];
            recommended_interview_flow[index] = { ...recommended_interview_flow[index], [field]: value };
            return { ...current, recommended_interview_flow };
        });
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
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 py-8 sm:py-10">

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

                    {/* Main 2 Column Grid */}
                    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">

                        {/* ── Right Panel: Rendered Structured Kit ── */}
                        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-soft flex flex-col justify-between min-h-[500px]">

                            {/* Header Action Bar */}
                            <div className="border-b border-line pb-4 mb-4 flex items-center justify-between gap-3">
                                <span className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                                    <FileText className="h-4 w-4 text-accent" />
                                    {kit ? "Ready-to-Use Interview Kit" : "AI Generated Output"}
                                </span>

                                {kit && (
                                    <div className="flex items-center gap-2">
                                        {/* Copy Summary */}
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-line bg-white text-xs font-semibold text-charcoal hover:bg-ivory transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={13} className="text-success" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={13} />
                                                    Copy text
                                                </>
                                            )}
                                        </button>

                                        {/* Download PDF */}
                                        <button
                                            type="button"
                                            onClick={handleDownload}
                                            disabled={downloading}
                                            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-charcoal text-xs font-semibold text-ivory hover:bg-accent transition-colors disabled:opacity-50"
                                        >
                                            {downloading ? (
                                                <>
                                                    <Loader2 size={13} className="animate-spin" />
                                                    Exporting…
                                                </>
                                            ) : (
                                                <>
                                                    <Download size={13} />
                                                    Download PDF
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Output Content */}
                            <div className="flex-1 overflow-y-auto max-h-[650px] pr-1 space-y-6 scrollbar-thin">

                                {generating ? (
                                    <div className="h-full flex flex-col items-center justify-center gap-3 py-20">
                                        <Loader2 className="h-8 w-8 text-accent animate-spin" />
                                        <p className="text-sm font-semibold text-charcoal">Analyzing your requirements...</p>
                                        <p className="text-xs text-charcoal-lt max-w-xs text-center">
                                            We're drafting custom screening questions, role competency rubrics, evaluation scorecards, and flow timelines.
                                        </p>
                                    </div>
                                ) : kit ? (
                                    <div className="space-y-6 text-charcoal">

                                        {/* 1. Role Summary */}
                                        <div className="p-4 rounded-xl border border-line-soft bg-ivory-light">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Info className="h-4.5 w-4.5 text-accent" />
                                                <h3 className="text-sm font-bold text-charcoal">Role Summary</h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                                                <div>
                                                    <span className="block text-charcoal-xlt font-semibold">Title</span>
                                                    <div
                                                        className="bg-transparent font-medium border-b border-transparent hover:border-line-soft focus:border-accent focus:outline-none w-full py-0.5"
                                                    >{kit.role_summary.role_title}</div>
                                                </div>
                                                <div>
                                                    <span className="block text-charcoal-xlt font-semibold">Seniority</span>
                                                    <div
                                                        className="bg-transparent font-medium border-b border-transparent hover:border-line-soft focus:border-accent focus:outline-none w-full py-0.5"
                                                    >{kit.role_summary.seniority}</div>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="block text-charcoal-xlt font-semibold">Interview Type</span>
                                                    <div
                                                        className="bg-transparent font-medium border-b border-transparent hover:border-line-soft focus:border-accent focus:outline-none w-full py-0.5"
                                                    >{kit.role_summary.interview_type}<div />
                                                    </div>
                                                </div>

                                                {/* Competencies */}
                                                {kit.role_summary.core_competencies?.length > 0 && (
                                                    <div className="mb-3">
                                                        <span className="block text-xs text-charcoal-xlt font-semibold mb-1">Key Competencies</span>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {kit.role_summary.core_competencies.map((comp, i) => (
                                                                <span key={i} className="inline-flex bg-white border border-line-soft rounded-full px-2 py-0.5 text-[10px] font-semibold text-charcoal-md">
                                                                    {comp}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Assumptions */}
                                                {kit.role_summary.assumptions?.length > 0 && (
                                                    <div className="text-[11px] text-charcoal-lt bg-white/60 p-2.5 rounded-lg border border-line-soft">
                                                        <span className="font-semibold block text-charcoal-md mb-0.5">Generator Assumptions:</span>
                                                        <ul className="list-disc list-inside space-y-0.5">
                                                            {kit.role_summary.assumptions.map((ass, i) => (
                                                                <li key={i}>{ass}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* 2. Recruiter Screening Questions */}
                                        {kit.screening_questions?.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-charcoal flex items-center gap-1.5 border-b border-line pb-1.5">
                                                    <FileQuestion className="h-4.5 w-4.5 text-accent" />
                                                    Recruiter Screening Stage Questions
                                                </h3>
                                                <div className="space-y-3">
                                                    {kit.screening_questions.map((q, idx) => (
                                                        <div key={idx} className="p-3.5 rounded-xl border border-line-soft bg-white shadow-xs space-y-2">
                                                            <div className="flex gap-2">
                                                                <span className="font-bold text-accent text-xs">S{idx + 1}</span>
                                                                <div

                                                                    className="w-full text-xs font-semibold leading-relaxed text-charcoal border-none p-0 focus:ring-0 focus:outline-none bg-transparent resize-none"
                                                                >{q.question}</div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-line-soft">
                                                                <div>
                                                                    <span className="font-semibold text-charcoal-xlt">Intent:</span>
                                                                    <div

                                                                        className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-medium text-charcoal-lt"
                                                                    >{q.intent}</div>
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-charcoal-xlt">Follow-up Probe:</span>
                                                                    <div
                                                                        className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-medium text-charcoal-lt"
                                                                    >{q.follow_up}</div>
                                                                </div>
                                                                <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-2 mt-1">
                                                                    <div className="bg-success-bg/30 p-1.5 rounded">
                                                                        <span className="font-bold text-success text-[10px] block">Strong Answer Signal:</span>
                                                                        <div
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-[10px] text-charcoal-md leading-relaxed resize-none"
                                                                        >{q.strong_signal}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* 3. Main Competency Interview Questions */}
                                        {kit.interview_questions?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-bold text-charcoal flex items-center gap-1.5 border-b border-line pb-1.5">
                                                    <HelpCircle className="h-4.5 w-4.5 text-accent" />
                                                    Competency-Based Interview Questions
                                                </h3>

                                                <div className="space-y-4">
                                                    {kit.interview_questions.map((q, idx) => (
                                                        <div key={idx} className="p-4 rounded-xl border border-line-soft bg-white shadow-xs space-y-3">

                                                            {/* Competency & Question */}
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <input
                                                                        type="text"
                                                                        value={q.competency}
                                                                        onChange={(e) => updateInterviewQuestion(idx, "competency", e.target.value)}
                                                                        className="bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border-none focus:ring-0 focus:outline-none"
                                                                    />
                                                                    <span className="text-[11px] font-bold text-charcoal-xlt">Q{idx + 1}</span>
                                                                </div>
                                                                <textarea
                                                                    value={q.question}
                                                                    onChange={(e) => updateInterviewQuestion(idx, "question", e.target.value)}
                                                                    className="w-full text-xs font-bold leading-relaxed text-charcoal border-none p-0 focus:ring-0 focus:outline-none bg-transparent resize-none"
                                                                    rows={2}
                                                                />
                                                            </div>

                                                            {/* Why ask & Probe */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-line-soft text-[11px] text-charcoal-lt">
                                                                <div>
                                                                    <span className="font-semibold text-charcoal-xlt block mb-0.5">Evaluation Focus:</span>
                                                                    <textarea
                                                                        value={q.why_ask}
                                                                        onChange={(e) => updateInterviewQuestion(idx, "why_ask", e.target.value)}
                                                                        className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none leading-relaxed resize-none"
                                                                        rows={2}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-charcoal-xlt block mb-0.5">Follow-up Probe:</span>
                                                                    <textarea
                                                                        value={q.follow_up_probe}
                                                                        onChange={(e) => updateInterviewQuestion(idx, "follow_up_probe", e.target.value)}
                                                                        className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none leading-relaxed resize-none"
                                                                        rows={2}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Answer Signals */}
                                                            <div className="space-y-2 pt-2 border-t border-line-soft text-[10px]">
                                                                <span className="font-bold text-charcoal-md">Grading Assessment Signals:</span>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                                    <div className="bg-success-bg/20 p-2 rounded border border-success/10">
                                                                        <span className="font-bold text-success block mb-1">Strong (Score 5):</span>
                                                                        <textarea
                                                                            value={q.strong_answer_signals.join("\n")}
                                                                            onChange={(e) => updateInterviewQuestion(idx, "strong_answer_signals", e.target.value.split("\n"))}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-[9.5px] leading-relaxed resize-none"
                                                                            rows={3}
                                                                        />
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* 4. Scorecard Table */}
                                        {kit.scorecard?.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-charcoal flex items-center gap-1.5 border-b border-line pb-1.5">
                                                    <Award className="h-4.5 w-4.5 text-accent" />
                                                    Candidate Scoring Matrix & Rubric
                                                </h3>
                                                <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-xs">
                                                    <table className="w-full border-collapse text-[11px] text-left">
                                                        <thead>
                                                            <tr className="bg-ivory-light border-b border-line text-charcoal-md font-bold">
                                                                <th className="p-2.5 w-[22%]">Criterion</th>
                                                                <th className="p-2.5 w-[10%] text-center">Weight%</th>
                                                                <th className="p-2.5 w-[23%]">Focus Target</th>
                                                                <th className="p-2.5 w-[15%]">Weak (1)</th>
                                                                <th className="p-2.5 w-[15%]">Average (3)</th>
                                                                <th className="p-2.5 w-[15%]">Strong (5)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {kit.scorecard.map((item, idx) => (
                                                                <tr key={idx} className="border-b border-line-soft last:border-none hover:bg-ivory-light/40">
                                                                    <td className="p-2.5 font-bold">
                                                                        <input
                                                                            type="text"
                                                                            value={item.criterion}
                                                                            onChange={(e) => updateScorecardItem(idx, "criterion", e.target.value)}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-bold"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2.5 text-center font-semibold">
                                                                        <input
                                                                            type="number"
                                                                            value={item.weight_percent}
                                                                            onChange={(e) => updateScorecardItem(idx, "weight_percent", Number(e.target.value))}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-center font-semibold"
                                                                        />
                                                                    </td>
                                                                    <td className="p-2.5 text-charcoal-lt">
                                                                        <textarea
                                                                            value={item.what_to_look_for}
                                                                            onChange={(e) => updateScorecardItem(idx, "what_to_look_for", e.target.value)}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none resize-none leading-relaxed"
                                                                            rows={2}
                                                                        />
                                                                    </td>
                                                                    <td className="p-2.5 text-[#a70c0c] bg-red-50/20">
                                                                        <textarea
                                                                            value={item.score_1}
                                                                            onChange={(e) => updateScorecardItem(idx, "score_1", e.target.value)}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none resize-none leading-relaxed"
                                                                            rows={2}
                                                                        />
                                                                    </td>

                                                                    <td className="p-2.5 text-success bg-success-bg/10">
                                                                        <textarea
                                                                            value={item.score_5}
                                                                            onChange={(e) => updateScorecardItem(idx, "score_5", e.target.value)}
                                                                            className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none resize-none leading-relaxed"
                                                                            rows={2}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}



                                        {/* 6. Recommended Flow */}
                                        {kit.recommended_interview_flow?.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-sm font-bold text-charcoal flex items-center gap-1.5 border-b border-line pb-1.5">
                                                    <Clock className="h-4.5 w-4.5 text-accent" />
                                                    Recommended Interview Schedule & Timeline
                                                </h3>
                                                <div className="space-y-2">
                                                    {kit.recommended_interview_flow.map((flow, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-line-soft bg-white">
                                                            <div className="bg-ivory px-2 py-1 rounded text-center shrink-0 border border-line-soft min-w-16">
                                                                <input
                                                                    type="number"
                                                                    value={flow.duration_minutes}
                                                                    onChange={(e) => updateFlowItem(idx, "duration_minutes", Number(e.target.value))}
                                                                    className="w-8 text-xs font-bold text-accent bg-transparent border-none p-0 focus:ring-0 text-center inline focus:outline-none"
                                                                />
                                                                <span className="text-[9px] block font-semibold text-charcoal-xlt uppercase">min</span>
                                                            </div>

                                                            <div className="flex-1 text-xs">
                                                                <input
                                                                    type="text"
                                                                    value={flow.stage}
                                                                    onChange={(e) => updateFlowItem(idx, "stage", e.target.value)}
                                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none font-bold text-charcoal mb-0.5 text-xs"
                                                                />
                                                                <textarea
                                                                    value={flow.instructions}
                                                                    onChange={(e) => updateFlowItem(idx, "instructions", e.target.value)}
                                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-[11px] text-charcoal-lt leading-relaxed resize-none"
                                                                    rows={2}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* 7. Compliance Notes */}
                                        {kit.compliance_notes?.length > 0 && (
                                            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                                                <div className="flex items-center gap-2 mb-2 text-amber-800">
                                                    <AlertTriangle className="h-4.5 w-4.5" />
                                                    <h4 className="text-xs font-bold">Diversity & Legal Compliance Guidelines</h4>
                                                </div>
                                                <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-1 leading-relaxed">
                                                    {kit.compliance_notes.map((note, i) => (
                                                        <li key={i}>{note}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center gap-3 py-24 text-center">
                                        <div className="p-4 rounded-full bg-ivory-light border border-line-soft">
                                            <Sparkles className="h-8 w-8 text-charcoal-xlt animate-pulse" />
                                        </div>
                                        <p className="text-sm font-semibold text-charcoal">Create custom interview plans instantly</p>
                                        <p className="text-xs text-charcoal-lt max-w-sm">
                                            Input the role details on the left, and AI will build a compliant interview kit with evaluation scorecards, screening checklists, red flags, and scoring matrix.
                                        </p>
                                    </div>
                                )}

                            </div>

                            {/* Handoff actions once generated */}
                            {kit && !generating && (
                                <div className="mt-4 pt-4 border-t border-line flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.push("/free-tools/rubric-generator?is_routed=true");
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-charcoal bg-white text-charcoal text-sm font-semibold hover:bg-ivory transition-colors"
                                    >
                                        Build Screening Rubric
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.push("/free-tools/screening");
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-charcoal text-white text-sm font-semibold hover:bg-copper-dark transition-colors"
                                    >
                                        Screen a Candidate Resume
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </section>

                    </div>

                </div>
            </main>
        </div>
    );
}
