import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Client } from 'pg'
import { connectClientToDbController } from '../controller/socket/connectClientToDb'
import { queryController } from '../controller/socket/query'
import { disconnectController } from '../controller/socket/disconnect'
import type { Socket } from 'socket.io'
import { tableController } from '../controller/socket/tables'
import { insertDataController } from '../controller/socket/insertData'

export async function socketRouter(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const io = fastify.getIOServer()

  io.on('connection', (socket) => {
    console.log(`The client ${socket.id} connected`)
    const dynamoClient = fastify.getDynamoClient()
    const s3Client = fastify.getS3Client()

    socket.pgClient = null as Client | null
    socket.isConnectedToDb = false

    socket.on('disconnect', function (this: Socket, reason) {
      disconnectController.apply(this, [reason])
    })

    socket.on('connectClientToDb', function (this: Socket, parameters) {
      connectClientToDbController.apply(this, [parameters])
    })

    socket.on('query', function (this: Socket, query, sessionId) {
      queryController.apply(this, [query, dynamoClient, sessionId])
    })

    socket.on('getTables', function (this: Socket) {
      tableController.apply(this)
    })

    socket.on('insertData', function (this: Socket, insertMode, tableName) {
      insertDataController.apply(this, [insertMode, tableName, s3Client])
    })
  })
}
