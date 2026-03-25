import { NextRequest } from "next/server"
import { contactLeadSchema } from "@/lib/lead-schemas"
import { handleLeadRequest } from "@/lib/lead-handler"

export async function POST(request: NextRequest) {
  return handleLeadRequest({
    request,
    schema: contactLeadSchema,
    leadType: "contact",
    subject: "New VIBOS contact inquiry",
  })
}
