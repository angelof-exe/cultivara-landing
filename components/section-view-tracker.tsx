"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/lib/analytics"

const TRACKED_SECTIONS = [
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
 * the first time each section scrolls into view (50% visible).
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
            trackEvent("section_view", { section: id })
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
