import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { GetItemCommand } from '@aws-sdk/client-dynamodb'

export async function commandsController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  const { clientId } = req.query as { clientId: string }
  const dynamoClient = this.getDynamoClient()
  const getCommands = new GetItemCommand({
    TableName: 'commands',
    Key: { clientId: { S: clientId } }
  })

  const { Item } = await dynamoClient.send(getCommands)

  console.log(Item)

  let commands = null

  if (Item && Item.data.L) {
    commands = Item.data.L.map((command) => {
      return command.M
    })
  }

  rep.send({ commands })
}
