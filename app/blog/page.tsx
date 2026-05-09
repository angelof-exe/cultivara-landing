import type { Metadata } from "next"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { PostCard } from "@/components/blog/post-card"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogViewTracker } from "@/components/blog/blog-view-tracker"
import { BlogFilters } from "@/components/blog/blog-filters"
import { sanityFetch } from "@/sanity/lib/live"
import {
  CATEGORIES_QUERY,
  SEARCH_POSTS_COUNT_QUERY,
  SEARCH_POSTS_QUERY,
} from "@/sanity/lib/queries"

const POSTS_PER_PAGE = 9

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Approfondimenti, guide e novità normative per l'agricoltura italiana: quaderno di campagna digitale, conformità UE 2023/564, AGEA e PAC.",
  alternates: { canonical: "https://cultivara.it/blog" },
  openGraph: {
    title: "Blog Cultivara",
    description:
      "Approfondimenti, guide e novità normative per l'agricoltura italiana.",
    type: "website",
    url: "https://cultivara.it/blog",
  },
}

type Props = {
  searchParams: Promise<{
    page?: string
    q?: string
    category?: string
  }>
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const page = Math.max(1, parseInt(resolvedParams.page ?? "1", 10) || 1)
  const q = (resolvedParams.q ?? "").trim()
  const category = (resolvedParams.category ?? "").trim()
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [
    { data: posts },
    { data: total },
    { data: categories },
  ] = await Promise.all([
    sanityFetch({
      query: SEARCH_POSTS_QUERY,
      params: { q, category, start, end },
      tags: ["post", "author", "category"],
    }),
    sanityFetch({
      query: SEARCH_POSTS_COUNT_QUERY,
      params: { q, category },
      tags: ["post"],
    }),
    sanityFetch({
      query: CATEGORIES_QUERY,
      tags: ["category"],
    }),
  ])

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / POSTS_PER_PAGE))
  const hasFilters = q.length > 0 || category.length > 0
  const resultLabel =
    total === null || total === undefined
      ? null
      : total === 0
        ? "Nessun articolo trovato"
        : total === 1
          ? "1 articolo trovato"
          : `${total} articoli trovati`

  return (
    <>
      <Navbar />
      <main>
        <BlogHero
          eyebrow="Blog"
          title="Guide e novità per l'agricoltura digitale"
          description="Approfondimenti pratici, aggiornamenti normativi e best practice per semplificare il lavoro in campo e restare conformi."
        />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <BlogFilters
            categories={(categories ?? []).map((c) => ({
              _id: c._id,
              title: c.title ?? null,
              slug: c.slug ?? null,
            }))}
            initialQuery={q}
            initialCategory={category}
          />

          {hasFilters && resultLabel ? (
            <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
              {resultLabel}
            </p>
          ) : null}

          <div className="mt-10">
            {posts && posts.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    slug={post.slug ?? ""}
                    title={post.title ?? ""}
                    excerpt={post.excerpt}
                    publishedAt={post.publishedAt}
                    coverImage={post.coverImage}
                    author={post.author}
                    categories={post.categories}
                  />
                ))}
              </div>
            ) : hasFilters ? (
              <p className="text-center text-muted-foreground">
                Nessun articolo corrisponde ai filtri selezionati. Prova a modificare la ricerca.
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                Nessun articolo pubblicato al momento. Torna presto!
              </p>
            )}
          </div>

          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/blog"
          />
        </section>
      </main>
      <Footer />
      <BlogViewTracker
        event="blog_list_view"
        params={{
          page,
          query_length: q.length,
          category: category || "all",
        }}
      />
      {hasFilters && total === 0 ? (
        <BlogViewTracker
          event="blog_search_zero_results"
          params={{
            query_length: q.length,
            category: category || "none",
            ...(q ? { query_term: q.slice(0, 80) } : {}),
          }}
        />
      ) : null}
    </>
  )
}
