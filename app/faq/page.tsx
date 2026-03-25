import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { faqItems } from "@/lib/faq-content"

export const metadata: Metadata = {
  title: "FAQs | VIBOS",
  description: "Frequently asked questions about VIBOS outsourcing and how to get started.",
}

export default function FaqPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Frequently asked questions</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">
            How we work with insurance, financial services, and operations teams worldwide.
          </p>
        </section>

        <section className="container mx-auto mt-12 max-w-3xl space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-2xl border border-black/10 bg-white px-5 py-4">
              <summary className="cursor-pointer font-semibold text-[#1D1D1F]">{item.question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="container mx-auto mt-14 max-w-3xl rounded-2xl border border-black/10 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-[#1D1D1F]">Still have questions?</h2>
          <p className="mt-2 text-gray-700">Contact us for scope, security, and timelines.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-full bg-[#1D1D1F] px-6 py-3 text-sm font-bold text-white">
              Contact us
            </Link>
            <Link href="/data-security" className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold">
              Data security
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
