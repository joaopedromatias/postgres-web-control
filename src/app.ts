import Fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifyPlugin from 'fastify-plugin'
import { Server } from 'socket.io'
import type { Client } from 'pg'

import { router } from './router'
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

declare module 'socket.io' {
  interface Socket {
    pgClient: Client | null
    isConnectedToDb: boolean
  }
}

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)

const start = async () => {
  await fastify.register(fastifyHelmet)

  fastify.decorate('getIOServer', function () {
    return io
  })

  await fastify.register(fastifyPlugin(router))

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
