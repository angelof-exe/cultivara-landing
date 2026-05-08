"use client"

import { useRouter } from "next/navigation"

export function DisableDraftMode() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/draft-mode/disable")
        router.refresh()
      }}
      className="fixed bottom-4 right-4 z-[9999] rounded-md bg-black px-3 py-2 text-xs font-medium text-white shadow-lg hover:bg-black/80"
    >
      Disattiva preview
    </button>
  )
}
