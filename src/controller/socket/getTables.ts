import type { Socket } from 'socket.io'

export async function getTablesController(this: Socket) {
  try {
    if (this.pgClient && this.isConnectedToDb) {
      const { rows } = await this.pgClient.query(
        `SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
      )
      return this.emit('getTablesResults', rows)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    console.error(err)
  }
}
