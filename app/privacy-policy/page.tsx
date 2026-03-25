import { PageShell } from "@/components/page-shell"

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-4xl font-bold text-[#1D1D1F]">Privacy Policy</h1>
          <p className="mt-4 text-gray-700">
            VIBOS collects contact and inquiry data only to respond to business requests and improve service delivery.
          </p>
          <p className="mt-3 text-gray-700">
            For full policy details and compliance requirements, contact us through the Contact page.
          </p>
        </section>
      </main>
    </PageShell>
  )
}
