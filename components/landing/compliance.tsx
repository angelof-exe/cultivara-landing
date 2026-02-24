import { Check, ShieldCheck, Leaf, FileCheck } from "lucide-react"

const qdcaSections = [
  "Sez. 1 — Anagrafica appezzamenti e colture (codice EPPO)",
  "Sez. 2-4 — Registro trattamenti fitosanitari con dosi e avversità",
  "Sez. 5-6 — Fertilizzazioni organiche e chimiche con NPK",
  "Sez. 7 — Registro irrigazioni (volume, tipologia, superficie)",
  "Sez. 8 — Siti di stoccaggio materiali",
  "Sez. 9 — Macchine distribuzione e controllo funzionale",
  "Sez. 10 — Operatori e responsabili con patentino fitosanitario",
]

const complianceGroups = [
  {
    icon: ShieldCheck,
    title: "8 Controlli Normativi",
    checks: [
      "Dose massima per ettaro (da etichetta prodotto)",
      "Colture autorizzate per prodotto",
      "Regola 30 giorni (D.Lgs. 150/2012)",
      "Apporto rame 7 anni — max 28 kg Cu/ha (Reg. UE 2018/1981)",
      "Direttiva Nitrati — 170/340 kg N/ha (Dir. 91/676/CEE)",
      "Ispezione attrezzature (controllo funzionale)",
      "Patentino operatori (scadenza)",
      "Siti di stoccaggio (presenza obbligatoria)",
    ],
  },
  {
    icon: Leaf,
    title: "4 Ecoschemi PAC 2023-2027",
    checks: [
      "Ecoschema 2 — Inerbimento colture arboree (vite, olivo, frutteto)",
      "Ecoschema 3 — Colture leguminose e foraggere (≥5% superficie)",
      "Ecoschema 4 — Avvicendamento colturale seminativi",
      "Ecoschema 5 — Protezione impollinatori (no insetticidi in fioritura)",
    ],
  },
  {
    icon: FileCheck,
    title: "3 Disciplinari Produzione Integrata",
    checks: [
      "Max 4 applicazioni stesso prodotto per appezzamento/stagione",
      "Monitoraggio IPM obbligatorio per appezzamenti trattati",
      "Max 6 principi attivi diversi per appezzamento/stagione",
    ],
  },
]

export function Compliance() {
  return (
    <section className="border-t border-border/60 bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Top — QDCA 10 sections */}
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
              15 controlli automatici su dosi, colture autorizzate, rame, nitrati,
              Ecoschemi PAC e Disciplinari PI ti proteggono dagli errori prima ancora di salvare.
            </p>
          </div>

          {/* Right — Checklist */}
          <div className="rounded-xl border border-border/60 bg-background p-6 lg:p-8">
            <ul className="flex flex-col gap-4" role="list">
              {qdcaSections.map((section) => (
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

        {/* Bottom — 15 Compliance Checks */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Controlli Automatici
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
              15 verifiche automatiche in tempo reale
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Cultivara verifica la conformità della tua azienda su tre livelli:
              normativa vigente, Ecoschemi PAC e Disciplinari di Produzione Integrata.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {complianceGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-border/60 bg-background p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5" role="list">
                  {group.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {check}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
