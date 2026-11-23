export type PlanType = "FREE" | "LITE" | "PRO" | "BUSINESS" | "ENTERPRISE" | "PLUS" | "UNLIMITED";

export interface PlanSpec {
  key: PlanType;
  display_name: string;
  /** Absent on ENTERPRISE, which is custom-priced and sold as contact-sales. */
  price_monthly_usd?: number;
  yearly_price_monthly_usd?: number;
  credit_limit: number;
  price_label: string;
  yearly_price_label: string;
  display_features: string[];
}

export interface PlansResponse {
  plans: PlanSpec[];
}
