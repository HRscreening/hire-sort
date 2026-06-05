"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Mirrors the Navbar: the product app lives on a separate host, and a logged-in
// visitor carries an `hs_auth=1` cookie. Non-authed visitors get the /login page.
const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || "https://app.hiresort.ai";

type LoginCtaBarProps = {
  /** Centered nudge text — single line, truncates on small screens. */
  text?: string;
  /** Extra classes for the outer bar (e.g. to tweak borders per page). */
  className?: string;
};

/**
 * Standalone sticky top bar for the tool result pages: HireSort logo on the
 * left, a sign-in nudge centered, and the primary action pinned to the right.
 * Self-contained (no required props) so any tool page can drop in <LoginCtaBar />.
 */
export default function LoginCtaBar({
  text = "Screen smarter — save your rubrics, score resumes in bulk, and rank your whole pipeline.",
  className = "",
}: LoginCtaBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.split("; ").some((c) => c === "hs_auth=1"));
  }, []);

  const href = isLoggedIn ? MAIN_APP_URL : `${MAIN_APP_URL}/login`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
      className={`sticky top-0 z-20 h-14 shrink-0 border-b border-line bg-white/95 backdrop-blur-md ${className}`}
    >
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6">
        {/* Left — logo */}
        <Link href="/" aria-label="HireSort — home" className="flex items-center gap-2 no-underline">
          <Image src="/logo.png" alt="" width={28} height={28} sizes="28px" className="h-7 w-7" />
          <span className="hidden text-base font-bold tracking-tight text-charcoal sm:inline">
            HireSort
          </span>
        </Link>

        {/* Middle — nudge text */}
        <p className="hidden truncate text-center text-sm font-semibold text-charcoal sm:block">
          {text}
        </p>

        {/* Right — sign in */}
        <Link
          href={href}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-charcoal px-4 text-[13px] font-semibold text-ivory no-underline transition-colors hover:bg-accent sm:px-5"
        >
          {isLoggedIn ? "Go to dashboard" : "Log in"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.header>
  );
}
