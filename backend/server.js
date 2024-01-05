import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import {connectDB} from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import parentRoutes from './routes/parentRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import courseUnitsRoutes from './routes/courseUnitRoutes.js'

import lecturerRoutes from './routes/lecturerRoutes.js'
import accountRoutes from './routes/accountantRoutes.js'



import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/parents', parentRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/schools', schoolRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/courseunits', courseUnitsRoutes)
app.use('/api/lecturers', lecturerRoutes)
app.use('/api/accountants', accountRoutes)



const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
