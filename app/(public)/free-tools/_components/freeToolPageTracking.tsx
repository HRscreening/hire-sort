"use client";

import { useEffect } from "react";
import { AnalyticsEvent, useAnalytics } from "@/analytics";

export default function FreeToolPageTracking({
  tool,
  toolSlug,
}: {
  tool: string;
  toolSlug: string;
}) {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.track(AnalyticsEvent.FREE_TOOL_OPENED, {
      tool,
      tool_slug: toolSlug,
      source: "detail",
    });
  }, [analytics, tool, toolSlug]);

  return null;
}
