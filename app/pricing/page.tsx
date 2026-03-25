import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Pricing and Engagement | VIBOS",
  description:
    "How VIBOS prices dedicated outsourcing, monthly programs, and project work—without one-size-fits-all rate cards on the website.",
}

export default function PricingPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Pricing and engagement</h1>
          <p className="mx-auto mt-4 text-lg text-gray-700">
            We do not publish a generic rate card. Scope depends on your industry, tools, hours, complexity, and service
            level. That is good for you—it means pricing maps to real work, not a menu that ignores your workflow.
          </p>
        </section>

        <section className="container mx-auto mt-14 max-w-3xl space-y-8 rounded-2xl border border-black/10 bg-white p-8 lg:p-10">
          <div>
            <h2 className="text-xl font-bold text-[#1D1D1F]">What we optimize for</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>Predictable monthly capacity for recurring operations</li>
              <li>Clear deliverables for project or sprint-based work</li>
              <li>Transparency on roles, coverage hours, and escalation paths</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1D1D1F]">How to get a number</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Share your objectives, approximate volume, systems (AMS, CRM, accounting stack), and timeline. We respond
              with a recommended model—dedicated, monthly program, or project—and a proposal you can compare to in-house
              hiring and overhead.
            </p>
          </div>
        </section>

        <section className="container mx-auto mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-[#1D1D1F] px-8 py-3 text-sm font-bold text-white">
            Request a quote
          </Link>
          <Link href="/book-consultation" className="rounded-full border border-[#1D1D1F] px-8 py-3 text-sm font-semibold">
            Book a consultation
          </Link>
          <Link href="/how-we-work" className="rounded-full border border-black/15 px-8 py-3 text-sm font-semibold">
            How we work
          </Link>
        </section>
      </main>
    </PageShell>
  )
}
