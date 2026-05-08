"use client"

import { useEffect } from "react"
import { session } from "@/lib/session-tracker"
import { useCookieConsent } from "@/components/cookie-consent-provider"

/**
 * Initializes the client-side session tracker on mount.
 * Persists UTM/referrer first-touch to sessionStorage only
 * when analytics consent is granted.
 */
export function UtmCapture() {
  const { preferences } = useCookieConsent()

  useEffect(() => {
    session.init({ persistUtm: preferences.analytics })
  }, [preferences.analytics])

  return null
}
