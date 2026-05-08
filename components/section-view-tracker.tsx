"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/lib/analytics"
import { session } from "@/lib/session-tracker"

const TRACKED_SECTIONS = [
  "urgency-banner",
  "hero",
  "funzionalita",
  "come-funziona",
  "conformita",
  "lista-attesa",
  "faq",
  "cta-finale",
]

/**
 * Observes key sections and fires a "section_view" event
 * the first time each section scrolls into view (30% visible).
 *
 * For the waitlist form section, also fires a Meta Pixel
 * "ViewContent" standard event to populate retargeting audiences.
 */
export function SectionViewTracker() {
  const firedRef = useRef(new Set<string>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting && !firedRef.current.has(id)) {
            firedRef.current.add(id)
            session.markSectionViewed(id)
            trackEvent("section_view", { section: id })

            if (id === "lista-attesa" && typeof window !== "undefined" && window.fbq) {
              window.fbq("track", "ViewContent", {
                content_name: "waitlist_form",
                content_category: "agritech_qdca",
              })
            }
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const id of TRACKED_SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return null
}
