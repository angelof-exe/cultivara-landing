import { UserPlus, MapPin, ClipboardEdit, FileCheck } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Registra la tua azienda",
    description:
      "Crea il tuo account gratuito in 2 minuti. Inserisci il CUAA e i dati dell'azienda agricola.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Aggiungi gli appezzamenti",
    description:
      "Carica i tuoi appezzamenti con dati catastali e colture. Importa direttamente dal fascicolo aziendale.",
  },
  {
    icon: ClipboardEdit,
    number: "03",
    title: "Registra i trattamenti",
    description:
      "Compila il registro dal campo con il tuo smartphone. Prodotti suggeriti, dosi controllate automaticamente.",
  },
  {
    icon: FileCheck,
    number: "04",
    title: "Esporta per i controlli",
    description:
      "Genera il registro in PDF, JSON o XML con un click.",
  },
]

export function HowItWorks() {
  return (
    <section id="come-funziona" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Come Funziona
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Compila il Quaderno di Campagna in 4 passi
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Nessuna formazione necessaria. Cultivara ti guida passo dopo passo nella compilazione del quaderno di campagna digitale.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-start">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[22px] top-[56px] hidden h-px w-[calc(100%+2rem)] bg-border lg:block" />
              )}

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step.number}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
