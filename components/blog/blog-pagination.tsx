import { ChevronLeft, ChevronRight } from "lucide-react"

import { TrackedLink } from "@/components/tracked-link"

type BlogPaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export function BlogPagination({ currentPage, totalPages, basePath }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const href = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`)

  const pages: number[] = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Paginazione articoli"
    >
      {currentPage > 1 ? (
        <TrackedLink
          href={href(currentPage - 1)}
          className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm hover:bg-muted"
          aria-label="Pagina precedente"
          eventName="blog_pagination_click"
          eventParams={{
            from_page: currentPage,
            to_page: currentPage - 1,
            direction: "prev",
            base_path: basePath,
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          Precedente
        </TrackedLink>
      ) : null}

      {pages.map((page) => (
        <TrackedLink
          key={page}
          href={href(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? "inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground"
              : "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm hover:bg-muted"
          }
          eventName="blog_pagination_click"
          eventParams={{
            from_page: currentPage,
            to_page: page,
            direction: page === currentPage ? "current" : page > currentPage ? "next" : "prev",
            base_path: basePath,
          }}
        >
          {page}
        </TrackedLink>
      ))}

      {currentPage < totalPages ? (
        <TrackedLink
          href={href(currentPage + 1)}
          className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm hover:bg-muted"
          aria-label="Pagina successiva"
          eventName="blog_pagination_click"
          eventParams={{
            from_page: currentPage,
            to_page: currentPage + 1,
            direction: "next",
            base_path: basePath,
          }}
        >
          Successiva
          <ChevronRight className="h-4 w-4" />
        </TrackedLink>
      ) : null}
    </nav>
  )
}
