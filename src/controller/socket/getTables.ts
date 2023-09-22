import type { Socket } from 'socket.io'
import { getTables } from '../../utils/getTables'

export async function getTablesController(this: Socket) {
  try {
    if (this.pgClient && this.isConnectedToDb) {
      const tables = await getTables(this.pgClient)
      return this.emit('tables', tables)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    console.error(err)
  }
}
