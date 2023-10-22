import type { FastifyInstance } from 'fastify'
import { startServer } from '../src/app'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

describe('commands route', () => {
  let app = {} as FastifyInstance

  beforeAll(async () => {
    const response = await startServer()
    if (response) app = response

    jest.resetAllMocks()

    jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(() => {
      return Promise.resolve({
        Item: {
          data: {
            L: [
              {
                M: {
                  query: { S: 'SELECT * FROM houses' },
                  rowCount: { S: '2' },
                  command: { S: 'SELECT' },
                  timestamp: { S: '1234' }
                }
              },
              {
                M: {
                  query: { S: 'DROP TABLE IF EXISTS houses' },
                  rowCount: { S: '0' },
                  command: { S: 'DROP' },
                  timestamp: { S: '1234' }
                }
              }
            ]
          }
        }
      })
    })
  })

  it('should return the commands in reverse order', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/commands?sessionId=1234'
    })

    expect(response.statusCode).toBe(200)
    const { commands } = JSON.parse(response.body)
    expect(commands[0]).toEqual({
      query: 'DROP TABLE IF EXISTS houses',
      rowCount: '0',
      command: 'DROP',
      timestamp: '1234'
    })
    expect(commands[1]).toEqual({
      query: 'SELECT * FROM houses',
      rowCount: '2',
      command: 'SELECT',
      timestamp: '1234'
    })
  })
})
