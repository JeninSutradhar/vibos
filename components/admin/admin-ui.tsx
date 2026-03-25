import type { ReactNode } from "react"

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#1D1D1F]/55">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  )
}

export function AdminStatCard({
  label,
  value,
  hint,
  accent = "teal",
}: {
  label: string
  value: string | number
  hint?: string
  accent?: "teal" | "amber" | "slate"
}) {
  const bar =
    accent === "teal"
      ? "from-[#67E8E9] to-[#14B8A6]"
      : accent === "amber"
        ? "from-[#FCD450] to-[#F59E0B]"
        : "from-[#94A3B8] to-[#64748B]"

  return (
    <AdminCard className="overflow-hidden p-5">
      <div className={`mb-3 h-1 w-12 rounded-full bg-gradient-to-r ${bar}`} />
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]/45">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-[#1D1D1F]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#1D1D1F]/50">{hint}</p> : null}
    </AdminCard>
  )
}

export function LeadStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-[#E9F8F8] text-[#0F766E] ring-[#99F6E4]/50",
    reviewed: "bg-[#EFF6FF] text-[#1D4ED8] ring-blue-200/50",
    qualified: "bg-[#FEF3C7] text-[#B45309] ring-amber-200/50",
    contacted: "bg-[#F3E8FF] text-[#7C3AED] ring-violet-200/50",
    closed: "bg-[#F1F5F9] text-[#475569] ring-slate-200/50",
  }
  const cls = map[status] || map.closed
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${cls}`}>
      {status}
    </span>
  )
}

export function LeadTypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    contact: "bg-[#DCFCE7] text-[#166534]",
    quote: "bg-[#DBEAFE] text-[#1E40AF]",
    callback: "bg-[#FCE7F3] text-[#9D174D]",
  }
  const cls = map[type] || "bg-slate-100 text-slate-700"
  return <span className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${cls}`}>{type}</span>
}
