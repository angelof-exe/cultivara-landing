import { isWaitlist } from "@/lib/config"

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cultivara",
    url: "https://cultivara.it",
    logo: "https://cultivara.it/logo.svg",
    description:
      "Cultivara è la piattaforma per il quaderno di campagna digitale più semplice d\u2019Italia. Conforme al Regolamento UE 2023/564.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@cultivara.it",
      contactType: "customer service",
      availableLanguage: "Italian",
    },
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cultivara \u2014 Quaderno di Campagna Digitale",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    description:
      "Software per il quaderno di campagna digitale. Registro trattamenti fitosanitari, fertilizzazioni, irrigazioni, operazioni colturali, magazzino prodotti e costi colturali. 15 controlli automatici di conformità (normativi, Ecoschemi PAC, Disciplinari PI). Export PDF, JSON e XML. Conforme al Regolamento UE 2023/564 e AGEA.",
    ...(isWaitlist ? {} : {
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          name: "Piano Free \u2014 Quaderno di Campagna base",
          description:
            "Registro trattamenti base, fino a 3 appezzamenti, export PDF. Gratis per sempre.",
        },
        {
          "@type": "Offer",
          price: "9.90",
          priceCurrency: "EUR",
          name: "Piano Pro \u2014 Quaderno di Campagna completo",
          description:
            "Tutte le 10 sezioni AGEA, appezzamenti illimitati, 15 controlli automatici (normativi, Ecoschemi PAC, Disciplinari PI), operazioni colturali, costi colturali con riepilogo €/ha, export PDF/JSON/XML conforme, dashboard analytics.",
          priceValidUntil: "2027-01-01",
        },
        {
          "@type": "Offer",
          price: "24.90",
          priceCurrency: "EUR",
          name: "Piano Premium \u2014 Quaderno di Campagna avanzato",
          description:
            "Tutte le funzionalità Pro più gestione magazzino completa (movimenti, alert scadenze e scorte), DSS, alert meteo, multi-utente e API.",
          priceValidUntil: "2027-01-01",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "120",
        bestRating: "5",
      },
    }),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Il quaderno di campagna digitale è obbligatorio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Dal 1 Gennaio 2027, tutte le aziende agricole italiane dovranno tenere il registro trattamenti in formato elettronico, come previsto dal Regolamento UE 2023/564 e dal D.Lgs. 150/2012.",
        },
      },
      {
        "@type": "Question",
        name: "Cultivara è conforme alla normativa AGEA per il quaderno di campagna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Cultivara copre tutte le 10 sezioni richieste dalla normativa AGEA con 15 controlli automatici: 8 normativi, 4 Ecoschemi PAC 2023-2027 e 3 Disciplinari di Produzione Integrata. Export in PDF, JSON e XML.",
        },
      },
      {
        "@type": "Question",
        name: "Devo essere esperto di tecnologia per compilare il quaderno di campagna digitale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Cultivara è progettato per essere usato da chiunque, anche senza esperienza informatica. L\u2019interfaccia è semplice, con testi grandi e flussi guidati.",
        },
      },
      {
        "@type": "Question",
        name: "Posso compilare il quaderno di campagna dal telefono?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Cultivara funziona su smartphone, tablet e computer. Puoi registrare un trattamento nel quaderno di campagna direttamente dal campo.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona il magazzino prodotti di Cultivara?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il modulo magazzino gestisce fitosanitari, fertilizzanti, sementi e altro. Registri acquisti e utilizzi con aggiornamento automatico della giacenza. Alert automatici per prodotti in scadenza e scorte basse.",
        },
      },
      {
        "@type": "Question",
        name: "Posso tenere traccia dei costi colturali nel quaderno di campagna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Il modulo costi colturali registra ogni spesa per appezzamento (trattamenti, fertilizzazioni, manodopera, meccanizzazione, sementi e altro) con riepilogo €/ha e grafici aggregati per tipologia.",
        },
      },
      {
        "@type": "Question",
        name: "Cosa sono gli Ecoschemi PAC e i Disciplinari di Produzione Integrata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gli Ecoschemi PAC sono impegni ambientali volontari per pagamenti aggiuntivi. Cultivara verifica inerbimento arboree, colture leguminose, avvicendamento e protezione impollinatori. I Disciplinari PI controllano applicazioni massime, monitoraggio IPM e principi attivi per appezzamento.",
        },
      },
      {
        "@type": "Question",
        name: "Il quaderno di campagna digitale di Cultivara è gratuito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, il piano Free è gratuito per sempre, senza carta di credito. Include il registro trattamenti base, fino a 3 appezzamenti e l\u2019export PDF del quaderno di campagna.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona la sincronizzazione del quaderno di campagna con il SIAN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cultivara si integra con le API AGEA per sincronizzare il fascicolo aziendale e il Piano Colturale Grafico. L\u2019export del quaderno di campagna è disponibile nei formati PDF, JSON e XML.",
        },
      },
      {
        "@type": "Question",
        name: "Posso importare il vecchio quaderno di campagna cartaceo in Cultivara?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Durante l\u2019onboarding puoi inserire manualmente i dati pregressi oppure importarli dal fascicolo aziendale AGEA. Il nostro team di supporto è disponibile per aiutarti.",
        },
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Quaderno di Campagna Digitale | Cultivara",
    description:
      "Quaderno di campagna digitale conforme al Regolamento UE 2023/564. Registro trattamenti, fertilizzazioni, irrigazioni, operazioni colturali, magazzino e costi. 15 controlli automatici. Export PDF, JSON e XML. Gratis per iniziare.",
    url: "https://cultivara.it",
    inLanguage: "it",
    isPartOf: {
      "@type": "WebSite",
      name: "Cultivara",
      url: "https://cultivara.it",
    },
    about: {
      "@type": "Thing",
      name: "Quaderno di Campagna",
      description:
        "Il quaderno di campagna è il registro ufficiale in cui le aziende agricole annotano trattamenti fitosanitari, fertilizzazioni, irrigazioni e operazioni colturali. Dal 2027 sarà obbligatorio in formato digitale.",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  )
}
