import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand
} from '@aws-sdk/client-dynamodb'

export const saveCommand = async (
  dynamoClient: DynamoDBClient,
  sessionId: string,
  query: string,
  rowCount: number,
  command: string
) => {
  const now = new Date().toISOString()
  const getItemsCommand = new GetItemCommand({
    TableName: 'commands',
    Key: { sessionId: { S: sessionId } }
  })

  const allCommands = [] as AttributeValue[]
  const thisCommandPayload = {
    M: {
      query: { S: query },
      rowCount: { S: (rowCount || 0).toString() },
      command: { S: command },
      timestamp: { S: now }
    }
  }

  const { Item: savedItems } = await dynamoClient.send(getItemsCommand)

  if (savedItems && savedItems.data && savedItems.data.L) {
    savedItems.data.L.forEach((command) => {
      allCommands.push(command)
    })
  }

  allCommands.push(thisCommandPayload)

  const dynamoPayload = {
    sessionId: { S: sessionId },
    data: {
      L: allCommands
    }
  }

  const putItem = new PutItemCommand({ Item: dynamoPayload, TableName: 'commands' })

  await dynamoClient.send(putItem)
}
