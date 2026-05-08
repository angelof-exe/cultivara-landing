# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Italian-language marketing/waitlist landing for **Cultivara**, a digital "Quaderno di Campagna" (farm logbook) SaaS targeting Regolamento UE 2023/564 compliance (mandatory Jan 2027). All user-facing copy is in Italian — preserve language and domain terms (QDCA, AGEA, SIAN, Ecoschemi PAC, Disciplinari PI) when editing.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`). Turbo is enabled for dev.

```bash
pnpm dev      # next dev --turbo
pnpm build    # next build
pnpm start    # next start
pnpm lint     # next lint
```

No test runner is configured.

## Stack

- Next.js 16 App Router, React 19, TypeScript 5.7 (strict)
- Tailwind v3 + shadcn/ui (Radix primitives in [components/ui/](components/ui/))
- Path alias `@/*` → repo root
- Fonts: `DM_Sans` (sans) / `DM_Serif_Display` (serif) via `next/font/google`, wired as CSS vars `--font-dm-sans` / `--font-dm-serif`
- Forms: `react-hook-form` + `zod` via `@hookform/resolvers`
- Email submission: EmailJS (client-side only, no server route)
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` — `tsc` errors don't fail `next build`, so type-check intentionally when making type-sensitive changes

## Architectural pillars

### 1. APP_MODE switch (waitlist ↔ saas)

`NEXT_PUBLIC_APP_MODE` (`"waitlist"` | `"saas"`, defaults to `"saas"`) is read by [lib/config.ts](lib/config.ts) and drives what renders on the homepage:

- [app/page.tsx](app/page.tsx) swaps `<Pricing />` ↔ `<WaitlistForm />` based on `isWaitlist`
- [components/landing/structured-data.tsx](components/landing/structured-data.tsx) omits `offers` + `aggregateRating` from the SoftwareApplication JSON-LD when in waitlist mode

When adding homepage sections, decide whether they belong in both modes or gate them behind `isWaitlist`. Do **not** read `process.env.NEXT_PUBLIC_APP_MODE` directly — always import from `lib/config`.

### 2. Consent-gated analytics pipeline

The analytics layer has three cooperating pieces that must stay coordinated:

- **[components/cookie-consent-provider.tsx](components/cookie-consent-provider.tsx)** — `CookieConsentProvider` holds `{ analytics, marketing }` prefs in `localStorage` under key `"cookie-consent"` (with legacy string-format migration). Wraps the entire tree in [app/layout.tsx](app/layout.tsx).
- **[components/analytics.tsx](components/analytics.tsx)** — only injects GA4 / Meta Pixel `<Script>` tags after consent; returns `null` while `undecided`/`denied`. GA4 gated on `preferences.analytics`, Meta Pixel on `preferences.marketing`.
- **[lib/analytics.ts](lib/analytics.ts)** — `trackEvent(name, params)` dual-dispatches to `window.gtag` (as `event`) and `window.fbq` (as `trackCustom`). SSR-safe: returns early if `typeof window === "undefined"`. Both globals are typed via `declare global { interface Window { ... } }`.

`trackFormSubmitSuccess` additionally fires the **standard** GA4 `generate_lead` and Meta `Lead` events (not custom) — these are the optimization-signal events, don't accidentally rename them.

### 3. Session tracker singleton

[lib/session-tracker.ts](lib/session-tracker.ts) exports a `session` object with module-level state (page load ts, max scroll depth, sections viewed, CTA click count, UTM first-touch). Initialized exactly once by [components/utm-capture.tsx](components/utm-capture.tsx) on mount. UTM snapshot persists to `sessionStorage` only if `preferences.analytics === true`.

`session.getEnrichedParams()` returns `{ scroll_depth, time_on_page_s, sections_viewed_count, previous_cta_clicks, ...utm }` — used by [components/tracked-link.tsx](components/tracked-link.tsx) (`TrackedLink` / `TrackedAnchor`) to enrich every CTA click, and by [components/landing/waitlist-form.tsx](components/landing/waitlist-form.tsx) to attach UTM to EmailJS payloads.

### 4. Parallel tracker components in the root layout

[app/layout.tsx](app/layout.tsx) mounts several independent client-only tracker components alongside `{children}`:

- `<UtmCapture />` — initializes the session tracker
- `<ScrollDepthTracker />` — fires `scroll_depth` at 25/50/75/100%
- `<TimeTracker />` — fires `time_on_page` at 15/30/60/180s, pauses on `visibilitychange`
- `<SectionViewTracker />` (mounted inside [app/page.tsx](app/page.tsx), not layout) — `IntersectionObserver` at 30% threshold against a hardcoded id list; special-cases `"lista-attesa"` to also fire Meta Pixel standard `ViewContent`

When adding a new tracked section, add its DOM `id` to `TRACKED_SECTIONS` in [components/section-view-tracker.tsx](components/section-view-tracker.tsx). The IDs are also hash anchors used by nav CTAs — keep them stable.

### 5. Waitlist form lifecycle events

[components/landing/waitlist-form.tsx](components/landing/waitlist-form.tsx) emits a full funnel: `form_start` (first focus), `form_field_error` (per-field on blur with zod-message → `FormFieldErrorType` classifier), `form_submit_attempt`, `form_submit_success` / `form_submit_error`, plus `form_abandoned` on `beforeunload`/`visibilitychange` (using refs to avoid double-fire). `FORM_ID = "waitlist"` is the event param — reuse the same constant if you add more forms so funnels stay comparable.

## Environment variables

See [.env.example](.env.example). All are `NEXT_PUBLIC_*` (client-exposed) because EmailJS and analytics run fully client-side:

- `NEXT_PUBLIC_APP_MODE` — `"waitlist"` | `"saas"`
- `NEXT_PUBLIC_EMAILJS_{SERVICE_ID,TEMPLATE_ID,PUBLIC_KEY}`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_META_PIXEL_ID`

Missing EmailJS config is handled at submit time and surfaces as `form_submit_error` with `error_type: "config_missing"` — not a hard crash.

## Conventions

- Italian copy throughout user-facing code; retain Italian regex patterns in `categorizeZodError` if extending validation
- Use `TrackedLink` / `TrackedAnchor` for any CTA, not raw `<Link>`/`<a>`, so CTA clicks are counted into the session state
- Server Component by default; add `"use client"` only when needed (hooks, analytics side effects, context consumers)
- Component folder split: [components/landing/](components/landing/) = page sections, [components/ui/](components/ui/) = shadcn primitives (don't hand-edit unless intentionally diverging from shadcn)

## Sibling repos (not part of this codebase)

`/home/angelo-zorin/Scrivania/cultivara-landing-blog/` and its `sanity/` subdirectory are a separate in-progress blog with Sanity CMS integration — they share design patterns but have their own `package.json` and are not imported from here.
