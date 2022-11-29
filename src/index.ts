import * as dotenv from 'dotenv'
dotenv.config()

import { logger } from './common/logger'
import { createServer } from './server'
import { config } from './common/config'

const server = createServer({ logger })

try {
  server.listen(config.port, () => {
    logger.info(`Server running at http://${config.host}:${config.port}`)
  })
} catch (err) {
  logger.error(err)
  process.exit(1)
}
