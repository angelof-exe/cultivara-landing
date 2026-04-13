"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/lib/analytics"

/**
 * Tracks when a section becomes visible in the viewport (fires once per page load).
 * Uses IntersectionObserver with a 50% threshold.
 */
export function useTrackSectionView(sectionId: string) {
  const hasFired = useRef(false)

  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (!el || hasFired.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true
          trackEvent("section_view", { section: sectionId })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionId])
}
