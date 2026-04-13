"use client"

import Link from "next/link"
import { trackEvent } from "@/lib/analytics"

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  eventName: string
  eventParams?: Record<string, string>
  children: React.ReactNode
}

export function TrackedLink({ eventName, eventParams, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  )
}
