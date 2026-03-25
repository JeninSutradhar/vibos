import { Pool } from "pg"

let pool: Pool | null = null
let tableReady = false

function getPool() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }

  return pool
}

export async function storeEvent(eventName: string, page: string, metadata: Record<string, unknown>) {
  const db = getPool()
  if (!db) {
    return { persisted: false as const, reason: "DATABASE_URL not configured" }
  }

  if (!tableReady) {
    await db.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id BIGSERIAL PRIMARY KEY,
        event_name TEXT NOT NULL,
        page TEXT NOT NULL,
        metadata JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    tableReady = true
  }

  await db.query("INSERT INTO analytics_events (event_name, page, metadata) VALUES ($1, $2, $3)", [
    eventName,
    page,
    JSON.stringify(metadata),
  ])

  return { persisted: true as const }
}
