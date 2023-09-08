import fastifyHelmet from '@fastify/helmet'
import Fastify from 'fastify'
import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'

import { Server } from 'socket.io'

import { db } from './db'

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
    getSocketServer: () => Server
  }
}

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)
const frontEndRoot = path.join(process.cwd(), 'frontend', 'dist')

const start = async () => {
  await fastify.register(fastifyHelmet)

  fastify.decorate('getSocketServer', function () {
    return io
  })

  await fastify.register(fp(db))

  await fastify.register(fastifyStatic, {
    root: frontEndRoot
  })

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html', frontEndRoot)
  })

  fastify.setErrorHandler(function (error, _, reply) {
    console.error(error)
    reply.send(error)
  })

  fastify.listen({ port: Number(process.env.PORT) || 3000, host: '127.0.0.1' }, (err, address) => {
    if (err) {
      throw err
    } else {
      console.log(`server is listening on ${address}`)
    }
  })
}

start()
