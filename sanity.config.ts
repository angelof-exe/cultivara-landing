import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { presentationTool } from "sanity/presentation"

import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "cultivara",
  title: "Cultivara CMS",
  basePath: studioUrl,
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("Articoli")
              .schemaType("post")
              .child(S.documentTypeList("post").title("Articoli")),
            S.listItem()
              .title("Autori")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Autori")),
            S.listItem()
              .title("Categorie")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categorie")),
            S.listItem()
              .title("Tag")
              .schemaType("tag")
              .child(S.documentTypeList("tag").title("Tag")),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: typeof location === "undefined" ? "http://localhost:3000" : location.origin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
