import type { FastifyInstance } from 'fastify'
import { presignUrlController } from '../controller/upload/presignUrl'

export async function uploadRouter(fastify: FastifyInstance) {
  fastify.get(
    '/presign-url',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            tableName: { type: 'string' },
            socketId: { type: 'string' }
          },
          required: ['tableName', 'socketId']
        }
      }
    },
    presignUrlController
  )
}
