import Fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifyPlugin from 'fastify-plugin'
import { Server } from 'socket.io'

import { db } from './plugins/db'
import { staticfFiles } from './plugins/staticFiles'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: string
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    getIOServer: () => Server
  }
}

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)

const start = async () => {
  await fastify.register(fastifyHelmet)

  fastify.decorate('getIOServer', function () {
    return io
  })

  await fastify.register(fastifyPlugin(db))

  await fastify.register(fastifyPlugin(staticfFiles))

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
}

start()
