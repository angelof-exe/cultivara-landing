import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

type WebhookPayload = {
  tags?: string[]
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    const tags = body?.tags ?? []
    if (tags.length === 0) {
      return NextResponse.json({ message: "No tags to revalidate" }, { status: 400 })
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }

    return NextResponse.json({ revalidated: tags, now: Date.now() })
  } catch (error) {
    console.error("Revalidate webhook error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
