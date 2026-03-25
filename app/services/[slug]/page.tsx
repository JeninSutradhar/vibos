import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { ServicePageTemplate } from "@/components/service-page-template"
import { phpApiBaseUrl } from "@/lib/api-client"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const base = phpApiBaseUrl
  const serviceRes = base
    ? await fetch(`${base}/api/services/${encodeURIComponent(slug)}`, { cache: "no-store" })
    : null

  if (!base || !serviceRes || !serviceRes.ok) {
    return { title: "Service Not Found | VIBOS" }
  }

  const json = (await serviceRes.json()) as any
  const service = json?.data
  if (!service) return { title: "Service Not Found | VIBOS" }

  return {
    title: `${service.title} | VIBOS`,
    description: service.subtitle,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const base = phpApiBaseUrl
  const res = await fetch(`${base}/api/services/${encodeURIComponent(slug)}`, { cache: "no-store" })
  if (!res.ok) notFound()

  const json = (await res.json()) as any
  const service = json?.data
  if (!service) notFound()

  return (
    <PageShell>
      <ServicePageTemplate service={service} />
    </PageShell>
  )
}
