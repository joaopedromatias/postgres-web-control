import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function presignUrlController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const fileName = (req.query as { fileName: string }).fileName
    const client = this.getS3Client()
    const command = new PutObjectCommand({ Bucket: 'csv-files', Key: fileName })
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })
    rep.send({ url })
  } catch (err) {
    console.error(err)
  }
}
