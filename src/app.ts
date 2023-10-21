import Fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifyPlugin from 'fastify-plugin'
import { Server } from 'socket.io'

import { socketRouter } from './router/socket'
import { uploadRouter } from './router/upload'
import { staticfFiles } from './plugins/staticFiles'
import { s3Client } from './plugins/s3'
import { dynamoClient } from './plugins/dynamo'
import { commandsRouter } from './router/commands'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)

export const startServer = async () => {
  try {
    await fastify.register(fastifyHelmet)

    fastify.decorate('getIOServer', function () {
      return io
    })

    await fastify.register(fastifyPlugin(s3Client))
    await fastify.register(fastifyPlugin(dynamoClient))
    await fastify.register(staticfFiles)

    await fastify.register(socketRouter)
    await fastify.register(uploadRouter, { prefix: '/upload' })
    await fastify.register(commandsRouter)

    fastify.setErrorHandler(function (error, _, reply) {
      console.error(error)
      reply.send(error)
    })

    if (process.env.NODE_ENV !== 'test') {
      fastify.listen({ port: Number(process.env.PORT), host: '0.0.0.0' }, (err, address) => {
        if (err) {
          throw err
        } else {
          console.log(`server is listening on ${address}`)
        }
      })
    }

    return fastify
  } catch (err) {
    console.error(err)
  }
}

if (process.env.NODE_ENV === 'production') {
  const awaitForAllContainersToBeReadyMs = 15000
  setTimeout(() => {
    startServer()
  }, awaitForAllContainersToBeReadyMs)
} else if (process.env.NODE_ENV === 'development') {
  startServer()
}
