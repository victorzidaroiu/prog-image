import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import AWS from 'aws-sdk'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import stream, { PassThrough } from 'stream'
import { config } from '../common/config'
import { logger } from '../common/logger'

export const storeFile = (bucket: string, id: string, filename: string, contentType: string): PassThrough => {
  const S3 = new AWS.S3(config.aws)
  const s3Stream = new stream.PassThrough()

  const params = {
    Bucket: bucket,
    Key: id,
    Body: s3Stream,
    ContentType: contentType,
    Metadata: {
      filename: filename,
    },
  }

  S3.upload(params, function (error, data) {
    logger.error(error)
    logger.info(data)
  })

  return s3Stream
}

export const getFile = async (bucket: string, fileName: string, expiresIn = 3600): Promise<string> => {
  const client = new S3Client(config.aws)

  return await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: fileName,
    }),
    { expiresIn }
  )
}
