import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'

export async function connectedApp(fastify: FastifyInstance, _: FastifyPluginOptions) {
  fastify.addHook(
    'onRequest',
    function (this: FastifyInstance, req: FastifyRequest, rep: FastifyReply, done) {
      if (!this.isConnectedToDb()) {
        rep.status(403)
        return rep.send('Forbidden')
      }
      done()
    }
  )
  fastify.get('/query', function (req, rep) {
    return rep.send({
      io: String(fastify.getSocket()),
      sequelize: String(fastify.getSequelize()),
      isConnected: String(fastify.isConnectedToDb())
    })
  })
}
