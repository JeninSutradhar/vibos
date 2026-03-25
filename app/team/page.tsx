import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { phpApiBaseUrl } from "@/lib/api-client"

export const metadata: Metadata = {
  title: "Our Team | VIBOS",
  description: "Meet the team behind VIBOS virtual business operations.",
}

const teamHighlightsFallback = [
  {
    title: "Insurance Operations Specialists",
    description:
      "Focused professionals supporting quoting, policy servicing, AMS updates, documentation, and operational continuity.",
  },
  {
    title: "Virtual Operations Team",
    description:
      "Dedicated assistants and process support specialists helping clients streamline repetitive business workflows.",
  },
  {
    title: "Finance and MCA Support Team",
    description:
      "Execution-focused team supporting bookkeeping and MCA workflows with process consistency and clear communication.",
  },
]

export default async function TeamPage() {
  const base = phpApiBaseUrl
  const profiles = base
    ? (((await (await fetch(`${base}/api/team`, { cache: "no-store" })).json()).data ?? []) as Array<{
        title: string
        description: string
      }>)
    : teamHighlightsFallback

  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Our Team</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-700">
              Since 2016, VIBOS has built dedicated support teams that work like a natural extension of client
              operations.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {profiles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h2 className="text-xl font-bold text-[#1D1D1F]">{item.title}</h2>
                <p className="mt-3 text-gray-700">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[#FFF9E6] p-8 text-center">
            <h2 className="text-3xl font-bold text-[#1D1D1F]">Want to work with our team?</h2>
            <p className="mt-3 text-gray-700">Book a call and we will match the right support model to your workflow.</p>
            <Link href="/book-consultation" className="mt-5 inline-block rounded-full bg-[#1D1D1F] px-6 py-3 text-white">
              Book Consultation
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
