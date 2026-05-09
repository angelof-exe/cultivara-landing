import { PostCard } from "./post-card"

type RelatedPostsProps = {
  posts: Array<React.ComponentProps<typeof PostCard> | null> | null | undefined
  /** Slug of the article surfacing these related posts (for funnel attribution). */
  sourceSlug?: string
}

export function RelatedPosts({ posts, sourceSlug }: RelatedPostsProps) {
  const filtered = (posts ?? []).filter(Boolean) as Array<React.ComponentProps<typeof PostCard>>
  if (filtered.length === 0) return null

  return (
    <section className="mx-auto mt-20 max-w-6xl border-t border-border/60 px-6 pt-16">
      <h2 className="font-serif text-3xl text-foreground">Articoli correlati</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard
            key={post.slug}
            {...post}
            eventName="related_post_click"
            eventParams={{
              target_slug: post.slug,
              ...(sourceSlug ? { source_slug: sourceSlug } : {}),
            }}
          />
        ))}
      </div>
    </section>
  )
}
