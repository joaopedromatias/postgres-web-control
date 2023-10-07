import { GetObjectCommand } from '@aws-sdk/client-s3'
import csvParser from 'csv-parser'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function insertDataController(
  this: FastifyInstance,
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const { tableName, insertMode, socketId } = req.query as {
      tableName: string
      insertMode: 'replace' | 'append'
      socketId: string
    }
    const s3Client = this.getS3Client()
    const command = new GetObjectCommand({ Bucket: 'csv-files', Key: socketId + '/' + tableName })

    const response = await s3Client.send(command)
    const stream = response.Body

    const insertData = new Promise((resolve, reject) => {
      const io = this.getIOServer()
      io.fetchSockets()
        .then((s) => {
          console.log(s[0].id) // get correct socket instance by id
          return 's'
        })
        .catch((err) => {
          console.log(err)
        })

      if (insertMode === 'replace') {
        //
      }
      const buffer = [] as string[]
      console.log(buffer)
      if (stream) {
        stream
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .pipe(csvParser())
          .on('data', (data: Record<string, string | number>) => {
            console.log(data)
            console.log(insertMode)
            console.log(data.toString())
          })
          .on('end', () => {
            resolve(true)
          })
      } else {
        reject(new Error('Stream is empty'))
      }
    })

    await insertData

    rep.status(200)
    rep.send('data inserted')
  } catch (err) {
    rep.status(500)
    rep.send({ sucess: false, errorMessage: (err as Error).message })
  }
}
