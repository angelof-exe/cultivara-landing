declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return

  if (window.gtag) {
    window.gtag("event", eventName, params)
  }

  if (window.fbq) {
    window.fbq("trackCustom", eventName, params)
  }
}

export function trackWaitlistSubmission() {
  if (typeof window === "undefined") return

  // GA4 — standard "generate_lead" event
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "waitlist",
      event_label: "waitlist_signup",
      value: 1,
    })
  }

  // Meta Pixel — standard "Lead" event
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "waitlist_signup",
    })
  }
}
