import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Target,
  Heart,
  Sprout,
  Shield,
  Users,
  Mail,
  Lightbulb,
  ArrowRight,
  Linkedin,
} from "lucide-react"
import { Footer } from "@/components/landing/footer"
import { primaryCtaHref } from "@/lib/config"

export const metadata: Metadata = {
  title: "Chi Siamo — La storia di Cultivara",
  description:
    "Cultivara nasce per rendere il Quaderno di Campagna digitale semplice come una conversazione. Scopri la missione, i valori e il team dietro al progetto.",
  alternates: {
    canonical: "https://cultivara.it/chi-siamo",
  },
  openGraph: {
    title: "Chi Siamo — Cultivara",
    description:
      "Cultivara nasce per rendere il Quaderno di Campagna digitale semplice come una conversazione. Scopri la missione e il team.",
    url: "https://cultivara.it/chi-siamo",
    type: "website",
  },
}

const values = [
  {
    icon: Heart,
    title: "Semplicità radicale",
    description:
      "Ogni funzione è progettata per chi lavora la terra ogni giorno, non per chi lavora con i computer. Se un trattamento richiede più di 60 secondi per essere registrato, abbiamo fallito.",
  },
  {
    icon: Shield,
    title: "Conformità senza compromessi",
    description:
      "Le normative agricole esistono per proteggere agricoltori, consumatori e ambiente. Cultivara non aggira le regole — le implementa correttamente, anche quando è più complesso.",
  },
  {
    icon: Lightbulb,
    title: "Tecnologia al servizio del campo",
    description:
      "La tecnologia non è il fine, è il mezzo. Usiamo AI, automazione e integrazione SIAN/AGEA per togliere carico burocratico agli agricoltori, non per aggiungerne.",
  },
  {
    icon: Users,
    title: "Costruito con gli agricoltori",
    description:
      "Ogni sprint di sviluppo include feedback da agricoltori reali. Non costruiamo per chi pensiamo siano gli utenti — costruiamo con chi usa il prodotto ogni giorno.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cultivara.it/#organization",
      name: "Cultivara",
      url: "https://cultivara.it",
      logo: "https://cultivara.it/android-chrome-512x512.png",
      description:
        "Cultivara è il software italiano per la gestione digitale del Quaderno di Campagna Aziendale (QDCA), conforme al Regolamento UE 2023/564. Obbligatorio in Italia dal 1° gennaio 2027.",
      email: "info@cultivara.it",
      foundingDate: "2024",
      areaServed: { "@type": "Country", name: "Italy" },
      sameAs: [
        "https://www.instagram.com/cultivara.it/",
        "https://www.facebook.com/cultivara.it",
        "https://www.linkedin.com/company/cultivarait",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@cultivara.it",
        availableLanguage: "Italian",
      },
    },
    {
      "@type": "Person",
      name: "Angelo Franciamore",
      jobTitle: "Fondatore",
      worksFor: { "@type": "Organization", name: "Cultivara", url: "https://cultivara.it" },
      knowsAbout: [
        "Quaderno di Campagna Aziendale",
        "Regolamento UE 2023/564",
        "Sviluppo software agricolo",
        "Agricoltura digitale",
        "PAC 2023-2027",
      ],
    },
    {
      "@type": "WebPage",
      url: "https://cultivara.it/chi-siamo",
      name: "Chi Siamo — Cultivara",
      description:
        "La storia e la missione di Cultivara: rendere il Quaderno di Campagna digitale semplice per ogni agricoltore italiano.",
      inLanguage: "it",
      isPartOf: { "@type": "WebSite", name: "Cultivara", url: "https://cultivara.it" },
    },
  ],
}

export default function ChiSiamoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar minimale */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Cultivara home">
            <Image src="/logo.svg" alt="Cultivara logo" width={36} height={36} className="h-9 w-9" />
            <span className="font-serif text-xl text-foreground">Cultivara</span>
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
              <Sprout className="h-4 w-4" />
              Il progetto
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Nati per semplificare la vita degli agricoltori italiani
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Cultivara è un software per la gestione digitale del Quaderno di Campagna Aziendale
              (QDCA). Lo abbiamo costruito perché dal 1° gennaio 2027 ogni azienda agricola
              italiana è obbligata a tenerlo in formato elettronico — e le soluzioni esistenti
              erano troppo complesse, troppo costose, o entrambe le cose.
            </p>
          </div>
        </section>

        {/* Il problema */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il problema che abbiamo deciso di risolvere
            </h2>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p className="text-base leading-relaxed">
                In Italia ci sono oltre <strong className="text-foreground">800.000 aziende agricole</strong>.
                Dal 2027, tutte quelle che usano prodotti fitosanitari dovranno registrare ogni
                trattamento in formato elettronico, secondo il Regolamento UE 2023/564.
              </p>
              <p className="text-base leading-relaxed">
                L&apos;età media degli agricoltori italiani è superiore ai{" "}
                <strong className="text-foreground">60 anni</strong>. Molti non hanno mai usato
                un software gestionale. Le soluzioni esistenti richiedevano ore di formazione,
                manuali tecnici e un supporto costante da parte di consulenti o CAA.
              </p>
              <p className="text-base leading-relaxed">
                Noi crediamo che un agricoltore che conosce ogni centimetro del suo campo non
                debba diventare esperto di software per rispettare una normativa europea.
                Il software deve adattarsi a lui, non viceversa.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: "800k+", label: "Aziende agricole in Italia" },
                { value: "1 gen 2027", label: "Obbligo digitale QDCA" },
                { value: "< 60s", label: "Per registrare un trattamento in Cultivara" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-card p-6 text-center"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Missione */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                  La nostra missione
                </h2>
                <blockquote className="mt-6 border-l-4 border-primary pl-6">
                  <p className="text-xl font-medium italic leading-relaxed text-foreground">
                    &ldquo;Rendere la compliance normativa agricola così semplice da non sembrare
                    compliance.&rdquo;
                  </p>
                </blockquote>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Cultivara copre tutte le 10 sezioni del Quaderno di Campagna richieste da AGEA:
                  trattamenti fitosanitari, fertilizzazioni, irrigazioni, operazioni colturali,
                  magazzino prodotti, costi colturali, attrezzature, siti di stoccaggio e operatori.
                  Con 15 controlli automatici di conformità che verificano in tempo reale il rispetto
                  delle norme su dosi massime, rame, nitrati, Ecoschemi PAC e disciplinari di
                  produzione integrata.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Il tutto con un&apos;interfaccia pensata per chi usa il telefono con una mano
                  sporca di terra, non per chi lavora in ufficio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Il team</h2>
            <p className="mt-4 text-muted-foreground">
              Cultivara è un progetto giovane, costruito con metodo e attenzione al dettaglio.
            </p>

            <div className="mt-10">
              <div className="rounded-xl border border-border/60 bg-card p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src="/angelo-franciamore-profile-picture.jpg"
                      alt="Angelo Franciamore — Fondatore di Cultivara"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Angelo Franciamore</h3>
                    <p className="mt-1 text-sm font-medium text-primary">Fondatore</p>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      Ha fondato Cultivara dopo aver visto da vicino quanto fosse difficile per
                      gli agricoltori italiani prepararsi all&apos;obbligo digitale del 2027. Ha
                      progettato il prodotto partendo dai vincoli reali del settore: connettività
                      instabile in campagna, utenti poco avvezzi alla tecnologia, normativa
                      complessa e in continua evoluzione.
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      L&apos;obiettivo dichiarato: un trattamento registrato in meno di 60 secondi,
                      direttamente dal campo.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <a
                        href="mailto:info@cultivara.it"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Mail className="h-4 w-4" />
                        Contatta
                      </a>
                      <a
                        href="https://www.linkedin.com/in/angelo-franciamore/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Stiamo crescendo.</strong> Cultivara è un
                prodotto in fase di lancio, costruito con il feedback diretto di agricoltori e
                consulenti agronomici. Se hai esperienza nel settore agricolo o agritech e vuoi
                contribuire al progetto, scrivici a{" "}
                <a
                  href="mailto:info@cultivara.it"
                  className="text-primary underline hover:text-primary/80"
                >
                  info@cultivara.it
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Valori */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">I nostri valori</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="rounded-xl border border-border/60 bg-card p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contatti */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Contattaci</h2>
            <p className="mt-4 text-muted-foreground">
              Per domande sul prodotto, sulla normativa, o per segnalare un problema.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:info@cultivara.it"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">info@cultivara.it</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/cultivarait"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">LinkedIn</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Cultivara</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center lg:p-12">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Pronto a digitalizzare il tuo quaderno di campagna?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Inizia gratis. Nessuna carta di credito richiesta. Conformità al Regolamento UE
                2023/564 garantita.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={primaryCtaHref}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Inizia Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/normativa-ue-2023-564"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Leggi la Normativa
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
