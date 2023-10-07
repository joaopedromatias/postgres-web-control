import type { FastifyInstance } from 'fastify'
import { presignUrlController } from '../controller/upload/presignUrl'
import { insertDataController } from '../controller/upload/insertData'

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
  fastify.get(
    '/insert-data',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            insertMode: { type: 'string', enum: ['replace', 'append'] },
            tableName: { type: 'string' },
            socketId: { type: 'string' }
          },
          required: ['insertMode', 'tableName', 'socketId']
        }
      }
    },
    insertDataController
  )
}
