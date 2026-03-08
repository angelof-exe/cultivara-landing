import type { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  ArrowLeft,
  FileText,
  Shield,
  Database,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Building2,
  CreditCard,
  FolderOpen,
  Monitor,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Guida AGEA — Fascicolo Aziendale, SIAN e PAC per Agricoltori",
  description:
    "Guida completa ad AGEA per agricoltori: cos'è, fascicolo aziendale, Piano Colturale Grafico, SIAN, pagamenti PAC, come registrarsi e quali documenti servono.",
  keywords: [
    "AGEA guida",
    "fascicolo aziendale agricolo",
    "SIAN sistema informativo agricolo",
    "piano colturale grafico PCG",
    "PAC pagamenti agricoltura",
    "CUAA codice unico azienda agricola",
    "CAA centro assistenza agricola",
    "domanda unica PAC",
  ],
  alternates: {
    canonical: "https://cultivara.it/guida-agea",
  },
};

const sianServices = [
  {
    title: "Fascicolo Aziendale",
    description:
      "Documento elettronico che raccoglie tutti i dati dell'azienda agricola: terreni, fabbricati, mezzi di produzione, titoli PAC. È la \"carta d'identità\" dell'azienda.",
    icon: FolderOpen,
  },
  {
    title: "Piano Colturale Grafico (PCG)",
    description:
      "Rappresentazione cartografica delle superfici aziendali con indicazione delle colture praticate su ciascuna particella catastale. Obbligatorio per la domanda PAC.",
    icon: MapPin,
  },
  {
    title: "Quaderno di Campagna",
    description:
      "Registro elettronico dei trattamenti fitosanitari. Dal 2027 obbligatorio in formato digitale machine-readable (Reg. UE 2023/564).",
    icon: FileText,
  },
  {
    title: "Domanda Unica PAC",
    description:
      "Procedura telematica per la richiesta dei pagamenti diretti della Politica Agricola Comune. Richiede fascicolo aziendale e PCG aggiornati.",
    icon: CreditCard,
  },
  {
    title: "Gestione pagamenti",
    description:
      "Erogazione anticipazioni e saldi dei contributi PAC (FEAGA e FEASR), pagamenti nazionali e regionali a sostegno dell'agricoltura.",
    icon: Building2,
  },
  {
    title: "Controlli e verifiche",
    description:
      "Sistema Integrato di Gestione e Controllo (SIGC) per la verifica delle domande di aiuto, controlli in loco e telerilevamento.",
    icon: Shield,
  },
];

const fascicoloSteps = [
  {
    step: 1,
    title: "Scegli un CAA o accedi direttamente",
    description:
      "Puoi costituire il fascicolo tramite un Centro di Assistenza Agricola (CAA) autorizzato — con mandato unico ed esclusivo — oppure accedere direttamente al portale SIAN con SPID o CIE.",
  },
  {
    step: 2,
    title: "Raccogli i documenti necessari",
    description:
      "Documento d'identità, codice fiscale, visura camerale (se impresa), titoli di possesso dei terreni (proprietà, affitto, comodato), certificati catastali aggiornati.",
  },
  {
    step: 3,
    title: "Inserimento dati nel SIAN",
    description:
      "Il CAA o l'agricoltore inserisce nel sistema: dati anagrafici, consistenza terreni con riferimenti catastali, fabbricati aziendali, mezzi di produzione, titoli PAC.",
  },
  {
    step: 4,
    title: "Compilazione del Piano Colturale Grafico",
    description:
      "Dichiarazione delle colture praticate su ciascuna particella catastale, con delimitazione grafica delle superfici coltivate sulla cartografia di riferimento.",
  },
  {
    step: 5,
    title: "Validazione e sottoscrizione",
    description:
      "L'agricoltore sottoscrive la Scheda di Validazione, attestando la veridicità e completezza dei dati. Questo rende il fascicolo utilizzabile per tutti i procedimenti amministrativi.",
  },
  {
    step: 6,
    title: "Aggiornamento annuale",
    description:
      "Il fascicolo va confermato o aggiornato almeno una volta ogni anno solare (dall'11 novembre al 10 novembre successivo). Senza aggiornamento, viene posto in stato \"dormiente\".",
  },
];

const fascicoloContent = [
  {
    category: "Dati anagrafici",
    items: [
      "CUAA — Codice Unico di identificazione Azienda Agricola (codice fiscale del titolare o P.IVA)",
      "Ragione sociale e forma giuridica",
      "Sede legale e sede operativa",
      "Rappresentante legale e referenti",
    ],
  },
  {
    category: "Consistenza territoriale",
    items: [
      "Elenco terreni con riferimenti catastali (foglio, particella, sub)",
      "Titolo di possesso (proprietà, affitto, comodato, uso civico)",
      "Superficie totale e superficie agricola utilizzata (SAU)",
      "Coordinate geografiche e delimitazione grafica",
    ],
  },
  {
    category: "Piano Colturale Grafico",
    items: [
      "Colture praticate su ogni particella catastale",
      "Superfici a seminativo, arboree, prato, pascolo",
      "Elementi caratteristici del paesaggio (siepi, filari, muretti)",
      "Superfici di interesse ecologico (EFA)",
    ],
  },
  {
    category: "Patrimonio aziendale",
    items: [
      "Fabbricati rurali e strutture aziendali",
      "Consistenza zootecnica (capi in BDN)",
      "Macchine e attrezzature agricole",
      "Titoli PAC e diritti all'aiuto",
    ],
  },
];

export default function GuidaAgeaPage() {
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
              <Building2 className="h-4 w-4" />
              Guida per Agricoltori
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Guida AGEA
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground/80">
              Agenzia per le Erogazioni in Agricoltura
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              AGEA è l&apos;ente pubblico che gestisce i pagamenti della
              Politica Agricola Comune (PAC) in Italia, il Sistema Informativo
              Agricolo Nazionale (SIAN) e il fascicolo aziendale. Questa guida
              spiega cos&apos;è, come funziona e cosa deve fare ogni agricoltore
              per essere in regola.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <Building2 className="h-3.5 w-3.5" />
                Organismo Pagatore Nazionale
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700">
                <Database className="h-3.5 w-3.5" />
                Gestione SIAN
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700">
                <CreditCard className="h-3.5 w-3.5" />
                Pagamenti PAC
              </span>
            </div>
          </div>
        </section>

        {/* Cos'è AGEA */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Cos&apos;è AGEA
            </h2>
            <p className="mt-4 text-muted-foreground">
              L&apos;Agenzia per le Erogazioni in Agricoltura (AGEA) è un ente
              pubblico vigilato dal Ministero dell&apos;Agricoltura, della
              Sovranità Alimentare e delle Foreste (MASAF). Svolge un doppio
              ruolo:
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Organismo di Coordinamento
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Coordina tutti gli Organismi Pagatori regionali (OPR) sul
                  territorio nazionale, garantendo uniformità nelle procedure di
                  erogazione dei fondi europei FEAGA e FEASR.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <CreditCard className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Organismo Pagatore
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Eroga direttamente i pagamenti della PAC nelle Regioni che non
                  hanno un proprio Organismo Pagatore regionale. Gestisce
                  anticipazioni, saldi e controlli.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SIAN e Servizi */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il SIAN e i servizi per gli agricoltori
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il <strong>Sistema Informativo Agricolo Nazionale (SIAN)</strong>{" "}
              è la piattaforma tecnologica gestita da AGEA che offre servizi
              digitali a tutti gli attori del settore agricolo.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sianServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="rounded-xl border border-border/60 bg-card p-6"
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-4 font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fascicolo Aziendale */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il Fascicolo Aziendale
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il fascicolo aziendale è la{" "}
              <strong>&quot;carta d&apos;identità&quot;</strong>{" "}
              dell&apos;azienda agricola nel sistema SIAN. Contiene tutte le
              informazioni sull&apos;azienda e costituisce il prerequisito per
              qualsiasi richiesta di contributi PAC, PSR o altri aiuti pubblici.
            </p>

            {/* Contenuto del fascicolo */}
            <div className="mt-8 space-y-4">
              {fascicoloContent.map((section) => (
                <div
                  key={section.category}
                  className="rounded-xl border border-border/60 bg-card p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {section.category}
                  </h3>
                  <ul className="mt-3 space-y-2">
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

            {/* Alert aggiornamento */}
            <div className="mt-8 rounded-xl border-2 border-orange-200 bg-orange-50/50 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    Obbligo di aggiornamento annuale
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-orange-800">
                    Il fascicolo deve essere confermato o aggiornato{" "}
                    <strong>almeno una volta per anno solare</strong>{" "}
                    (dall&apos;11 novembre al 10 novembre dell&apos;anno
                    successivo). Un fascicolo non aggiornato viene posto in
                    stato{" "}
                    <strong>&quot;dormiente&quot;</strong> e chiuso
                    d&apos;ufficio, rendendo impossibile presentare domande di
                    aiuto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Come costituire il fascicolo */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Come costituire il Fascicolo Aziendale
            </h2>
            <p className="mt-4 text-muted-foreground">
              La procedura di costituzione o aggiornamento del fascicolo avviene
              sul portale SIAN, direttamente o tramite un CAA delegato.
            </p>
            <div className="mt-8 space-y-0">
              {fascicoloSteps.map((item, i) => (
                <div key={item.step} className="relative flex gap-6">
                  {/* Vertical line */}
                  {i < fascicoloSteps.length - 1 && (
                    <div className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-border" />
                  )}
                  {/* Step number */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  {/* Content */}
                  <div className="pb-10">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Piano Colturale Grafico */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il Piano Colturale Grafico (PCG)
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il PCG è la rappresentazione cartografica delle superfici
              aziendali con l&apos;indicazione delle colture praticate. È un
              elemento <strong>obbligatorio e imprescindibile</strong> per
              chiunque richieda aiuti basati sulla superficie.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <Layers className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Cosa contiene
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Delimitazione grafica di ogni particella catastale
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Coltura dichiarata su ciascuna superficie
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Superfici ammissibili e non ammissibili
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Elementi del paesaggio (EFA, siepi, fasce tampone)
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <RefreshCw className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Quando aggiornarlo
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Prima della presentazione della Domanda Unica PAC
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    In caso di cambio colturale
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    In caso di variazione dei terreni (acquisto, affitto,
                    cessione)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Quando richiesto dall&apos;Organismo Pagatore
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CAA */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il ruolo dei CAA
            </h2>
            <p className="mt-4 text-muted-foreground">
              I <strong>Centri di Assistenza Agricola (CAA)</strong> sono
              strutture autorizzate dal MASAF che assistono gli agricoltori nella
              gestione dei rapporti con AGEA e la Pubblica Amministrazione.
            </p>
            <div className="mt-8 rounded-xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Servizi offerti dai CAA
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Costituzione e aggiornamento del fascicolo aziendale
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Compilazione del Piano Colturale Grafico</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Presentazione della Domanda Unica PAC e domande PSR
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Gestione del registro trattamenti su delega
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Verifica conformità e assistenza ai controlli</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Consulenza su ecoschemi e condizionalità</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                <strong>Mandato:</strong> Per delegare la gestione del fascicolo
                a un CAA è necessario conferire un{" "}
                <strong>mandato unico ed esclusivo</strong>. Ciò significa che
                un&apos;azienda può avere un solo CAA delegato alla volta.
              </p>
            </div>
          </div>
        </section>

        {/* Accesso al SIAN */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Come accedere al portale SIAN
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Monitor className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Portale SIAN
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Accesso con <strong>SPID</strong>, <strong>CIE</strong> o{" "}
                  <strong>CNS</strong> al portale{" "}
                  <a
                    href="https://www.sian.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    sian.it
                  </a>
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Users className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Tramite CAA
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Il CAA accede per conto dell&apos;agricoltore con le proprie
                  credenziali istituzionali dopo il conferimento del mandato
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Clock className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Disponibilità
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Il portale è accessibile{" "}
                  <strong>24 ore su 24, 7 giorni su 7</strong> per la
                  consultazione del fascicolo e dei pagamenti
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collegamento con Cultivara */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              AGEA e il Quaderno di Campagna digitale
            </h2>
            <div className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Il quaderno di campagna nel sistema AGEA
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                AGEA, con le{" "}
                <strong>Istruzioni Operative n. 58</strong>, ha definito le
                specifiche per il quaderno di campagna dell&apos;agricoltore nel
                sistema SIAN. Dal{" "}
                <strong>1° gennaio 2027</strong>, in attuazione del{" "}
                <Link
                  href="/normativa-ue-2023-564"
                  className="text-primary underline hover:text-primary/80"
                >
                  Regolamento UE 2023/564
                </Link>
                , il registro dei trattamenti deve essere mantenuto in formato
                elettronico machine-readable. Il{" "}
                <Link
                  href="/dlgs-150-2012"
                  className="text-primary underline hover:text-primary/80"
                >
                  D.Lgs. 150/2012
                </Link>{" "}
                definisce gli obblighi di compilazione e le sanzioni.
              </p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  Integrazione SIAN prevista
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Cultivara è progettato per integrarsi nativamente con il
                  sistema SIAN/AGEA: sincronizzazione del fascicolo aziendale,
                  import dei dati catastali, e trasmissione del registro
                  trattamenti in formato conforme.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  Export machine-readable
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Cultivara genera automaticamente il registro trattamenti in
                  formato JSON e XML, conforme ai requisiti AGEA per il formato
                  elettronico leggibile meccanicamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center lg:p-12">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Gestisci il tuo quaderno di campagna con Cultivara
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Conforme ai requisiti AGEA e al Regolamento UE 2023/564.
                Registro trattamenti digitale, controlli automatici, export in
                formato machine-readable. Pensato per integrarsi con il sistema
                SIAN.
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

            {/* Fonti */}
            <div className="mt-8 rounded-lg border border-border/60 bg-muted/30 px-6 py-4">
              <p className="text-xs text-muted-foreground">
                <strong>Fonti:</strong> Sito ufficiale AGEA (
                <a
                  href="https://www.agea.gov.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                >
                  agea.gov.it
                  <ExternalLink className="h-3 w-3" />
                </a>
                ), Portale SIAN (
                <a
                  href="https://www.sian.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                >
                  sian.it
                  <ExternalLink className="h-3 w-3" />
                </a>
                ), Istruzioni Operative AGEA per il Fascicolo Aziendale
                Campagna 2026, Istruzioni Operative n. 58 — Quaderno di
                Campagna dell&apos;Agricoltore.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
