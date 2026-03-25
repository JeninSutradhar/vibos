import { PageShell } from "@/components/page-shell"

export default function TermsOfServicePage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-4xl font-bold text-[#1D1D1F]">Terms of Service</h1>
          <p className="mt-4 text-gray-700">
            Service scope, engagement model, confidentiality, and commercial terms are finalized per client agreement.
          </p>
          <p className="mt-3 text-gray-700">
            Use the Contact page to request detailed terms for your engagement model.
          </p>
        </section>
      </main>
    </PageShell>
  )
}
