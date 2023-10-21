import type { FastifyInstance } from 'fastify'
import { startServer } from '../src/app'

describe('upload files', () => {
  let app = {} as FastifyInstance

  beforeAll(async () => {
    const response = await startServer()
    if (response) app = response
  })

  it('should return the presigned URL', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/upload/presign-url?tableName=houses&socketId=1234'
    })

    const regex = /http:\/\/localhost.localstack.cloud:4566\/csv-files\/1234\/houses\?.*/

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body).toHaveProperty('presignedUrl')
    expect(body.presignedUrl).toMatch(regex)
  })
})
