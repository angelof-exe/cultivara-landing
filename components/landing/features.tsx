import {
  ClipboardCheck,
  ShieldCheck,
  Smartphone,
  Database,
  FileDown,
  BarChart3,
  Warehouse,
  EuroIcon,
  Leaf,
} from "lucide-react"

const features = [
  {
    icon: ClipboardCheck,
    title: "Registro QDCA Completo",
    description:
      "Tutte le 10 sezioni AGEA: trattamenti, fertilizzazioni, irrigazioni, operazioni colturali, stoccaggio, macchine e operatori. Compilazione in meno di 60 secondi.",
  },
  {
    icon: ShieldCheck,
    title: "15 Controlli Automatici",
    description:
      "Conformità garantita: 8 controlli normativi (dosi, rame, nitrati), 4 Ecoschemi PAC 2023-2027 e 3 Disciplinari Produzione Integrata. Tutto verificato in tempo reale.",
  },
  {
    icon: Warehouse,
    title: "Magazzino Prodotti",
    description:
      "Gestione completa del magazzino: fitosanitari, fertilizzanti, sementi. Movimenti automatici, alert scadenze e scorte basse, collegamento ai siti di stoccaggio.",
  },
  {
    icon: EuroIcon,
    title: "Costi Colturali",
    description:
      "Registra e analizza i costi per appezzamento: trattamenti, fertilizzazioni, manodopera, meccanizzazione e altro. Riepilogo con €/ha e grafici aggregati.",
  },
  {
    icon: FileDown,
    title: "Export PDF, JSON e XML",
    description:
      "Genera il registro QDCA completo in PDF per i controlli, JSON e XML machine-readable per il SIAN. Formattazione italiana, tutte le sezioni incluse.",
  },
  {
    icon: Database,
    title: "Banca Dati Prodotti",
    description:
      "Database aggiornato dei prodotti fitosanitari dal Ministero della Salute. Etichette, usi autorizzati, dosi massime e contenuto rame.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First per 60+",
    description:
      "Progettato per funzionare perfettamente su smartphone e tablet. Font grandi, flussi lineari e interfaccia semplificata per chi lavora la terra.",
  },
  {
    icon: Leaf,
    title: "Ecoschemi e Disciplinari",
    description:
      "Verifica automatica Ecoschemi PAC: inerbimento arboree, colture leguminose, avvicendamento e protezione impollinatori. Controlli Produzione Integrata inclusi.",
  },
  {
    icon: BarChart3,
    title: "Dashboard e Analytics",
    description:
      "Monitora trattamenti, costi e conformità con grafici chiari. Punteggio conformità, radar chart e storico completo per ogni appezzamento.",
  },
]

export function Features() {
  return (
    <section id="funzionalita" className="border-t border-border/60 bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {"Funzionalità"}
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Tutto quello che serve nel tuo Quaderno di Campagna digitale
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Dalla registrazione dei trattamenti ai costi colturali, dal magazzino
            all{"'"}export per i controlli.
            {"Il quaderno di campagna online più completo e semplice da usare."}
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
