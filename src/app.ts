import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import httpStatus from 'http-status'
import router from './routes'
import globalErrorHandler from './errors/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1', router)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
app.use(globalErrorHandler)

export default app
