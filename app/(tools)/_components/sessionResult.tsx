"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  createToolApi,
  demoErrorView,
  type SessionPayload,
  type ToolConfig,
} from "../_lib/api";
import type { ScoredResume } from "../types";
import LoginCtaBar from "./loginCtaBar";
import DemoPageView from "./panelView";

const ease = [0.22, 1, 0.36, 1] as const;

type SessionResultProps = {
  sessionID: string;
  config: ToolConfig;
};

export default function SessionResult({ sessionID, config }: SessionResultProps) {
  const api = useMemo(() => createToolApi(config), [config]);

  const [data, setData] = useState<SessionPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .getSession(sessionID)
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error(e);
        setError(demoErrorView(e).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [api, sessionID]);

  const handleResumeScored = useCallback((resume: ScoredResume) => {
    setData((prev) => (prev ? { ...prev, resume } : prev));
  }, []);

  if (error && !loading) {
    return <SessionNotFound message={error} restartHref={config.resultBase} />;
  }

  if (loading || !data) {
    return <SessionLoading message="Loading your session" />;
  }

  return (
    // --header-top lets the panels' sticky sub-headers tuck below the bar on
    // mobile (where the whole page scrolls) instead of colliding at top:0.
    <div
      className="w-full flex flex-col md:h-screen md:overflow-hidden bg-ivory"
      style={{ "--header-top": "3.5rem" } as CSSProperties}
    >
      <LoginCtaBar />
      <DemoPageView
        rubric={data.rubric}
        resume={data.resume}
        sessionId={sessionID}
        onResumeScored={handleResumeScored}
        jdUrl={data.urls?.jd_url}
        resumeUrl={data.urls?.resume_url}
      />
    </div>
  );
}

function SessionLoading({ message }: { message: string }) {
  return (
    <div className="min-h-screen w-full bg-[#F5F3EE] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <div className="relative h-20 w-20 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#E8E5DF]" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#C85A17", borderRightColor: "#C85A17" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              className="h-10 w-10 rounded-2xl bg-[#0F0F0F] flex items-center justify-center"
            >
              <FileText className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </div>
        <h2 className="text-lg font-bold text-[#0F0F0F] tracking-tight">{message}</h2>
        <p className="text-xs text-[#737373] mt-1.5">Pulling rubric and any prior resume…</p>
      </motion.div>
    </div>
  );
}

function SessionNotFound({ message, restartHref }: { message: string; restartHref: string }) {
  return (
    <div className="min-h-screen w-full bg-[#F5F3EE] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <div className="h-14 w-14 rounded-2xl bg-[#0F0F0F] flex items-center justify-center mb-5">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-lg font-bold text-[#0F0F0F] tracking-tight">Session unavailable</h2>
        <p className="text-sm text-[#737373] mt-2">{message}</p>
        <Link
          href={restartHref}
          className="mt-6 inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#C85A17] text-white text-sm font-semibold hover:bg-[#A84A12] transition-colors"
        >
          Start over
        </Link>
      </motion.div>
    </div>
  );
}
