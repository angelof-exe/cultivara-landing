import { Check } from "lucide-react"

const sections = [
  "Sez. 1 — Anagrafica appezzamenti e colture (codice EPPO)",
  "Sez. 2-4 — Registro trattamenti fitosanitari con dosi e avversit\u00e0",
  "Sez. 5-6 — Fertilizzazioni organiche e chimiche con NPK",
  "Sez. 7 — Registro irrigazioni (volume, tipologia, superficie)",
  "Sez. 8 — Siti di stoccaggio materiali",
  "Sez. 9 — Macchine distribuzione e controllo funzionale",
  "Sez. 10 — Operatori e responsabili",
]

export function Compliance() {
  return (
    <section className="border-t border-border/60 bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Copy */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Compliance Nativa
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
              Quaderno di Campagna conforme: tutte le 10 sezioni AGEA
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Il quaderno di campagna di Cultivara copre ogni sezione richiesta dalla normativa.
              Controlli automatici su dosi, colture autorizzate e tempi di carenza
              ti proteggono dagli errori prima ancora di salvare.
            </p>
          </div>

          {/* Right — Checklist */}
          <div className="rounded-xl border border-border/60 bg-background p-6 lg:p-8">
            <ul className="flex flex-col gap-4" role="list">
              {sections.map((section) => (
                <li key={section} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm leading-relaxed text-foreground">
                    {section}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-primary/5 p-4">
              <p className="text-sm font-medium text-primary">
                Conforme a: Regolamento UE 2023/564 e D.Lgs. 150/2012
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
