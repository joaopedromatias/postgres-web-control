import type { FastifyInstance } from 'fastify'
import { uploadController } from '../controller/upload/upload'

export async function uploadRouter(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {}
    },
    uploadController
  )
}
