import { NextRequest } from "next/server"
import { quoteLeadSchema } from "@/lib/lead-schemas"
import { handleLeadRequest } from "@/lib/lead-handler"

export async function POST(request: NextRequest) {
  return handleLeadRequest({
    request,
    schema: quoteLeadSchema,
    leadType: "quote",
    subject: "New VIBOS quote request",
  })
}
