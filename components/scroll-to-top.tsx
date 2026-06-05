"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Riporta la pagina in cima a ogni navigazione client-side.
 *  Usa behavior:"instant" per bypassare scroll-behavior:smooth del CSS globale,
 *  che altrimenti interrompe lo scroll quando il DOM cambia durante l'animazione.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}
