"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

import { TrackedLink } from "@/components/tracked-link"
import { trackEvent } from "@/lib/analytics"
import { isWaitlist } from "@/lib/config"

type Props = {
  variant?: "inline" | "final"
  slug?: string
}

const VIEW_THRESHOLD = 0.5

function useCtaViewTracking(
  ref: React.RefObject<HTMLElement | null>,
  variant: "inline" | "final",
  slug: string | undefined
) {
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true
            trackEvent("blog_cta_view", {
              location: variant === "inline" ? "article_inline" : "article_final",
              ...(slug ? { slug } : {}),
            })
            observer.disconnect()
          }
        }
      },
      { threshold: VIEW_THRESHOLD }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, variant, slug])
}

export function ArticleCta({ variant = "final", slug }: Props) {
  const ref = useRef<HTMLElement>(null)
  useCtaViewTracking(ref, variant, slug)

  const targetHref = isWaitlist ? "/#lista-attesa" : "/#prezzi"
  const ctaLabel = isWaitlist ? "Iscriviti gratis" : "Inizia gratis"
  const eventLocation = variant === "inline" ? "article_inline" : "article_final"
  const eventLabel = isWaitlist ? "waitlist" : "inizia_gratis"

  if (variant === "inline") {
    return (
      <aside
        ref={ref}
        className="my-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-xl text-foreground">
              Vuoi essere pronto al 1° gennaio 2027?
            </p>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              Cultivara è il quaderno di campagna digitale già conforme alla
              normativa. Iscriviti alla lista d'attesa per essere tra i primi a
              provarlo — gratis, niente carta di credito.
            </p>
            <TrackedLink
              href={targetHref}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              eventName="cta_click"
              eventParams={{
                location: eventLocation,
                label: eventLabel,
                ...(slug ? { slug } : {}),
              }}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside
      ref={ref}
      className="mt-16 overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16"
    >
      <p className="text-balance font-serif text-2xl text-primary-foreground sm:text-3xl">
        Hai trovato utile questo articolo?
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
        Iscriviti alla lista d'attesa di Cultivara: avrai accesso anticipato al
        quaderno di campagna digitale e riceverai guide come questa via email.
      </p>
      <TrackedLink
        href={targetHref}
        className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-primary-foreground px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary-foreground/90"
        eventName="cta_click"
        eventParams={{
          location: eventLocation,
          label: eventLabel,
          ...(slug ? { slug } : {}),
        }}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </TrackedLink>
    </aside>
  )
}
