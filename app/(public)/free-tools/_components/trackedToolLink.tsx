"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AnalyticsEvent, useAnalytics } from "@/analytics";

type Props = {
  href: string;
  tool: string;
  toolSlug: string;
  cta: "primary" | "secondary";
  source: "hub" | "detail";
  className: string;
  children: ReactNode;
  external?: boolean;
};

function downloadFormat(href: string): "pdf" | "excel" | "csv" | null {
  const path = href.split(/[?#]/, 1)[0].toLowerCase();
  if (path.endsWith(".pdf")) return "pdf";
  if (path.endsWith(".xlsx") || path.endsWith(".xls")) return "excel";
  if (path.endsWith(".csv")) return "csv";
  return null;
}

export default function TrackedToolLink({
  href,
  tool,
  toolSlug,
  cta,
  source,
  className,
  children,
  external = false,
}: Props) {
  const analytics = useAnalytics();

  function handleClick() {
    analytics.track(AnalyticsEvent.FREE_TOOL_CTA_CLICKED, {
      tool,
      tool_slug: toolSlug,
      cta,
      source,
    });

    const format = downloadFormat(href);
    if (format) {
      analytics.track(AnalyticsEvent.FREE_TOOL_DOWNLOADED, {
        tool,
        tool_slug: toolSlug,
        format,
      });
    }
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
