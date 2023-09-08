import path from 'path'
import fastifyStatic from '@fastify/static'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const frontEndBuildRoot = path.join(process.cwd(), 'frontend', 'dist')

export async function staticfFiles(fastify: FastifyInstance, _: FastifyPluginOptions) {
  await fastify.register(fastifyStatic, {
    root: frontEndBuildRoot
  })

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html', frontEndBuildRoot)
  })
}
