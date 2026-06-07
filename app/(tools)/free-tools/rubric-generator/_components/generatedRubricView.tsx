"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Tag, Target } from "lucide-react";
import type { GeneratedRubric, ScreeningParameter } from "../../../types";

const ease = [0.22, 1, 0.36, 1] as const;

// One palette per category, applied in order. The generator always returns three
// categories (Technical Skills, Experience, Qualifications), but we wrap around
// defensively in case that ever changes.
const CATEGORY_COLORS = [
  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "#3B82F6", bar: "#3B82F6" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "#F59E0B", bar: "#F59E0B" },
  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "#8B5CF6", bar: "#8B5CF6" },
] as const;

/**
 * Read-only, nicely formatted view of a rubric returned by the generate endpoint.
 * Surfaces everything the API gives us — per-parameter weightage, must-have flags,
 * keyword hints, and the 1–5 rating guide — grouped by category.
 */
export default function GeneratedRubricView({ rubric }: { rubric: GeneratedRubric }) {
  const allParams = rubric.categories.flatMap((c) => c.screening_parameters);
  const mustHaves = allParams.filter((p) => p.is_non_negotiable).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
      className="space-y-4"
    >
      {/* Summary header — domain / seniority / threshold at a glance */}
      <div className="flex flex-wrap items-center gap-2">
        {rubric.domain && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1 text-xs font-medium text-charcoal-md">
            <Target className="h-3.5 w-3.5 text-accent" />
            {rubric.domain}
          </span>
        )}
        {rubric.seniority_level && (
          <span className="inline-flex items-center rounded-full border border-line bg-ivory px-3 py-1 text-xs font-medium text-charcoal-md">
            {rubric.seniority_level}
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Pass ≥ {rubric.threshold_score}%
        </span>
        {mustHaves > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            {mustHaves} must-have{mustHaves > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {rubric.categories.map((cat, catIdx) => {
          const color = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];
          const catWeight = cat.screening_parameters.reduce((s, p) => s + (p.weightage ?? 0), 0);
          return (
            <div key={`${cat.name}-${catIdx}`} className={`overflow-hidden rounded-2xl border ${color.border}`}>
              <div className={`flex items-center justify-between gap-3 px-4 py-3 sm:px-5 ${color.bg}`}>
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color.dot }} />
                  <h3 className={`truncate text-sm font-bold ${color.text}`}>{cat.name}</h3>
                </div>
                <span className={`shrink-0 text-xs font-bold tabular-nums ${color.text}`}>{catWeight}%</span>
              </div>

              <div className="grid grid-cols-1 items-start gap-3 bg-white p-3 sm:p-4 lg:grid-cols-2">
                {cat.screening_parameters.map((param, pIdx) => (
                  <ParameterCard key={`${param.name}-${pIdx}`} param={param} barColor={color.bar} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ParameterCard({ param, barColor }: { param: ScreeningParameter; barColor: string }) {
  const keywords = param.keywords
    ? param.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  return (
    <div
      className={`rounded-xl border p-3.5 ${
        param.is_non_negotiable ? "border-red-200 bg-red-50/40" : "border-line bg-ivory/40"
      }`}
    >
      {/* Name + weightage */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-charcoal">{param.name}</h4>
            {param.is_non_negotiable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
                <ShieldCheck className="h-3 w-3" />
                Must have
              </span>
            )}
          </div>
          {param.description && (
            <p className="mt-1 text-xs leading-relaxed text-charcoal-lt">{param.description}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="text-sm font-bold tabular-nums text-charcoal">{param.weightage}%</span>
          <span className="block text-[10px] font-medium text-charcoal-xlt">weight</span>
        </div>
      </div>

      {/* Weightage bar */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(param.weightage, 100)}%`, backgroundColor: barColor }}
        />
      </div>

      {/* Keyword chips */}
      {keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Tag className="h-3 w-3 shrink-0 text-charcoal-xlt" />
          {keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-medium text-charcoal-md"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Rating guide 1–5 */}
      {param.rating_guide?.length > 0 && (
        <div className="mt-3 rounded-lg border border-line bg-white p-2.5">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-charcoal-xlt">
            Rating guide
          </p>
          <ul className="space-y-1">
            {[...param.rating_guide]
              .sort((a, b) => a.score - b.score)
              .map((band) => (
                <li key={band.score} className="flex items-start gap-2">
                  <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded bg-charcoal text-[10px] font-bold text-white">
                    {band.score}
                  </span>
                  <span className="text-xs leading-snug text-charcoal-md">{band.guide}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
