"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import emailjs from "@emailjs/browser"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const waitlistSchema = z.object({
  nome: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  cognome: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  telefono: z.string().optional(),
  nomeAzienda: z.string().optional(),
  messaggio: z.string().max(500, "Il messaggio non può superare i 500 caratteri").optional(),
})

type WaitlistFormValues = z.infer<typeof waitlistSchema>

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      nomeAzienda: "",
      messaggio: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: WaitlistFormValues) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Configurazione email mancante. Riprova più tardi.")
      return
    }

    try {
      await emailjs.send(serviceId, templateId, {
        nome: data.nome,
        cognome: data.cognome,
        email: data.email,
        telefono: data.telefono || "Non fornito",
        nomeAzienda: data.nomeAzienda || "Non fornita",
        messaggio: data.messaggio || "Nessun messaggio",
      }, publicKey)

      setSubmitted(true)
      toast.success("Richiesta inviata con successo!")
      form.reset()
    } catch {
      toast.error("Errore nell'invio. Riprova più tardi.")
    }
  }

  return (
    <section id="lista-attesa" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Lista d{"'"}Attesa
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
            Sii tra i primi a provare Cultivara
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Il quaderno di campagna digitale è in arrivo. Lascia i tuoi dati per essere
            avvisato al lancio e ottenere l{"'"}accesso anticipato.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="font-serif text-2xl text-foreground">
                  Grazie per il tuo interesse!
                </h3>
                <p className="max-w-md text-muted-foreground">
                  Ti contatteremo appena Cultivara sarà disponibile.
                  Controlla la tua email per la conferma.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Invia un{"'"}altra richiesta
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nome + Cognome */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mario" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cognome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="mario.rossi@email.it" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Telefono + Azienda */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefono</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+39 333 1234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nomeAzienda"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Azienda</FormLabel>
                          <FormControl>
                            <Input placeholder="Azienda Agricola Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Messaggio */}
                  <FormField
                    control={form.control}
                    name="messaggio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Messaggio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Raccontaci della tua azienda o delle tue esigenze..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Iscriviti alla Lista d{"'"}Attesa
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
