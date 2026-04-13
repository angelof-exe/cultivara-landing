import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { isWaitlist } from "@/lib/config"

export function Cta() {
  return (
    <section id="cta-finale" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center lg:px-16 lg:py-20">
          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

          <div className="relative">
            <h2 className="text-balance font-serif text-3xl text-primary-foreground md:text-4xl lg:text-5xl">
              {isWaitlist
                ? "Non perdere il lancio di Cultivara"
                : "Attiva il tuo Quaderno di Campagna digitale, oggi"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              {isWaitlist
                ? "Iscriviti alla lista d'attesa per essere tra i primi a provare il quaderno di campagna digitale pi\u00f9 semplice d'Italia."
                : "Inizia gratis e scopri quanto \u00e8 semplice gestire il quaderno di campagna online con Cultivara. Nessuna carta di credito richiesta."}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <TrackedLink
                  href={isWaitlist ? "#lista-attesa" : "#inizia"}
                  eventName="cta_click"
                  eventParams={{ location: "cta_finale", label: isWaitlist ? "waitlist" : "inizia_gratis" }}
                >
                  {isWaitlist ? "Iscriviti alla Lista d'Attesa" : "Inizia Gratis"}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <TrackedLink
                  href="mailto:info@cultivara.it"
                  eventName="cta_click"
                  eventParams={{ location: "cta_finale", label: "contatto_email" }}
                >
                  Parla con Noi
                </TrackedLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
