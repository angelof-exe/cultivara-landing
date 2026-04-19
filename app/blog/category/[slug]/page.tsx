import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { PostCard } from "@/components/blog/post-card"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogViewTracker } from "@/components/blog/blog-view-tracker"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import {
  CATEGORY_BY_SLUG_QUERY,
  CATEGORY_POSTS_COUNT_QUERY,
  CATEGORY_POSTS_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "@/sanity/lib/queries"

const POSTS_PER_PAGE = 9

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({ perspective: "published", stega: false })
      .fetch(CATEGORY_SLUGS_QUERY)
    return (slugs ?? [])
      .filter((s): s is { slug: string } => typeof s?.slug === "string")
      .map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: category } = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
    tags: ["category"],
  })

  if (!category) return {}

  return {
    title: `${category.title} — Blog`,
    description: category.description ?? `Tutti gli articoli della categoria ${category.title}.`,
    alternates: { canonical: `https://cultivara.it/blog/category/${slug}` },
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, resolvedSearch] = await Promise.all([params, searchParams])
  const page = Math.max(1, parseInt(resolvedSearch.page ?? "1", 10) || 1)
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const { data: category } = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: ["category"],
  })

  if (!category) notFound()

  const [{ data: posts }, { data: total }] = await Promise.all([
    sanityFetch({
      query: CATEGORY_POSTS_QUERY,
      params: { categoryId: category._id, start, end },
      tags: ["post", `category:${slug}`],
    }),
    sanityFetch({
      query: CATEGORY_POSTS_COUNT_QUERY,
      params: { categoryId: category._id },
      tags: ["post", `category:${slug}`],
    }),
  ])

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / POSTS_PER_PAGE))

  return (
    <>
      <Navbar />
      <main>
        <BlogHero
          eyebrow="Categoria"
          title={category.title ?? ""}
          description={category.description ?? undefined}
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
              Nessun articolo in questa categoria.
            </p>
          )}

          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/blog/category/${slug}`}
          />
        </section>
      </main>
      <Footer />
      <BlogViewTracker event="blog_category_view" params={{ slug }} />
    </>
  )
}
