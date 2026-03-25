import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { phpApiBaseUrl } from "@/lib/api-client"
import { services as localServices } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Services | VIBOS",
  description: "Explore VIBOS outsourcing and virtual operations services.",
}

export default async function ServicesPage() {
  const base = phpApiBaseUrl
  const services = base
    ? (((await (await fetch(`${base}/api/services`, { cache: "no-store" })).json()).data ?? []) as Array<{
        slug: string
        title: string
        subtitle: string
      }>)
    : localServices.map((s) => ({ slug: s.slug, title: s.title, subtitle: s.shortDescription }))

  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[#1D1D1F] host-grotesk-bold lg:text-6xl">Services</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-700 host-grotesk-regular">
              We provide dedicated back-office, virtual assistant, and operational support services built for growing
              businesses.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.slug} className="rounded-2xl border border-black/10 bg-white p-7">
                <h2 className="text-2xl font-bold text-[#1D1D1F]">{service.title}</h2>
                <p className="mt-3 text-gray-700">{service.subtitle}</p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-full bg-[#1D1D1F] px-5 py-2 text-sm font-semibold text-white"
                  >
                    View details
                  </Link>
                  <Link href="/contact" className="rounded-full border border-black/20 px-5 py-2 text-sm font-semibold">
                    Request quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
