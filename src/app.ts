import fastifyHelmet from '@fastify/helmet'
import Fastify from 'fastify'
import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { Server } from 'socket.io'

import type { S3Client } from '@aws-sdk/client-s3'

import { db } from './plugins/db'

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
    getS3Client: () => S3Client
  }
}

const fastify = Fastify({ ignoreTrailingSlash: true })
const io = new Server(fastify.server)

const start = async () => {
  await fastify.register(fastifyHelmet)

  await fastify.register(fp(db))

  await fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'frontend', 'dist')
  })

  io.on('connection', (_) => {
    console.log('a user connected')
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
