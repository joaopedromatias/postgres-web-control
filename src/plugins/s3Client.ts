import { S3Client } from '@aws-sdk/client-s3'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function s3Client(fastify: FastifyInstance, _: FastifyPluginOptions) {
  try {
    const s3Client = new S3Client({
      region: 'us-east-1',
      forcePathStyle: true,
      endpoint: 'http://s3.localhost.localstack.cloud:4566'
    })
    fastify.decorate('getS3Client', function () {
      return s3Client
    })
  } catch (err) {
    console.error(err)
  }
}
