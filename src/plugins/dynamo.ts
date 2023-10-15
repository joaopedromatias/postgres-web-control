import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export async function dynamoClient(fastify: FastifyInstance, _: FastifyPluginOptions) {
  const dynamoClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: 'http://localstack:4566',
    credentials: {
      accessKeyId: 'foo',
      secretAccessKey: 'bar'
    }
  })

  const listTable = new ListTablesCommand({})

  const tables = await dynamoClient.send(listTable)

  if (!tables.TableNames?.includes('commands')) {
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
