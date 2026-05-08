import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { PostHero } from "@/components/blog/post-hero"
import { PostBody } from "@/components/blog/post-body"
import { PostToc } from "@/components/blog/post-toc"
import { RelatedPosts } from "@/components/blog/related-posts"
import { BlogViewTracker } from "@/components/blog/blog-view-tracker"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { enrichHeadingBlocks } from "@/lib/portable-text-utils"
import {
  POST_QUERY,
  POST_SEO_QUERY,
  POST_SLUGS_QUERY,
} from "@/sanity/lib/queries"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({ perspective: "published", stega: false })
      .fetch(POST_SLUGS_QUERY)
    return (slugs ?? [])
      .filter((s): s is { slug: string } => typeof s?.slug === "string")
      .map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_SEO_QUERY,
    params: { slug },
    stega: false,
    tags: [`post:${slug}`],
  })

  if (!data) return {}

  const title = data.seo?.metaTitle ?? data.title ?? undefined
  const description = data.seo?.metaDescription ?? data.excerpt ?? undefined
  const ogSource = data.seo?.ogImage?.asset?._ref
    ? data.seo.ogImage
    : data.coverImage
  const ogUrl = ogSource?.asset?._ref
    ? urlFor(ogSource).width(1200).height(630).url()
    : undefined

  return {
    title: title ?? "Articolo",
    description,
    alternates: { canonical: `https://cultivara.it/blog/${slug}` },
    robots: data.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title ?? undefined,
      description,
      type: "article",
      url: `https://cultivara.it/blog/${slug}`,
      publishedTime: data.publishedAt ?? undefined,
      authors: data.author?.name ? [data.author.name] : undefined,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description,
      images: ogUrl ? [ogUrl] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "author", "category"],
  })

  if (!post) notFound()

  const { blocks: enrichedBody, toc } = enrichHeadingBlocks(post.body)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    image: post.coverImage?.asset?._ref
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cultivara.it/blog/${slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Cultivara",
      logo: { "@type": "ImageObject", url: "https://cultivara.it/logo.svg" },
    },
  }

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHero
          title={post.title ?? ""}
          excerpt={post.excerpt}
          publishedAt={post.publishedAt}
          coverImage={post.coverImage}
          author={post.author}
          categories={post.categories}
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="min-w-0 max-w-3xl">
            <PostToc items={toc} variant="mobile" />
            <PostBody value={enrichedBody} />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PostToc items={toc} variant="desktop" />
            </div>
          </aside>
        </div>
        <RelatedPosts
          posts={(post.relatedPosts ?? [])
            .filter((p): p is NonNullable<typeof p> => Boolean(p?.slug))
            .map((p) => ({
              slug: p.slug as string,
              title: p.title ?? "",
              excerpt: p.excerpt,
              publishedAt: p.publishedAt,
              coverImage: p.coverImage,
              author: p.author,
              categories: p.categories,
            }))}
        />
      </main>
      <Footer />
      <BlogViewTracker event="blog_post_view" params={{ slug }} />
    </>
  )
}
