import { NextRequest } from "next/server"
import { callbackLeadSchema } from "@/lib/lead-schemas"
import { handleLeadRequest } from "@/lib/lead-handler"

export async function POST(request: NextRequest) {
  return handleLeadRequest({
    request,
    schema: callbackLeadSchema,
    leadType: "callback",
    subject: "New VIBOS callback request",
  })
}
