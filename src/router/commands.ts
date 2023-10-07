import type { FastifyInstance } from 'fastify'
import { commandsController } from '../controller/commands'

export async function commandsRouter(fastify: FastifyInstance) {
  fastify.get(
    '/commands',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            sessionId: { type: 'string' }
          },
          required: ['sessionId']
        }
      }
    },
    commandsController
  )
}
