import type { Metadata } from "next"
import Link from "next/link"
import { Leaf, ArrowLeft, Shield, Mail, Database, Eye, Lock, Trash2, FileText } from "lucide-react"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Privacy Policy — Cultivara",
  description:
    "Informativa sul trattamento dei dati personali di Cultivara. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati in conformità al GDPR (Reg. UE 2016/679).",
  alternates: {
    canonical: "https://cultivara.it/privacy-policy",
  },
  robots: { index: true, follow: true },
}

const sections = [
  {
    icon: Database,
    title: "1. Titolare del trattamento",
    content: [
      "Il Titolare del trattamento dei dati personali è:",
      "**Cultivara** (progetto di Angelo Franciamore)",
      "Email: info@cultivara.it",
      "Per qualsiasi richiesta relativa alla privacy puoi scrivere direttamente a info@cultivara.it.",
    ],
  },
  {
    icon: FileText,
    title: "2. Dati raccolti e finalità",
    content: [
      "Raccogliamo e trattiamo i seguenti dati personali:",
      "**Dati forniti direttamente dall'utente:**",
      "• Indirizzo email — quando ti iscrivi alla lista d'attesa o crei un account. Finalità: inviarti aggiornamenti sul lancio del servizio e comunicazioni relative all'account.",
      "• Nome (facoltativo) — quando ti iscrivi. Finalità: personalizzare le comunicazioni.",
      "**Dati raccolti automaticamente:**",
      "• Dati di navigazione (pagine visitate, tempo di permanenza, interazioni) tramite Google Analytics 4 (GA4) — solo previo consenso. Finalità: migliorare il prodotto e l'esperienza utente.",
      "• Dati comportamentali per retargeting tramite Meta Pixel — solo previo consenso marketing. Finalità: mostrare annunci pertinenti su piattaforme Meta.",
      "• UTM parameters e dati di sessione — solo previo consenso analytics. Finalità: misurare l'efficacia delle campagne di marketing.",
      "**Dati di log tecnici:**",
      "• Indirizzo IP, browser, sistema operativo — raccolti automaticamente dal server per ragioni di sicurezza e diagnostica tecnica. Trattati in forma aggregata o anonimizzata ove possibile.",
    ],
  },
  {
    icon: Shield,
    title: "3. Base giuridica del trattamento",
    content: [
      "Il trattamento dei tuoi dati personali si fonda sulle seguenti basi giuridiche (art. 6 GDPR):",
      "• **Esecuzione di un contratto** (art. 6.1.b): per fornire il servizio Cultivara agli utenti registrati.",
      "• **Consenso** (art. 6.1.a): per l'iscrizione alla lista d'attesa, l'invio di comunicazioni di marketing e l'utilizzo di cookie analytics e marketing. Il consenso può essere revocato in qualsiasi momento.",
      "• **Legittimo interesse** (art. 6.1.f): per la sicurezza del sistema e la prevenzione di abusi.",
    ],
  },
  {
    icon: Eye,
    title: "4. Cookie e tecnologie di tracciamento",
    content: [
      "Utilizziamo i seguenti strumenti, attivati solo dopo il tuo consenso esplicito tramite il banner cookie:",
      "**Cookie tecnici (sempre attivi):** necessari al funzionamento del sito. Non richiedono consenso.",
      "**Google Analytics 4 (GA4):** raccoglie dati anonimi sul comportamento degli utenti per migliorare il servizio. I dati sono trattati da Google LLC (accordo DPA con Cultivara). Puoi optare fuori da GA4 tramite il pannello cookie o l'estensione Google Analytics Opt-out.",
      "**Meta Pixel:** raccoglie dati per la misurazione delle campagne pubblicitarie su Facebook/Instagram. I dati sono trattati da Meta Platforms Inc. (accordo DPA con Cultivara). Puoi gestire le preferenze pubblicitarie di Meta nelle impostazioni del tuo account Facebook.",
      "Per gestire o revocare il consenso ai cookie, utilizza il banner presente sul sito o cancella i cookie dal tuo browser.",
    ],
  },
  {
    icon: Lock,
    title: "5. Conservazione dei dati",
    content: [
      "Conserviamo i tuoi dati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:",
      "• **Email lista d'attesa:** fino alla cancellazione dell'account o alla revoca del consenso, e comunque non oltre 24 mesi dall'ultimo contatto.",
      "• **Dati account:** per tutta la durata del contratto di servizio e fino a 12 mesi dopo la sua cessazione, salvo obblighi di legge.",
      "• **Dati analytics (GA4):** 14 mesi (impostazione predefinita GA4).",
      "• **Log tecnici:** 90 giorni.",
      "Trascorsi questi termini, i dati vengono eliminati o anonimizzati in modo irreversibile.",
    ],
  },
  {
    icon: FileText,
    title: "6. Condivisione dei dati con terze parti",
    content: [
      "Non vendiamo né cediamo i tuoi dati personali a terzi per finalità di marketing. I dati possono essere comunicati ai seguenti soggetti, nella misura strettamente necessaria:",
      "• **Fornitori di servizi tecnici** (responsabili del trattamento): servizi cloud di hosting, provider email transazionale. Tutti vincolati da accordi di responsabilità del trattamento (DPA) conformi al GDPR.",
      "• **Google LLC** — per Google Analytics 4 (previo consenso).",
      "• **Meta Platforms Inc.** — per Meta Pixel (previo consenso marketing).",
      "• **Autorità giudiziarie o amministrative** — quando richiesto dalla legge o da ordini dell'autorità.",
      "Il trasferimento di dati verso paesi extra-UE (es. USA tramite Google e Meta) avviene sulla base delle Standard Contractual Clauses (SCC) approvate dalla Commissione Europea.",
    ],
  },
  {
    icon: Shield,
    title: "7. I tuoi diritti (art. 15-22 GDPR)",
    content: [
      "In qualità di interessato, hai i seguenti diritti in merito ai tuoi dati personali:",
      "• **Diritto di accesso** (art. 15): ottenere conferma che siano in corso trattamenti di dati che ti riguardano e riceverne copia.",
      "• **Diritto di rettifica** (art. 16): correggere dati inesatti o incompleti.",
      "• **Diritto alla cancellazione** (art. 17): chiedere la cancellazione dei tuoi dati ('diritto all'oblio'), salvo obblighi di conservazione previsti dalla legge.",
      "• **Diritto di limitazione** (art. 18): limitare il trattamento in determinati casi.",
      "• **Diritto alla portabilità** (art. 20): ricevere i dati in formato strutturato e leggibile da macchina.",
      "• **Diritto di opposizione** (art. 21): opporsi al trattamento per motivi legittimi.",
      "• **Revoca del consenso**: revocare in qualsiasi momento il consenso prestato, senza che ciò pregiudichi la liceità del trattamento precedente alla revoca.",
      "Per esercitare i tuoi diritti, scrivi a info@cultivara.it. Risponderemo entro 30 giorni. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
    ],
  },
  {
    icon: Trash2,
    title: "8. Sicurezza dei dati",
    content: [
      "Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, perdita o distruzione, tra cui:",
      "• Trasmissione dei dati cifrata tramite HTTPS (TLS).",
      "• Accesso ai dati limitato al personale autorizzato.",
      "• Monitoraggio continuo dell'infrastruttura per rilevare anomalie di sicurezza.",
      "In caso di violazione dei dati (data breach) che comporti rischi per i tuoi diritti, ti notificheremo senza ingiustificato ritardo, conformemente all'art. 34 GDPR.",
    ],
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://cultivara.it/privacy-policy",
  name: "Privacy Policy — Cultivara",
  description:
    "Informativa sul trattamento dei dati personali di Cultivara, conforme al GDPR (Reg. UE 2016/679).",
  inLanguage: "it",
  isPartOf: { "@type": "WebSite", name: "Cultivara", url: "https://cultivara.it" },
  dateModified: "2026-06-05",
}

function renderParagraph(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-foreground">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Cultivara home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
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
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-background py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Documenti legali
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679
              (GDPR) e del D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Ultimo aggiornamento: 5 giugno 2026</span>
              <span>•</span>
              <Link
                href="/termini-di-servizio"
                className="text-primary underline-offset-4 hover:underline"
              >
                Leggi i Termini di Servizio
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-10">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <div
                    key={section.title}
                    className="rounded-xl border border-border/60 bg-card p-6 lg:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h2 className="text-base font-semibold text-foreground">
                          {section.title}
                        </h2>
                        {section.content.map((line, i) => (
                          <div key={i}>{renderParagraph(line)}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-xl border border-border/60 bg-muted/30 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Contatti per la privacy</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Per qualsiasi domanda relativa al trattamento dei tuoi dati o per esercitare i
                    tuoi diritti, scrivi a{" "}
                    <a
                      href="mailto:info@cultivara.it"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      info@cultivara.it
                    </a>
                    . Risponderemo entro 30 giorni.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
