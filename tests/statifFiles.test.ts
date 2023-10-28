import type { FastifyInstance } from 'fastify'
import { startServer } from '../src/app'

describe('static files delivering', () => {
  let app = {} as FastifyInstance

  beforeAll(async () => {
    const response = await startServer()
    if (response) app = response
  })

  it('should return an HTML document file for the app root', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/html; charset=UTF-8')
  })

  it('should return an HTML document file for an unmapped root', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/anything'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe('text/html; charset=UTF-8')
  })
})
