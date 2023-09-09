import type { Socket } from 'socket.io'

export async function getTablesController(this: Socket) {
  try {
    if (this.sequelize && this.isConnectedToDb) {
      const tablesInformation = await this.sequelize.query(
        `SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
      )
      return this.emit('getTablesResults', tablesInformation)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('getTablesResultsError', err)
  }
}
