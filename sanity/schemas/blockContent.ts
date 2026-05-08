import { defineType, defineArrayMember } from "sanity"

export const blockContent = defineType({
  title: "Contenuto",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragrafo", value: "normal" },
        { title: "Titolo H2", value: "h2" },
        { title: "Titolo H3", value: "h3" },
        { title: "Titolo H4", value: "h4" },
        { title: "Citazione", value: "blockquote" },
      ],
      lists: [
        { title: "Elenco puntato", value: "bullet" },
        { title: "Elenco numerato", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Grassetto", value: "strong" },
          { title: "Corsivo", value: "em" },
          { title: "Sottolineato", value: "underline" },
          { title: "Codice", value: "code" },
        ],
        annotations: [
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              },
              {
                title: "Apri in nuova scheda",
                name: "blank",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Testo alternativo",
          description: "Importante per accessibilità e SEO.",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Didascalia",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "code",
      title: "Codice",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Linguaggio",
        },
        {
          name: "code",
          type: "text",
          title: "Codice",
          rows: 10,
        },
      ],
    }),
  ],
})
