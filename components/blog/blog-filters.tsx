"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

type Category = { _id: string; title: string | null; slug: string | null }

type Props = {
  categories: Category[]
  initialQuery: string
  initialCategory: string
}

const ALL_CATEGORIES = "__all__"

export function BlogFilters({ categories, initialQuery, initialCategory }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)

  useEffect(() => {
    setQuery(initialQuery)
    setCategory(initialCategory)
  }, [initialQuery, initialCategory])

  function navigate(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams()
    const trimmedQuery = nextQuery.trim()
    if (trimmedQuery) params.set("q", trimmedQuery)
    if (nextCategory) params.set("category", nextCategory)
    const search = params.toString()
    const url = search ? `${pathname}?${search}` : pathname
    startTransition(() => router.push(url))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(query, category)
    trackEvent("blog_search_submit", {
      query_length: query.trim().length,
      category: category || "all",
    })
  }

  function onCategoryChange(value: string) {
    const next = value === ALL_CATEGORIES ? "" : value
    setCategory(next)
    navigate(query, next)
    trackEvent("blog_filter_category", { category: next || "all" })
  }

  function clearAll() {
    setQuery("")
    setCategory("")
    navigate("", "")
    trackEvent("blog_filter_clear")
  }

  const hasFilters = query.trim().length > 0 || category.length > 0

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      role="search"
      aria-label="Cerca articoli"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          inputMode="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca articoli per titolo o estratto..."
          className="pl-9 pr-3"
          aria-label="Termini di ricerca"
        />
      </div>

      <Select value={category || ALL_CATEGORIES} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-56" aria-label="Filtra per categoria">
          <SelectValue placeholder="Tutte le categorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_CATEGORIES}>Tutte le categorie</SelectItem>
          {categories
            .filter((c): c is Category & { slug: string } => Boolean(c.slug))
            .map((c) => (
              <SelectItem key={c._id} value={c.slug}>
                {c.title ?? c.slug}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={pending} className="sm:w-auto">
        Cerca
      </Button>

      {hasFilters ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Azzera filtri"
        >
          <X className="mr-1.5 h-4 w-4" />
          Azzera
        </Button>
      ) : null}
    </form>
  )
}
