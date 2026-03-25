import { Pool } from "pg"

type LeadType = "contact" | "quote" | "callback"

type LeadRecord = {
  leadType: LeadType
  payload: Record<string, unknown>
  sourcePage: string
}

let pool: Pool | null = null
let schemaReady = false

function getPool() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return null
  }

  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
    })
  }

  return pool
}

async function ensureSchema() {
  const db = getPool()
  if (!db || schemaReady) {
    return
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      lead_type TEXT NOT NULL,
      source_page TEXT NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)
  schemaReady = true
}

export async function storeLead(record: LeadRecord) {
  const db = getPool()
  if (!db) {
    return { persisted: false, reason: "DATABASE_URL not configured" as const }
  }

  await ensureSchema()
  await db.query("INSERT INTO leads (lead_type, source_page, payload) VALUES ($1, $2, $3)", [
    record.leadType,
    record.sourcePage,
    JSON.stringify(record.payload),
  ])

  return { persisted: true as const }
}
