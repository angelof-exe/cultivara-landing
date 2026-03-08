import type { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  ArrowLeft,
  FileText,
  Calendar,
  Shield,
  Clock,
  Database,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Regolamento UE 2023/564 — Registro Trattamenti Elettronico",
  description:
    "Guida completa al Regolamento di esecuzione (UE) 2023/564: obblighi per il registro trattamenti fitosanitari in formato elettronico, scadenze, contenuto e come adeguarsi.",
  keywords: [
    "Regolamento UE 2023/564",
    "registro trattamenti elettronico",
    "quaderno di campagna digitale obbligo",
    "registro fitosanitari formato elettronico",
    "obbligo digitale 2027",
    "AGEA registro trattamenti",
  ],
  alternates: {
    canonical: "https://cultivara.it/normativa-ue-2023-564",
  },
};

const timelineEvents = [
  {
    date: "10 Marzo 2023",
    title: "Adozione del Regolamento",
    description:
      "La Commissione Europea adotta il Regolamento di esecuzione (UE) 2023/564, pubblicato nella Gazzetta Ufficiale L 74/4 del 13 marzo 2023.",
    icon: FileText,
  },
  {
    date: "2 Aprile 2023",
    title: "Entrata in vigore",
    description:
      "Il regolamento entra in vigore 20 giorni dopo la pubblicazione in Gazzetta Ufficiale.",
    icon: CheckCircle2,
  },
  {
    date: "1° Gennaio 2026",
    title: "Applicazione in UE",
    description:
      "Il regolamento diventa applicabile in tutta l'Unione Europea. Gli utilizzatori professionali devono iniziare a registrare i trattamenti in formato elettronico.",
    icon: Calendar,
  },
  {
    date: "1° Gennaio 2027",
    title: "Obbligo in Italia",
    description:
      "L'Italia ha fissato la scadenza per la conversione completa al formato elettronico. Dal 2027 tutti i registri devono essere digitali.",
    icon: AlertTriangle,
    highlight: true,
  },
];

const recordContent = [
  {
    category: "Trattamenti in campo aperto",
    items: [
      "Tipo di utilizzo del prodotto",
      "Denominazione commerciale e numero di autorizzazione",
      "Data di utilizzo e orario di inizio trattamento",
      "Dose di applicazione (kg/L per ettaro)",
      "Ubicazione e identificazione dell'area trattata",
      "Dimensioni dell'area trattata (in ettari)",
      "Coltura e situazione d'uso dei terreni",
      "Denominazione coltura secondo codici EPPO",
      "Stadio di sviluppo secondo monografia BBCH",
    ],
  },
  {
    category: "Trattamenti in ambienti chiusi",
    items: [
      "Denominazione prodotto e numero di autorizzazione",
      "Data del trattamento",
      "Dose (kg/L per m³ o m²)",
      "Identificazione della struttura",
      "Volume o superficie trattata",
    ],
  },
  {
    category: "Trattamento sementi",
    items: [
      "Denominazione prodotto e numero di autorizzazione",
      "Data del trattamento",
      "Dose (kg/L per kg, tonnellata o numero semi)",
      "Quantitativo trattato",
      "Denominazione coltura e numero lotto",
    ],
  },
];

export default function NormativaUE2023564Page() {
  return (
    <>
      {/* Navbar minimale */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Cultivara home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl text-foreground">
              Cultivara
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Normativa Europea
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Regolamento di esecuzione (UE) 2023/564
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Il regolamento della Commissione Europea del 10 marzo 2023 che
              stabilisce contenuto e formato dei registri sui prodotti
              fitosanitari tenuti dagli utilizzatori professionali, ai sensi del
              Regolamento (CE) n. 1107/2009.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <FileText className="h-3.5 w-3.5" />
                GU L 74/4 del 13.3.2023
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700">
                <Clock className="h-3.5 w-3.5" />
                Obbligo Italia: 1° Gennaio 2027
              </span>
            </div>
          </div>
        </section>

        {/* Cosa prevede */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Cosa prevede il Regolamento
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <Database className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Formato elettronico obbligatorio
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  I registri devono essere mantenuti in un{" "}
                  <strong>formato elettronico leggibile meccanicamente</strong>,
                  secondo la definizione della Direttiva (UE) 2019/1024
                  sull&apos;open data.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <Clock className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Registrazione tempestiva
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ogni utilizzo di prodotto fitosanitario deve essere registrato{" "}
                  <strong>senza indebito ritardo</strong>. La conversione in
                  formato elettronico deve avvenire entro{" "}
                  <strong>30 giorni</strong> dalla data di utilizzo.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Contenuto standardizzato
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  L&apos;allegato definisce le informazioni obbligatorie:
                  prodotto, dose, data, area trattata, coltura con{" "}
                  <strong>codici EPPO</strong> e stadio fenologico{" "}
                  <strong>BBCH</strong>.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Fornitura alle autorità
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Su richiesta dell&apos;autorità competente, l&apos;utilizzatore
                  deve fornire i registri{" "}
                  <strong>senza indebito ritardo</strong>. Termine di{" "}
                  <strong>10 giorni lavorativi</strong> per il formato
                  elettronico.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articoli principali */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Articoli principali
            </h2>
            <div className="mt-8 space-y-6">
              <article className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Articolo 1 — Contenuto dei registri
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Gli utilizzatori professionali di prodotti fitosanitari
                  forniscono le informazioni di cui all&apos;allegato del
                  regolamento. Gli Stati membri mettono a disposizione le
                  denominazioni comuni delle colture secondo i{" "}
                  <strong>codici EPPO</strong> e gli stadi di sviluppo secondo
                  la <strong>monografia BBCH</strong>. Sono previsti metodi
                  alternativi per l&apos;identificazione delle aree non
                  individuabili tramite unità fondiarie.
                </p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Articolo 2 — Formato dei registri
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I registri sono mantenuti in un{" "}
                  <strong>
                    formato elettronico leggibile meccanicamente
                  </strong>
                  , secondo la definizione dell&apos;articolo 2, punto 13, della
                  Direttiva (UE) 2019/1024 relativa all&apos;apertura dei dati.
                  Questo significa che il formato deve consentire
                  l&apos;estrazione automatica dei dati da parte di software —
                  non basta un semplice PDF o una scansione.
                </p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Articolo 3 — Tempistiche di registrazione
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  L&apos;utilizzatore registra ogni utilizzo di prodotto
                  fitosanitario <strong>senza indebito ritardo</strong>. Se il
                  registro non è inizialmente creato in formato elettronico,
                  deve essere convertito entro{" "}
                  <strong>30 giorni dalla data di utilizzo</strong>. Per gli
                  utilizzi antecedenti il 1° gennaio 2030, gli Stati membri
                  possono concedere periodi più lunghi, purché tutti i registri
                  siano disponibili in formato elettronico entro il 31 gennaio
                  dell&apos;anno successivo.
                </p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Articolo 4 — Fornitura alle autorità competenti
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Su richiesta dell&apos;autorità competente,
                  l&apos;utilizzatore fornisce le informazioni contenute nei
                  registri <strong>senza indebito ritardo</strong>. Se
                  l&apos;autorità richiede esplicitamente il formato
                  elettronico, il termine è di{" "}
                  <strong>10 giorni lavorativi</strong>.
                </p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Articolo 5 — Entrata in vigore e applicazione
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Il regolamento è entrato in vigore il{" "}
                  <strong>2 aprile 2023</strong> e si applica a decorrere dal{" "}
                  <strong>1° gennaio 2026</strong>. L&apos;Italia ha stabilito
                  che la conversione completa al formato elettronico debba
                  avvenire entro il 31 dicembre 2026, rendendo l&apos;obbligo
                  effettivo dal <strong>1° gennaio 2027</strong>.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Contenuto registri - Allegato */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Informazioni obbligatorie (Allegato)
            </h2>
            <p className="mt-4 text-muted-foreground">
              L&apos;allegato al Regolamento specifica nel dettaglio le
              informazioni che devono essere registrate per ogni tipologia di
              trattamento.
            </p>
            <div className="mt-8 space-y-6">
              {recordContent.map((section) => (
                <div
                  key={section.category}
                  className="rounded-xl border border-border/60 bg-card p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {section.category}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Timeline e scadenze
            </h2>
            <div className="mt-8 space-y-0">
              {timelineEvents.map((event, i) => {
                const Icon = event.icon;
                return (
                  <div key={event.date} className="relative flex gap-6">
                    {/* Vertical line */}
                    {i < timelineEvents.length - 1 && (
                      <div className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-border" />
                    )}
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                        event.highlight
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {/* Content */}
                    <div className="pb-10">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          event.highlight
                            ? "text-orange-600"
                            : "text-primary"
                        }`}
                      >
                        {event.date}
                      </span>
                      <h3 className="mt-1 text-base font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Situazione Italia */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              La situazione in Italia
            </h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-xl border-2 border-orange-200 bg-orange-50/50 p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-900">
                      Proroga al 1° Gennaio 2027
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-orange-800">
                      L&apos;Italia ha concesso una proroga rispetto alla
                      scadenza europea del 2026. I registri per l&apos;uso di
                      prodotti fitosanitari sul territorio italiano devono
                      essere convertiti in formato elettronico entro il{" "}
                      <strong>31 dicembre 2026</strong>. L&apos;obbligo pieno
                      del formato digitale decorre quindi dal{" "}
                      <strong>1° gennaio 2027</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Cosa significa per gli agricoltori
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Il <strong>registro cartaceo</strong> non sarà più valido
                      dal 2027 — serve un formato elettronico leggibile da
                      software
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Non basta un <strong>PDF o una scansione</strong> — il
                      formato deve essere machine-readable (es. JSON, XML, o
                      database strutturato)
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Ogni trattamento va registrato{" "}
                      <strong>entro 30 giorni</strong> dall&apos;applicazione in
                      formato elettronico
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Le autorità possono richiedere i registri elettronici con
                      un preavviso di soli{" "}
                      <strong>10 giorni lavorativi</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Le colture devono essere identificate con{" "}
                      <strong>codici EPPO</strong> standard europei
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Normativa italiana di riferimento
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong>D.Lgs. 150/2012</strong> — Attuazione della
                      Direttiva 2009/128/CE sull&apos;utilizzo sostenibile dei
                      pesticidi
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong>Reg. (CE) 1107/2009</strong> — Immissione in
                      commercio dei prodotti fitosanitari (base giuridica del
                      Reg. UE 2023/564)
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong>Piano d&apos;Azione Nazionale (PAN)</strong> —
                      Uso sostenibile dei prodotti fitosanitari in Italia
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center lg:p-12">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Preparati all&apos;obbligo con Cultivara
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Cultivara è già conforme al Regolamento UE 2023/564. Registro
                trattamenti digitale, codici EPPO, export in formato
                machine-readable (JSON, XML). Inizia gratis oggi.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/#prezzi"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Inizia Gratis
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Scopri tutte le funzionalità
                </Link>
              </div>
            </div>

            {/* Fonte */}
            <div className="mt-8 rounded-lg border border-border/60 bg-muted/30 px-6 py-4">
              <p className="text-xs text-muted-foreground">
                <strong>Fonti:</strong> Testo del Regolamento di esecuzione (UE)
                2023/564 della Commissione del 10 marzo 2023, pubblicato nella
                Gazzetta Ufficiale dell&apos;Unione Europea L 74/4 del
                13.3.2023. Modificato dal Regolamento di esecuzione (UE)
                2025/2203. Per il testo ufficiale completo, consultare{" "}
                <a
                  href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32023R0564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                >
                  EUR-Lex
                  <ExternalLink className="h-3 w-3" />
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
