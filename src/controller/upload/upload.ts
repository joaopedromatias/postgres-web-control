// import { PutObjectCommand } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function uploadController(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    //
  } catch (err) {
    console.error(err)
    reply.status(500)
    reply.send({
      message: (err as Error).message,
      sucess: false
    })
  }
}
