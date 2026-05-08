/**
 * Client-side session tracker — singleton module.
 *
 * Collects lightweight engagement state (scroll depth, dwell time,
 * sections viewed, CTA clicks, UTM first-touch) so that tracked events
 * can be enriched with context at fire time.
 *
 * Privacy: no persistence of personal data. UTM first-touch is stored
 * in sessionStorage (tab-scoped, cleared on tab close) only if
 * analytics consent is granted.
 */

export interface UtmSnapshot {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  ttclid?: string
  referrer?: string
}

const UTM_STORAGE_KEY = "utm_first_touch"
const UTM_KEYS: (keyof UtmSnapshot)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
]

interface SessionState {
  pageLoadTs: number
  maxScrollDepth: number
  sectionsViewed: Set<string>
  ctaClicks: number
  utmFirstTouch: UtmSnapshot | null
  initialized: boolean
}

const state: SessionState = {
  pageLoadTs: 0,
  maxScrollDepth: 0,
  sectionsViewed: new Set(),
  ctaClicks: 0,
  utmFirstTouch: null,
  initialized: false,
}

function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let last = 0
  let pending: ReturnType<typeof setTimeout> | null = null
  return ((...args: Parameters<T>) => {
    const now = Date.now()
    const elapsed = now - last
    if (elapsed >= ms) {
      last = now
      fn(...args)
    } else if (!pending) {
      pending = setTimeout(() => {
        last = Date.now()
        pending = null
        fn(...args)
      }, ms - elapsed)
    }
  }) as T
}

function computeScrollDepth(): number {
  const doc = document.documentElement
  const body = document.body
  const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0
  const viewport = window.innerHeight
  const full = Math.max(doc.scrollHeight, body.scrollHeight)
  const scrollable = Math.max(full - viewport, 1)
  return Math.min(100, Math.round((scrollTop / scrollable) * 100))
}

function captureUtmOnLoad(): UtmSnapshot | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  const snapshot: UtmSnapshot = {}
  let hasAny = false

  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) {
      snapshot[key] = value
      hasAny = true
    }
  }

  const ref = document.referrer
  if (ref) {
    try {
      const refOrigin = new URL(ref).origin
      if (refOrigin !== window.location.origin) {
        snapshot.referrer = ref
        hasAny = true
      }
    } catch {
      // ignore malformed referrer
    }
  }

  return hasAny ? snapshot : null
}

function readStoredUtm(): UtmSnapshot | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UtmSnapshot
  } catch {
    return null
  }
}

function persistUtm(snapshot: UtmSnapshot) {
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // sessionStorage may be unavailable (private mode, SSR); ignore
  }
}

export const session = {
  init(options: { persistUtm?: boolean } = {}) {
    if (typeof window === "undefined" || state.initialized) return
    state.initialized = true
    state.pageLoadTs = Date.now()

    // Scroll depth tracking
    const onScroll = throttle(() => {
      const depth = computeScrollDepth()
      if (depth > state.maxScrollDepth) state.maxScrollDepth = depth
    }, 150)
    window.addEventListener("scroll", onScroll, { passive: true })
    // Initial sample
    state.maxScrollDepth = computeScrollDepth()

    // UTM first-touch
    const stored = readStoredUtm()
    if (stored) {
      state.utmFirstTouch = stored
    } else {
      const captured = captureUtmOnLoad()
      if (captured) {
        state.utmFirstTouch = captured
        if (options.persistUtm) persistUtm(captured)
      }
    }
  },

  markSectionViewed(id: string) {
    state.sectionsViewed.add(id)
  },

  incrementCta() {
    state.ctaClicks += 1
  },

  getCtaClicks(): number {
    return state.ctaClicks
  },

  getUtm(): UtmSnapshot | null {
    return state.utmFirstTouch
  },

  getEnrichedParams(): Record<string, string | number> {
    if (!state.initialized) {
      return {}
    }
    const timeOnPageS = Math.round((Date.now() - state.pageLoadTs) / 1000)
    const params: Record<string, string | number> = {
      scroll_depth: state.maxScrollDepth,
      time_on_page_s: timeOnPageS,
      sections_viewed_count: state.sectionsViewed.size,
      previous_cta_clicks: Math.max(state.ctaClicks - 1, 0),
    }
    if (state.utmFirstTouch) {
      for (const [key, value] of Object.entries(state.utmFirstTouch)) {
        if (value) params[key] = value
      }
    }
    return params
  },
}
