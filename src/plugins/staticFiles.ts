import path from 'path'
import fastifyStatic from '@fastify/static'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const frontEndBuildRoot = path.join(process.cwd(), 'frontend', 'dist')

export async function staticfFiles(fastify: FastifyInstance, _: FastifyPluginOptions) {
  try {
    await fastify.register(fastifyStatic, {
      root: frontEndBuildRoot,
      setHeaders: (res) => {
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'self' ; connect-src 'self' *.localstack.cloud:4566"
        )
      }
    })

    fastify.setNotFoundHandler((_, res) => {
      res.header(
        'Content-Security-Policy',
        "default-src 'self' ; connect-src 'self' *.localstack.cloud:4566"
      )
      res.sendFile('index.html', frontEndBuildRoot)
    })
  } catch (err) {
    console.error(err)
  }
}
