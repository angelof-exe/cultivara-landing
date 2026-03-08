import type { Metadata } from "next";
import Link from "next/link";
import {
  Leaf,
  ArrowLeft,
  FileText,
  Shield,
  GraduationCap,
  Wrench,
  BookOpen,
  Bug,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Users,
  Clock,
  Ban,
  Sprout,
  TreePine,
} from "lucide-react";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "D.Lgs. 150/2012 — Uso Sostenibile dei Prodotti Fitosanitari",
  description:
    "Guida completa al Decreto Legislativo 150/2012: obblighi per agricoltori, registro trattamenti, Piano d'Azione Nazionale, difesa integrata, sanzioni e come adeguarsi.",
  keywords: [
    "D.Lgs. 150/2012",
    "decreto legislativo 150 2012",
    "uso sostenibile pesticidi",
    "registro trattamenti fitosanitari",
    "quaderno di campagna obbligo",
    "PAN piano azione nazionale",
    "difesa integrata",
    "patentino fitosanitario",
    "sanzioni registro trattamenti",
  ],
  alternates: {
    canonical: "https://cultivara.it/dlgs-150-2012",
  },
};

const chapters = [
  {
    number: "I",
    title: "Disposizioni generali",
    articles: "Art. 1-5",
    description:
      "Definisce l'oggetto, le definizioni chiave (utilizzatore professionale, distributore, consulente), le autorità competenti (Ministeri e Regioni) e istituisce il Consiglio tecnico-scientifico sull'uso sostenibile dei prodotti fitosanitari.",
    icon: FileText,
  },
  {
    number: "II",
    title: "Piano d'Azione Nazionale (PAN)",
    articles: "Art. 6",
    description:
      "Stabilisce il Piano d'Azione Nazionale che definisce obiettivi, misure e tempi per ridurre i rischi dei prodotti fitosanitari sulla salute umana, l'ambiente e la biodiversità. Il PAN ha durata quinquennale ed è aggiornato almeno ogni 5 anni.",
    icon: BookOpen,
  },
  {
    number: "III",
    title: "Formazione, vendita e informazione",
    articles: "Art. 7-10",
    description:
      "Disciplina la formazione obbligatoria per utilizzatori professionali, distributori e consulenti. Istituisce il sistema di certificazione (patentino). Regola la vendita di prodotti fitosanitari e le campagne di informazione e sensibilizzazione.",
    icon: GraduationCap,
  },
  {
    number: "IV",
    title: "Controllo attrezzature",
    articles: "Art. 12",
    description:
      "Le attrezzature per l'applicazione di prodotti fitosanitari ad uso professionale sono soggette a controllo funzionale periodico. Le attrezzature nuove vanno controllate entro 5 anni dall'acquisto, poi con cadenza regolare.",
    icon: Wrench,
  },
  {
    number: "V",
    title: "Pratiche e usi specifici",
    articles: "Art. 13-15",
    description:
      "Regola l'irrorazione aerea (vietata in via generale), la tutela dell'ambiente acquatico, la riduzione dell'uso in aree specifiche (parchi, giardini, scuole, ospedali) e la manipolazione e stoccaggio dei prodotti.",
    icon: TreePine,
  },
  {
    number: "VI",
    title: "Difesa integrata",
    articles: "Art. 16-17",
    description:
      "Introduce l'obbligo della difesa integrata per tutti gli utilizzatori professionali a partire dal 1° gennaio 2014. Istituisce il registro dei trattamenti (quaderno di campagna) con obbligo di compilazione entro 30 giorni dal trattamento.",
    icon: Bug,
    highlight: true,
  },
  {
    number: "VII",
    title: "Sanzioni",
    articles: "Art. 18-24",
    description:
      "Definisce le sanzioni amministrative per le violazioni. La mancata tenuta del registro trattamenti comporta una sanzione da 500 a 1.500 euro. In caso di violazione reiterata, sospensione da 1 a 6 mesi o revoca dell'autorizzazione.",
    icon: AlertTriangle,
  },
];

const registerRequirements = [
  {
    label: "Dati anagrafici dell'azienda",
    detail: "Ragione sociale, CUAA, sede legale",
  },
  {
    label: "Denominazione della coltura trattata",
    detail: "Con codice EPPO e superficie in ettari",
  },
  {
    label: "Data del trattamento",
    detail: "Giorno, mese e anno di esecuzione",
  },
  {
    label: "Prodotto fitosanitario utilizzato",
    detail: "Denominazione commerciale e numero di registrazione",
  },
  {
    label: "Quantità impiegata",
    detail: "In kg o litri per ettaro di superficie trattata",
  },
  {
    label: "Avversità che ha reso necessario il trattamento",
    detail: "Organismo nocivo, infestante o malattia",
  },
  {
    label: "Data di semina/trapianto e raccolta",
    detail: "Per le colture alimentari, necessarie per verificare i tempi di carenza",
  },
];

const sanctions = [
  {
    violation: "Mancata tenuta del registro trattamenti",
    penalty: "Sanzione da 500 a 1.500 euro",
    reference: "Art. 24, comma 6",
  },
  {
    violation: "Violazione reiterata del registro trattamenti",
    penalty: "Sospensione 1-6 mesi o revoca autorizzazione",
    reference: "Art. 24, comma 6",
  },
  {
    violation: "Utilizzo di prodotti non autorizzati",
    penalty: "Sanzione da 5.000 a 20.000 euro",
    reference: "Art. 18",
  },
  {
    violation: "Irrorazione aerea non autorizzata",
    penalty: "Sanzione da 5.000 a 20.000 euro",
    reference: "Art. 20",
  },
  {
    violation: "Mancato controllo funzionale attrezzature",
    penalty: "Sanzione da 500 a 2.000 euro",
    reference: "Art. 22",
  },
  {
    violation: "Vendita a soggetti senza patentino",
    penalty: "Sanzione da 5.000 a 20.000 euro",
    reference: "Art. 19",
  },
];

export default function DLgs150Page() {
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
              Normativa Italiana
            </div>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
              D.Lgs. 14 agosto 2012, n. 150
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground/80">
              Uso sostenibile dei prodotti fitosanitari
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Attuazione della Direttiva 2009/128/CE che istituisce un quadro
              per l&apos;azione comunitaria ai fini dell&apos;utilizzo
              sostenibile dei pesticidi. Il decreto introduce obblighi
              fondamentali per gli agricoltori italiani: registro trattamenti,
              patentino fitosanitario, difesa integrata e Piano d&apos;Azione
              Nazionale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <FileText className="h-3.5 w-3.5" />
                GU n. 202 del 30.08.2012
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700">
                <Shield className="h-3.5 w-3.5" />
                Direttiva 2009/128/CE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700">
                <Clock className="h-3.5 w-3.5" />
                Mod. D.Lgs. 10/2016
              </span>
            </div>
          </div>
        </section>

        {/* Obiettivi */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Obiettivi del Decreto
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il D.Lgs. 150/2012 definisce le misure per un uso sostenibile dei
              prodotti fitosanitari, con tre obiettivi principali:
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Users className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Salute umana
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ridurre i rischi e gli impatti dell&apos;uso dei pesticidi
                  sulla salute degli operatori e dei consumatori
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Sprout className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Ambiente
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Proteggere l&apos;ambiente acquatico, le acque sotterranee e
                  gli ecosistemi terrestri
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Bug className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Difesa integrata
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Promuovere metodi alternativi e non chimici per la protezione
                  delle colture
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Struttura - Capi */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Struttura del Decreto
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il decreto si articola in 7 Capi e 24 Articoli che disciplinano
              tutti gli aspetti dell&apos;uso sostenibile dei prodotti
              fitosanitari.
            </p>
            <div className="mt-8 space-y-4">
              {chapters.map((chapter) => {
                const Icon = chapter.icon;
                return (
                  <div
                    key={chapter.number}
                    className={`rounded-xl border bg-card p-6 ${
                      chapter.highlight
                        ? "border-primary/40 ring-1 ring-primary/20"
                        : "border-border/60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          chapter.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            Capo {chapter.number} — {chapter.title}
                          </h3>
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {chapter.articles}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Registro trattamenti */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Il Registro dei Trattamenti
            </h2>
            <p className="mt-4 text-muted-foreground">
              L&apos;articolo 16, comma 3 del decreto istituisce il{" "}
              <strong>registro dei trattamenti</strong> (comunemente noto come
              &quot;quaderno di campagna&quot;), uno degli obblighi più
              importanti per gli agricoltori italiani.
            </p>

            {/* Chi deve compilarlo */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Chi è obbligato
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Titolari di aziende agricole</li>
                  <li>Acquirenti di prodotti fitosanitari</li>
                  <li>Utilizzatori professionali</li>
                  <li>Centri di Assistenza Agricola (CAA) su delega</li>
                  <li>Cooperative (registro unico con deleghe dei soci)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <Ban className="h-5 w-5 text-muted-foreground" />
                  Chi è esente
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    Chi utilizza prodotti fitosanitari esclusivamente in{" "}
                    <strong>orti e giardini familiari</strong>
                  </li>
                  <li>
                    A condizione che i prodotti siano destinati
                    all&apos;autoconsumo e non alla vendita
                  </li>
                  <li>
                    A condizione che si utilizzino prodotti per uso non
                    professionale
                  </li>
                </ul>
              </div>
            </div>

            {/* Cosa registrare */}
            <div className="mt-8 rounded-xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Informazioni obbligatorie nel registro
              </h3>
              <div className="mt-4 space-y-3">
                {registerRequirements.map((req) => (
                  <div
                    key={req.label}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="font-medium text-foreground">
                        {req.label}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {req.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tempistiche */}
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <Clock className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 text-2xl font-bold text-foreground">
                  30 giorni
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Termine massimo per registrare ogni trattamento dalla data di
                  esecuzione
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <FileText className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 text-2xl font-bold text-foreground">
                  3 anni
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Periodo di conservazione obbligatoria del registro in azienda
                  (5 anni con aiuti UE)
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-orange-500" />
                <p className="mt-3 text-2xl font-bold text-foreground">
                  Digitale
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dal 2027 il registro deve essere in formato elettronico (Reg.
                  UE 2023/564)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAN */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Piano d&apos;Azione Nazionale (PAN)
            </h2>
            <p className="mt-4 text-muted-foreground">
              L&apos;art. 6 del decreto istituisce il PAN, strumento strategico
              per la riduzione dei rischi legati ai prodotti fitosanitari. Il
              primo PAN è stato adottato nel 2014.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  Cosa definisce il PAN
                </h3>
                <ul className="mt-3 space-y-2.5">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Obiettivi quantitativi di riduzione dei rischi
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Misure e tempi per il raggiungimento degli obiettivi
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Indicatori per il monitoraggio dell&apos;attuazione
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Criteri per la formazione degli utilizzatori professionali
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  Aree di intervento
                </h3>
                <ul className="mt-3 space-y-2.5">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Formazione e certificazione (patentino)
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Controllo funzionale delle attrezzature
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Tutela delle aree protette e acque
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Promozione della difesa integrata e biologica
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Difesa integrata */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              La Difesa Integrata
            </h2>
            <p className="mt-4 text-muted-foreground">
              Dal <strong>1° gennaio 2014</strong> tutti gli utilizzatori
              professionali sono obbligati ad applicare i principi della difesa
              integrata (art. 16-17), che prevede:
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  1. Prevenzione e monitoraggio
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Privilegiare le tecniche agronomiche preventive: rotazione
                  colturale, scelta di varietà resistenti, gestione del suolo,
                  potatura e pratiche igieniche. Monitorare la presenza di
                  organismi nocivi prima di intervenire.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  2. Soglie di intervento
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  I trattamenti chimici vanno effettuati solo quando il livello
                  di infestazione supera le soglie di danno economico stabilite
                  dai disciplinari regionali di produzione integrata.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  3. Preferenza per metodi non chimici
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quando possibile, preferire mezzi biologici, fisici e
                  biotecnologici rispetto ai trattamenti chimici. I prodotti
                  fitosanitari vanno utilizzati come ultima risorsa.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  4. Prodotti selettivi e a minor rischio
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quando si ricorre ai prodotti chimici, scegliere quelli più
                  selettivi, a minor rischio per la salute e l&apos;ambiente, e
                  utilizzare le dosi minime efficaci per limitare lo sviluppo di
                  resistenze.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sanzioni */}
        <section className="border-b border-border/40 bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Sanzioni previste
            </h2>
            <p className="mt-4 text-muted-foreground">
              Il Capo VII (artt. 18-24) definisce le sanzioni amministrative per
              le violazioni degli obblighi previsti dal decreto.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 pr-4 text-left font-semibold text-foreground">
                      Violazione
                    </th>
                    <th className="pb-3 pr-4 text-left font-semibold text-foreground">
                      Sanzione
                    </th>
                    <th className="pb-3 text-left font-semibold text-foreground">
                      Riferimento
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {sanctions.map((s) => (
                    <tr key={s.reference + s.violation}>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {s.violation}
                      </td>
                      <td className="py-3 pr-4 font-medium text-foreground">
                        {s.penalty}
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">
                        {s.reference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Collegamento con Reg. UE 2023/564 */}
        <section className="border-b border-border/40 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Dal cartaceo al digitale
            </h2>
            <div className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Il passaggio al formato elettronico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Il D.Lgs. 150/2012 ha introdotto l&apos;obbligo del registro
                trattamenti in formato cartaceo. Con l&apos;entrata in vigore
                del{" "}
                <strong>
                  <Link
                    href="/normativa-ue-2023-564"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Regolamento UE 2023/564
                  </Link>
                </strong>
                , questo obbligo si evolve: dal <strong>1° gennaio 2027</strong>{" "}
                il registro deve essere mantenuto in{" "}
                <strong>formato elettronico leggibile meccanicamente</strong>.
                Non basta un PDF — serve un formato strutturato (JSON, XML,
                database) che consenta l&apos;estrazione automatica dei dati.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="/normativa-ue-2023-564"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                >
                  Leggi il dettaglio del Regolamento UE 2023/564
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border/60 bg-card p-6">
              <h3 className="font-semibold text-foreground">
                Normativa correlata
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>Direttiva 2009/128/CE</strong> — Quadro europeo per
                    l&apos;uso sostenibile dei pesticidi (base della
                    trasposizione italiana)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>Reg. (CE) 1107/2009</strong> — Immissione in
                    commercio dei prodotti fitosanitari
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>Reg. UE 2023/564</strong> — Formato elettronico del
                    registro trattamenti (obbligo dal 2027)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>DPR 290/2001</strong> — Regolamento di
                    semplificazione in materia di prodotti fitosanitari
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong>D.Lgs. 10/2016</strong> — Modifiche e integrazioni
                    al D.Lgs. 150/2012
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center lg:p-12">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Adeguati al D.Lgs. 150/2012 con Cultivara
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Cultivara ti permette di compilare il registro trattamenti in
                modo semplice e conforme. Controlli automatici su dosi, colture
                autorizzate, tempi di carenza e difesa integrata. Dal 2027,
                anche in formato elettronico machine-readable.
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
                <strong>Fonti:</strong> Testo del Decreto Legislativo 14 agosto
                2012, n. 150, pubblicato nella Gazzetta Ufficiale della
                Repubblica Italiana n. 202 del 30 agosto 2012. Modificato dal
                D.Lgs. 22 gennaio 2016, n. 10 e dal Decreto MATTM 7 novembre
                2019. Per il testo ufficiale vigente, consultare{" "}
                <a
                  href="https://www.gazzettaufficiale.it/eli/id/2012/08/30/012G0171/sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                >
                  Gazzetta Ufficiale
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
