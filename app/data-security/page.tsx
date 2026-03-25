import { PageShell } from "@/components/page-shell"

export default function DataSecurityPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
          <h1 className="text-4xl font-bold text-[#1D1D1F]">Data Security</h1>
          <p className="mt-4 text-gray-700">
            VIBOS follows secure remote workflow practices, role-based access discipline, and operational controls for
            client data handling.
          </p>
          <p className="mt-3 text-gray-700">
            Contact us for project-specific security requirements and documentation.
          </p>
        </section>
      </main>
    </PageShell>
  )
}
