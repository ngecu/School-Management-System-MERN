import express from 'express'
import cron from 'node-cron'
import cors from 'cors'
import { welcomeUser } from './mailServices/welcomeUser.js'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
const mongod = new MongoMemoryServer();

import { createFees } from './helpers/schoolFeesHelper.js'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)  } catch (error) {
   console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()

const app = express()
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json())



const run = async()=>{
    cron.schedule('*/2 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        // await welcomeUser();
       await createFees();

    })
    
}

run()


app.listen(4401, ()=>{
    console.log('Mail server up and running ...'); 
})