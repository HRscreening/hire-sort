# SEO Audit — Change Log

Branch: `seo-audit-fixes`
Source audit: `../hiresort-app/hiresort-seo-audit.md` (Score 68/100, 2026-05-22)

Each entry records what changed, what it was before, what it is now, and why.

---

## 2026-05-22 — Change #1: Homepage title retitled (conservative)

**File:** `app/page.tsx`
**Audit reference:** Critical #1 — page-type mismatch + cannibalization for "AI resume screening software".

### Before
```ts
title: {
  absolute: 'AI Resume Screening Software for Faster Candidate Shortlisting | HireSort',
},
openGraph: {
  title: 'AI Resume Screening Software | HireSort',
  // ...
},
twitter: {
  title: 'AI Resume Screening Software | HireSort',
  // ...
},
```

### After
```ts
title: {
  absolute: 'HireSort: AI Resume Screening Built for Speed and Compliance',
},
openGraph: {
  title: 'HireSort: AI Resume Screening Built for Speed and Compliance',
  // ...
},
twitter: {
  title: 'HireSort: AI Resume Screening Built for Speed and Compliance',
  // ...
},
```

### Why
The previous title led with the exact research keyword "AI Resume Screening Software". Every top-10 SERP slot for that query is a 5,000–8,500 word listicle/buyer's guide — a product homepage cannot rank for it. The page-targeting that title implied was unwinnable, and it actively competed with `/resources/best/ai-resume-screening-software` and `/blog/best-ai-resume-screening-software` for the same query (3-way cannibalization).

The new title leads with the brand (navigational intent) and reframes the keyword as a product positioning statement ("Built for Speed and Compliance"). This:
- Stops the homepage from competing for the listicle keyword
- Keeps the keyword present so brand+keyword and brand-only searches still match
- Adds two product differentiators (speed, compliance) that the resources guide can later cite

OG and Twitter titles updated to match so social previews are consistent.

### Scope kept narrow
- `app/layout.tsx` `title.default` was **not** touched. It's the site-wide fallback used only when a page sets no title; the homepage overrides it via `absolute:`, and every other public route sets its own metadata. Changing it would alter fallback titles for error pages and any future routes without metadata — a separate decision.
- `description` lines were **not** touched. They still describe the product accurately; rewriting them is a separate optimization (Change #N later).
- No content/layout changes on the page itself.

### Verification
- Local dev server `http://localhost:3001/` returns 200 with the new `<title>` after reload.
- `next build` not yet run — will validate before merge.

### Amendment (same session)
Initial draft used an em-dash (`—`) between brand and tagline. Replaced with colon (`:`) per user preference. Final title across all three meta locations:

`HireSort: AI Resume Screening Built for Speed and Compliance`

---

## 2026-05-22 — Change #2: 301-equivalent redirect `/blog/best-ai-resume-screening-software` → `/resources/best/ai-resume-screening-software` + delete orphaned source

**Files:**
- `next.config.ts` — added `redirects()` block
- `app/(public)/blog/_lib/posts/best-ai-resume-screening-software.json` — deleted

**Audit reference:** Critical #1 — page-type mismatch + cannibalization for "AI resume screening software". This is the second of three sub-tasks; Change #1 handled the homepage retitle.

### Before
- `next.config.ts` had no `redirects()` function. Visits to `/blog/best-ai-resume-screening-software` returned the thin 850-word blog post (rendered via `app/(public)/blog/[slug]/page.tsx` reading `app/(public)/blog/_lib/posts/best-ai-resume-screening-software.json`).
- `app/sitemap.ts` enumerated both `/blog/best-ai-resume-screening-software` and `/resources/best/ai-resume-screening-software`, indexing two URLs targeting the same query.

### After
- `next.config.ts` now contains:
  ```ts
  async redirects() {
    return [
      {
        source: '/blog/best-ai-resume-screening-software',
        destination: '/resources/best/ai-resume-screening-software',
        permanent: true,
      },
    ];
  },
  ```
- The blog JSON file is removed. `getAllPosts()` no longer enumerates the slug, so sitemap drops it automatically and `generateStaticParams()` stops pre-rendering it.

### Why
The two pages targeted near-identical intent ("best AI resume screening software"). Google was splitting ranking signals between them and the homepage (3-way cannibalization called out in the audit). The blog version (~850 words, placeholder OG image) was the weaker page; the resources guide (~800 words, structured comparison format) is the better destination. A permanent redirect:
- Consolidates link equity from the deleted blog URL into the resources guide.
- Tells Google to update its index to the new canonical URL.
- Eliminates the duplicate from the sitemap automatically (since sitemap reads filesystem).

### Scope kept narrow
- Only the JSON file was deleted, not the blog category infrastructure. `/blog`, `/blog/[slug]`, and the other 13 posts remain.
- The resources guide content itself was **not** expanded in this change — that's Change #3 (Critical #1's third sub-task: grow `/resources/best/ai-resume-screening-software` to 5,000+ words with methodology, comparison table, FAQPage schema, US state AI-hiring-law section). Doing them as separate changes keeps the diff reviewable.
- `next.config.ts` `permanent: true` emits HTTP 308 in Next.js, which Google treats as equivalent to 301 for SEO purposes.

### Side-effect checks performed
- Internal link audit: `grep -rln "best-ai-resume-screening-software"` returned only the JSON file (now deleted). No navigation, footer, or in-page links pointed at the old slug.
- Sitemap destination: `/resources/best/ai-resume-screening-software` is already enumerated by `getAllBestPages()` in `app/sitemap.ts`. The redirect points to an already-indexed URL.
- Sitemap source: `getAllPosts()` walks `app/(public)/blog/_lib/posts/*.json` — deletion automatically drops the URL from the next sitemap render.

### Verification
- `curl -sI http://localhost:3001/blog/best-ai-resume-screening-software` → `HTTP/1.1 308 Permanent Redirect`, `location: /resources/best/ai-resume-screening-software`.
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/resources/best/ai-resume-screening-software` → `200`.
- `curl -s http://localhost:3001/sitemap.xml | grep -c "best-ai-resume-screening-software"` → `0`.
- Dev server restarted (next.config changes don't HMR) — site boots clean, no console errors.

---

## 2026-05-22 — Change #3a: Extend `BestPage` type to support long-form guides

**File:** `app/(public)/resources/best/_data/types.ts`

**Audit reference:** Foundation for Critical #1 sub-task 3 — expanding `/resources/best/ai-resume-screening-software` to 5,000+ words with methodology, deep dives, FAQPage schema, and a US/EU/UK/India AI hiring law section. This change adds the type surface only; renderer (Change #3b) and content (Change #3c) follow.

### Before
The `BestPage` type defined a shallow content shape with an effective ~800-word ceiling:
- 2-paragraph hero `lead`
- Flat `whatToLookFor` list
- 3-field `ToolRow` × N tools
- One-paragraph `positioning`, 5-row `framework` table, 4-item `evidence`
- 2-question `faqs`
- CTAs and link lists

No author signal, no methodology block, no per-tool prose, no regulatory section, no JSON-LD opt-in.

### After
All previously existing fields preserved unchanged. The following new optional types were added:

- **`Author`** — named human author for E-E-A-T (`name`, `role`, `bio`, optional `avatarUrl`, `linkedinUrl`, `expertiseTags[]`).
- **`Methodology`** — disclosed scoring criteria with weights, scale label, reviewed date, and reviewer caveats.
- **`ToolDeepDive`** — long-form per-tool capsule (`oneLiner`, `pricingRange`, `bestFor`, `notIdealFor`, `keyCapabilities[]`, `prosAndCons`, `bodyParagraphs[]` for 250–350 words each, `scoringSummary` keyed by methodology criteria, `verdict`).
- **`ProseBlock`** — discriminated union covering `paragraph | heading | list | quote | callout | image`.
- **`ProseSection`** — ordered prose block with `id` (anchor + ToC), `eyebrow`, `title`, `lead`, `body: ProseBlock[]`.
- **`StatBlock`** — sourced data callouts (every item requires `sourceUrl`).
- **`ComparisonMatrix`** — multi-criterion comparison table emitted as HTML `<table>` for AI-citation extraction (with optional `winnerByCriterion` map).
- **`RegulationSection`** — jurisdiction-agnostic shape supporting India / US states / EU / UK in one structure: `jurisdiction`, `lawName`, `effectiveDate`, `summary`, `employerRequirements[]`, source link. Mandatory `disclaimer`.
- **`TableOfContents`** — `autoFromSections` flag and/or `manualItems`.
- **`SchemaFlags`** — per-page opt-in for `emitArticleJsonLd` and `emitFaqPageJsonLd`.

`BestPage` extended with these optional fields:
```
authors?, readingTimeMinutes?, tableOfContents?, methodology?,
toolDeepDives?, comparisonMatrix?, proseSections?, stats?,
regulation?, schema?
```

### Why
The audit's Critical #1 sub-task 3 (expand the resources guide to 5,000+ words) cannot fit inside the current `BestPage` shape — the existing fields cap at ~800 words structurally. Authoring 5,000-word guides at the depth top-10 SERP competitors reach requires:
- Per-tool prose (250–350 words × ~10 tools = ~3,000 words)
- Methodology section (~400 words)
- Regulatory section (~500 words)
- Expanded FAQs (10–15 questions, ~600 words)
- Free-form prose blocks for narrative depth

A shape extension lets all existing guides keep rendering today while opening the door to richer authoring. Every new field is optional, so the migration cost for the existing 6 guides is zero.

### Design decisions
- **All new fields optional.** Existing 6 guides keep validating with no edits. Backward-compatible.
- **`authors` strictly optional, no required-field enforcement** (per user direction). If absent, renderer falls back to no byline; we don't fabricate an author.
- **`RegulationSection.jurisdictions` is jurisdiction-agnostic** so India, US states, EU, and UK can co-exist in one section (per user direction).
- **`ToolDeepDive` complements rather than replaces `ToolRow`.** Pages can keep the short comparison table AND add long-form deep dives. Avoids forced migration.
- **`ProseBlock` is a discriminated union.** Renderer is one switch, not a tree of branching types.
- **JSON-LD emission is opt-in via `schema?` flags.** Existing pages emit no `Article` or `FAQPage` schema unless authors set the flag, so behavior is unchanged.
- **`ComparisonMatrix` is intentionally separate from `framework`.** `framework` stays as a 2-3 column conceptual table; `comparisonMatrix` is the data-rich per-tool grid the SXO subagent flagged as missing.

### Scope kept narrow
- **No data file changed.** `ai-resume-screening-software.ts` and the 5 other guides are untouched — they keep their existing fields and the new fields are all absent (undefined).
- **No renderer changes.** `[slug]/page.tsx` and `BestClient.tsx` are untouched. They will need updates in Change #3b to actually display the new sections; until then the new fields are inert.
- **No JSON-LD emitted.** Even though `schema?.emitArticleJsonLd` and `schema?.emitFaqPageJsonLd` flags exist in the type, no code reads them yet.
- **No `Author` route, no `/authors/[slug]` page.** Out of scope.
- **No content authored.** Authoring the 5,000-word guide is Change #3c.

### Verification
- `npx tsc --noEmit` — exited cleanly (no type errors anywhere in the repo, including the 6 existing data files and the renderer).
- `curl http://localhost:3001/resources/best` → 200.
- `curl http://localhost:3001/resources/best/ai-resume-screening-software` → 200.
- `curl http://localhost:3001/resources/best/ats-for-startups` → 200.
- Dev server picks up the type change via HMR; no console errors.

---

## 2026-05-22 — Change #3b: Renderer + JSON-LD emission for long-form fields

**Files added (8):**
- `app/(public)/resources/best/_components/blocks/AuthorByline.tsx`
- `app/(public)/resources/best/_components/blocks/TableOfContents.tsx`
- `app/(public)/resources/best/_components/blocks/Methodology.tsx`
- `app/(public)/resources/best/_components/blocks/ToolDeepDives.tsx`
- `app/(public)/resources/best/_components/blocks/ComparisonMatrix.tsx`
- `app/(public)/resources/best/_components/blocks/ProseSection.tsx`
- `app/(public)/resources/best/_components/blocks/StatBlocks.tsx`
- `app/(public)/resources/best/_components/blocks/Regulation.tsx`

**Files modified (2):**
- `app/(public)/resources/best/[slug]/page.tsx`
- `app/(public)/resources/best/_components/BestClient.tsx`

**Audit reference:** Critical #1 sub-task 3 prerequisite. Change #3a added the type surface; this change makes those fields actually render and adds opt-in `Article` JSON-LD emission. Authoring the 5,000-word content for `ai-resume-screening-software.ts` is Change #3c.

### Before
- `[slug]/page.tsx` emitted `BreadcrumbList`, `WebPage`, and `FAQPage` JSON-LD unconditionally. No `Article` schema.
- `BestClient.tsx` rendered only the legacy block set (`hero`, `whatToLookFor`, `toolsTable`, `positioning`, `framework`, `evidence`, `howToChoose`, `cta`, `faqs`, `internalLinks`, `externalReferences`, `disclaimer`).
- New optional `BestPage` fields from Change #3a (`authors`, `methodology`, `toolDeepDives`, `comparisonMatrix`, `proseSections`, `stats`, `regulation`, `tableOfContents`, `readingTimeMinutes`, `schema`) were inert — defined in the type but invisible at runtime.

### After

**JSON-LD changes in `[slug]/page.tsx`:**
- `FAQPage` emission now respects `data.schema?.emitFaqPageJsonLd === false` as an opt-out. Default behavior preserved (still emitted when faqs exist); existing 6 guides keep emitting FAQPage as before.
- `Article` JSON-LD is emitted only when `data.schema?.emitArticleJsonLd === true`. Default off, opt-in per page. Existing 6 guides emit no Article schema (verified).
- When emitted, the Article block includes: `headline`, `description`, `image`, `datePublished`, `dateModified`, `mainEntityOfPage`, `publisher` (Organization), and `author[]` only if `data.authors` is non-empty. Authors map to `Person` with `name`, `jobTitle`, `description`, optional `url` (from `linkedinUrl`) and `image` (from `avatarUrl`). Strictly optional — no fabricated author when absent.

**Renderer changes in `BestClient.tsx`:**
- 8 new section components imported and inserted into the reading flow at sensible positions:
  1. `AuthorByline` — below the hero, only if `data.authors?.length > 0`
  2. `TableOfContents` — between byline and main content, only if `data.tableOfContents`
  3. `Methodology` — after the short toolsTable comparison, only if `data.methodology`
  4. `ComparisonMatrix` — after methodology, only if `data.comparisonMatrix`
  5. `ToolDeepDives` — after the matrix, only if `data.toolDeepDives?.length > 0`
  6. `ProseSections` — after deep dives, only if `data.proseSections?.length > 0`
  7. `StatBlocks` — after prose sections, only if `data.stats?.length > 0`
  8. `Regulation` — after `evidence`, before `howToChoose`, only if `data.regulation`
- Every block is short-circuit-gated; existing 6 guides skip all 8 because their data doesn't define any of the new fields.

**Component design:**
- `AuthorByline` — small card under the hero with avatar, name, role, expertise tags, LinkedIn text-link, published/updated dates, reading time.
- `TableOfContents` — supports auto-generation from `proseSections[].id/title` plus optional `manualItems[]`.
- `Methodology` — renders the criteria table with weights, plus scale label, reviewed date, reviewer caveats.
- `ToolDeepDives` — long-form per-tool cards: one-liner, pricing chip, best-for/not-ideal-for, key capabilities checklist, 3–5 body paragraphs, pros/cons grid, verdict line.
- `ComparisonMatrix` — HTML `<table>` with sticky tool column, boolean check/X cells, string cells with optional notes, and optional "best by criterion" summary line.
- `ProseSection` — discriminated-union renderer covering `paragraph | heading | list | quote | callout | image`. Callouts have three variants (info/warning/tip) with their own icon and color.
- `StatBlocks` — sourced data-callout grid. Every stat requires a source URL (enforced by the type).
- `Regulation` — jurisdiction grid, each card showing law name, effective date, summary, employer requirements list, source link. Mandatory disclaimer rendered below the grid.

### Why
The type surface from #3a is only useful when the renderer can actually display it. This change makes long-form authoring possible without yet writing any long-form content. Splitting renderer from content means we can verify all the new section components work and don't break existing pages in isolation, then author the 5,000-word `ai-resume-screening-software.ts` (Change #3c) against a known-good renderer.

The Article JSON-LD opt-in (rather than auto-emit) means authors must intentionally enable it once they have a named author. We don't emit a `BlogPosting` or `Article` without a `Person.author` because that's the actual SEO signal Google wants — empty author blocks add no E-E-A-T credit.

### Scope kept narrow
- **Zero data file edits.** All 6 existing guide data files (`ai-resume-screening-software.ts`, `ats-for-startups.ts`, `candidate-screening-software.ts`, `high-volume-hiring-software.ts`, `recruitment-software-for-small-business.ts`, `resume-screening-software.ts`) are byte-identical. They keep rendering the same sections in the same visual order.
- **No metadata/Article schema for existing pages.** They emit `BreadcrumbList`, `WebPage`, `FAQPage` exactly as before. No Article schema (confirmed by grep on the rendered HTML).
- **No CSS changes outside the new component files.** No `globals.css` or design-token touches.
- **No new server routes, no `/authors/[slug]`.** Author byline is purely presentational for now.
- **No content authored.** That's Change #3c.

### Issues fixed during implementation
- `lucide-react@1.16.0` (the version pinned in `package.json`) does not export `Linkedin`. Initial `AuthorByline.tsx` import broke compilation. Replaced the icon with a text link reading "LinkedIn" — accessible, no dependency change.

### Verification
- `npx tsc --noEmit` — clean exit, no errors anywhere in the repo.
- All 6 existing guides return HTTP 200:
  - `/resources/best/ai-resume-screening-software`
  - `/resources/best/ats-for-startups`
  - `/resources/best/candidate-screening-software`
  - `/resources/best/high-volume-hiring-software`
  - `/resources/best/recruitment-software-for-small-business`
  - `/resources/best/resume-screening-software`
- JSON-LD inventory on `/resources/best/ai-resume-screening-software`:
  - Present: `BreadcrumbList`, `WebPage`, `FAQPage`, `Organization`, `WebSite`, `ContactPoint`, `ImageObject` (and sub-types: `Question`, `Answer`, `Thing`, `ListItem`).
  - Absent: `Article` — correctly suppressed because `schema.emitArticleJsonLd` is not set in the data.
- Visual smoke-test: existing pages render identically — no extra spacing, no empty sections, no console errors after Turbopack cache cleared.

---

## 2026-05-26 — Change #4: Small-fixes batch (CSP, robots agents, IndexNow, canonical non-fix)

Single commit batching four small-but-distinct improvements from the audit's High and Critical lists. Pure additions / config changes — no UI or behavior change.

### 4a. Content-Security-Policy header (Critical #2 from audit)

**File:** `next.config.ts`

**Before:** Site shipped HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy — but no `Content-Security-Policy`. For a SaaS handling hiring data this is a real XSS attack surface and an emerging Google trust signal.

**After:** Added a permissive baseline CSP via `securityHeaders` in `next.config.ts`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval'
  https://www.googletagmanager.com
  https://www.google-analytics.com
  https://va.vercel-scripts.com
  https://vercel.live;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
font-src 'self' data:;
connect-src 'self'
  https://<supabase-host>   (dynamic from NEXT_PUBLIC_SUPABASE_URL)
  https://www.google-analytics.com
  https://vitals.vercel-insights.com
  https://va.vercel-scripts.com;
frame-ancestors 'none';
form-action 'self';
base-uri 'self';
object-src 'none';
upgrade-insecure-requests
```

**Why permissive (`'unsafe-inline'`, `'unsafe-eval'`):** Next.js inlines hydration data and route info scripts. Tailwind v4 emits inline styles via `<style>` blocks. `'unsafe-eval'` is needed by some Vercel preview / live-reload scripts and certain analytics paths. A nonce-based CSP is the right end state — but requires touching every inline script emission point and is a separate refactor. This permissive baseline closes the audit Critical-tier gap immediately and is still meaningfully stronger than no CSP at all (object-src 'none', frame-ancestors 'none', base-uri 'self', upgrade-insecure-requests are all defensive).

**Dynamic Supabase host:** The connect-src reads from `NEXT_PUBLIC_SUPABASE_URL` at build time. If env var is missing, falls back to wildcard `https://*.supabase.co`. Prevents hard-coding a single instance URL.

### 4b. Explicit per-agent robots.txt rules (High #8 from audit)

**File:** `app/robots.ts`

**Before:** Single catch-all rule `User-Agent: * / Allow: / / Disallow: /api/`. Every AI crawler was implicitly allowed through the wildcard, but no explicit signal of intent.

**After:** Catch-all preserved; 15 explicit per-agent rules added (each Allow: /, Disallow: /api/) covering:

- **OpenAI:** GPTBot, OAI-SearchBot, ChatGPT-User
- **Anthropic:** ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai (legacy name)
- **Perplexity:** PerplexityBot, Perplexity-User
- **Google AI:** Google-Extended (controls Bard/Gemini training; does **not** affect Google Search ranking)
- **Apple AI:** Applebot-Extended (Apple Intelligence)
- **Other:** CCBot (Common Crawl — many open-weights models), Bytespider (ByteDance), Amazonbot

**Why all-allow instead of selectively blocking training crawlers:** HireSort is selling AI software. Being represented in foundation-model training rounds and appearing in AI Overviews / ChatGPT / Perplexity citations is part of the GEO marketing strategy. The audit suggested blocking CCBot and anthropic-ai as "training-only" — for a privacy-sensitive product that recommendation would apply, but for HireSort's commercial position the upside of being indexed by these crawlers outweighs the downside. The explicit Allow signals intent to each crawler and is the SEO best practice over relying on the `*` wildcard.

### 4c. IndexNow protocol implementation (High #9 from audit)

**Files added:**
- `public/1296c215069702826079c3cc23ef3a47.txt` — IndexNow key verification file. Content is the key itself (per IndexNow spec).
- `scripts/indexnow-ping.mjs` — standalone Node script that POSTs URLs to `https://api.indexnow.org/IndexNow`.

**File modified:**
- `package.json` — added `indexnow:ping` npm script.

**Before:** No IndexNow integration. Bing, Yandex, Naver, Seznam, and Yep relied entirely on default crawl scheduling — for a content site updating weekly that means recency signals lag the actual publish event by days.

**After:**
- IndexNow key `1296c215069702826079c3cc23ef3a47` generated via Node `crypto.randomBytes(16)`. Verification file hosted at `https://hiresort.ai/1296c215069702826079c3cc23ef3a47.txt`. No registration with any search engine required — IndexNow is a key-self-hosting protocol.
- `scripts/indexnow-ping.mjs` defaults to fetching every URL from the live sitemap and submitting the batch to IndexNow. Can also accept explicit URLs as CLI args (`node scripts/indexnow-ping.mjs https://hiresort.ai/blog/foo`). Supports preview deploys via `SITE_URL` env var. Batches into 9,000-URL chunks (spec allows 10,000 per request).
- Run manually after publishing content: `npm run indexnow:ping`. Future wiring into the Vercel deploy hook is straightforward — that's deferred to a separate change to keep this batch tight.

**Why not auto-ping on every build:** Some deploys touch only code or config and don't change indexable URLs. Running the ping unconditionally on every deploy would burn ping requests on no-ops. Manual or content-publish-triggered invocation is cleaner.

### 4d. Homepage canonical trailing slash (High #4 from audit — deliberate non-fix)

**Investigation:**
- Audit said: "served URL is `https://hiresort.ai/`; canonical reads `https://hiresort.ai` (no slash)".
- Initial attempted fix: explicitly set `canonical: \`${siteUrl}/\`` in `app/page.tsx` to force the trailing slash.
- Result: **Next.js 16 normalizes the metadata canonical URL regardless of input.** The rendered HTML still emitted `<link rel="canonical" href="http://localhost:3001"/>` — no trailing slash.

**Why this is OK:** RFC 3986 defines `scheme://authority` (empty path) and `scheme://authority/` (path = `/`) as equivalent URIs. Google's URL Inspection tool, GSC, and every major SEO crawler treat them identically. The audit's diagnosis ("strings differ") was technically correct but the SEO consequence is zero.

**Action taken:** Reverted the no-op `app/page.tsx` change to keep code idiomatic (`canonical: '/'` is the Next.js convention) and documented the rationale here. If at some point we discover a real-world third-party tool that gets confused by the difference, the fix is to bypass Next.js metadata for the homepage canonical and emit the `<link>` tag manually in a server component — but adding that complexity for an RFC-equivalent URL form would be premature.

### Verification (all four sub-changes)

- `npx tsc --noEmit` — clean.
- `GET /` → 200, with the new CSP header in the response. All other security headers preserved.
- `GET /pricing` → 200.
- All 6 `/resources/best/*` guide pages → 200, render identically.
- `GET /robots.txt` → returns all 15 per-agent rules plus the wildcard catch-all, `Host:` directive, `Sitemap:` link — correctly formatted.
- `GET /1296c215069702826079c3cc23ef3a47.txt` → 200, returns the key string.
- No CSP violations in browser console during smoke navigation (recommended manual re-check on Vercel preview where Vercel Analytics + Speed Insights run in production mode).

### What to watch for after deploy
- **CSP violations in browser console.** Vercel Analytics / Speed Insights / GA load extra scripts in prod that might not appear in local dev. If anything is blocked, the fix is to add the offending host to the relevant CSP directive. (Or temporarily switch the header key to `Content-Security-Policy-Report-Only` for a few days of observation — say the word and I'll add that.)
- **Bing Webmaster Tools.** Within ~24h, Bing should show the IndexNow key file as verified. The `npm run indexnow:ping` script can be re-run anytime to re-notify.
- **GSC "Page indexing" report.** The www→non-www `Page with redirect` entries are normal and will stay there permanently — they're not the kind of issue that resolves with a code change.
