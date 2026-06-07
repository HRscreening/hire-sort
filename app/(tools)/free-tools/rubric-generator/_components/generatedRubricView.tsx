"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target } from "lucide-react";
import type { ReactNode } from "react";
import type { GeneratedRubric, ScreeningParameter } from "../../../types";

const ease = [0.22, 1, 0.36, 1] as const;

// One accent per category, applied in order. The generator returns three
// categories today (Technical Skills, Experience, Qualifications); we wrap around
// defensively in case that ever changes.
const CATEGORY_COLORS = [
  { dot: "#3B82F6", tint: "bg-blue-50/70", text: "text-blue-700", bar: "#3B82F6" },
  { dot: "#F59E0B", tint: "bg-amber-50/70", text: "text-amber-700", bar: "#F59E0B" },
  { dot: "#8B5CF6", tint: "bg-purple-50/70", text: "text-purple-700", bar: "#8B5CF6" },
] as const;

/**
 * Read-only view of a generated rubric, laid out as a spreadsheet-style table
 * that mirrors the downloaded Excel: one row per screening parameter, grouped
 * under a merged category cell, with description, weightage, keyword hints, and
 * the 1–5 rating guide as columns. Scrolls horizontally so the full table stays
 * usable on narrow viewports.
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

      {/* Spreadsheet-style table — mirrors the downloadable Excel layout.
          Scrolls horizontally inside this wrapper so narrow viewports keep
          the full column set instead of crushing them. */}
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-230 border-separate border-spacing-0 text-left align-top">
          <colgroup>
            <col className="w-36" />
            <col className="w-40" />
            <col className="w-60" />
            <col className="w-24" />
            <col className="w-56" />
            <col className="w-80" />
          </colgroup>
          <thead>
            <tr>
              <Th first>Screening category</Th>
              <Th>Screening parameter</Th>
              <Th>Description</Th>
              <Th className="text-center">Weightage</Th>
              <Th>Keywords / what to search for</Th>
              <Th last>Rating guide</Th>
            </tr>
          </thead>
          <tbody>
            {rubric.categories.map((cat, catIdx) => {
              const color = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];
              return cat.screening_parameters.map((param, pIdx) => (
                <tr key={`${cat.name}-${catIdx}-${param.name}-${pIdx}`}>
                  {/* Merged category cell — only on the first parameter row */}
                  {pIdx === 0 && (
                    <td
                      rowSpan={cat.screening_parameters.length}
                      className={`border-b border-line px-3 py-3 align-top ${color.tint}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: color.dot }}
                        />
                        <span className={`text-xs font-bold ${color.text}`}>{cat.name}</span>
                      </div>
                    </td>
                  )}
                  <ParameterRow param={param} barColor={color.bar} />
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// The five per-parameter cells (everything to the right of the category column).
function ParameterRow({ param, barColor }: { param: ScreeningParameter; barColor: string }) {
  const keywords = param.keywords
    ? param.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];
  const bands = [...(param.rating_guide ?? [])].sort((a, b) => a.score - b.score);

  return (
    <>
      {/* Screening parameter */}
      <Td>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-charcoal">{param.name}</span>
          {param.is_non_negotiable && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
              <ShieldCheck className="h-3 w-3" />
              Must have
            </span>
          )}
        </div>
      </Td>

      {/* Description */}
      <Td>
        <p className="text-xs leading-relaxed text-charcoal-md">{param.description || "—"}</p>
      </Td>

      {/* Weightage */}
      <Td className="text-center">
        <span className="text-sm font-bold tabular-nums text-charcoal">{param.weightage}%</span>
        <div className="mx-auto mt-1.5 h-1.5 w-12 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(param.weightage, 100)}%`, backgroundColor: barColor }}
          />
        </div>
      </Td>

      {/* Keywords / what to search for */}
      <Td>
        {keywords.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-medium text-charcoal-md"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-charcoal-xlt">—</span>
        )}
      </Td>

      {/* Rating guide 1–5 */}
      <Td>
        {bands.length > 0 ? (
          <ul className="space-y-1">
            {bands.map((band) => (
              <li key={band.score} className="flex items-start gap-2">
                <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded bg-charcoal text-[10px] font-bold text-white">
                  {band.score}
                </span>
                <span className="text-xs leading-snug text-charcoal-md">{band.guide}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-xs text-charcoal-xlt">—</span>
        )}
      </Td>
    </>
  );
}

// Header cell — styled like the Excel header. Internal columns get a left
// divider; the outer frame comes from the wrapper.
function Th({
  children,
  className = "",
  first = false,
  last = false,
}: {
  children: ReactNode;
  className?: string;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <th
      className={`border-b border-line bg-charcoal px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white ${
        first ? "rounded-tl-xl" : "border-l border-line"
      } ${last ? "rounded-tr-xl" : ""} ${className}`}
    >
      {children}
    </th>
  );
}

// Body cell — shared borders/padding so the grid reads like a spreadsheet.
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`border-b border-l border-line bg-white px-3 py-3 align-top ${className}`}>{children}</td>;
}
