import type { Socket } from 'socket.io'
import { getTables } from '../../utils/getTables'

export async function tableController(this: Socket) {
  try {
    if (this.isConnectedToDb && this.pgClient) {
      const tables = await getTables(this.pgClient)
      return this.emit('tables', tables)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('tablesError', (err as Error).message)
    console.error(err)
  }
}
