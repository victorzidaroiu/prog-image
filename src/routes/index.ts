import { Express, Request, Response } from 'express'
import {
  uploadStoreImageController,
  // urlStoreImageController,
  getImageController,
  // getImageWithFormat,
} from '../modules/images/controller'

export function addRoutes(api: Express): void {
  api.route('/health').get((_req: Request, res: Response) => {
    res.sendStatus(200)
  })

  api.route('/v1/images/upload').post(uploadStoreImageController)
  api.route('/v1/images/:id').get(getImageController)
}
