import { Sequelize } from 'sequelize'
import type { Dialect } from 'sequelize'
import type { Socket } from 'socket.io'

export async function connectClientToDbController(
  this: Socket,
  parameters: Record<string, string>
) {
  try {
    if (this.isConnectedToDb) {
      return this.emit('isConnectedToDb', true)
    }

    const { database, username, password, dialect, port } = parameters

    this.sequelize = new Sequelize(database, username, password, {
      host: '0.0.0.0',
      dialect: dialect as Dialect,
      port: Number(port),
      logging: false,
      pool: { max: 1 }
    })

    await this.sequelize.authenticate()
    this.isConnectedToDb = true

    this.emit('isConnectedToDb', true)
    console.log(`connected ${this.id} to database`)
  } catch (err) {
    console.log(err)
    this.emit('isConnectedToDb', false)
  }
}
