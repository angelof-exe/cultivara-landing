import { defineQuery } from "next-sanity"

const POST_FIELDS_LIST = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "author": author->{ name, "slug": slug.current, picture, role },
  "categories": categories[]->{ _id, title, "slug": slug.current }
`

const POST_FIELDS_FULL = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  body,
  seo,
  "author": author->{ name, "slug": slug.current, picture, role, bio },
  "categories": categories[]->{ _id, title, "slug": slug.current },
  "tags": tags[]->{ _id, title, "slug": slug.current },
  "relatedPosts": relatedPosts[]->{ ${POST_FIELDS_LIST} }
`

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) [$start...$end] {
    ${POST_FIELDS_LIST}
  }
`)

export const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && defined(slug.current)])
`)

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) [0...$limit] {
    ${POST_FIELDS_LIST}
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS_FULL}
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`)

export const POST_SEO_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    excerpt,
    publishedAt,
    coverImage,
    seo,
    "slug": slug.current,
    "author": author->{ name }
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`)

export const CATEGORY_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && $categoryId in categories[]._ref]
    | order(publishedAt desc) [$start...$end] {
    ${POST_FIELDS_LIST}
  }
`)

export const CATEGORY_POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && defined(slug.current) && $categoryId in categories[]._ref])
`)

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id, title, "slug": slug.current, description
  }
`)

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)]{ "slug": slug.current }
`)
