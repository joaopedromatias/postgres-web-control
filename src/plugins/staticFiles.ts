import path from 'path'
import fastifyStatic from '@fastify/static'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const frontEndBuildRoot = path.join(process.cwd(), 'frontend', 'dist')

export async function staticfFiles(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const cspValue =
    "default-src 'self' ; connect-src 'self' *.localstack.cloud:4566 http://localstack:4566/ http://localhost:4566/ ; img-src 'self' data: "
  await fastify.register(fastifyStatic, {
    root: frontEndBuildRoot,
    setHeaders: (res) => {
      res.setHeader('Content-Security-Policy', cspValue)
    }
  })

  fastify.setNotFoundHandler((_, res) => {
    res.header('Content-Security-Policy', cspValue)
    res.sendFile('index.html', frontEndBuildRoot)
  })
}
