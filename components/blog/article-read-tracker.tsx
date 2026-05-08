"use client"

import { useEffect, useRef } from "react"

import { trackEvent } from "@/lib/analytics"

const PROGRESS_MILESTONES = [25, 50, 75, 100] as const
const TIME_MILESTONES = [30, 60, 120, 300] as const

type Props = {
  slug: string
  title: string
  /** CSS selector for the readable article container. Defaults to `article`. */
  selector?: string
}

/**
 * Article-specific engagement tracker.
 *
 * Fires once per milestone, per page load:
 * - `blog_post_read_progress` at 25 / 50 / 75 / 100% scrolled within the
 *   article container (independent from the global scroll_depth event,
 *   which is page-level).
 * - `blog_post_read_time` at 30 / 60 / 120 / 300 seconds of *visible*
 *   reading time (paused while the tab is hidden).
 *
 * All events include `slug` and `title` for cohort analysis.
 */
export function ArticleReadTracker({ slug, title, selector = "article" }: Props) {
  const progressFired = useRef<Set<number>>(new Set())
  const timeFired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const article = document.querySelector(selector) as HTMLElement | null
    if (!article) return

    let raf = 0
    function computeProgress() {
      raf = 0
      if (!article) return
      const rect = article.getBoundingClientRect()
      const articleHeight = article.scrollHeight
      const viewportHeight = window.innerHeight
      // How much of the article has scrolled past the viewport top, in pixels.
      const scrolledPx = -rect.top + viewportHeight
      const progress = Math.min(
        100,
        Math.max(0, Math.floor((scrolledPx / Math.max(articleHeight, 1)) * 100))
      )
      for (const m of PROGRESS_MILESTONES) {
        if (progress >= m && !progressFired.current.has(m)) {
          progressFired.current.add(m)
          trackEvent("blog_post_read_progress", { slug, title, progress: m })
        }
      }
    }

    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(computeProgress)
    }

    let visibleSeconds = 0
    let lastTick = Date.now()
    let interval: ReturnType<typeof setInterval> | null = null

    function tickTime() {
      const now = Date.now()
      if (document.visibilityState === "visible") {
        visibleSeconds += (now - lastTick) / 1000
      }
      lastTick = now
      for (const m of TIME_MILESTONES) {
        if (visibleSeconds >= m && !timeFired.current.has(m)) {
          timeFired.current.add(m)
          trackEvent("blog_post_read_time", { slug, title, seconds: m })
        }
      }
    }

    function onVisibilityChange() {
      lastTick = Date.now()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)
    interval = setInterval(tickTime, 1000)
    computeProgress()

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (raf) cancelAnimationFrame(raf)
      if (interval) clearInterval(interval)
    }
  }, [slug, title, selector])

  return null
}
