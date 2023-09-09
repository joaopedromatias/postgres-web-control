import type { DisconnectReason, Socket } from 'socket.io'

export async function disconnectController(this: Socket, reason: DisconnectReason) {
  try {
    console.log(`The client ${this.id} disconnected due to ${reason}`)
    if (this.sequelize) {
      console.log(`Disconnected ${this.id} of the database`)
      await this.sequelize.close()
    }
  } catch (err) {
    console.error(err)
  }
}
