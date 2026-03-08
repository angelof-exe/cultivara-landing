"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Il quaderno di campagna digitale è davvero obbligatorio?",
    answer:
      "Sì. Dal 1 Gennaio 2027, tutte le aziende agricole italiane dovranno tenere il registro trattamenti in formato elettronico, come previsto dal Regolamento UE 2023/564 e dal D.Lgs. 150/2012. Il 2026 è l\u2019ultimo anno di transizione volontaria.",
  },
  {
    question: "Cultivara è conforme alla normativa AGEA?",
    answer:
      "Assolutamente sì. Cultivara copre tutte le 10 sezioni richieste dalla normativa AGEA, con 15 controlli automatici integrati: 8 controlli normativi (dose massima, colture autorizzate, regola 30 giorni, rame 7 anni, Direttiva Nitrati, attrezzature, patentini, stoccaggio), 4 Ecoschemi PAC 2023-2027 e 3 Disciplinari di Produzione Integrata. I documenti esportati in PDF, JSON e XML sono pronti per i controlli ASL e ICQRF.",
  },
  {
    question: "Devo essere esperto di tecnologia per usare Cultivara?",
    answer:
      "No. Cultivara è stato progettato per essere usato da chiunque, anche senza esperienza informatica. L\u2019interfaccia è semplice, con testi grandi, flussi guidati e campi precompilati. Il nostro target principale sono gli agricoltori con 60+ anni.",
  },
  {
    question: "Posso usare Cultivara dal telefono?",
    answer:
      "Sì. Cultivara funziona perfettamente su smartphone, tablet e computer. Puoi registrare un trattamento direttamente dal campo con il tuo telefono, anche senza connessione internet (la sincronizzazione avverrà quando torni online).",
  },
  {
    question: "Come funziona il magazzino prodotti?",
    answer:
      "Il modulo magazzino ti permette di gestire tutti i mezzi tecnici: fitosanitari, fertilizzanti, sementi e altro. Registri acquisti e utilizzi, e Cultivara aggiorna automaticamente la giacenza. Ricevi alert quando un prodotto è in scadenza (entro 30 giorni) o quando le scorte sono basse.",
  },
  {
    question: "Posso tenere traccia dei costi colturali?",
    answer:
      "Sì. Il modulo costi colturali ti permette di registrare ogni spesa per appezzamento: trattamenti, fertilizzazioni, irrigazione, manodopera, meccanizzazione, sementi e altro. Visualizzi il riepilogo per appezzamento (con €/ha) e per tipologia di costo, con grafici e barre di confronto.",
  },
  {
    question: "Cosa sono gli Ecoschemi PAC e i Disciplinari PI?",
    answer:
      "Gli Ecoschemi PAC 2023-2027 sono impegni ambientali volontari che danno accesso a pagamenti aggiuntivi della PAC. Cultivara verifica automaticamente 4 Ecoschemi: inerbimento arboree, colture leguminose, avvicendamento colturale e protezione impollinatori. I Disciplinari di Produzione Integrata sono regole per un uso sostenibile dei prodotti fitosanitari: Cultivara controlla il numero massimo di applicazioni, il monitoraggio IPM e i principi attivi diversi per appezzamento.",
  },
  {
    question: "Il piano Free è davvero gratuito?",
    answer:
      "Sì, il piano Free è gratuito per sempre, senza carta di credito. Include il registro trattamenti base, fino a 3 appezzamenti e l\u2019export PDF. Puoi passare al piano Pro in qualsiasi momento se hai bisogno di tutte le 10 sezioni QDCA, i 15 controlli automatici, il magazzino e i costi colturali.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-border/60 bg-card py-20 lg:py-28"
    >
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
  );
}
