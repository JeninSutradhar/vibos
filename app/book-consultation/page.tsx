import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/contact-form"
import { BookingTracker } from "@/components/booking-tracker"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Book Consultation | VIBOS",
  description: "Book a consultation with VIBOS or request a callback.",
}

const defaultCalendlyUrl =
  "https://calendly.com/suhail-kiarainfo/30min?hide_landing_page=1&hide_gdpr_banner=1"

const calendlyFromEnv = process.env.NEXT_PUBLIC_CALENDLY_URL

// Calendly "landing page" vs "widget" behavior depends on query params.
// `hide_landing_page=1` makes the iframe render the scheduling widget.
let calendlyUrl = calendlyFromEnv || defaultCalendlyUrl
try {
  const u = new URL(calendlyUrl)
  u.searchParams.set("hide_landing_page", "1")
  calendlyUrl = u.toString()
} catch {
  // Keep default if URL parsing fails
}

export default function BookConsultationPage() {
  return (
    <PageShell>
      <BookingTracker />
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-6xl">
          <h1 className="text-center text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Book a Consultation</h1>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-gray-700">
            Choose a time that works for you using Calendly, or send a callback request if you prefer manual scheduling.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <iframe
                title="Calendly booking"
                src={calendlyUrl}
                className="h-[760px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#1D1D1F]">Request a Callback</h2>
              <ContactForm
                endpoint="/api/leads/callback"
                sourcePage="/book-consultation"
                submitLabel="Request Callback"
                includeCallbackFields={true}
              />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
