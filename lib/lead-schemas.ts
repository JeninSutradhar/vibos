import { z } from "zod"

const baseLeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(2, "Company is required"),
  country: z.string().min(2, "Country is required"),
  serviceInterest: z.string().min(2, "Service interest is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  sourcePage: z.string().min(1, "Source page is required"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().optional(),
})

export const contactLeadSchema = baseLeadSchema

export const quoteLeadSchema = baseLeadSchema.extend({
  monthlyVolume: z.string().optional(),
  preferredStartDate: z.string().optional(),
  teamSizeNeeded: z.string().optional(),
})

export const callbackLeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(2, "Company is required"),
  country: z.string().min(2, "Country is required"),
  serviceInterest: z.string().min(2, "Service interest is required"),
  preferredTime: z.string().min(2, "Preferred time is required"),
  sourcePage: z.string().min(1, "Source page is required"),
  message: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().optional(),
})

export type ContactLeadInput = z.infer<typeof contactLeadSchema>
export type QuoteLeadInput = z.infer<typeof quoteLeadSchema>
export type CallbackLeadInput = z.infer<typeof callbackLeadSchema>
