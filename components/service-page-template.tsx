import Link from "next/link"
import type { ServicePageContent } from "@/lib/service-pages"

type Props = {
  service: ServicePageContent
}

export function ServicePageTemplate({ service }: Props) {
  return (
    <main>
      <section className="bg-[#FCFBF8] px-4 pb-16 pt-20 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] host-grotesk-bold lg:text-6xl">{service.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-gray-600 host-grotesk-regular">{service.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/book-consultation"
              className="rounded-full bg-[#1D1D1F] px-8 py-4 font-bold text-white transition-colors hover:bg-gray-800"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#1D1D1F] px-8 py-4 font-semibold text-[#1D1D1F] transition-colors hover:bg-[#1D1D1F] hover:text-white"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#FFF9E6] p-8">
              <h2 className="text-2xl font-bold text-[#1D1D1F] host-grotesk-bold">What We Do</h2>
              <p className="mt-4 leading-relaxed text-gray-700 host-grotesk-regular">{service.whatWeDo}</p>
              <h3 className="mt-6 text-lg font-bold text-[#1D1D1F] host-grotesk-semibold">Best suited for</h3>
              <p className="mt-2 text-gray-700 host-grotesk-regular">{service.audience}</p>
            </div>

            <div className="rounded-2xl bg-[#E9F8F8] p-8">
              <h2 className="text-2xl font-bold text-[#1D1D1F] host-grotesk-bold">Benefits</h2>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start text-gray-700 host-grotesk-regular">
                    <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#1D1D1F]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {service.tools && service.tools.length > 0 ? (
            <div className="mt-10 rounded-2xl border border-black/10 bg-[#FCFBF8] p-8">
              <h3 className="text-xl font-bold text-[#1D1D1F] host-grotesk-bold">Tools and Platforms</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium text-[#1D1D1F]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
