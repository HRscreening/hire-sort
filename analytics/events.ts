export const AnalyticsEvent = {
  FREE_TOOL_OPENED: "free_tool_opened",
  FREE_TOOL_CTA_CLICKED: "free_tool_cta_clicked",
  FREE_TOOL_GENERATED: "free_tool_generated",
  FREE_TOOL_DOWNLOADED: "free_tool_downloaded",
  FREE_TOOL_ERROR_SEEN: "free_tool_error_seen",
  JD_INPUT_MODE_CHANGED: "jd_input_mode_changed",
} as const;

export type AnalyticsEventName =
  typeof AnalyticsEvent[keyof typeof AnalyticsEvent];

export interface AnalyticsEventProperties {
  free_tool_opened: {
    tool: string;
    tool_slug: string;
    source: "nav" | "hub" | "detail" | "footer" | "direct";
  };
  free_tool_cta_clicked: {
    tool: string;
    tool_slug: string;
    cta: "primary" | "secondary";
    source: "hub" | "detail" | "footer" | "tool";
  };
  free_tool_generated: {
    tool: string;
    tool_slug: string;
    input_mode: "paste" | "upload" | "form" | "text" | "sample" | "mixed";
    source?: "tool" | "detail";
  };
  free_tool_downloaded: {
    tool: string;
    tool_slug: string;
    format: "pdf" | "excel" | "csv";
  };
  free_tool_error_seen: {
    tool: string;
    tool_slug: string;
    error_type: "limit" | "validation" | "network" | "unknown";
  };
  jd_input_mode_changed: { mode: "paste" | "upload" };
}
