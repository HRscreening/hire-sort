export type PlanType = "FREE" | "PRO" | "BUSINESS" | "ENTERPRISE" | "PLUS" | "UNLIMITED";

export interface PlanSpec {
  key: PlanType;
  display_name: string;
  /** Absent on ENTERPRISE, which is custom-priced and sold as contact-sales. */
  price_monthly_usd?: number;
  yearly_price_monthly_usd?: number;
  price_monthly_inr?: number;
  price_label: string;
  yearly_price_label: string;
  razorpay_amount_paise: number;
  max_resumes_per_month: number;
  max_batch_size: number;
  /** "Active roles": live screenings held at once, not a monthly allowance. */
  max_screenings: number;
  /** Voice screening calls per allowance period. */
  max_voice_calls_per_month: number;
  /** AI job-description generations per allowance period. */
  max_jd_creations_per_month: number;
  /** Simultaneous live voice calls, not a monthly quota. */
  max_concurrent_calls: number;
  data_retention_days: number;
  /**
   * "lifetime" for the Free trial (allowances are totals that never refill)
   * or "monthly" for paid plans (reset each calendar month, no rollover).
   * The backend derives display_features from this, so never restate the
   * cadence in the UI — render the feature strings verbatim.
   */
  quota_period: "lifetime" | "monthly";
  scoring_models: string[];
  export_formats: string[];
  api_access: boolean;
  display_features: string[];
}

export interface PlansResponse {
  plans: PlanSpec[];
}
