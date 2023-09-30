import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function presignUrlController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  const { tableName } = req.query as { tableName: string }
  const s3Client = this.getS3Client()
  const command = new PutObjectCommand({ Bucket: 'csv-files', Key: tableName })
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  rep.send({ presignedUrl })
}
