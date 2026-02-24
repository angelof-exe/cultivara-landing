import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    description: "Per iniziare subito, senza costi",
    price: "0",
    period: "per sempre",
    popular: false,
    cta: "Inizia Gratis",
    features: [
      "Registro trattamenti base (Sez. 2)",
      "Fino a 3 appezzamenti",
      "Export PDF semplice",
      "Supporto community",
    ],
  },
  {
    name: "Pro",
    description: "Per aziende agricole medie",
    price: "9,90",
    period: "/mese",
    popular: true,
    cta: "Prova Pro Gratis",
    features: [
      "Tutte le 10 sezioni QDCA",
      "Appezzamenti illimitati",
      "Database prodotti fitosanitari completo",
      "15 controlli automatici conformità",
      "Ecoschemi PAC e Disciplinari PI",
      "Operazioni colturali (10 tipologie)",
      "Costi colturali con riepilogo €/ha",
      "Export PDF, JSON e XML conforme",
      "Dashboard analytics e radar chart",
      "Supporto email prioritario",
    ],
  },
  {
    name: "Premium",
    description: "Per aziende grandi e strutturate",
    price: "24,90",
    period: "/mese",
    popular: false,
    cta: "Prova Premium Gratis",
    features: [
      "Tutto il piano Pro",
      "Gestione magazzino completa",
      "Movimenti e alert scadenze/scorte",
      "DSS e suggerimenti trattamento",
      "Alert meteo integrati",
      "Accesso API",
      "Multi-utente",
      "Supporto prioritario dedicato",
    ],
  },
]

export function Pricing() {
  return (
    <section id="prezzi" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Prezzi
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Quanto costa il Quaderno di Campagna digitale?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Parti gratis con il quaderno di campagna base e passa al piano Pro quando sei pronto.
            Nessun vincolo, disdici quando vuoi.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl border p-6 lg:p-8",
                plan.popular
                  ? "border-primary bg-background shadow-xl shadow-primary/10"
                  : "border-border/60 bg-card"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-6 px-3 py-1">
                  {"Più Popolare"}
                </Badge>
              )}

              <div>
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-foreground">
                  {"€"}{plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <Button
                className="mt-6 w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                asChild
              >
                <Link href="#inizia">{plan.cta}</Link>
              </Button>

              <ul className="mt-8 flex flex-col gap-3" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CAA callout */}
        <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 text-center lg:p-8">
          <h3 className="text-lg font-semibold text-foreground">
            Sei un Centro di Assistenza Agricola (CAA)?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Gestisci centinaia di fascicoli da un{"'"}unica dashboard.
            Onboarding dedicato, SLA garantito e fatturazione personalizzata.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="mailto:info@cultivara.it">Richiedi un Preventivo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
