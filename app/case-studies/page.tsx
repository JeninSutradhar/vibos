import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Case Studies and Outcomes | VIBOS",
  description:
    "How VIBOS helps insurance, MCA, and operations teams improve throughput, accuracy, and cost structure, with discretion for client confidentiality.",
}

const themes = [
  {
    title: "Insurance agency operations",
    summary:
      "Prospect intake, AMS hygiene, quoting support, and policy servicing aligned to carrier and agency standards, reducing backlog and freeing producers to sell.",
  },
  {
    title: "MCA and lending workflows",
    summary:
      "Structured support for application intake, document review, bank statement analysis, and coordination so underwriting and funding teams stay focused on decisions.",
  },
  {
    title: "Finance and bookkeeping",
    summary:
      "Consistent month-end discipline for AP/AR, reconciliations, and reporting so leadership sees numbers they can trust.",
  },
]

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Outcomes we drive</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Many of our engagements are covered by NDAs. Below are representative themes without client names so you can see
            how we typically create leverage.
          </p>
        </section>

        <section className="container mx-auto mt-14 max-w-5xl space-y-6">
          {themes.map((t) => (
            <article key={t.title} className="rounded-2xl border border-black/10 bg-white p-8">
              <h2 className="text-xl font-bold text-[#1D1D1F]">{t.title}</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{t.summary}</p>
            </article>
          ))}
        </section>

        <section className="container mx-auto mt-14 max-w-3xl rounded-2xl border border-black/10 bg-[#FCFBF8] p-8 text-center">
          <h2 className="text-xl font-bold text-[#1D1D1F]">Deeper stories and insights</h2>
          <p className="mt-2 text-gray-700">
            Our blog covers outsourcing strategy, operations, and industry notes, whether or not you work with us yet.
          </p>
          <Link href="/blog" className="mt-6 inline-block rounded-full bg-[#1D1D1F] px-8 py-3 text-sm font-bold text-white">
            Visit the blog
          </Link>
        </section>
      </main>
    </PageShell>
  )
}
