import type { FastifyInstance } from 'fastify'
import { commandsController } from '../controller/getCommands'

export async function commandsRouter(fastify: FastifyInstance) {
  try {
    fastify.get(
      '/commands',
      {
        schema: {
          querystring: {
            type: 'object',
            properties: {
              clientId: { type: 'string' }
            },
            required: ['clientId']
          }
        }
      },
      commandsController
    )
  } catch (err) {
    console.error(err)
  }
}
