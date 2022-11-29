import { Request, Response, NextFunction } from 'express'
import { PassThrough, Writable } from 'stream'
import { logger } from '../../common/logger'
import { storeImage, getImage } from './service'
import { getImageFromUrl } from './common'

interface RequestBusboy extends Request {
  busboy: Writable
}

type Metadata = {
  filename: string
  mimeType: string
}

export const uploadStoreImageController = async (
  req: RequestBusboy,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.pipe(req.busboy) // Pipe it trough busboy

    req.busboy.on(
      'file',
      async (_fieldname: string, file: { pipe: (arg0: PassThrough) => void }, fileMetadata: Metadata) => {
        const image = await storeImage(fileMetadata.filename, fileMetadata.mimeType)

        console.log(`Upload of ${fileMetadata.filename} with id ${image.id} started`)

        file.pipe(image.stream)

        image.stream.on('close', () => {
          console.log(`Upload of finished`)

          res.send({
            success: true,
            data: {
              id: image.id,
            },
          })
        })
      }
    )
  } catch (err) {
    logger.error(`Error storing image`)
    next(err)
  }
}

export const getImageController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id

    const url = await getImage(id)
    const image = await getImageFromUrl(url)

    res.contentType(image.contentType)
    res.send(image.data)
  } catch (err) {
    logger.error(`Error storing image`)
    next(err)
  }
}
