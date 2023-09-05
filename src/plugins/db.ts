import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function db(fastify: FastifyInstance, _: FastifyPluginOptions) {
  fastify.decorate('method', function () {
    return 'value'
  })
}
