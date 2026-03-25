"use client"

import { apiUrl } from "@/lib/api-client"

export type AdminToken = string | null

export function getAdminToken(): AdminToken {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem("admin_token")
}

export async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAdminToken()
  if (!token) {
    throw new Error("Admin session not found. Please log in.")
  }

  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  })

  const json = (await res.json()) as any
  if (!res.ok || json?.success !== true) {
    throw new Error(json?.error?.message || "Request failed")
  }

  return json.data as T
}

