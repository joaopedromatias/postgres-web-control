import type { Socket } from 'socket.io'

export async function queryController(this: Socket, query: string) {
  try {
    if (this.isConnectedToDb && this.pgClient) {
      const { rowCount, rows, command } = await this.pgClient.query(query)
      return this.emit('queryResults', { rowCount, rows, command })
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('queryResultsError', (err as Error).message)
  }
}
