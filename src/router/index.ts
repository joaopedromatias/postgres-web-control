import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Client } from 'pg'
import { getTablesController } from '../controller/getTables'
import { connectClientToDbController } from '../controller/connectClientToDb'
import { queryController } from '../controller/query'
import { disconnectController } from '../controller/disconnect'
import { Socket } from 'socket.io'
import { deleteTableController } from '../controller/deleteTableController'

export async function router(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const io = fastify.getIOServer()

  io.on('connection', (socket) => {
    console.log(`The client ${socket.id} connected`)

    socket.pgClient = null as Client | null
    socket.isConnectedToDb = false

    socket.on('disconnect', function (this: Socket, reason) {
      disconnectController.apply(this, [reason])
    })

    socket.on('connectClientToDb', function (this: Socket, parameters) {
      connectClientToDbController.apply(this, [parameters])
    })

    socket.on('query', function (this: Socket, query) {
      queryController.apply(this, [query])
    })

    socket.on('getTables', function (this: Socket) {
      getTablesController.apply(this)
    })

    socket.on('deleteTable', function (this: Socket, tableName: string) {
      deleteTableController.apply(this, [tableName])
    })
  })
}
