import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Sequelize } from 'sequelize'

export async function db(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const io = fastify.getSocket()

  fastify.decorate('getSequelize', function () {
    return null
  })
  fastify.decorate('isConnectedToDb', function () {
    return false
  })

  io.on('connection', (socket) => {
    console.log('socket connect')

    let sequelize = {} as Sequelize

    socket.on('disconnect', () => {
      try {
        console.log('socket disconnect')
        sequelize.close()
      } catch (err) {
        console.error(err)
      }
    })

    socket.on('connectClient', async (msg) => {
      try {
        const { database, username, password, dialect, port } = msg

        sequelize = new Sequelize(database, username, password, {
          host: '0.0.0.0',
          dialect,
          port: Number(port),
          logging: false
        })

        await sequelize.authenticate()

        fastify.getSequelize = () => sequelize
        fastify.isConnectedToDb = () => true
        socket.emit('isConnectedToDb', true)
      } catch (err) {
        console.error(err)
        socket.emit('isConnectedToDb', false)
      }
    })
  })
}
