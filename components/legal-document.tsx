import type { ReactNode } from "react"

type LegalDocumentProps = {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalDocument({ title, lastUpdated, children }: LegalDocumentProps) {
  return (
    <article>
      <h1 className="text-4xl font-bold text-[#1D1D1F] lg:text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>
      <div className="mt-10 space-y-10">{children}</div>
    </article>
  )
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-[#1D1D1F] lg:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 lg:text-base">{children}</div>
    </section>
  )
}
