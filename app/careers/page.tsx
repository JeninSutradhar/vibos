import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { getPhpApiBaseUrl } from "@/lib/api-client"

export const metadata: Metadata = {
  title: "Careers | VIBOS",
  description: "Explore career opportunities at VIBOS.",
}

const openingsFallback = [
  {
    title: "Insurance Back-Office Specialist",
    type: "Full-time",
    mode: "Remote",
    description: "We are looking for professionals with strong communication, process discipline, and ownership mindset.",
  },
  {
    title: "Virtual Assistant - Operations",
    type: "Full-time",
    mode: "Remote",
    description: "We are looking for professionals with strong communication, process discipline, and ownership mindset.",
  },
  {
    title: "Bookkeeping Support Associate",
    type: "Full-time",
    mode: "Remote",
    description: "We are looking for professionals with strong communication, process discipline, and ownership mindset.",
  },
]

export default async function CareersPage() {
  const base = getPhpApiBaseUrl()
  const openings = base
    ? (((await (await fetch(`${base}/api/careers`, { cache: "no-store" })).json()).data ?? []) as Array<{
        title: string
        type: string
        mode: string
        description: string
      }>)
    : openingsFallback

  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">Careers at VIBOS</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-700">
              Join a team that helps businesses around the world scale through reliable operational support.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {openings.map((opening) => (
              <article key={opening.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h2 className="text-xl font-bold text-[#1D1D1F]">{opening.title}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {opening.type} · {opening.mode}
                </p>
                <p className="mt-3 text-gray-700">{opening.description}</p>
                <Link href="/contact" className="mt-4 inline-block font-semibold underline">
                  Apply / Send Inquiry
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
