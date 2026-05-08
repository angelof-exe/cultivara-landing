"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"
import type { TocItem } from "@/lib/portable-text-utils"

const MIN_ITEMS = 3

function useActiveHeading(items: TocItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )
    for (const { id } of items) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return activeId
}

function TocList({
  items,
  activeId,
  onItemClick,
}: {
  items: TocItem[]
  activeId: string | null
  onItemClick: (item: TocItem) => void
}) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "ml-4")}>
          <a
            href={`#${item.id}`}
            onClick={() => onItemClick(item)}
            className={cn(
              "block border-l-2 py-1 pl-3 transition-colors",
              activeId === item.id
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function PostToc({
  items,
  variant = "desktop",
  slug,
}: {
  items: TocItem[]
  variant?: "desktop" | "mobile"
  slug?: string
}) {
  const activeId = useActiveHeading(items)

  if (items.length < MIN_ITEMS) return null

  function handleItemClick(item: TocItem) {
    trackEvent("blog_toc_click", {
      target_id: item.id,
      level: item.level,
      ...(slug ? { slug } : {}),
      variant,
    })
  }

  if (variant === "mobile") {
    return (
      <details className="group mb-8 rounded-xl border border-border bg-muted/30 px-5 py-3 open:bg-muted/50 lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
          <span>Indice</span>
          <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180">▾</span>
        </summary>
        <nav className="mt-3" aria-label="Indice articolo">
          <TocList items={items} activeId={activeId} onItemClick={handleItemClick} />
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label="Indice articolo">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Indice
      </p>
      <TocList items={items} activeId={activeId} onItemClick={handleItemClick} />
    </nav>
  )
}
