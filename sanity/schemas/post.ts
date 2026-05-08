import { defineType, defineField } from "sanity"
import { DocumentTextIcon } from "@sanity/icons"

export const post = defineType({
  name: "post",
  title: "Articolo",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "meta", title: "Metadati" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Estratto",
      type: "text",
      rows: 3,
      group: "content",
      description: "Breve riassunto mostrato in lista e nelle condivisioni social.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Immagine di copertina",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Corpo",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categorie",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Tag",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedPosts",
      title: "Articoli correlati",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      group: "meta",
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("it-IT")
        : "Bozza"
      return {
        title,
        subtitle: author ? `${author} — ${date}` : date,
        media,
      }
    },
  },
  orderings: [
    {
      title: "Data di pubblicazione (recenti)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Titolo (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
})
