import { CreateBucketCommand, PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function s3Client(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const s3Client = new S3Client({
    region: 'us-east-1',
    forcePathStyle: true,
    endpoint: 'http://s3.localhost.localstack.cloud:4566'
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
          AllowedOrigins: ['http://localhost:3000']
        }
      ]
    }
  })

  await s3Client.send(defineCors)

  fastify.decorate('getS3Client', function () {
    return s3Client
  })
}
