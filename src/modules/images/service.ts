import { logger } from '../../common/logger'
import { getFile, storeFile } from '../../adapters/s3'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../common/config'
import { PassThrough } from 'stream'

type StoreImage = {
  id: string
  stream: PassThrough
}

export const storeImage = async (filename: string, contentType: string): Promise<StoreImage> => {
  const id = uuidv4()

  logger.info(`Image service: storing ${filename}`)

  return {
    id,
    stream: storeFile(config.images.bucket, id, filename, contentType),
  }
}

export const getImage = async (id: string): Promise<string> => await getFile(config.images.bucket, id)
