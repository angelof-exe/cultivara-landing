"use client"

import { useState } from "react"
import { useCookieConsent, type ConsentPreferences } from "@/components/cookie-consent-provider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Settings2, Shield } from "lucide-react"

export function CookieConsentBanner() {
  const { consentStatus, grantAll, denyAll, savePreferences } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [localPrefs, setLocalPrefs] = useState<ConsentPreferences>({
    analytics: true,
    marketing: true,
  })

  if (consentStatus !== "undecided") return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card/95 shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 hidden h-5 w-5 shrink-0 text-primary sm:block" />
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              La tua privacy conta
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Utilizziamo cookie per analizzare il traffico e migliorare il sito.
              Puoi accettare tutto, rifiutare o personalizzare le tue preferenze.
            </p>
          </div>
        </div>

        {/* Detailed preferences */}
        {showDetails && (
          <div className="mt-4 space-y-3 rounded-lg border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Cookie tecnici</p>
                <p className="text-xs text-muted-foreground">
                  Necessari per il funzionamento del sito. Sempre attivi.
                </p>
              </div>
              <Switch checked disabled />
            </div>

            <div className="h-px bg-border/60" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Analitici</p>
                <p className="text-xs text-muted-foreground">
                  Google Analytics — ci aiutano a capire come viene usato il sito.
                </p>
              </div>
              <Switch
                checked={localPrefs.analytics}
                onCheckedChange={(checked) =>
                  setLocalPrefs((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            <div className="h-px bg-border/60" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Marketing</p>
                <p className="text-xs text-muted-foreground">
                  Meta Pixel — utilizzati per misurare l{"'"}efficacia delle campagne.
                </p>
              </div>
              <Switch
                checked={localPrefs.marketing}
                onCheckedChange={(checked) =>
                  setLocalPrefs((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            <Settings2 className="h-3.5 w-3.5" />
            {showDetails ? "Nascondi preferenze" : "Personalizza"}
          </button>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={denyAll}>
              Rifiuta tutto
            </Button>
            {showDetails ? (
              <Button size="sm" onClick={() => savePreferences(localPrefs)}>
                Salva preferenze
              </Button>
            ) : (
              <Button size="sm" onClick={grantAll}>
                Accetta tutto
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
