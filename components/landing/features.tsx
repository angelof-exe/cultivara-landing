import {
  ClipboardCheck,
  ShieldCheck,
  Smartphone,
  Database,
  FileText,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: ClipboardCheck,
    title: "Registro Trattamenti",
    description:
      "Compila il registro in meno di 60 secondi. Interfaccia guidata, campi precompilati e controllo automatico delle dosi.",
  },
  {
    icon: ShieldCheck,
    title: "Conformit\u00e0 Garantita",
    description:
      "Copertura completa delle 10 sezioni AGEA. Controlli automatici su colture autorizzate, dosi e tempi di carenza.",
  },
  {
    icon: Database,
    title: "Banca Dati Prodotti",
    description:
      "Database aggiornato dei prodotti fitosanitari con etichette, usi autorizzati e alert automatici sulle modifiche.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description:
      "Progettato per funzionare perfettamente su smartphone e tablet. Registra i trattamenti direttamente dal campo.",
  },
  {
    icon: FileText,
    title: "Export PDF e SIAN",
    description:
      "Genera il registro trattamenti in PDF pronto per i controlli ASL e ICQRF. Sincronizzazione automatica con il SIAN.",
  },
  {
    icon: BarChart3,
    title: "Dashboard e Analytics",
    description:
      "Monitora trattamenti, costi e scadenze con grafici chiari. Storico completo per ogni appezzamento.",
  },
]

export function Features() {
  return (
    <section id="funzionalita" className="border-t border-border/60 bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {"Funzionalit\u00e0"}
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Tutto quello che serve nel tuo Quaderno di Campagna digitale
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Dalla registrazione dei trattamenti all{"'"}export per i controlli.
            {"Il quaderno di campagna online pi\u00f9 completo e semplice da usare."}
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/60 bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
