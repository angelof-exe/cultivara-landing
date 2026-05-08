import { defineType, defineField } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Sovrascrive il titolo del post nei tag SEO. Max 60 caratteri.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Descrizione nei risultati di ricerca. 150-160 caratteri consigliati.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Immagine Open Graph",
      type: "image",
      description: "1200x630px consigliato. Se vuota, viene usata la cover del post.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Escludi dai motori di ricerca",
      type: "boolean",
      initialValue: false,
    }),
  ],
})
