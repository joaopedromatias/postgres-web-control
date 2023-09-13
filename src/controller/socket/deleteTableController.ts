import type { Socket } from 'socket.io'

export async function deleteTableController(this: Socket, tableName: string) {
  try {
    if (this.pgClient && this.isConnectedToDb) {
      await this.pgClient.query(`DROP TABLE IF EXISTS ${tableName}`)
      return this.emit('deletedTable')
    }
    throw new Error('Not connected to database')
  } catch (err) {
    console.error(err)
  }
}
