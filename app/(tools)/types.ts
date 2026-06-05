// ─── Rubric ──────────────────────────────────────────────────────────────────

export interface Subcategory {
  name: string;
  weight: number; // 1–5 importance (1=low, 5=critical); normalised to weights during scoring
  description: string;
  is_non_negotiable?: boolean;
  is_external_context?: boolean;
}

export interface RubricCategory {
  name: string;
  weight: number; // 0–100, of overall
  subcategories: Subcategory[];
}

export interface Rubric {
  categories: RubricCategory[];
  threshold_score: number;
  source: "AI" | "MANUAL" | "COMBINED";
  domain?: string;
  seniority_level?: string;
}

// ─── Scored Resume ───────────────────────────────────────────────────────────

export type BreakdownItem = {
  criterion: string;
  /** Rubric category this criterion rolls up into (server-labelled). */
  category?: string;
  score: number;
  confidence: "high" | "medium" | "low";
  evidence: string[];
  explanation: string;
};

/** Server-computed average score (0–10) for one rubric category. */
export type CategoryScore = {
  category: string;
  avg_score: number;
  criteria_count: number;
};

export type ScoredResume = {
  original_filename: string;
  candidate_name?: string;
  candidate_email?: string;
  candidate_phone?: string;
  candidate_current_job?: string;
  /** Per-category averages from the server. Absent on older/sample payloads. */
  category_scores?: CategoryScore[];
  score: {
    overall_score: number;
    rank?: number | null;
    breakdown: BreakdownItem[];
    strengths?: string[];
    missing_elements?: string[];
    overall_summary?: string;
    created_at: string;
  };
};