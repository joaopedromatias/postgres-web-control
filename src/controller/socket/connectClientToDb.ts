import { Client } from 'pg'
import type { Socket } from 'socket.io'

export async function connectClientToDbController(
  this: Socket,
  parameters: Record<string, string>
) {
  try {
    if (this.isConnectedToDb) {
      return this.emit('isConnectedToDb', true)
    }

    const { database, username, password, port } = parameters

    this.pgClient = new Client({
      database,
      port: Number(port),
      password,
      user: username,
      host: process.env.DB_HOST
    })

    await this.pgClient.connect()
    this.isConnectedToDb = true

    this.emit('isConnectedToDb', true)
    console.log(`connected ${this.id} to database`)
  } catch (err) {
    console.log(err)
    this.emit('isConnectedToDb', false)
  }
}
