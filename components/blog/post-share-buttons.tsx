"use client"

import { useEffect, useState } from "react"
import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
  Copy,
  Check,
} from "lucide-react"

import { trackEvent } from "@/lib/analytics"

type Props = {
  slug: string
  title: string
  excerpt?: string | null
}

type Channel = "web_share_api" | "facebook" | "twitter" | "linkedin" | "whatsapp" | "email" | "copy_link"

const SITE_ORIGIN = "https://cultivara.it"

export function PostShareButtons({ slug, title, excerpt }: Props) {
  const [hasNativeShare, setHasNativeShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHasNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function")
  }, [])

  const url =
    typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `${SITE_ORIGIN}/blog/${slug}`

  function fire(channel: Channel) {
    trackEvent("blog_post_share", { slug, channel })
  }

  async function handleNative() {
    if (!navigator.share) return
    try {
      await navigator.share({ title, text: excerpt ?? undefined, url })
      fire("web_share_api")
    } catch {
      // User canceled or unavailable — silent
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      fire("copy_link")
    } catch {
      // Clipboard blocked — silent
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"

  return (
    <div className="my-12 rounded-xl border border-border/60 bg-muted/20 p-5">
      <p className="mb-3 text-sm font-semibold text-foreground">Condividi questo articolo</p>
      <div className="flex flex-wrap gap-2">
        {hasNativeShare ? (
          <button type="button" className={buttonClass} onClick={handleNative}>
            <Share2 className="h-3.5 w-3.5" />
            Condividi
          </button>
        ) : null}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          onClick={() => fire("facebook")}
        >
          <Facebook className="h-3.5 w-3.5" />
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          onClick={() => fire("twitter")}
        >
          <Twitter className="h-3.5 w-3.5" />
          X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          onClick={() => fire("linkedin")}
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          onClick={() => fire("whatsapp")}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt ?? ""}\n\n${url}`)}`}
          className={buttonClass}
          onClick={() => fire("email")}
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
        <button type="button" className={buttonClass} onClick={handleCopy} aria-live="polite">
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiato!" : "Copia link"}
        </button>
      </div>
    </div>
  )
}
