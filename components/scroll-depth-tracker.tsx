"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/lib/analytics"

const MILESTONES = [25, 50, 75, 100] as const

export function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    let rafPending = false

    const compute = () => {
      rafPending = false
      const doc = document.documentElement
      const body = document.body
      const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0
      const viewport = window.innerHeight
      const full = Math.max(doc.scrollHeight, body.scrollHeight)
      const scrollable = Math.max(full - viewport, 1)
      const depth = Math.min(100, Math.round((scrollTop / scrollable) * 100))

      for (const milestone of MILESTONES) {
        if (depth >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone)
          trackEvent("scroll_depth", { depth: milestone })
        }
      }
    }

    const onScroll = () => {
      if (rafPending) return
      rafPending = true
      requestAnimationFrame(compute)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    compute()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return null
}
