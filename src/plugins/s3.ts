import { CreateBucketCommand, PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function s3Client(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const s3Client = new S3Client({
    forcePathStyle: true,
    endpoint: process.env.LOCALSTACK_ENDPOINT
  })

  const createBucket = new CreateBucketCommand({
    Bucket: 'csv-files'
  })

  await s3Client.send(createBucket)

  const defineCors = new PutBucketCorsCommand({
    Bucket: 'csv-files',
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT'],
          AllowedOrigins: [`http://localhost:${process.env.PORT}`]
        }
      ]
    }
  })

  await s3Client.send(defineCors)

  fastify.decorate('getS3Client', function () {
    return s3Client
  })
}
