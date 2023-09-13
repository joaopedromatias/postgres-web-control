import type { FastifyInstance } from 'fastify'
import { presignUrlController } from '../controller/presign-url'

export async function uploadRouter(fastify: FastifyInstance) {
  try {
    fastify.get(
      '/presign-url',
      {
        schema: {
          querystring: {
            type: 'object',
            properties: {
              fileName: { type: 'string' }
            },
            required: ['fileName']
          }
        }
      },
      presignUrlController
    )
  } catch (err) {
    console.error(err)
  }
}
