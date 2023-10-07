import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { GetItemCommand } from '@aws-sdk/client-dynamodb'

export async function commandsController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const { clientId } = req.query as { clientId: string }
    const dynamoClient = this.getDynamoClient()
    const getCommands = new GetItemCommand({
      TableName: 'commands',
      Key: { clientId: { S: clientId } }
    })

    const { Item } = await dynamoClient.send(getCommands)

    let commands = null

    if (Item && Item.data.L) {
      commands = Item.data.L.map((command) => {
        if (command.M) {
          const commandResult = {} as Record<string, string | undefined>
          const keys = Object.keys(command.M)
          keys.forEach((key) => {
            commandResult[key] = command.M ? command.M[key].S : ''
          })
          return commandResult
        }
        return null
      }).reverse()
    }

    rep.status(200)
    rep.send({ commands })
  } catch (err) {
    rep.status(500)
    rep.send({ sucess: false, errorMessage: (err as Error).message })
  }
}
