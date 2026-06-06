import { Check, Gift, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrackedLink, TrackedAnchor } from "@/components/tracked-link"
import { SIGNUP_URL } from "@/lib/config"

/**
 * Tutte le funzionalità sbloccate gratuitamente durante la fase pre-lancio
 * (prima dell'apertura della P.IVA). Mostrate per dare percezione del valore
 * pieno offerto senza alcun costo.
 */
const includedFeatures = [
  "Tutte le 10 sezioni QDCA (AGEA)",
  "Appezzamenti illimitati",
  "Database prodotti fitosanitari completo",
  "15 controlli automatici di conformità",
  "Ecoschemi PAC e Disciplinari PI",
  "Operazioni colturali (10 tipologie)",
  "Costi colturali con riepilogo €/ha",
  "Export PDF, JSON e XML conforme",
  "Gestione magazzino con alert scadenze/scorte",
  "Dashboard analytics e radar chart",
  "Assistente vocale AI in italiano",
  "Funziona su smartphone, tablet e computer",
]

/**
 * Sezione "Accesso Gratuito" mostrata in modalità `release_free`: comunica
 * che, durante il pre-lancio, tutte le funzionalità sono gratuite per chi si
 * registra. La CTA porta direttamente alla registrazione dell'app reale.
 */
export function FreeAccess() {
  return (
    <section id="accesso-gratuito" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Accesso Gratuito
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            I primi 20 iscritti hanno 1 anno gratis
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Registrati ora: i primi 20 utenti ottengono accesso completo a tutte
            le funzionalità di Cultivara, totalmente gratis per un anno dalla
            data di iscrizione. Nessun costo e nessuna carta di credito.
          </p>
        </div>

        {/* Free access card */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative rounded-2xl border border-primary bg-background p-6 shadow-xl shadow-primary/10 lg:p-10">
            <Badge className="absolute -top-3 left-8 gap-1.5 px-3 py-1">
              <Gift className="h-3.5 w-3.5" />
              Solo per i primi 20 iscritti
            </Badge>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl font-bold text-foreground">
                  {"€0"}
                </span>
                <span className="text-base text-muted-foreground">
                  per 1 anno, tutto incluso
                </span>
              </div>
              <p className="mt-3 max-w-md text-muted-foreground">
                Nessun piano da scegliere, nessun limite: i primi 20 utenti
                hanno ogni funzionalità sbloccata, gratis per un anno intero
                dalla loro iscrizione.
              </p>
            </div>

            {/* Feature grid */}
            <ul
              className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2"
              role="list"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                <TrackedLink
                  href={SIGNUP_URL}
                  eventName="cta_click"
                  eventParams={{ location: "accesso_gratuito", label: "inizia_gratis" }}
                >
                  Registrati Gratis
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
              <p className="text-sm text-muted-foreground">
                1 anno gratis per i primi 20 · Accesso immediato · Nessuna carta di credito
              </p>
            </div>
          </div>
        </div>

        {/* CAA callout */}
        <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 text-center lg:p-8">
          <h3 className="text-lg font-semibold text-foreground">
            Sei un Centro di Assistenza Agricola (CAA)?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Gestisci centinaia di fascicoli da un{"'"}unica dashboard.
            Onboarding dedicato e supporto personalizzato.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <TrackedAnchor
              href="mailto:info@cultivara.it"
              eventName="mailto_click"
              eventParams={{ location: "accesso_gratuito_caa" }}
            >
              Parla con Noi
            </TrackedAnchor>
          </Button>
        </div>
      </div>
    </section>
  )
}
