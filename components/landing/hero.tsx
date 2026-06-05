import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import {
  ArrowRight,
  Shield,
  Clock,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isWaitlist, primaryCtaHref, primaryCtaEventLabel } from "@/lib/config";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(100_35%_32%/0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — copy */}
          <div className="flex flex-col items-start">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
            >
              <Shield className="h-3.5 w-3.5" />
              Conforme al Regolamento UE 2023/564
            </Badge>

            <h1 className="font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Il tuo Quaderno di Campagna, finalmente digitale
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              Gestisci il quaderno di campagna online in meno di 60 secondi.
              Trattamenti, fertilizzazioni, irrigazioni, magazzino e costi
              colturali. 15 controlli automatici di conformità. Semplice,
              completo, pensato per chi lavora la terra.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2 text-base" asChild>
                <TrackedLink
                  href={primaryCtaHref}
                  eventName="cta_click"
                  eventParams={{ location: "hero", label: primaryCtaEventLabel }}
                >
                  {isWaitlist ? "Unisciti alla Lista d'Attesa" : "Inizia Gratis"}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <TrackedLink
                  href="#come-funziona"
                  eventName="cta_click"
                  eventParams={{ location: "hero", label: "come_funziona" }}
                >
                  Scopri Come Funziona
                </TrackedLink>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {"< 60 secondi a trattamento"}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                15 controlli automatici
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Funziona su ogni dispositivo
              </span>
            </div>
          </div>

          {/* Right column — image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/5">
              <Image
                src="/images/hero_image.jpg"
                alt="Quaderno di campagna digitale Cultivara su tablet e smartphone"
                width={700}
                height={500}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg md:-bottom-6 md:-left-6">
              <p className="text-2xl font-bold text-primary">800k+</p>
              <p className="text-xs text-muted-foreground">
                Aziende agricole in Italia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
