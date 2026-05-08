import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

import { urlFor } from "@/sanity/lib/image"

type PostHeroProps = {
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: {
    asset?: { _ref?: string } | null
    alt?: string | null
  } | null
  author?: {
    name?: string | null
    role?: string | null
    picture?: {
      asset?: { _ref?: string } | null
      alt?: string | null
    } | null
  } | null
  categories?: Array<{ title?: string | null; slug?: string | null } | null> | null
}

export function PostHero({
  title,
  excerpt,
  publishedAt,
  coverImage,
  author,
  categories,
}: PostHeroProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  const cover = coverImage?.asset?._ref
    ? urlFor(coverImage as Parameters<typeof urlFor>[0]).width(1600).height(900).url()
    : null

  const authorPicture = author?.picture?.asset?._ref
    ? urlFor(author.picture as Parameters<typeof urlFor>[0]).width(80).height(80).url()
    : null

  return (
    <header className="mx-auto max-w-4xl px-6 pt-12 lg:pt-16">
      {categories && categories.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.filter(Boolean).map((cat) =>
            cat?.slug ? (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
              >
                {cat.title}
              </Link>
            ) : null,
          )}
        </div>
      ) : null}

      <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{title}</h1>

      {excerpt ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{excerpt}</p>
      ) : null}

      <div className="mt-8 flex items-center gap-4 border-y border-border/60 py-4">
        {authorPicture ? (
          <Image
            src={authorPicture}
            alt={author?.picture?.alt ?? author?.name ?? ""}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : null}
        <div className="flex flex-col">
          {author?.name ? (
            <span className="text-sm font-semibold text-foreground">{author.name}</span>
          ) : null}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {author?.role ? <span>{author.role}</span> : null}
            {formattedDate ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {cover ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={cover}
            alt={coverImage?.alt ?? title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
        </div>
      ) : null}
    </header>
  )
}
