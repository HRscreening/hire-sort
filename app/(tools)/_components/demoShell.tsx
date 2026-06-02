"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const TAGLINES = [
  "Turn any job description into a defensible screening rubric — then score resumes against the criteria that actually matter.",
  "Edit weights, mark non-negotiables, and watch candidates re-rank in real time.",
];

const HIGHLIGHTS: Record<1 | 2, string[]> = {
  1: [
    "Drop a PDF or paste plain text",
    "AI extracts categories & weights",
    "Editable rubric in seconds",
  ],
  2: [
    "Tune category weights with sliders",
    "Flag must-haves & external signals",
    "Continue when the rubric feels right",
  ],
};

type DemoShellProps = {
  step: 1 | 2;
  totalSteps?: number;
  wide?: boolean;
  children: ReactNode;
};

export default function DemoShell({ step, totalSteps = 2, wide = false, children }: DemoShellProps) {
  const tagline = TAGLINES[step - 1] ?? TAGLINES[0];
  const highlights = HIGHLIGHTS[step] ?? HIGHLIGHTS[1];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F5F3EE]">
      {/* Left — dark panel */}
      <aside className="relative md:w-5/12 md:min-h-screen bg-[#0F0F0F] text-white hidden md:flex flex-col px-6 sm:px-10 py-6 md:py-10 overflow-hidden">
        {/* Subtle accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #C85A17 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #C85A17 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <Link href="/" className="relative inline-flex items-center gap-2.5 w-fit group">
          <div className="h-8 w-8 overflow-hidden bg-white/5  group-hover:ring-white/20 transition">
            <Image src="/logo.png" alt="HireSort" width={32} height={32} className="h-full w-full object-cover" />
          </div>
          <span className="text-base font-bold tracking-tight">HireSort</span>
        </Link>

        {/* Centered: tagline + highlights */}
        <div className="relative flex-1 flex items-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              >
                <p className="text-lg sm:text-xl leading-snug font-medium text-white/90 max-w-md">
                  &ldquo;{tagline}&rdquo;
                </p>

                <ul className="mt-8 space-y-3 max-w-md">
                  {highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4, ease, delay: 0.1 + i * 0.08 },
                      }}
                      className="flex items-start gap-2.5 text-sm text-white/70"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C85A17]/15 ring-1 ring-[#C85A17]/30 shrink-0">
                        <Check className="h-2.5 w-2.5 text-[#E87A3A]" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Step dots */}
        <div className="relative mt-6 flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const isActive = i === step - 1;
            return (
              <motion.span
                key={i}
                animate={{ width: isActive ? 28 : 6, opacity: isActive ? 1 : 0.35 }}
                transition={{ duration: 0.3, ease }}
                className="h-1.5 rounded-full bg-white"
              />
            );
          })}
          <span className="ml-3 text-xs text-white/50">
            Step {step} of {totalSteps}
          </span>
        </div>

        <p className="relative mt-6 text-xs text-white/40">© {new Date().getFullYear()} HireSort</p>
      </aside>

      {/* Right — content */}
      <main className="relative flex-1 md:w-7/12 md:min-h-screen md:max-h-screen md:overflow-y-auto">
        {wide ? (
          children
        ) : (
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 md:py-16">{children}</div>
        )}
      </main>
    </div>
  );
}
