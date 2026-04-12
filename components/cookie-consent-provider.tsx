"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface ConsentPreferences {
  analytics: boolean
  marketing: boolean
}

type ConsentStatus = "granted" | "denied" | "partial" | "undecided"

interface CookieConsentContextValue {
  consentStatus: ConsentStatus
  preferences: ConsentPreferences
  grantAll: () => void
  denyAll: () => void
  savePreferences: (prefs: ConsentPreferences) => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

const STORAGE_KEY = "cookie-consent"

function statusFromPrefs(prefs: ConsentPreferences): ConsentStatus {
  if (prefs.analytics && prefs.marketing) return "granted"
  if (!prefs.analytics && !prefs.marketing) return "denied"
  return "partial"
}

function parseStored(): { preferences: ConsentPreferences; consentStatus: ConsentStatus } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return { preferences: parsed, consentStatus: statusFromPrefs(parsed) }
    }
    // Migrate from old format ("granted" / "denied" string)
    if (raw === '"granted"' || raw === "granted") {
      return { preferences: { analytics: true, marketing: true }, consentStatus: "granted" }
    }
    if (raw === '"denied"' || raw === "denied") {
      return { preferences: { analytics: false, marketing: false }, consentStatus: "denied" }
    }
    return null
  } catch {
    return null
  }
}

const DEFAULT_PREFS: ConsentPreferences = { analytics: false, marketing: false }

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("undecided")
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFS)

  useEffect(() => {
    const stored = parseStored()
    if (stored) {
      setPreferences(stored.preferences)
      setConsentStatus(stored.consentStatus)
    }
  }, [])

  const persist = useCallback((prefs: ConsentPreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    setPreferences(prefs)
    setConsentStatus(statusFromPrefs(prefs))
  }, [])

  const grantAll = useCallback(() => {
    persist({ analytics: true, marketing: true })
  }, [persist])

  const denyAll = useCallback(() => {
    persist({ analytics: false, marketing: false })
  }, [persist])

  const savePreferences = useCallback((prefs: ConsentPreferences) => {
    persist(prefs)
  }, [persist])

  return (
    <CookieConsentContext.Provider value={{ consentStatus, preferences, grantAll, denyAll, savePreferences }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
