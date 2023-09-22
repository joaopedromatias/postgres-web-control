import type { Client } from 'pg'

export async function getTables(pgClient: Client) {
  const { rows } = await pgClient.query(
    `SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
  )
  return rows
}
