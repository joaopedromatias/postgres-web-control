import type { Socket } from 'socket.io'
import { getTables } from '../../utils/getTables'
import type { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { saveCommand } from '../../utils/saveCommand'

export async function queryController(this: Socket, query: string, dynamoClient: DynamoDBClient) {
  try {
    if (this.isConnectedToDb && this.pgClient) {
      const { rowCount, rows, command } = await this.pgClient.query(query)

      const clientId = this.id
      await saveCommand(dynamoClient, clientId, query, rowCount, command)

      this.emit('queryResults', { rowCount, rows, command })

      const tables = await getTables(this.pgClient)
      return this.emit('tables', tables)
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('queryResultsError', (err as Error).message)
    console.error(err)
  }
}
