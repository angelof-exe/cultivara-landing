"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

const MILESTONES_S = [15, 30, 60, 180] as const

export function TimeTracker() {
  useEffect(() => {
    let accumulatedMs = 0
    let lastResumeTs = Date.now()
    let paused = document.visibilityState === "hidden"
    const fired = new Set<number>()
    const timers: ReturnType<typeof setTimeout>[] = []

    const scheduleRemaining = () => {
      for (const ms of timers) clearTimeout(ms)
      timers.length = 0
      for (const milestone of MILESTONES_S) {
        if (fired.has(milestone)) continue
        const remainingMs = milestone * 1000 - accumulatedMs
        if (remainingMs <= 0) {
          fired.add(milestone)
          trackEvent("time_on_page", { seconds: milestone })
          continue
        }
        const timer = setTimeout(() => {
          if (fired.has(milestone)) return
          fired.add(milestone)
          trackEvent("time_on_page", { seconds: milestone })
        }, remainingMs)
        timers.push(timer)
      }
    }

    const pause = () => {
      if (paused) return
      accumulatedMs += Date.now() - lastResumeTs
      paused = true
      for (const ms of timers) clearTimeout(ms)
      timers.length = 0
    }

    const resume = () => {
      if (!paused) return
      lastResumeTs = Date.now()
      paused = false
      scheduleRemaining()
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pause()
      else resume()
    }

    if (!paused) scheduleRemaining()
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      for (const ms of timers) clearTimeout(ms)
    }
  }, [])

  return null
}
