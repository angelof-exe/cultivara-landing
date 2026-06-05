import type { Metadata } from "next"
import Link from "next/link"
import { Leaf, ArrowLeft, FileText, Shield, AlertTriangle, Scale, Mail, CheckCircle2 } from "lucide-react"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Termini di Servizio — Cultivara",
  description:
    "Termini e condizioni di utilizzo del servizio Cultivara, il software per la gestione digitale del Quaderno di Campagna Aziendale (QDCA).",
  alternates: {
    canonical: "https://cultivara.it/termini-di-servizio",
  },
  robots: { index: true, follow: true },
}

const sections = [
  {
    icon: FileText,
    title: "1. Definizioni e oggetto del contratto",
    content: [
      "I presenti Termini di Servizio ('Termini') regolano l'accesso e l'utilizzo del servizio Cultivara ('Servizio'), messo a disposizione da **Cultivara** (progetto di Angelo Franciamore, di seguito 'Cultivara' o 'noi').",
      "Con **'Utente'** si intende qualsiasi persona fisica o giuridica che accede al Servizio o si iscrive alla lista d'attesa.",
      "Con **'Account'** si intende l'insieme delle credenziali e delle configurazioni associate a un Utente registrato.",
      "Accedendo al Servizio o iscrivendoti alla lista d'attesa, dichiari di aver letto, compreso e accettato integralmente i presenti Termini. Se non accetti i Termini, non puoi utilizzare il Servizio.",
    ],
  },
  {
    icon: CheckCircle2,
    title: "2. Descrizione del servizio",
    content: [
      "Cultivara è un software SaaS (Software as a Service) per la gestione digitale del **Quaderno di Campagna Aziendale (QDCA)**, conforme al Regolamento UE 2023/564 e al D.Lgs. 150/2012.",
      "Il Servizio include, in base al piano sottoscritto:",
      "• Registrazione e gestione delle 10 sezioni QDCA previste da AGEA (appezzamenti, trattamenti fitosanitari, fertilizzazioni, irrigazioni, operazioni colturali, magazzino, costi, attrezzature, siti di stoccaggio, operatori).",
      "• Controlli automatici di conformità normativa (dosi massime, rame, nitrati, Ecoschemi PAC, disciplinari di produzione integrata).",
      "• Esportazione del QDCA in formato PDF, JSON e XML.",
      "• Assistente vocale AI per l'inserimento rapido dei dati.",
      "Cultivara è attualmente in **fase di lancio (beta)**. Alcune funzionalità potrebbero non essere disponibili o essere soggette a modifiche. Ci impegniamo a comunicare in anticipo eventuali cambiamenti significativi.",
    ],
  },
  {
    icon: Shield,
    title: "3. Registrazione e account",
    content: [
      "Per accedere al Servizio è necessario creare un Account fornendo un indirizzo email valido e una password.",
      "L'Utente è responsabile di:",
      "• Mantenere riservate le proprie credenziali di accesso.",
      "• Tutte le attività svolte tramite il proprio Account.",
      "• Notificare immediatamente Cultivara in caso di uso non autorizzato dell'Account scrivendo a info@cultivara.it.",
      "Cultivara non è responsabile per perdite derivanti dall'uso non autorizzato dell'Account dell'Utente, salvo che tale accesso sia stato causato da negligenza di Cultivara.",
      "L'Utente deve avere almeno 18 anni per registrarsi. Se si registra per conto di un'azienda agricola o di un'organizzazione, dichiara di avere l'autorità per vincolare tale entità ai presenti Termini.",
    ],
  },
  {
    icon: FileText,
    title: "4. Obblighi dell'Utente",
    content: [
      "L'Utente si impegna a:",
      "• Fornire informazioni accurate e aggiornate al momento della registrazione e durante l'utilizzo del Servizio.",
      "• Utilizzare il Servizio esclusivamente per finalità lecite e conformi alla normativa vigente.",
      "• Non utilizzare il Servizio per inserire dati falsi nel QDCA — la falsità delle registrazioni obbligatorie può costituire reato ai sensi della normativa italiana vigente.",
      "• Non tentare di accedere a dati di altri Utenti o di compromettere la sicurezza del Servizio.",
      "• Non utilizzare il Servizio per attività che violino diritti di proprietà intellettuale di terzi.",
      "**Responsabilità normativa:** Cultivara fornisce strumenti per facilitare la conformità, ma la **correttezza e completezza** delle registrazioni QDCA rimane esclusiva responsabilità dell'Utente. Cultivara non sostituisce la consulenza agronomica o legale professionale.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "5. Limitazione di responsabilità",
    content: [
      "Nella misura massima consentita dalla legge applicabile:",
      "• Cultivara fornisce il Servizio **'così com'è'** e **'come disponibile'**, senza garanzie di qualsiasi tipo, esplicite o implicite, incluse, senza limitazione, garanzie di commerciabilità, idoneità per uno scopo particolare o non violazione.",
      "• Cultivara non garantisce che il Servizio sia ininterrotto, privo di errori o sicuro, né che eventuali difetti vengano corretti in tempi determinati.",
      "• Cultivara non è responsabile per **perdite indirette, incidentali, speciali o consequenziali** derivanti dall'uso o dall'impossibilità di utilizzare il Servizio, incluse, senza limitazione, perdite di dati, profitti mancati o costi di servizi sostitutivi.",
      "• La responsabilità totale di Cultivara nei confronti dell'Utente per qualsiasi causa, indipendentemente dalla forma dell'azione, non supererà l'importo pagato dall'Utente per il Servizio nei 12 mesi precedenti all'evento che ha dato origine alla responsabilità.",
      "**Conformità normativa:** Cultivara si impegna a mantenere il Servizio allineato alla normativa vigente (Reg. UE 2023/564, D.Lgs. 150/2012), ma non garantisce che il semplice utilizzo del Servizio esenti l'Utente da responsabilità in caso di violazioni normative attribuibili a comportamenti dell'Utente stesso.",
    ],
  },
  {
    icon: Shield,
    title: "6. Proprietà intellettuale",
    content: [
      "Tutti i diritti di proprietà intellettuale sul Servizio, inclusi codice sorgente, design, testi, loghi e marchi, appartengono a Cultivara o ai suoi licenziatari.",
      "L'Utente riceve una licenza limitata, non esclusiva, non trasferibile e revocabile per accedere e utilizzare il Servizio per le proprie finalità agricole, nel rispetto dei presenti Termini.",
      "**Dati dell'Utente:** L'Utente mantiene la piena proprietà dei dati inseriti nel Servizio (registrazioni QDCA, dati aziendali). Cultivara ottiene una licenza limitata per trattare tali dati esclusivamente al fine di erogare il Servizio e come descritto nella Privacy Policy.",
    ],
  },
  {
    icon: FileText,
    title: "7. Prezzi e pagamenti",
    content: [
      "Cultivara è attualmente in **fase gratuita**: tutte le funzionalità sono accessibili senza costi durante il periodo di lancio.",
      "Quando Cultivara introdurrà piani a pagamento, te ne informeremo con almeno **30 giorni di preavviso** via email all'indirizzo registrato. Potrai scegliere se continuare con un piano gratuito (se disponibile) o sottoscrivere un piano a pagamento.",
      "I prezzi saranno espressi in Euro (€) e inclusi di IVA applicabile, salvo diversa indicazione.",
      "I pagamenti saranno processati tramite fornitori terzi sicuri (es. Stripe). Cultivara non memorizza i dati della carta di credito dell'Utente.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "8. Sospensione e risoluzione",
    content: [
      "**Da parte dell'Utente:** Puoi chiudere il tuo Account in qualsiasi momento scrivendo a info@cultivara.it. In caso di piano a pagamento, la chiusura avrà effetto alla scadenza del periodo già pagato.",
      "**Da parte di Cultivara:** Ci riserviamo il diritto di sospendere o terminare l'accesso al Servizio con preavviso di 30 giorni, salvo nei casi di:",
      "• Violazione grave dei presenti Termini.",
      "• Comportamento fraudolento o illegale accertato.",
      "• Mancato pagamento (per i piani a pagamento).",
      "In questi casi, la sospensione potrà essere immediata.",
      "**Effetti della risoluzione:** In caso di chiusura dell'Account, potrai scaricare i tuoi dati (esportazione QDCA) per un periodo di 30 giorni dalla notifica. Trascorso tale termine, i dati saranno eliminati come descritto nella Privacy Policy.",
    ],
  },
  {
    icon: Scale,
    title: "9. Legge applicabile e foro competente",
    content: [
      "I presenti Termini sono regolati dalla **legge italiana**.",
      "Per qualsiasi controversia relativa all'interpretazione, validità o esecuzione dei presenti Termini, le parti si impegnano preliminarmente a tentare una risoluzione amichevole entro 30 giorni dalla notifica formale della contestazione.",
      "In caso di mancata risoluzione amichevole, le controversie saranno deferite alla competenza esclusiva del **Tribunale di Bari** (sede legale di Cultivara).",
      "Per gli Utenti consumatori (persone fisiche che agiscono al di fuori della propria attività professionale), rimane ferma la competenza del tribunale del luogo di residenza o domicilio del consumatore ai sensi del Codice del Consumo (D.Lgs. 206/2005).",
    ],
  },
  {
    icon: FileText,
    title: "10. Modifiche ai Termini",
    content: [
      "Cultivara si riserva il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche saranno comunicate con almeno **15 giorni di preavviso** via email all'indirizzo registrato e tramite avviso in evidenza sul Servizio.",
      "Se non accetti le modifiche, puoi chiudere il tuo Account prima della data di entrata in vigore delle nuove condizioni. Il proseguimento dell'utilizzo del Servizio dopo tale data costituisce accettazione delle modifiche.",
      "La versione più aggiornata dei Termini è sempre disponibile su cultivara.it/termini-di-servizio.",
    ],
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://cultivara.it/termini-di-servizio",
  name: "Termini di Servizio — Cultivara",
  description:
    "Termini e condizioni di utilizzo del servizio Cultivara per la gestione del Quaderno di Campagna Aziendale.",
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

export default function TerminiDiServizioPage() {
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
              <Scale className="h-4 w-4" />
              Documenti legali
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Termini di Servizio
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Le condizioni che regolano l&apos;accesso e l&apos;utilizzo del servizio Cultivara per
              la gestione digitale del Quaderno di Campagna Aziendale.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Ultimo aggiornamento: 5 giugno 2026</span>
              <span>•</span>
              <Link
                href="/privacy-policy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Leggi la Privacy Policy
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
                  <p className="text-sm font-semibold text-foreground">Hai domande?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Per qualsiasi dubbio sui presenti Termini o sul funzionamento del Servizio,
                    scrivi a{" "}
                    <a
                      href="mailto:info@cultivara.it"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      info@cultivara.it
                    </a>
                    . Risponderemo entro 5 giorni lavorativi.
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
