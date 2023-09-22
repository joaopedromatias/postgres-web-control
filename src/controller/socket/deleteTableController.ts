import type { Socket } from 'socket.io'
import { getTables } from '../../utils/getTables'

export async function deleteTableController(this: Socket, tableName: string) {
  try {
    if (this.pgClient && this.isConnectedToDb) {
      await this.pgClient.query(`DROP TABLE IF EXISTS ${tableName}`)
      const tables = await getTables(this.pgClient)
      return this.emit('tables', tables)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    console.error(err)
  }
}
