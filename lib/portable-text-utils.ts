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

const MIN_BLOCKS_FOR_INLINE_CTA = 6

/**
 * Splits a body of Portable Text blocks roughly in half, cutting on the
 * first H2/H3 at or after the midpoint so the seam falls on a natural
 * section boundary. Returns empty `second` when the body is too short
 * for an inline CTA — caller should skip rendering it in that case.
 */
export function splitBodyAtMidpoint<T extends PortableTextBlock>(
  blocks: T[] | null | undefined
): { first: T[]; second: T[] } {
  if (!Array.isArray(blocks) || blocks.length < MIN_BLOCKS_FOR_INLINE_CTA) {
    return { first: blocks ?? [], second: [] }
  }
  const target = Math.floor(blocks.length / 2)
  let cutIndex = -1
  for (let i = target; i < blocks.length; i++) {
    const b = blocks[i]
    if (b && b._type === "block" && (b.style === "h2" || b.style === "h3")) {
      cutIndex = i
      break
    }
  }
  if (cutIndex === -1) {
    return { first: blocks, second: [] }
  }
  return {
    first: blocks.slice(0, cutIndex),
    second: blocks.slice(cutIndex),
  }
}

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
