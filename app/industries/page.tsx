import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { services } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Industries We Serve | VIBOS",
  description:
    "Industries supported by VIBOS: P&C insurance, MCA and lending, accounting, digital marketing, benefits administration, and SMB operations.",
}

const industryNotes: Record<string, string> = {
  "insurance-back-office-support": "Agencies, brokers, MGAs: AMS, quoting, servicing, and documentation.",
  "mca-back-office-support": "MCA providers and brokerages: pipeline, docs, analysis, and coordination.",
  "accounting-and-bookkeeping": "SMBs and firms needing reliable books and reporting.",
  "digital-marketing-services": "Brands and agencies scaling campaigns and content.",
  "employee-benefits-administration-support": "Brokers and HR teams managing enrollment and renewals.",
  "business-process-outsourcing": "Founders and operators outsourcing repeatable operational work.",
}

export default function IndustriesPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Industries we serve</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            We focus on regulated and operationally intense sectors where accuracy, tool fluency, and discretion matter,
            primarily for clients in the US, Canada, Australia, and the UK.
          </p>
        </section>

        <section className="container mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-[#1D1D1F]/30 hover:bg-[#FCFBF8]"
            >
              <h2 className="text-lg font-bold text-[#1D1D1F] group-hover:underline">{s.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{industryNotes[s.slug] ?? s.audience}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#1D1D1F]">View service</span>
            </Link>
          ))}
        </section>

        <section className="container mx-auto mt-14 max-w-3xl text-center">
          <p className="text-gray-700">
            Not sure which line item fits? Tell us what you do day-to-day. We will map it to the right pod and tools.
          </p>
          <Link href="/contact" className="mt-6 inline-block rounded-full bg-[#1D1D1F] px-8 py-3 text-sm font-bold text-white">
            Talk to our team
          </Link>
        </section>
      </main>
    </PageShell>
  )
}
