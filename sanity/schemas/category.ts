import { defineType, defineField } from "sanity"
import { TagIcon } from "@sanity/icons"

export const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
})
