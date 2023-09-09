import type { Sequelize } from 'sequelize'
import type { Socket } from 'socket.io'

export const queryController = async (
  socket: Socket,
  sequelize: Sequelize | null,
  query: string,
  isConnectedToDb: boolean
) => {
  try {
    if (isConnectedToDb && sequelize) {
      const [results, metadata] = await sequelize.query(query)
      return socket.emit('queryResults', { results, metadata })
    }
    throw new Error('Not connected to database')
  } catch (err) {
    socket.emit('queryResultsError', (err as Error).message)
  }
}
