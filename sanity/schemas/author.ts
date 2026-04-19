import { defineType, defineField } from "sanity"
import { UserIcon } from "@sanity/icons"

export const author = defineType({
  name: "author",
  title: "Autore",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Ruolo",
      type: "string",
      description: "Es. 'Agronomo', 'Redazione Cultivara'.",
    }),
    defineField({
      name: "picture",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Testo alternativo",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "picture",
    },
  },
})
