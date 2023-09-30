import type { Socket } from 'socket.io'
import { getTables } from '../../utils/getTables'

export async function queryController(this: Socket, query: string) {
  try {
    if (this.isConnectedToDb && this.pgClient) {
      const { rowCount, rows, command } = await this.pgClient.query(query)

      /*
      const clientId = this.id
      const now = new Date().toISOString()
      const dynamoPayload = { clientId, query, rowCount, rows, command, timestamp: now }
      */

      this.emit('queryResults', { rowCount, rows, command })

      const tables = await getTables(this.pgClient)
      return this.emit('tables', tables)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('queryResultsError', (err as Error).message)
  }
}
