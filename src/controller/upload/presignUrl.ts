import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function presignUrlController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const { tableName, socketId } = req.query as { tableName: string; socketId: string }
    const s3Client = this.getS3Client()
    const command = new PutObjectCommand({ Bucket: 'csv-files', Key: socketId + '/' + tableName })
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    rep.status(200)
    rep.send({ presignedUrl })
  } catch (err) {
    rep.status(500)
    rep.send({ sucess: false, errorMessage: (err as Error).message })
  }
}
