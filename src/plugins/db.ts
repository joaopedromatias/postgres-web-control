import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Sequelize } from 'sequelize'
import { getTables } from '../utils/getTables'

export async function db(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const io = fastify.getIOServer()

  io.on('connection', (socket) => {
    console.log(`The client ${socket.id} connected`)

    let sequelize = null as Sequelize | null
    let isConnectedToDb = false

    socket.on('disconnect', async () => {
      try {
        console.log(`The client ${socket.id} disconnected`)
        if (sequelize) {
          await sequelize.close()
        }
      } catch (err) {
        console.error(err)
      }
    })

    socket.on('connectClientToDb', async (msg) => {
      try {
        const { database, username, password, dialect, port } = msg

        sequelize = new Sequelize(database, username, password, {
          host: '0.0.0.0',
          dialect,
          port: Number(port),
          logging: false,
          pool: { max: 1 }
        })

        await sequelize.authenticate()
        isConnectedToDb = true

        socket.emit('isConnectedToDb', true)
      } catch (err) {
        socket.emit('isConnectedToDb', false)
      }
    })

    socket.on('query', async (query) => {
      try {
        if (isConnectedToDb && sequelize) {
          const [results, metadata] = await sequelize.query(query)
          socket.emit('queryResults', { results, metadata })
        }
      } catch (err) {
        socket.emit('queryResultsError', (err as Error).message)
      }
    })

    socket.on('getTables', async () => {
      try {
        if (isConnectedToDb && sequelize) {
          const tables = await getTables(sequelize)
          socket.emit('tableResults', { tables })
        }
      } catch (err) {
        socket.emit('tableResultsError', (err as Error).message)
      }
    })
  })
}
