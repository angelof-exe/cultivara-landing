"use client"

import { useEffect, useRef } from "react"

import { trackEvent } from "@/lib/analytics"

type BlogViewTrackerProps = {
  event: "blog_list_view" | "blog_post_view" | "blog_category_view"
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
