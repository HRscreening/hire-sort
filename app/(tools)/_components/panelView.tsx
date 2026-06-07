"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Briefcase, Check, ChevronDown, FileText, ListChecks } from "lucide-react";
import { useState } from "react";
import type { Rubric as RubricType, ScoredResume } from "../types";
import Rubric from "./rubric";
import ScoreCard from "./scoreCard";

const ease = [0.22, 1, 0.36, 1] as const;

type ViewKey = "rubric" | "jd" | "resume" | "analysis";

const VIEW_OPTIONS: {
  key: ViewKey;
  label: string;
  title: string;
  subtitle: string;
  icon: typeof FileText;
}[] = [
  {
    key: "rubric",
    label: "Rubric",
    title: "Screening Rubric",
    subtitle: "Define what a great candidate looks like.",
    icon: ListChecks,
  },
  {
    key: "jd",
    label: "Job description",
    title: "Job Description",
    subtitle: "The role you’re hiring for.",
    icon: Briefcase,
  },
  {
    key: "resume",
    label: "resume",
    title: "resume",
    subtitle: "The candidate’s submitted resume.",
    icon: FileText,
  },
  {
    key: "analysis",
    label: "Candidate analysis",
    title: "Candidate Score",
    subtitle: "Live analysis from the resume.",
    icon: BarChart3,
  },
];

const DEFAULT_JD_URL = "/sample/sample_jd.pdf";
const DEFAULT_RESUME_URL = "/sample/sample_resume.pdf";

type DemoPanelViewProps = {
  rubric: RubricType;
  resume: ScoredResume | null;
  sessionId: string;
  onResumeScored?: (resume: ScoredResume) => void;
  jdUrl?: string;
  resumeUrl?: string;
};

const DemoPanelView = ({
  rubric,
  resume,
  sessionId,
  onResumeScored,
  jdUrl = DEFAULT_JD_URL,
  resumeUrl = DEFAULT_RESUME_URL,
}: DemoPanelViewProps) => {
  const [leftView, setLeftView] = useState<ViewKey>("rubric");
  const [rightView, setRightView] = useState<ViewKey>("analysis");

  return (
    <div className="md:flex-1 md:min-h-0 w-full flex flex-col md:flex-row md:overflow-hidden bg-ivory">
      <Panel
        view={leftView}
        onViewChange={setLeftView}
        rubric={rubric}
        resume={resume}
        sessionId={sessionId}
        onResumeScored={onResumeScored}
        jdUrl={jdUrl}
        resumeUrl={resumeUrl}
        className="border-b md:border-b-0 md:border-r border-line bg-white"
      />
      <Panel
        view={rightView}
        onViewChange={setRightView}
        rubric={rubric}
        resume={resume}
        sessionId={sessionId}
        onResumeScored={onResumeScored}
        jdUrl={jdUrl}
        resumeUrl={resumeUrl}
        className="bg-ivory-light"
      />
    </div>
  );
};

export default DemoPanelView;

type PanelProps = {
  view: ViewKey;
  onViewChange: (view: ViewKey) => void;
  rubric: RubricType;
  resume: ScoredResume | null;
  sessionId: string;
  onResumeScored?: (resume: ScoredResume) => void;
  jdUrl: string;
  resumeUrl: string;
  className?: string;
};

function Panel({
  view,
  onViewChange,
  rubric,
  resume,
  sessionId,
  onResumeScored,
  jdUrl,
  resumeUrl,
  className = "",
}: PanelProps) {
  const isPdf = view === "jd" || view === "resume";
  const meta = VIEW_OPTIONS.find((o) => o.key === view) ?? VIEW_OPTIONS[0];

  return (
    <section className={`flex flex-col md:flex-1 md:min-h-0 ${className}`}>
      <header className="md:shrink-0 sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-charcoal truncate">{meta.title}</h2>
          <p className="text-xs text-charcoal-lt mt-0.5 truncate">{meta.subtitle}</p>
        </div>
        <PanelSelect value={view} onChange={onViewChange} />
      </header>

      <div className={`md:flex-1 md:min-h-0 ${isPdf ? "flex md:overflow-hidden" : "md:overflow-y-auto"}`}>
        {view === "rubric" && (
          <div className="max-w-2xl w-full mx-auto px-3 sm:px-4 pb-10">
            <Rubric rubric={rubric} alwaysEditable={false} />
          </div>
        )}

        {view === "analysis" && (
          <div className="max-w-2xl w-full mx-auto px-3 sm:px-4 py-6 pb-10">
            <ScoreCard
              resume={resume}
              rubric={rubric}
              sessionId={sessionId}
              onResumeScored={onResumeScored}
            />
          </div>
        )}

        {view === "jd" && (
          <iframe
            src={jdUrl}
            title="Job description"
            className="w-full flex-1 min-h-[70vh] bg-ivory"
          />
        )}

        {view === "resume" && (
          <iframe
            src={resumeUrl}
            title="resume"
            className="w-full flex-1 min-h-[70vh] bg-ivory"
          />
        )}
      </div>
    </section>
  );
}

function PanelSelect({
  value,
  onChange,
}: {
  value: ViewKey;
  onChange: (view: ViewKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = VIEW_OPTIONS.find((o) => o.key === value) ?? VIEW_OPTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-charcoal hover:border-charcoal-xlt transition-colors"
      >
        <CurrentIcon className="h-4 w-4 text-charcoal-lt" />
        {current.label}
        <ChevronDown className={`h-4 w-4 text-charcoal-lt transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 cursor-default"
            />
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15, ease }}
              className="absolute right-0 top-full z-40 mt-1.5 min-w-56 rounded-xl border border-line bg-white p-1.5 shadow-lg"
            >
              {VIEW_OPTIONS.map((opt) => {
                const OptIcon = opt.icon;
                const active = opt.key === value;
                return (
                  <li key={opt.key}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.key);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-left transition-colors ${
                        active
                          ? "bg-accent/10 text-accent font-semibold"
                          : "text-charcoal hover:bg-ivory-medium"
                      }`}
                    >
                      <OptIcon className="h-4 w-4 shrink-0" />
                      {opt.label}
                      {active && <Check className="h-3.5 w-3.5 ml-auto shrink-0" strokeWidth={3} />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
