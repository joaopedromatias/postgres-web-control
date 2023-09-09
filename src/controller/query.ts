import type { Socket } from 'socket.io'

export async function queryController(this: Socket, query: string) {
  try {
    if (this.isConnectedToDb && this.sequelize) {
      const [results, metadata] = await this.sequelize.query(query)
      return this.emit('queryResults', { results, metadata })
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('queryResultsError', (err as Error).message)
  }
}
