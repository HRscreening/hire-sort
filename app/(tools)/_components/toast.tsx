"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Lock, X } from "lucide-react";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Two flavours: a generic "something went wrong" error, and a softer "you've hit
// the free limit" notice that also surfaces when the quota resets.
export interface ToastData {
  message: string;
  variant: "error" | "limit";
  resetLabel?: string | null;
}

/**
 * A single fixed top-right toast. Renders nothing when `toast` is null and
 * animates in from the right when one appears. Auto-dismisses after a delay
 * (limit notices linger a little longer so the reset time can be read), and can
 * be closed early via the × button.
 */
export default function Toast({
  toast,
  onClose,
  duration = 6000,
}: {
  toast: ToastData | null;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!toast) return;
    const ms = toast.variant === "limit" ? 10000 : duration;
    const id = setTimeout(onClose, ms);
    return () => clearTimeout(id);
  }, [toast, duration, onClose]);

  const isLimit = toast?.variant === "limit";

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col sm:right-6 sm:top-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            // Key on the message so a new error re-triggers the entrance animation.
            key={toast.message}
            role="alert"
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 32, scale: 0.96 }}
            transition={{ duration: 0.28, ease }}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${
              isLimit
                ? "border-amber-200 bg-amber-50/95 text-amber-800"
                : "border-red-200 bg-red-50/95 text-red-700"
            }`}
          >
            {isLimit ? (
              <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <div className="min-w-0 flex-1 text-sm leading-snug">
              <p className="font-semibold">{isLimit ? "Free limit reached" : "Couldn't generate"}</p>
              <p className="mt-0.5 opacity-90">
                {toast.message}
                {isLimit && toast.resetLabel && <> Your free generations reset on {toast.resetLabel}.</>}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="-mr-1 shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
