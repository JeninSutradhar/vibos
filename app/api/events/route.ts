import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { storeEvent } from "@/lib/events-db"

const eventSchema = z.object({
  eventName: z.string().min(1),
  page: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional().default({}),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = eventSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const storage = await storeEvent(parsed.data.eventName, parsed.data.page, parsed.data.metadata)
  return NextResponse.json({ success: true, storage })
}
