"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { isWaitlist } from "@/lib/config"

const navLinks = [
  { label: "Funzionalit\u00e0", href: "#funzionalita" },
  { label: "Come Funziona", href: "#come-funziona" },
  isWaitlist
    ? { label: "Lista d'Attesa", href: "#lista-attesa" }
    : { label: "Prezzi", href: "#prezzi" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const primaryCtaHref = isWaitlist ? "#lista-attesa" : "#prezzi"
  const primaryCtaLabel = isWaitlist ? "waitlist" : "inizia_gratis"
  const primaryCtaText = isWaitlist ? "Iscriviti" : "Inizia Gratis"

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <TrackedLink
          href="/"
          className="flex items-center gap-2"
          aria-label="Cultivara home"
          eventName="nav_click"
          eventParams={{ location: "navbar", target: "logo" }}
        >
          <Image src="/logo.svg" alt="Cultivara logo" width={36} height={36} className="h-9 w-9" />
          <span className="font-serif text-xl text-foreground">Cultivara</span>
        </TrackedLink>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <TrackedLink
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                eventName="nav_click"
                eventParams={{ location: "navbar", target: link.href }}
              >
                {link.label}
              </TrackedLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {!isWaitlist && (
            <Button variant="ghost" size="sm" asChild>
              <TrackedLink
                href="#prezzi"
                eventName="cta_click"
                eventParams={{ location: "navbar", label: "accedi" }}
              >
                Accedi
              </TrackedLink>
            </Button>
          )}
          <Button size="sm" asChild>
            <TrackedLink
              href={primaryCtaHref}
              eventName="cta_click"
              eventParams={{ location: "navbar", label: primaryCtaLabel }}
            >
              {primaryCtaText}
            </TrackedLink>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TrackedLink
                  href={link.href}
                  className="block text-base font-medium text-foreground"
                  eventName="nav_click"
                  eventParams={{ location: "navbar_mobile", target: link.href }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </TrackedLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            {!isWaitlist && (
              <Button variant="outline" asChild>
                <TrackedLink
                  href="#prezzi"
                  eventName="cta_click"
                  eventParams={{ location: "navbar_mobile", label: "accedi" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Accedi
                </TrackedLink>
              </Button>
            )}
            <Button asChild>
              <TrackedLink
                href={primaryCtaHref}
                eventName="cta_click"
                eventParams={{ location: "navbar_mobile", label: primaryCtaLabel }}
                onClick={() => setMobileOpen(false)}
              >
                {primaryCtaText}
              </TrackedLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
