"use client"

import { useState } from "react"
import { apiUrl } from "@/lib/api-client"

export function NewsletterSubscribeForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch(apiUrl("/api/newsletter/subscribe"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const json = await res.json()
      if (!res.ok || json?.success !== true) {
        throw new Error(json?.error?.message || "Subscribe failed")
      }

      setMessage("Thanks! You’re subscribed.")
      setEmail("")
    } catch (err: any) {
      setMessage(err?.message || "Subscribe failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex w-full md:w-auto" onSubmit={onSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter Email"
        required
        className="w-full md:w-auto px-4 py-2 rounded-l-full border-none focus:outline-none focus:ring-2 focus:ring-[#FCD450] host-grotesk-regular"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-300 text-[#1D1D1F] font-bold px-6 py-2 rounded-r-full hover:bg-cyan-400 transition-colors host-grotesk-semibold disabled:opacity-70"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  )
}

