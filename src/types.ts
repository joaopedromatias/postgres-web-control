import type { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import type { S3Client } from '@aws-sdk/client-s3'
import type { Client } from 'pg'
import type { Server } from 'socket.io'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: string
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    getIOServer: () => Server
    getS3Client: () => S3Client
    getDynamoClient: () => DynamoDBClient
  }
}

declare module 'socket.io' {
  interface Socket {
    pgClient: Client | null
    isConnectedToDb: boolean
  }
}
