"use client"

import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { session } from "@/lib/session-tracker"

type EventParams = Record<string, string | number | boolean>

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  eventName: string
  eventParams?: EventParams
  enrichWithSession?: boolean
  children: React.ReactNode
}

export function TrackedLink({
  eventName,
  eventParams,
  enrichWithSession = true,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        if (enrichWithSession) session.incrementCta()
        const enriched = enrichWithSession
          ? { ...eventParams, ...session.getEnrichedParams() }
          : eventParams
        trackEvent(eventName, enriched)
        onClick?.(e)
      }}
    >
      {children}
    </Link>
  )
}

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string
  eventParams?: EventParams
  enrichWithSession?: boolean
  children: React.ReactNode
}

export function TrackedAnchor({
  eventName,
  eventParams,
  enrichWithSession = true,
  children,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (enrichWithSession) session.incrementCta()
        const enriched = enrichWithSession
          ? { ...eventParams, ...session.getEnrichedParams() }
          : eventParams
        trackEvent(eventName, enriched)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
