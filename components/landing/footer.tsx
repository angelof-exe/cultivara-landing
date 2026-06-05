"use client"

import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { TrackedLink, TrackedAnchor } from "@/components/tracked-link";
import { offerNavLink } from "@/lib/config";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cultivara.it/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cultivara.it",
    icon: Facebook,
  },
];

type FooterLink = {
  label: string
  href: string
  eventName?: "compliance_link_click" | "mailto_click"
  eventParams?: Record<string, string>
}

const complianceLinks: FooterLink[] = [
  {
    label: "Normativa UE 2023/564",
    href: "/normativa-ue-2023-564",
    eventName: "compliance_link_click",
    eventParams: { destination: "ue_2023_564" },
  },
  {
    label: "D.Lgs. 150/2012",
    href: "/dlgs-150-2012",
    eventName: "compliance_link_click",
    eventParams: { destination: "dlgs_150_2012" },
  },
  {
    label: "Guida AGEA",
    href: "/guida-agea",
    eventName: "compliance_link_click",
    eventParams: { destination: "guida_agea" },
  },
  { label: "Blog", href: "/blog" },
]

const productLinks: FooterLink[] = [
  { label: "Funzionalit\u00e0", href: "#funzionalita" },
  { label: offerNavLink.label, href: offerNavLink.href },
  { label: "Come Funziona", href: "#come-funziona" },
  { label: "FAQ", href: "#faq" },
]

const companyLinks: FooterLink[] = [
  { label: "Chi Siamo", href: "/chi-siamo" },
  {
    label: "Contatti",
    href: "mailto:info@cultivara.it",
    eventName: "mailto_click",
    eventParams: { location: "footer" },
  },
  { label: "Privacy Policy", href: "#" },
  { label: "Termini di Servizio", href: "#" },
]

const footerSections: { title: string; links: FooterLink[] }[] = [
  { title: "Prodotto", links: productLinks },
  { title: "Risorse", links: complianceLinks },
  { title: "Azienda", links: companyLinks },
]

function FooterLinkItem({ link, section }: { link: FooterLink; section: string }) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground"

  if (link.eventName === "mailto_click" || link.href.startsWith("mailto:")) {
    return (
      <TrackedAnchor
        href={link.href}
        className={className}
        eventName={link.eventName ?? "mailto_click"}
        eventParams={link.eventParams ?? { location: "footer" }}
      >
        {link.label}
      </TrackedAnchor>
    )
  }

  if (link.eventName === "compliance_link_click") {
    return (
      <TrackedLink
        href={link.href}
        className={className}
        eventName="compliance_link_click"
        eventParams={link.eventParams}
      >
        {link.label}
      </TrackedLink>
    )
  }

  return (
    <TrackedLink
      href={link.href}
      className={className}
      eventName="nav_click"
      eventParams={{ location: "footer", target: link.href, section }}
    >
      {link.label}
    </TrackedLink>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <TrackedLink
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Cultivara home"
              eventName="nav_click"
              eventParams={{ location: "footer", target: "logo" }}
            >
              <Image src="/logo.svg" alt="Cultivara logo" width={36} height={36} className="h-9 w-9" />
              <span className="font-serif text-xl text-foreground">
                Cultivara
              </span>
            </TrackedLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {
                "Il quaderno di campagna digitale pi\u00f9 semplice d\u2019Italia."
              }
              {" Conforme al Regolamento UE 2023/564, AGEA e SIAN."}
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <TrackedAnchor
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  eventName="social_click"
                  eventParams={{ platform: social.label.toLowerCase() }}
                >
                  <social.icon className="h-5 w-5" />
                </TrackedAnchor>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} section={title.toLowerCase()} />
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
  );
}
