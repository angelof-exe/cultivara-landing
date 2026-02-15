"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Il quaderno di campagna digitale \u00e8 davvero obbligatorio?",
    answer:
      "S\u00ec. Dal 1 Gennaio 2027, tutte le aziende agricole italiane dovranno tenere il registro trattamenti in formato elettronico, come previsto dal Regolamento UE 2023/564 e dal D.Lgs. 150/2012. Il 2026 \u00e8 l\u2019ultimo anno di transizione volontaria.",
  },
  {
    question: "Cultivara \u00e8 conforme alla normativa AGEA?",
    answer:
      "Assolutamente s\u00ec. Cultivara copre tutte le 10 sezioni richieste dalla normativa AGEA, inclusi i controlli automatici su dosi, colture autorizzate e tempi di carenza. I documenti esportati sono pronti per i controlli ASL e ICQRF.",
  },
  {
    question: "Devo essere esperto di tecnologia per usare Cultivara?",
    answer:
      "No. Cultivara \u00e8 stato progettato per essere usato da chiunque, anche senza esperienza informatica. L\u2019interfaccia \u00e8 semplice, con testi grandi, flussi guidati e campi precompilati. Il nostro target principale sono gli agricoltori con 60+ anni.",
  },
  {
    question: "Posso usare Cultivara dal telefono?",
    answer:
      "S\u00ec. Cultivara funziona perfettamente su smartphone, tablet e computer. Puoi registrare un trattamento direttamente dal campo con il tuo telefono, anche senza connessione internet (la sincronizzazione avverr\u00e0 quando torni online).",
  },
  {
    question: "Il piano Free \u00e8 davvero gratuito?",
    answer:
      "S\u00ec, il piano Free \u00e8 gratuito per sempre, senza carta di credito. Include il registro trattamenti base, fino a 3 appezzamenti e l\u2019export PDF. Puoi passare al piano Pro in qualsiasi momento se hai bisogno di funzionalit\u00e0 avanzate.",
  },
  {
    question: "Come funziona la sincronizzazione con il SIAN?",
    answer:
      "Cultivara si integra con le API AGEA per sincronizzare automaticamente il fascicolo aziendale e il Piano Colturale Grafico. L\u2019export del registro trattamenti \u00e8 disponibile nei formati PDF, JSON e XML, pronti per la trasmissione al Sistema Informativo Agricolo Nazionale.",
  },
  {
    question: "Posso importare i dati dal mio vecchio quaderno cartaceo?",
    answer:
      "S\u00ec. Durante l\u2019onboarding puoi inserire manualmente i dati pregressi oppure importarli dal fascicolo aziendale AGEA. Il nostro team di supporto \u00e8 disponibile per aiutarti con la migrazione.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Domande frequenti sul Quaderno di Campagna digitale
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
