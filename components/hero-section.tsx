import { TrackableLink } from "@/components/trackable-link"

export function HeroSection() {
  return (
    <section className="bg-[#FCFBF8] px-4 pb-20 pt-20 sm:px-8 lg:px-16">
      <div className="container mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative mx-auto w-full max-w-xl h-[440px]">
          <img
            src="/images/hero-graphic-exact.png"
            alt="VIBOS virtual operations support illustration"
            className="h-full w-full object-contain"
          />

          {/* Give the abstract graphic a job: it becomes a 3-step story */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-10 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Assess
            </div>
            <div className="absolute right-0 top-24 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Execute
            </div>
            <div className="absolute left-6 bottom-8 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Improve
            </div>

            <div className="absolute left-10 top-28 h-[170px] w-0.5 bg-black/10" />
            <div className="absolute left-[55%] top-12 h-0.5 w-[140px] bg-black/10" />
          </div>
        </div>

        <div className="space-y-7 text-center lg:text-left">
          {/* Clear micro-claim for hierarchy */}
          <div className="inline-flex items-center justify-center lg:justify-start">
            <span className="rounded-full bg-[#E9F8F8] px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Insurance back-office + virtual business ops
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] text-[#1D1D1F] host-grotesk-bold">
            Your Global Partner <span className="whitespace-nowrap">for Virtual</span>
            <br />
            Business Operations.
          </h1>

          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-700 lg:mx-0 host-grotesk-regular">
            VIBOS provides dedicated teams for insurance back-office execution, BPO operations, MCA support,
            bookkeeping, and digital workflows—so your internal team can focus on growth.
          </p>

          {/* Stronger CTA context */}
          <div className="mx-auto max-w-md lg:mx-0">
            <TrackableLink
              href="/book-consultation"
              eventName="cta_click"
              metadata={{ location: "hero", cta: "book_consultation" }}
              className="inline-flex w-full items-center justify-center bg-[#1D1D1F] text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-800 transition-colors host-grotesk-semibold lg:w-auto"
            >
              Book a 15–30 min Ops Call
            </TrackableLink>
            <p className="mt-3 text-sm text-gray-600 host-grotesk-regular">
              We’ll map the fastest path to reduce manual work and improve execution quality.
            </p>
          </div>

          {/* Lightweight trust chips instead of a heavy card */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Founded 2016
            </span>
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              US • Canada • Australia • UK
            </span>
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1D1D1F] host-grotesk-semibold">
              Dedicated teams
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
