import type { DisconnectReason, Socket } from 'socket.io'

export async function disconnectController(this: Socket, reason: DisconnectReason) {
  try {
    console.log(`The client ${this.id} disconnected due to ${reason}`)
    if (this.pgClient) {
      console.log(`Disconnected ${this.id} of the database`)
      await this.pgClient.end()
    }
  } catch (err) {
    console.error(err)
  }
}
