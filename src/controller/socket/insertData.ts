import type { Socket } from 'socket.io'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import csvParser from 'csv-parser'

export async function insertDataController(
  this: Socket,
  insertMode: string,
  tableName: string,
  s3Client: S3Client
) {
  try {
    if (this.isConnectedToDb && this.pgClient) {
      const s3Command = new GetObjectCommand({
        Bucket: 'csv-files',
        Key: this.id + '/' + tableName
      })

      const { Body: stream } = await s3Client.send(s3Command)

      if (insertMode === 'replace') {
        await this.pgClient.query(`DELETE FROM ${tableName} WHERE true = true`)
      }

      if (stream) {
        let buffer: (string | number)[] = []
        let query = `INSERT INTO ${tableName} VALUES `
        stream
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .pipe(csvParser())
          .on('data', (data: Record<string, string | number>) => {
            const values = Object.values(data).map((value) => (value ? `'${value}'` : 'null'))
            buffer.push(values.toString())
            if (buffer.length > 20000) {
              buffer.forEach((values, index) => {
                query += `(${values}) ${index === buffer.length - 1 ? ' ' : ', '}`
              })
              buffer = []
            }
          })
          .on('end', async () => {
            try {
              if (buffer.length) {
                buffer.forEach((values, index) => {
                  query += `(${values}) ${index === buffer.length - 1 ? ' ' : ', '}`
                })
              }
              await this.pgClient?.query(query)
            } catch (err) {
              this.emit('dataInsertedError', (err as Error).message)
              console.error(err)
            }
          })
          .on('error', (err: Error) => {
            throw err
          })
      } else {
        throw new Error('Could not get s3 stream')
      }
      return this.emit('dataInserted')
    }
    throw new Error('Not connected to database')
  } catch (err) {
    this.emit('dataInsertedError', (err as Error).message)
    console.error(err)
  }
}
