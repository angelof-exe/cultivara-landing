"use client"

import { CalendarClock } from "lucide-react"

export function UrgencyBanner() {
  return (
    <div id="urgency-banner" className="border-b border-primary/20 bg-primary/5">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-medium text-primary lg:px-8">
        <CalendarClock className="hidden h-4 w-4 shrink-0 sm:inline-block" />
        <span>
          {"Dal "}
          <strong>1 Gennaio 2027</strong>
          {" il quaderno di campagna digitale sar\u00e0 obbligatorio per legge"}
        </span>
      </div>
    </div>
  )
}
