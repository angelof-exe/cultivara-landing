type BlogHeroProps = {
  title: string
  description?: string
  eyebrow?: string
}

export function BlogHero({ title, description, eyebrow }: BlogHeroProps) {
  return (
    <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </section>
  )
}
