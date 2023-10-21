import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function dynamoClient(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const dynamoClient = new DynamoDBClient({
    endpoint: process.env.LOCALSTACK_ENDPOINT
  })

  const listTables = new ListTablesCommand({})

  const tables = await dynamoClient.send(listTables)

  if (process.env.NODE_ENV === 'production' || !tables.TableNames?.includes('commands')) {
    const createTable = new CreateTableCommand({
      TableName: 'commands',
      AttributeDefinitions: [
        {
          AttributeName: 'sessionId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'sessionId',
          KeyType: 'HASH'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    })

    await dynamoClient.send(createTable)
  }

  fastify.decorate('getDynamoClient', function () {
    return dynamoClient
  })
}
