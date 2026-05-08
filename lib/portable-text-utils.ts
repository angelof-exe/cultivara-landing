import type { PortableTextBlock } from "sanity"

export type TocItem = { id: string; text: string; level: 2 | 3 }

export function extractPlainText(block: PortableTextBlock | undefined | null): string {
  if (!block || !Array.isArray(block.children)) return ""
  return block.children
    .map((child) =>
      child && typeof (child as { text?: unknown }).text === "string"
        ? (child as { text: string }).text
        : ""
    )
    .join("")
    .trim()
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

type EnrichedBlock = PortableTextBlock & { _toc_id?: string }

export function enrichHeadingBlocks(
  blocks: PortableTextBlock[] | null | undefined
): { blocks: EnrichedBlock[]; toc: TocItem[] } {
  if (!Array.isArray(blocks)) return { blocks: [], toc: [] }
  const seen = new Map<string, number>()
  const toc: TocItem[] = []
  const enriched: EnrichedBlock[] = blocks.map((block) => {
    if (!block || block._type !== "block") return block
    const style = block.style
    if (style !== "h2" && style !== "h3") return block
    const text = extractPlainText(block)
    if (!text) return block
    const base = slugifyHeading(text) || "section"
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    const id = count === 1 ? base : `${base}-${count}`
    toc.push({ id, text, level: style === "h2" ? 2 : 3 })
    return { ...block, _toc_id: id }
  })
  return { blocks: enriched, toc }
}
