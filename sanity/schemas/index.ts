import type { SchemaTypeDefinition } from "sanity"

import { author } from "./author"
import { blockContent } from "./blockContent"
import { category } from "./category"
import { post } from "./post"
import { seo } from "./seo"
import { tag } from "./tag"

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  tag,
  blockContent,
  seo,
]
