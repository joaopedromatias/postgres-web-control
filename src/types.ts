import { Client } from 'pg'
import { Server } from 'socket.io'

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
  }
}

declare module 'socket.io' {
  interface Socket {
    pgClient: Client | null
    isConnectedToDb: boolean
  }
}
