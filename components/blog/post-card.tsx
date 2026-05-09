import Image from "next/image"
import { CalendarDays } from "lucide-react"

import { TrackedLink } from "@/components/tracked-link"
import { urlFor } from "@/sanity/lib/image"

type EventParams = Record<string, string | number | boolean>

type PostCardProps = {
  slug: string
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: {
    asset?: { _ref?: string } | null
    alt?: string | null
  } | null
  author?: {
    name?: string | null
    picture?: {
      asset?: { _ref?: string } | null
      alt?: string | null
    } | null
  } | null
  categories?: Array<{ title?: string | null; slug?: string | null } | null> | null
  /** Override the default `post_card_click` event fired on title/cover click. */
  eventName?: string
  /** Extra params merged into the click event (slug is always included). */
  eventParams?: EventParams
}

export function PostCard({
  slug,
  title,
  excerpt,
  publishedAt,
  coverImage,
  author,
  categories,
  eventName = "post_card_click",
  eventParams,
}: PostCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  const cover = coverImage?.asset?._ref
    ? urlFor(coverImage as Parameters<typeof urlFor>[0]).width(800).height(500).url()
    : null

  const finalEventParams: EventParams = { slug, ...(eventParams ?? {}) }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-md">
      <TrackedLink
        href={`/blog/${slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        eventName={eventName}
        eventParams={finalEventParams}
      >
        {cover ? (
          <Image
            src={cover}
            alt={coverImage?.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : null}
      </TrackedLink>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {categories && categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {categories.filter(Boolean).slice(0, 2).map((cat) =>
              cat?.slug ? (
                <TrackedLink
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  eventName="blog_category_click"
                  eventParams={{ category: cat.slug, source_slug: slug }}
                >
                  {cat.title}
                </TrackedLink>
              ) : null,
            )}
          </div>
        ) : null}

        <h3 className="font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
          <TrackedLink
            href={`/blog/${slug}`}
            eventName={eventName}
            eventParams={finalEventParams}
          >
            {title}
          </TrackedLink>
        </h3>

        {excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted-foreground">
          {author?.name ? <span className="font-medium text-foreground">{author.name}</span> : null}
          {formattedDate ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
