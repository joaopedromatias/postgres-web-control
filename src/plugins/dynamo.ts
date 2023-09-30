import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function dynamoClient(fastify: FastifyInstance, _: FastifyPluginOptions) {
  try {
    const dynamoClient = new DynamoDBClient({
      region: 'us-east-1',
      endpoint: 'https://dynamo.localhost.localstack.cloud:4566/'
    })

    const listTable = new ListTablesCommand({})

    const tables = await dynamoClient.send(listTable)

    if (!tables.TableNames?.includes('commands')) {
      const createTable = new CreateTableCommand({
        TableName: 'commands',
        AttributeDefinitions: [
          {
            AttributeName: 'clientId',
            AttributeType: 'S'
          }
        ],
        KeySchema: [
          {
            AttributeName: 'clientId',
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
  } catch (err) {
    console.error(err)
  }
}
