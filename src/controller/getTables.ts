import { Sequelize } from 'sequelize'
import type { Socket } from 'socket.io'

export const getTablesController = async (
  socket: Socket,
  sequelize: Sequelize | null,
  isConnectedToDb: boolean
) => {
  try {
    if (sequelize && isConnectedToDb) {
      const tablesInformation = await sequelize.query(
        `SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
      )
      return socket.emit('getTablesResults', tablesInformation)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    socket.emit('getTablesResultsError', err)
  }
}
