export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cultivara",
    url: "https://cultivara.it",
    logo: "https://cultivara.it/images/logo.png",
    description:
      "Cultivara \u00e8 la piattaforma per il quaderno di campagna digitale pi\u00f9 semplice d\u2019Italia. Conforme al Regolamento UE 2023/564.",
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
      "Software per il quaderno di campagna digitale. Registro trattamenti fitosanitari, fertilizzazioni e irrigazioni conforme al Regolamento UE 2023/564 e AGEA.",
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
          "Tutte le 10 sezioni AGEA, appezzamenti illimitati, export SIAN e PDF conforme, dashboard analytics.",
        priceValidUntil: "2027-01-01",
      },
      {
        "@type": "Offer",
        price: "24.90",
        priceCurrency: "EUR",
        name: "Piano Premium \u2014 Quaderno di Campagna avanzato",
        description:
          "Tutte le funzionalit\u00e0 Pro pi\u00f9 DSS, alert meteo, gestione magazzino, multi-utente e API.",
        priceValidUntil: "2027-01-01",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
      bestRating: "5",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Il quaderno di campagna digitale \u00e8 obbligatorio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "S\u00ec. Dal 1 Gennaio 2027, tutte le aziende agricole italiane dovranno tenere il registro trattamenti in formato elettronico, come previsto dal Regolamento UE 2023/564 e dal D.Lgs. 150/2012.",
        },
      },
      {
        "@type": "Question",
        name: "Cultivara \u00e8 conforme alla normativa AGEA per il quaderno di campagna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "S\u00ec. Cultivara copre tutte le 10 sezioni richieste dalla normativa AGEA per il quaderno di campagna, inclusi i controlli automatici su dosi, colture autorizzate e tempi di carenza.",
        },
      },
      {
        "@type": "Question",
        name: "Devo essere esperto di tecnologia per compilare il quaderno di campagna digitale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Cultivara \u00e8 progettato per essere usato da chiunque, anche senza esperienza informatica. L\u2019interfaccia \u00e8 semplice, con testi grandi e flussi guidati.",
        },
      },
      {
        "@type": "Question",
        name: "Posso compilare il quaderno di campagna dal telefono?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "S\u00ec. Cultivara funziona su smartphone, tablet e computer. Puoi registrare un trattamento nel quaderno di campagna direttamente dal campo.",
        },
      },
      {
        "@type": "Question",
        name: "Il quaderno di campagna digitale di Cultivara \u00e8 gratuito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "S\u00ec, il piano Free \u00e8 gratuito per sempre, senza carta di credito. Include il registro trattamenti base, fino a 3 appezzamenti e l\u2019export PDF del quaderno di campagna.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona la sincronizzazione del quaderno di campagna con il SIAN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cultivara si integra con le API AGEA per sincronizzare il fascicolo aziendale e il Piano Colturale Grafico. L\u2019export del quaderno di campagna \u00e8 disponibile nei formati PDF, JSON e XML.",
        },
      },
      {
        "@type": "Question",
        name: "Posso importare il vecchio quaderno di campagna cartaceo in Cultivara?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "S\u00ec. Durante l\u2019onboarding puoi inserire manualmente i dati pregressi oppure importarli dal fascicolo aziendale AGEA. Il nostro team di supporto \u00e8 disponibile per aiutarti.",
        },
      },
    ],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Quaderno di Campagna Digitale | Cultivara",
    description:
      "Quaderno di campagna digitale conforme al Regolamento UE 2023/564. Registra trattamenti fitosanitari, fertilizzazioni e irrigazioni. Gratis per iniziare.",
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
        "Il quaderno di campagna \u00e8 il registro ufficiale in cui le aziende agricole annotano trattamenti fitosanitari, fertilizzazioni e irrigazioni. Dal 2027 sar\u00e0 obbligatorio in formato digitale.",
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
