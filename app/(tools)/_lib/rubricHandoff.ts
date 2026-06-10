// Hand-off of a generated job description from the JD generator to the rubric
// generator. The JD generator stashes its current draft here, then routes to
// /free-tools/rubric-generator?is_routed=true. The rubric page only reads this
// when that `is_routed` flag is present, so a fresh visit never picks it up.
//
// We deliberately do NOT clear it on read: the read is gated on the URL flag, so
// a reload (flag still in the URL) can re-read it and keep the box populated. A
// later generate overwrites it.
const HANDOFF_KEY = "hiresort:rubric-jd-handoff";

/** Stash a JD draft for the rubric generator to pick up after navigation. */
export function stashJdForRubric(jdText: string): void {
  if (typeof window === "undefined") return;
  const text = jdText.trim();
  try {
    if (text) window.localStorage.setItem(HANDOFF_KEY, text);
    else window.localStorage.removeItem(HANDOFF_KEY);
  } catch {
    // localStorage can throw (private mode / quota). A failed stash just means
    // the rubric page opens with an empty box — not worth surfacing.
  }
}

/** Read the stashed JD without clearing it. Returns "" when nothing was stashed. */
export function readStashedJd(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(HANDOFF_KEY) ?? "";
  } catch {
    return "";
  }
}
