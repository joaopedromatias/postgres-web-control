import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Sequelize } from 'sequelize'
import { getTablesController } from '../controller/getTables'
import { connectClientToDbController } from '../controller/connectClientToDb'
import { queryController } from '../controller/query'
import { disconnectController } from '../controller/disconnect'
import { Socket } from 'socket.io'

export async function router(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const io = fastify.getIOServer()

  io.on('connection', (socket) => {
    console.log(`The client ${socket.id} connected`)

    let sequelize = null as Sequelize | null
    let isConnectedToDb = false

    socket.on('disconnect', function (this: Socket, reason) {
      disconnectController.apply(this, [sequelize, reason])
    })

    socket.on('connectClientToDb', (parameters) =>
      connectClientToDbController(socket, sequelize, parameters, isConnectedToDb)
    )

    socket.on('query', (query) => queryController(socket, sequelize, query, isConnectedToDb))

    socket.on('getTables', () => getTablesController(socket, sequelize, isConnectedToDb))
  })
}
