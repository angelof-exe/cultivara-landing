import { ArrowRight } from "lucide-react"

import { TrackedLink } from "@/components/tracked-link"
import { PostCard } from "@/components/blog/post-card"
import { sanityFetch } from "@/sanity/lib/live"
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries"

export async function BlogPreview() {
  const { data: posts } = await sanityFetch({
    query: LATEST_POSTS_QUERY,
    params: { limit: 3 },
    tags: ["post", "author", "category"],
  })

  if (!posts || posts.length === 0) return null

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Dal blog
            </p>
            <h2 className="mt-2 text-balance font-serif text-3xl text-foreground md:text-4xl">
              Approfondimenti su normativa e pratica agricola
            </h2>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
              Guide pratiche, scadenze e risposte alle domande più frequenti
              dalla nostra community di agricoltori e hobbisti.
            </p>
          </div>
          <TrackedLink
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            eventName="nav_click"
            eventParams={{ location: "blog_preview", target: "/blog" }}
          >
            Vedi tutti gli articoli
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.filter((p): p is NonNullable<typeof p> => Boolean(p?.slug)).map((post) => (
            <PostCard
              key={post._id}
              slug={post.slug as string}
              title={post.title ?? ""}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              coverImage={post.coverImage}
              author={post.author}
              categories={post.categories}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
