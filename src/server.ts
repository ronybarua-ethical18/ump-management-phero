import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, successLogger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    successLogger.info(`🛢Database is connected successfully`)

    app.listen(config.port, () => {
      successLogger.info(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }
}

boostrap()
