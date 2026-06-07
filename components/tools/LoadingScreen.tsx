"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Gauge,
  Quote,
  ScanLine,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || "https://app.hiresort.ai";

// ─── Progress model ──────────────────────────────────────────────────────────
//
// The real call (build rubric + score resume) can take anywhere from ~3s to 15s+,
// so we never tie the UI to a fixed timeline. Instead we drive one normalized
// `progress` value on an asymptotic curve that approaches but never reaches 100%
// (`CAP`). Steps light up at thresholds and the last step holds in an active state
// — the screen just unmounts when `router.push` fires, so it reads as alive whether
// the wait is 3s or 15s and never dead-ends with everything marked "done".

const CAP = 0.95; // progress ceiling — we never claim completion before the result exists
const TAU = 2400; // ms; smaller = ramps up faster. ~70% by the 3.2s fast-path floor.
const ALMOST_AT_MS = 6000; // after this, the final step softens to "Almost there…"

// Criterion rows assemble early, off the same progress value.
const CRITERIA: { width: string }[] = [{ width: "86%" }, { width: "68%" }, { width: "92%" }];
const CRITERIA_REVEAL = [0.15, 0.33, 0.5] as const;

// ─── Content ─────────────────────────────────────────────────────────────────
//
// The same screen serves the demo and the screening tool today, and is built so
// `app/(public)/free-tools/` (and any future tool) can pass its own copy.

export type LoadingStep = { icon: LucideIcon; label: string; group?: string };
export type LoadingTip = {
  kind: "tip" | "stat" | "proof" | "unlock";
  text: string;
  cite?: string;
};
export type LoadingContent = {
  heading: string;
  subtitle: string;
  steps: LoadingStep[];
  tips: LoadingTip[];
  preview?: "scorecard"; // future variants for non-scoring tools
};

export const RESUME_SCORING_LOADING: LoadingContent = {
  heading: "Setting up your session",
  subtitle: "Hang tight — building the rubric and scoring the resume against it.",
  preview: "scorecard",
  // One call does both halves of the pipeline — build the rubric from the JD,
  // then score the resume against it — so the steps narrate both, grouped.
  steps: [
    { group: "Building the rubric", icon: ScanLine, label: "Reading the job description" },
    { group: "Building the rubric", icon: Sparkles, label: "Extracting key requirements" },
    { group: "Building the rubric", icon: Wand2, label: "Assembling your rubric" },
    { group: "Scoring the resume", icon: FileText, label: "Parsing the resume" },
    { group: "Scoring the resume", icon: Target, label: "Matching against the rubric" },
    { group: "Scoring the resume", icon: Gauge, label: "Scoring & summarizing" },
  ],
  tips: [
    {
      kind: "tip",
      text: "A sharper job description yields a sharper rubric — the more context you give, the more precise the scoring.",
    },
    { kind: "stat", text: "90%", cite: "less time spent screening resumes" },
    {
      kind: "tip",
      text: "Every score is explainable — you'll see the evidence behind each criterion, not just a number.",
    },
    {
      kind: "unlock",
      text: "Sign up free to screen 500 resumes at once and build rubrics with AI.",
    },
  ],
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export default function LoadingScreen({
  content = RESUME_SCORING_LOADING,
}: {
  content?: LoadingContent;
}) {
  const reduced = useReducedMotion() ?? false;
  const { steps } = content;

  // Smooth ring value lives in a MotionValue (no per-frame React render); the
  // discrete UI state below only flips when a threshold is actually crossed.
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [almost, setAlmost] = useState(false);

  useEffect(() => {
    // Reduced motion: hold a single representative frame (no rAF, no looping).
    // The displayed step/criteria are derived below so we don't set state here.
    if (reduced) {
      progress.set(0.66);
      return;
    }

    const start = performance.now();
    // Each step becomes active at an evenly-spread threshold; the last one lands
    // before the cap so it holds in "active" while the real call finishes.
    const stepStarts = steps.map((_, i) =>
      steps.length <= 1 ? 0 : (i / (steps.length - 1)) * 0.62,
    );

    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      const p = CAP * (1 - Math.exp(-t / TAU));
      progress.set(p);

      let a = 0;
      for (let i = 0; i < stepStarts.length; i++) if (p >= stepStarts[i]) a = i;
      setActive(a); // identical-value setState is a no-op, so this is cheap per frame

      let r = 0;
      for (const th of CRITERIA_REVEAL) if (p >= th) r++;
      setRevealed(r);

      if (t >= ALMOST_AT_MS) setAlmost(true);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, steps, progress]);

  // When reduced motion is on we skip the rAF loop entirely, so derive a fully
  // assembled frame rather than driving `active`/`revealed` through state.
  const shownActive = reduced ? steps.length - 1 : active;
  const shownRevealed = reduced ? CRITERIA.length : revealed;

  return (
    <div className="min-h-screen w-full bg-ivory flex items-center justify-center px-6 py-12">
      <motion.div
        variants={fadeUp}
        initial={reduced ? { opacity: 0 } : "hidden"}
        animate={reduced ? { opacity: 1 } : "show"}
        className="grid w-full max-w-4xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Left — animated centerpiece + heading */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {content.preview === "scorecard" && (
            <ScorecardPreview progress={progress} revealed={shownRevealed} reduced={reduced} />
          )}

          <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            {content.heading}
          </h2>
          <p className="text-sm text-charcoal-lt mt-2 max-w-sm">{content.subtitle}</p>
        </div>

        {/* Right — live step narrative + "while you wait" panel */}
        <div className="mx-auto flex w-full max-w-sm flex-col lg:mx-0">
          <StepList steps={steps} active={shownActive} almost={almost} reduced={reduced} />
          <WhileYouWait tips={content.tips} reduced={reduced} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step narrative ──────────────────────────────────────────────────────────
//
// The same call builds the rubric and scores the resume, so steps are grouped
// under those two phases. The last step holds "active" and never auto-completes.

function StepList({
  steps,
  active,
  almost,
  reduced,
}: {
  steps: LoadingStep[];
  active: number;
  almost: boolean;
  reduced: boolean;
}) {
  return (
    <div role="status" aria-live="polite" className="w-full">
      <ul className="space-y-2.5 text-left">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          const status: "done" | "active" | "pending" =
            i < active ? "done" : i === active ? "active" : "pending";
          const label = status === "active" && isLast && almost ? "Almost there…" : step.label;
          const showGroup = !!step.group && step.group !== steps[i - 1]?.group;

          return (
            <Fragment key={step.label}>
              {showGroup && (
                <li className="px-1 pt-2.5 first:pt-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-xlt">
                    {step.group}
                  </span>
                </li>
              )}
              <li
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-colors ${
                  status === "active"
                    ? "bg-white border-accent/40 shadow-soft"
                    : status === "done"
                      ? "bg-ivory-light border-line"
                      : "bg-transparent border-line/60"
                }`}
              >
                <span
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    status === "active"
                      ? "bg-accent/10 text-accent"
                      : status === "done"
                        ? "bg-success-bg text-success"
                        : "bg-ivory-medium text-charcoal-xlt"
                  }`}
                >
                  {status === "done" ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : status === "active" && !reduced ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </motion.span>
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span
                  className={`text-sm ${
                    status === "active"
                      ? "text-charcoal font-semibold"
                      : status === "done"
                        ? "text-charcoal-lt"
                        : "text-charcoal-xlt"
                  }`}
                >
                  {label}
                </span>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Animated "live result preview" centerpiece ──────────────────────────────
//
// A stylized candidate scorecard echoing scoreCard.tsx: a resume silhouette with
// a sweeping scan-line, a progress dial (reusing Hero.tsx's motion.circle pattern,
// but showing a shimmer placeholder — NOT a fabricated number), and criterion rows
// that assemble as progress advances. Decorative only — aria-hidden.

function ScorecardPreview({
  progress,
  revealed,
  reduced,
}: {
  progress: MotionValue<number>;
  revealed: number;
  reduced: boolean;
}) {
  return (
    <div
      aria-hidden
      className="w-full max-w-[18rem] rounded-2xl border border-line bg-white p-4 shadow-md"
    >
      <div className="flex items-center gap-4">
        <DocSilhouette reduced={reduced} />
        <div className="flex flex-1 items-center justify-center">
          <RingDial progress={progress} />
        </div>
      </div>

      <div className="my-3.5 h-px bg-line" />

      <div className="space-y-2.5">
        {CRITERIA.map((c, i) => {
          const shown = i < revealed;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: shown ? 1 : 0.3 }}
              transition={{ duration: reduced ? 0.2 : 0.4, ease }}
              className="flex items-center gap-2.5"
            >
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivory-medium">
                <motion.div
                  className="h-full rounded-full bg-accent/70"
                  initial={{ width: 0 }}
                  animate={{ width: shown ? c.width : 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, ease, delay: shown && !reduced ? 0.1 : 0 }}
                />
              </div>
              <motion.span
                initial={false}
                animate={{ scale: shown ? 1 : 0.6, opacity: shown ? 1 : 0 }}
                transition={
                  reduced ? { duration: 0.2 } : { type: "spring", stiffness: 320, damping: 18 }
                }
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success-bg"
              >
                <Check className="h-2.5 w-2.5 text-success" strokeWidth={3} />
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DocSilhouette({ reduced }: { reduced: boolean }) {
  const lines = ["80%", "95%", "60%", "88%", "45%"];
  return (
    <div className="relative h-22 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-ivory-light p-2.5">
      <div className="flex flex-col gap-1.5">
        {lines.map((w, i) => (
          <span
            key={i}
            className="block h-1 rounded-full bg-charcoal-xlt/25"
            style={{ width: w }}
          />
        ))}
      </div>
      {!reduced && (
        <motion.span
          className="absolute inset-x-1.5 h-0.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px 1px rgba(200,90,23,0.5)" }}
          initial={{ y: 4 }}
          animate={{ y: [4, 74, 4] }}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        />
      )}
    </div>
  );
}

function RingDial({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 48 48" className="h-20 w-20 overflow-visible">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-ivory-medium)" strokeWidth="5" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength: progress, transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      {/* Shimmer placeholder where the real score will land — deliberately NOT a number. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="block h-3 w-8 rounded-full animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--color-ivory-medium) 25%, var(--color-ivory-dark) 50%, var(--color-ivory-medium) 75%)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  );
}

// ─── Rotating "while you wait" panel ─────────────────────────────────────────

function WhileYouWait({ tips, reduced }: { tips: LoadingTip[]; reduced: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (tips.length <= 1) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % tips.length), 3500);
    return () => window.clearInterval(id);
  }, [tips.length]);

  return (
    <div className="mt-8 w-full max-w-sm">
      <div className="relative flex min-h-28 items-center rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: 0.4, ease }}
            className="w-full text-left"
          >
            <TipCard tip={tips[idx]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {tips.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {tips.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-4 bg-accent" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Eyebrow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function TipCard({ tip }: { tip: LoadingTip }) {
  if (tip.kind === "stat") {
    return (
      <div>
        <Eyebrow icon={TrendingUp} label="By the numbers" />
        <p className="font-mono text-3xl font-extrabold tracking-[-1px] text-charcoal leading-none">
          {tip.text}
        </p>
        {tip.cite && <p className="mt-1.5 text-sm text-charcoal-lt">{tip.cite}</p>}
      </div>
    );
  }

  if (tip.kind === "proof") {
    return (
      <div>
        <Eyebrow icon={Quote} label="What teams say" />
        <p className="text-sm italic leading-relaxed text-charcoal">“{tip.text}”</p>
        {tip.cite && <p className="mt-1.5 text-xs text-charcoal-lt">{tip.cite}</p>}
      </div>
    );
  }

  if (tip.kind === "unlock") {
    return (
      <div>
        <Eyebrow icon={Zap} label="Unlock more" />
        <p className="text-sm leading-relaxed text-charcoal">{tip.text}</p>
        <a
          href={MAIN_APP_URL}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent no-underline hover:underline underline-offset-2"
        >
          Sign up free
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow icon={Sparkles} label="Did you know" />
      <p className="text-sm leading-relaxed text-charcoal">{tip.text}</p>
    </div>
  );
}
