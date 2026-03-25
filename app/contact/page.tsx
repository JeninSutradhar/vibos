import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/forms/contact-form"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Contact VIBOS",
  description: "Contact VIBOS for outsourcing support, consultation, and quotes.",
}

export default function ContactPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Contact VIBOS</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-700">
              Tell us your business requirements and we will recommend the right outsourcing model for your team.
            </p>
            <Link href="/book-consultation" className="mt-6 inline-block rounded-full border border-[#1D1D1F] px-6 py-3">
              Prefer a call? Book a consultation
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#1D1D1F]">General Inquiry</h2>
              <ContactForm
                endpoint="/api/leads/contact"
                sourcePage="/contact"
                submitLabel="Send Inquiry"
              />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#1D1D1F]">Request a Quote</h2>
              <ContactForm
                endpoint="/api/leads/quote"
                sourcePage="/contact"
                submitLabel="Request Quote"
                includeQuoteFields={true}
              />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
