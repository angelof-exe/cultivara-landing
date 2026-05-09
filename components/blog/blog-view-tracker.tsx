"use client"

import { useEffect, useRef } from "react"

import { trackEvent } from "@/lib/analytics"

type BlogViewTrackerProps = {
  event: string
  params?: Record<string, string | number | boolean>
}

export function BlogViewTracker({ event, params }: BlogViewTrackerProps) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackEvent(event, params)
  }, [event, params])

  return null
}
