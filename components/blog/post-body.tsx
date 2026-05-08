import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "sanity"

import { urlFor } from "@/sanity/lib/image"

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      const src = urlFor(value).width(1200).url()
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={src}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code>{value?.code}</code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }) => <p className="my-5 leading-relaxed text-foreground/90">{children}</p>,
    h2: ({ children, value }) => {
      const id = (value as { _toc_id?: string })?._toc_id
      return (
        <h2 id={id} className="scroll-mt-24 mt-12 mb-4 font-serif text-3xl text-foreground">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const id = (value as { _toc_id?: string })?._toc_id
      return (
        <h3 id={id} className="scroll-mt-24 mt-8 mb-3 font-serif text-2xl text-foreground">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 font-serif text-xl text-foreground">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary/60 bg-primary/5 px-6 py-4 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-foreground/90">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6 text-foreground/90">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? "#"
      const isExternal = /^https?:\/\//.test(href) && value?.blank !== false
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className="text-primary underline underline-offset-2 hover:text-primary/80">
          {children}
        </Link>
      )
    },
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
  },
}

export function PostBody({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
