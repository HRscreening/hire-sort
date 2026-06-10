"use client";

import { motion } from "framer-motion";
import { ArrowRight, ScanLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Mirrors the Navbar / LoginCtaBar: the product app lives on a separate host, and
// a logged-in visitor carries an `hs_auth=1` cookie. Non-authed visitors get the
// /login page (which is also where signup lives).
const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || "https://app.hiresort.ai";

type StartScreeningCtaProps = {
  /** Button copy. */
  label?: string;
  /**
   * Position classes for the fixed wrapper. When provided, these replace the
   * default bottom-right offset entirely (e.g. to lift the button above a
   * page's sticky action bar).
   */
  className?: string;
};

/**
 * A floating, gently bobbing "Start screening now" button pinned to the
 * bottom-right of a tool result page. The constant up/down motion is the nudge:
 * once a visitor has a result in hand, this tempts them into the full product.
 *
 * Self-contained (no required props) — drop <StartScreeningCta /> onto any page
 * that shows API results. Sits below the Toast (z-50) so notices stay on top.
 */
export default function StartScreeningCta({
  label = "Start screening now",
  className = "",
}: StartScreeningCtaProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Pause the bob while hovered so the button is easy to click.
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.split("; ").some((c) => c === "hs_auth=1"));
  }, []);

  const href = isLoggedIn ? MAIN_APP_URL : `${MAIN_APP_URL}/login`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease, delay: 0.3 }}
      className={`fixed z-40 ${className || "bottom-5 right-5 sm:bottom-6 sm:right-6"}`}
    >
      <motion.div
        animate={hovered ? { y: 0 } : { y: [0, -7, 0] }}
        transition={
          hovered
            ? { duration: 0.2, ease }
            : { duration: 1.8, ease: "easeInOut", repeat: Infinity }
        }
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2.5 text-[13px] font-semibold text-white no-underline shadow-md ring-1 ring-white/10 transition-colors hover:bg-copper-light"
        >
          {/* Soft accent glow to draw the eye without a heavy halo */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-accent/40 blur-md"
            animate={{ opacity: [0.45, 0.15, 0.45] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
          <ScanLine className="h-3.5 w-3.5" />
          {label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
