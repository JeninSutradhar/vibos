import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { storeLead } from "@/lib/leads-db"
import { sendLeadNotification } from "@/lib/mailer"
import { checkRateLimit } from "@/lib/rate-limit"

type HandleLeadParams<T extends z.ZodTypeAny> = {
  request: NextRequest
  schema: T
  leadType: "contact" | "quote" | "callback"
  subject: string
}

export async function handleLeadRequest<T extends z.ZodTypeAny>({
  request,
  schema,
  leadType,
  subject,
}: HandleLeadParams<T>) {
  const ipKey = request.headers.get("x-forwarded-for") || "unknown"
  const rateResult = checkRateLimit(`${leadType}:${ipKey}`)
  if (!rateResult.allowed) {
    return NextResponse.json({ success: false, error: "Too many requests. Try again shortly." }, { status: 429 })
  }

  const body = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true })
  }

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  }

  const dbStatus = await storeLead({
    leadType,
    payload,
    sourcePage: parsed.data.sourcePage,
  })
  const mailStatus = await sendLeadNotification({ subject, payload })

  return NextResponse.json({
    success: true,
    storage: dbStatus,
    email: mailStatus,
  })
}
