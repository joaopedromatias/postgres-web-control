import type { FastifyInstance } from 'fastify'
import { presignUrlController } from '../controller/presignUrl'

export async function uploadRouter(fastify: FastifyInstance) {
  fastify.get(
    '/presign-url',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            tableName: { type: 'string' }
          },
          required: ['tableName']
        }
      }
    },
    presignUrlController
  )
}
