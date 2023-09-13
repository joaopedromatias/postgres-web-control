import path from 'path'
import fastifyStatic from '@fastify/static'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const frontEndBuildRoot = path.join(process.cwd(), 'frontend', 'dist')

export async function staticfFiles(fastify: FastifyInstance, _: FastifyPluginOptions) {
  try {
    await fastify.register(fastifyStatic, {
      root: frontEndBuildRoot
    })

    fastify.setNotFoundHandler((_, res) => {
      res.sendFile('index.html', frontEndBuildRoot)
    })
  } catch (err) {
    console.error(err)
  }
}
