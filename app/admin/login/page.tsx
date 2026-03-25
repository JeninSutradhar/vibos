"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getPhpApiBaseUrl } from "@/lib/api-client"
import { AdminCard } from "@/components/admin/admin-ui"
import { ArrowRight, Lock, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@vibos.com")
  const [password, setPassword] = useState("DevAdmin123!")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${getPhpApiBaseUrl()}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const json = await res.json()
      if (!res.ok || json?.success !== true) {
        throw new Error(json?.error?.message || "Login failed")
      }

      window.localStorage.setItem("admin_token", json.data.token)
      router.push("/admin/leads")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D1D1F] text-[#67E8E9] shadow-lg">
          <Shield className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F] sm:text-3xl">VIBOS Admin</h1>
        <p className="mt-2 text-sm text-[#1D1D1F]/55">Sign in to manage leads, content, and subscribers.</p>
      </div>

      <AdminCard className="w-full max-w-md overflow-hidden shadow-lg">
        <div className="border-b border-black/[0.06] bg-gradient-to-r from-[#E9F8F8] to-[#FCFBF8] px-6 py-4">
          <p className="text-sm font-semibold text-[#1D1D1F]">Secure access</p>
          <p className="text-xs text-[#1D1D1F]/50">JWT session · use seeded credentials in development</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#FCFBF8] px-4 py-3 text-sm font-medium text-[#1D1D1F] outline-none ring-[#67E8E9]/40 focus:ring-2"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1D1D1F]/45">Password</span>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D1D1F]/35" />
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#FCFBF8] py-3 pl-10 pr-4 text-sm font-medium outline-none ring-[#67E8E9]/40 focus:ring-2"
                autoComplete="current-password"
              />
            </div>
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-black/85 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Continue"}
            {!loading ? <ArrowRight className="h-4 w-4" /> : null}
          </button>
        </form>
      </AdminCard>

      <p className="mt-8 text-center text-xs text-[#1D1D1F]/45">
        <Link href="/" className="font-semibold text-teal-700 underline hover:text-teal-800">
          ← Back to website
        </Link>
      </p>
    </div>
  )
}
