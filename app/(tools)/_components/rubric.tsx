"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { RubricCategory, Subcategory, Rubric } from "../types";
import { truncate } from "../utils";

const CATEGORY_COLORS = [
    { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "#3B82F6" },
    { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "#F59E0B" },
    { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "#8B5CF6" },
];

const IMPORTANCE_LABELS = ["Low", "Moderate", "Standard", "Important", "Critical"] as const;


type EditRubricProps = {
    rubric: Rubric | null;
    alwaysEditable?: boolean;

    onWeightChange?: (totalWeight: number) => void;
    onDraftChange?: (categories: RubricCategory[]) => void;
}

export default function EditRubric({ rubric, alwaysEditable = false, onWeightChange, onDraftChange }: EditRubricProps) {

    if (!rubric) {
        return (
            <div className="p-8 flex items-center justify-center min-h-96">
                <div className="text-sm text-[#737373]">No rubric found. Please create a rubric to get started.</div>
            </div>
        );
    }

    const initialCategories = useMemo<RubricCategory[]>(
        () => ((rubric as Rubric | null)?.categories ?? []),
        [rubric],
    );

    const [isLoading, setIsLoading] = useState(false);

    const [draft, setDraft] = useState<RubricCategory[]>([]);
    const [hydrated, setHydrated] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);

    // Hydrate draft once on first load. Avoid clobbering local edits if the
    // background screening refetch returns identical categories.
    useEffect(() => {
        if (!hydrated && initialCategories.length > 0) {
            setDraft(deepClone(initialCategories));
            setHydrated(true);
        }
    }, [hydrated, initialCategories]);

    const totalWeight = draft.reduce((s, c) => s + c.weight, 0);
    const dirty = JSON.stringify(draft) !== JSON.stringify(initialCategories);
    const hasEmptySubName = draft.some((c) => c.subcategories.some((s) => !s.name.trim()));
    const canSave = dirty && totalWeight === 100 && !hasEmptySubName && !saving;

    useEffect(() => {
        onWeightChange?.(totalWeight);
    }, [totalWeight, onWeightChange]);

    useEffect(() => {
        if (hydrated) onDraftChange?.(draft);
    }, [draft, hydrated, onDraftChange]);

    function updateCategoryWeight(catIdx: number, weight: number) {
        setDraft((prev) => prev.map((c, i) => (i === catIdx ? { ...c, weight } : c)));
    }

    function updateSub(catIdx: number, subIdx: number, updates: Partial<Subcategory>) {
        setDraft((prev) =>
            prev.map((cat, ci) => {
                if (ci !== catIdx) return cat;
                const subs = cat.subcategories.map((s, si) => (si === subIdx ? { ...s, ...updates } : s));
                return { ...cat, subcategories: subs };
            }),
        );
    }

    function removeSub(catIdx: number, subIdx: number) {
        setDraft((prev) =>
            prev.map((cat, ci) => {
                if (ci !== catIdx) return cat;
                return { ...cat, subcategories: cat.subcategories.filter((_, si) => si !== subIdx) };
            }),
        );
    }

    function addSub(catIdx: number) {
        setDraft((prev) =>
            prev.map((cat, ci) => {
                if (ci !== catIdx) return cat;
                if (cat.subcategories.length >= 5) return cat;
                return {
                    ...cat,
                    subcategories: [...cat.subcategories, { name: "", weight: 3, description: "" }],
                };
            }),
        );
    }

    async function handleConfirm() {
        if (!canSave) return;
        setSaving(true);
        setError(null);
        try {
            const existing = (rubric as Rubric | null) ?? {
                threshold_score: 0,
                source: "MANUAL" as const,
                categories: [],
            };
            const nextRubric: Rubric = {
                ...existing,
                categories: draft,
                // Original AI rubric edited by the user becomes COMBINED;
                // a from-scratch manual rubric stays MANUAL.
                source: existing.source === "AI" ? "COMBINED" : existing.source,
            };

            //   await updateRubric(id, nextRubric);
        }
        catch (err) {
            console.error("Failed to save rubric", err);
            setError("Failed to save rubric. Please try again.");
        }
        finally {
            setSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-96">
                <div className="h-6 w-6 rounded-full border-2 border-[#0F0F0F] border-t-transparent animate-spin" />
            </div>
        );
    }

    const weightStatus: "ok" | "over" | "under" =
        totalWeight === 100 ? "ok" : totalWeight > 100 ? "over" : "under";

    return (
        <div className="pt-6">
            {rubric?.domain && (
                <div className="mb-4 text-xs text-[#737373]">
                    <span className="font-medium text-[#404040]">{truncate(rubric.domain, 60)}</span>
                </div>
            )}

            {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            {/* Weight total banner */}
            {draft.length > 0 && (
                <div
                    className={`mb-4 flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm ${weightStatus === "ok"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : weightStatus === "over"
                                ? "bg-red-50 border-red-200 text-red-700"
                                : "bg-amber-50 border-amber-200 text-amber-800"
                        }`}
                >
                    <span className="font-medium">
                        {weightStatus === "ok"
                            ? "Category weights total 100%."
                            : weightStatus === "over"
                                ? `Category weights exceed 100% (currently ${totalWeight}%). Reduce some sliders to continue.`
                                : `Category weights total only ${totalWeight}%. Adjust to reach 100%.`}
                    </span>
                    <span className="text-xs font-bold tabular-nums shrink-0">{totalWeight}%</span>
                </div>
            )}

            {/* Categories */}
            <fieldset disabled={!editing && !alwaysEditable} className="space-y-4 disabled:opacity-90">
                {draft.map((cat, catIdx) => {
                    const color = CATEGORY_COLORS[catIdx] ?? CATEGORY_COLORS[0];
                    return (
                        <div key={`${cat.name}-${catIdx}`} className={`rounded-2xl border-2 overflow-hidden ${color.border}`}>
                            <div className={`px-4 sm:px-5 py-4 ${color.bg} flex flex-wrap items-center justify-between gap-3`}>
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color.dot }} />
                                    <h3 className={`text-sm font-bold ${color.text} truncate`}>{cat.name}</h3>
                                </div>
                                <div className="flex items-center gap-2.5 min-w-45 w-full sm:w-auto">
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={cat.weight}
                                        onChange={(e) => updateCategoryWeight(catIdx, Number(e.target.value))}
                                        className="weight-slider flex-1"
                                        style={{ background: `linear-gradient(to right, #0F0F0F ${cat.weight}%, #E8E5DF ${cat.weight}%)` }}
                                    />
                                    <span className="text-sm font-bold text-[#0F0F0F] w-10 text-right">{cat.weight}%</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 space-y-3">
                                {cat.subcategories.length === 0 && (
                                    <p className="text-xs text-[#A0A0A0] text-center py-3">No subcategories. Click below to add one.</p>
                                )}

                                {cat.subcategories.map((sub, subIdx) => (
                                    <div
                                        key={subIdx}
                                        className={`rounded-xl p-3.5 border ${sub.is_non_negotiable ? "border-red-300 bg-red-50/40" : "border-[#E8E5DF]"}`}
                                    >
                                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                                            <button
                                                type="button"
                                                onClick={() => updateSub(catIdx, subIdx, { is_non_negotiable: !sub.is_non_negotiable })}
                                                className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border transition-colors ${sub.is_non_negotiable
                                                    ? "bg-red-100 text-red-700 border-red-200"
                                                    : "bg-white text-[#A0A0A0] border-[#E8E5DF] hover:border-red-200 hover:text-red-600"
                                                    }`}
                                            >
                                                Must Have
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => updateSub(catIdx, subIdx, { is_external_context: !sub.is_external_context })}
                                                className={`text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border transition-colors ${sub.is_external_context
                                                    ? "bg-blue-50 text-blue-600 border-blue-200"
                                                    : "bg-white text-[#A0A0A0] border-[#E8E5DF] hover:border-blue-200 hover:text-blue-600"
                                                    }`}
                                            >
                                                External Signal
                                            </button>
                                        </div>
                                        {/* Mobile: stack inputs / controls vertically so the name
                        input gets full row width. sm+ keeps the side-by-side
                        layout. */}
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
                                            <div className="flex-1 min-w-0 space-y-2">
                                                <input
                                                    type="text"
                                                    value={sub.name}
                                                    onChange={(e) => updateSub(catIdx, subIdx, { name: e.target.value })}
                                                    placeholder="Subcategory name"
                                                    disabled={sub.is_external_context}
                                                    className="w-full text-sm font-medium text-[#0F0F0F] bg-white border border-[#E8E5DF] rounded-md px-2.5 py-1.5 hover:border-[#A0A0A0] focus:border-[#C85A17] focus:ring-1 focus:ring-[#C85A17]/20 focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                                                />
                                                {/* Multi-line so long descriptions wrap rather than
                            being clipped on narrow viewports — single-line
                            <input> truncated values like 'Hands-on experience
                            with Docker, K…' on a 320 px screen. */}
                                                <AutoTextarea
                                                    value={sub.description}
                                                    onChange={(value) => updateSub(catIdx, subIdx, { description: value })}
                                                    placeholder="Brief description of what to evaluate..."
                                                    className="w-full text-xs text-[#737373] bg-white border border-[#E8E5DF] rounded-md px-2.5 py-1.5 hover:border-[#A0A0A0] focus:border-[#C85A17] focus:ring-1 focus:ring-[#C85A17]/20 focus:outline-none transition-colors resize-none overflow-hidden"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between gap-2 sm:justify-end sm:shrink-0">
                                                <div className="flex flex-col items-start sm:items-end gap-1">
                                                    <div className="flex items-center gap-1">
                                                        {([1, 2, 3, 4, 5] as const).map((lvl) => (
                                                            <button
                                                                key={lvl}
                                                                type="button"
                                                                onClick={() => updateSub(catIdx, subIdx, { weight: lvl })}
                                                                title={IMPORTANCE_LABELS[lvl - 1]}
                                                                className={`h-7 w-7 sm:h-6 sm:w-6 rounded-md text-xs font-bold transition-colors ${lvl <= sub.weight
                                                                    ? "bg-[#0F0F0F] text-white"
                                                                    : "bg-[#F0EDE8] text-[#A0A0A0] hover:bg-[#E8E5DF]"
                                                                    }`}
                                                            >
                                                                {lvl}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] text-[#A0A0A0] font-medium">
                                                        {IMPORTANCE_LABELS[sub.weight - 1] ?? ""}
                                                    </span>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {cat.subcategories.length < 5 ? (
                                    <button
                                        onClick={() => addSub(catIdx)}
                                        className="w-full mt-1 rounded-xl border border-dashed border-[#D4D4D4] hover:border-[#0F0F0F] hover:bg-[#FAFAF7] py-3 text-sm text-[#737373] hover:text-[#0F0F0F] flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                            <path d="M6 1v10M1 6h10" />
                                        </svg>
                                        Add subcategory
                                    </button>
                                ) : (
                                    <p className="text-xs text-[#A0A0A0] text-center pt-1">Maximum 5 subcategories per category</p>
                                )}
                                <p className="text-xs text-[#A0A0A0] text-right pt-0.5">Importance is normalised during scoring</p>
                            </div>
                        </div>
                    );
                })}
            </fieldset>


        </div>
    );
}

function AutoTextarea({
    value,
    onChange,
    placeholder,
    className,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className={className}
        />
    );
}

function deepClone(categories: RubricCategory[]): RubricCategory[] {
    return categories.map((c) => ({
        ...c,
        subcategories: c.subcategories.map((s) => ({ ...s })),
    }));
}
