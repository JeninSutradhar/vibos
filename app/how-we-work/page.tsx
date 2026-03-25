import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "How We Work | VIBOS",
  description: "Engagement models and onboarding for VIBOS virtual business operations.",
}

const models = [
  {
    title: "Dedicated staff",
    body: "A specialist works exclusively with your business, aligned to your tools and SLAs.",
  },
  {
    title: "Monthly outsourcing",
    body: "Fixed-scope monthly programs for insurance back-office, bookkeeping, or marketing ops.",
  },
  {
    title: "Project or task-based",
    body: "Short work such as quoting pushes, AMS clean-up, or data projects, priced by deliverable.",
  },
  {
    title: "Virtual assistant",
    body: "Email, calendar, documentation, research, and administrative continuity.",
  },
]

const steps = [
  { title: "Initial consultation", desc: "Goals, volume, tools, and outcomes." },
  { title: "Process and requirements", desc: "Workflows, access, quality bars, communication." },
  { title: "Team assignment and setup", desc: "Dedicated specialist or pod and secure channels." },
  { title: "Training and alignment", desc: "Guidelines, carriers, AMS, internal playbooks." },
  { title: "Go-live and partnership", desc: "Structured feedback, reporting, improvement." },
]

export default function HowWeWorkPage() {
  return (
    <PageShell>
      <main className="px-4 pb-20 pt-16 sm:px-8 lg:px-16">
        <section className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-[#1D1D1F] lg:text-6xl">How we work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Flexible models and a clear path so remote support extends your team.
          </p>
        </section>

        <section className="container mx-auto mt-14 max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-[#1D1D1F]">Engagement models</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {models.map((m) => (
              <div key={m.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-lg font-bold text-[#1D1D1F]">{m.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto mt-16 max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-[#1D1D1F]">Typical onboarding</h2>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D1D1F] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#1D1D1F]">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="container mx-auto mt-16 max-w-3xl rounded-2xl border border-black/10 bg-[#FCFBF8] p-8 text-center">
          <Link href="/book-consultation" className="inline-block rounded-full bg-[#1D1D1F] px-8 py-3 text-sm font-bold text-white">
            Schedule a consultation
          </Link>
        </section>
      </main>
    </PageShell>
  )
}
