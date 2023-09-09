import { Sequelize } from 'sequelize'
import type { DisconnectReason, Socket } from 'socket.io'

export async function disconnectController(
  this: Socket,
  sequelize: Sequelize | null,
  reason: DisconnectReason
) {
  try {
    console.log(`The client ${this.id} disconnected due to ${reason}`)
    if (sequelize) {
      await sequelize.close()
    }
  } catch (err) {
    console.error(err)
  }
}
