import Fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifyPlugin from 'fastify-plugin'
import { Server } from 'socket.io'

import { socketRouter } from './router/socket'
import { uploadRouter } from './router/upload'
import { staticfFiles } from './plugins/staticFiles'
import { s3Client } from './plugins/s3Client'

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)

const start = async () => {
  try {
    await fastify.register(fastifyHelmet)

    fastify.decorate('getIOServer', function () {
      return io
    })

    await fastify.register(fastifyPlugin(s3Client))
    await fastify.register(staticfFiles)

    await fastify.register(socketRouter)
    await fastify.register(uploadRouter, { prefix: '/upload' })

    fastify.setErrorHandler(function (error, _, reply) {
      console.error(error)
      reply.send(error)
    })

    fastify.listen({ port: Number(process.env.PORT) || 3000 }, (err, address) => {
      if (err) {
        throw err
      } else {
        console.log(`server is listening on ${address}`)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

start()
