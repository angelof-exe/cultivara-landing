import type { Metadata } from "next"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { PostCard } from "@/components/blog/post-card"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogViewTracker } from "@/components/blog/blog-view-tracker"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_COUNT_QUERY, POSTS_QUERY } from "@/sanity/lib/queries"

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
  searchParams: Promise<{ page?: string }>
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const page = Math.max(1, parseInt(resolvedParams.page ?? "1", 10) || 1)
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [{ data: posts }, { data: total }] = await Promise.all([
    sanityFetch({
      query: POSTS_QUERY,
      params: { start, end },
      tags: ["post", "author", "category"],
    }),
    sanityFetch({
      query: POSTS_COUNT_QUERY,
      tags: ["post"],
    }),
  ])

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / POSTS_PER_PAGE))

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
          ) : (
            <p className="text-center text-muted-foreground">
              Nessun articolo pubblicato al momento. Torna presto!
            </p>
          )}

          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/blog"
          />
        </section>
      </main>
      <Footer />
      <BlogViewTracker event="blog_list_view" params={{ page }} />
    </>
  )
}
