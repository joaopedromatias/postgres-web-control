import { S3Client } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

jest.spyOn(S3Client.prototype, 'send').mockImplementation(() => {
  return Promise.resolve({})
})

jest.spyOn(DynamoDBClient.prototype, 'send').mockImplementation(() => {
  return Promise.resolve({})
})
