import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { PostHero } from "@/components/blog/post-hero"
import { PostBody } from "@/components/blog/post-body"
import { PostToc } from "@/components/blog/post-toc"
import { RelatedPosts } from "@/components/blog/related-posts"
import { ArticleCta } from "@/components/blog/article-cta"
import { PostShareButtons } from "@/components/blog/post-share-buttons"
import { BlogViewTracker } from "@/components/blog/blog-view-tracker"
import { ArticleReadTracker } from "@/components/blog/article-read-tracker"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { enrichHeadingBlocks, splitBodyAtMidpoint } from "@/lib/portable-text-utils"
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
  const { first: bodyBeforeCta, second: bodyAfterCta } = splitBodyAtMidpoint(enrichedBody)

  const articleImage = post.coverImage?.asset?._ref
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        inLanguage: "it",
        datePublished: post.publishedAt,
        dateModified: post._updatedAt ?? post.publishedAt,
        url: `https://cultivara.it/blog/${slug}`,
        author: post.author?.name
          ? {
              "@type": "Person",
              name: post.author.name,
              worksFor: { "@type": "Organization", name: "Cultivara", url: "https://cultivara.it" },
              knowsAbout: [
                "Quaderno di Campagna Aziendale",
                "Regolamento UE 2023/564",
                "Normativa fitosanitaria italiana",
                "Agricoltura digitale",
                "PAC 2023-2027",
              ],
            }
          : undefined,
        image: articleImage
          ? { "@type": "ImageObject", url: articleImage, width: 1200, height: 630 }
          : undefined,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://cultivara.it/blog/${slug}`,
        },
        publisher: {
          "@type": "Organization",
          name: "Cultivara",
          url: "https://cultivara.it",
          logo: { "@type": "ImageObject", url: "https://cultivara.it/android-chrome-512x512.png" },
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["article h1", "article h2", "article p"],
        },
        isPartOf: { "@type": "WebSite", name: "Cultivara", url: "https://cultivara.it" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://cultivara.it" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://cultivara.it/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://cultivara.it/blog/${slug}` },
        ],
      },
    ],
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
            <PostToc items={toc} variant="mobile" slug={slug} />
            <PostBody value={bodyBeforeCta} />
            {bodyAfterCta.length > 0 ? (
              <>
                <ArticleCta variant="inline" slug={slug} />
                <PostBody value={bodyAfterCta} />
              </>
            ) : null}
            <PostShareButtons
              slug={slug}
              title={post.title ?? ""}
              excerpt={post.excerpt ?? null}
            />
            <ArticleCta variant="final" slug={slug} />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PostToc items={toc} variant="desktop" slug={slug} />
            </div>
          </aside>
        </div>
        <RelatedPosts
          sourceSlug={slug}
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
      <BlogViewTracker
        event="blog_post_view"
        params={{
          slug,
          title: post.title ?? "",
          ...(post.author?.name ? { author: post.author.name } : {}),
          ...(post.categories?.[0]?.slug
            ? { primary_category: post.categories[0].slug }
            : {}),
        }}
      />
      <ArticleReadTracker slug={slug} title={post.title ?? ""} />
    </>
  )
}
