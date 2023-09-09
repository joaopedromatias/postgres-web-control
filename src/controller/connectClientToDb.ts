import { Sequelize } from 'sequelize'
import type { Dialect } from 'sequelize'
import type { Socket } from 'socket.io'

export const connectClientToDbController = async (
  socket: Socket,
  sequelize: Sequelize | null,
  parameters: Record<string, string>,
  isConnectedToDb: boolean
) => {
  try {
    if (isConnectedToDb) {
      return socket.emit('isConnectedToDb', true)
    }

    const { database, username, password, dialect, port } = parameters

    sequelize = new Sequelize(database, username, password, {
      host: '0.0.0.0',
      dialect: dialect as Dialect,
      port: Number(port),
      logging: false,
      pool: { max: 1 }
    })

    await sequelize.authenticate()
    isConnectedToDb = true

    socket.emit('isConnectedToDb', true)
  } catch (err) {
    socket.emit('isConnectedToDb', false)
  }
}
