import Link from "next/link"
import { Leaf } from "lucide-react"

const footerLinks = {
  Prodotto: [
    { label: "Funzionalit\u00e0", href: "#funzionalita" },
    { label: "Prezzi", href: "#prezzi" },
    { label: "Come Funziona", href: "#come-funziona" },
    { label: "FAQ", href: "#faq" },
  ],
  Risorse: [
    { label: "Normativa UE 2023/564", href: "#" },
    { label: "D.Lgs. 150/2012", href: "#" },
    { label: "Guida AGEA", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Azienda: [
    { label: "Chi Siamo", href: "#" },
    { label: "Contatti", href: "mailto:info@cultivara.it" },
    { label: "Privacy Policy", href: "#" },
    { label: "Termini di Servizio", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Cultivara home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl text-foreground">Cultivara</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {"Il quaderno di campagna digitale pi\u00f9 semplice d\u2019Italia."}
              {" Conforme al Regolamento UE 2023/564, AGEA e SIAN."}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {"© 2026 Cultivara. Tutti i diritti riservati."}
          </p>
          <p className="text-sm text-muted-foreground">
            Fatto con cura per gli agricoltori italiani
          </p>
        </div>
      </div>
    </footer>
  )
}
