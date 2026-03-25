import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { companyProfile } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "About VIBOS",
  description:
    "Founded in 2016, VIBOS is your global partner for virtual business operations, serving insurance and growing teams in the US, Canada, Australia, and the UK.",
}

export default function AboutPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">About us</p>
          <h1 className="mt-3 text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Built for operational excellence</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">
            {companyProfile.tagline} Since {companyProfile.founded}, we have helped international teams scale support
            without sacrificing quality, security, or communication.
          </p>
        </section>

        <section className="container mx-auto mt-16 max-w-4xl rounded-2xl border border-black/10 bg-white p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">Who we are</h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            VIBOS (Vibos Technologies Pvt. Ltd.) is a specialist outsourcing partner based in {companyProfile.location}.
            Our team of about {companyProfile.teamSize} professionals supports mid-size and growth-stage organizations that
            need dependable back-office, insurance operations, and virtual support, especially across{" "}
            {companyProfile.markets.join(", ")}.
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            We combine industry-specific experience in property and casualty insurance and financial services with disciplined process
            execution. Clients work with dedicated people who learn your AMS, CRM, and workflows.
          </p>
        </section>

        <section className="container mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-[#FCFBF8] p-8">
            <h2 className="text-xl font-bold text-[#1D1D1F]">What sets us apart</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>Dedicated specialists who integrate with your team and tools.</li>
              <li>Strong focus on data accuracy, reliability, and clear communication.</li>
              <li>Flexible models: dedicated staff, monthly programs, and project-based work.</li>
              <li>Cost-effective scaling without hiring and training entirely in-house.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-[#FCFBF8] p-8">
            <h2 className="text-xl font-bold text-[#1D1D1F]">Problems we solve</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Teams come to us when manual workload, AMS backlog, underwriting support, bookkeeping, or admin work slows
              growth. We take on repeatable work so leaders can focus on clients and strategy.
            </p>
          </div>
        </section>

        <section className="container mx-auto mt-12 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[#1D1D1F]">Work with us</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-700">
            Explore our services, read FAQs, or book a consultation to map the right engagement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/book-consultation"
              className="rounded-full bg-[#1D1D1F] px-8 py-3 text-sm font-bold text-white hover:bg-gray-800"
            >
              Book a consultation
            </Link>
            <Link href="/services" className="rounded-full border border-[#1D1D1F] px-8 py-3 text-sm font-semibold">
              View services
            </Link>
            <Link href="/faq" className="rounded-full border border-black/15 px-8 py-3 text-sm font-semibold">
              Read FAQs
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
