import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import {connectDB} from './config/db.js'
import { WebSocketServer } from 'ws';
import userRoutes from './routes/userRoutes.js'
import parentRoutes from './routes/parentRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import courseUnitsRoutes from './routes/courseUnitRoutes.js'
import mpesaRoutes from "./routes/mpesaRoutes.js"
import lecturerRoutes from './routes/lecturerRoutes.js'
import accountRoutes from './routes/accountantRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'


import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import feeRoutes from './routes/feeRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import timetableRoutes from './routes/timetableRoutes.js';

import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: "*",
  })
);

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
app.use('/api/attendance', attendanceRoutes)
app.use('/api/admin', adminRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/schoolfees", feeRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/mpesa',mpesaRoutes)

  app.get('/', (req, res) => {
    res.send('API is running....')
  })


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

const wss = new WebSocketServer({server});


wss.on("connection", (connection, req) => {
  console.log("WebSocket connected...");

  // Listen for messages from clients
  connection.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
     
        client.send(message);
        console.log("sent  ", message);
      
    });
  });

  // Listen for the connection to close
  connection.on("close", () => {
    console.log("WebSocket disconnected...");
  });
});
