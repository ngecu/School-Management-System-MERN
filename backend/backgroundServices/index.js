import express from 'express'
import cron from 'node-cron'
import cors from 'cors'
import { welcomeUser } from './mailServices/welcomeUser.js'
import { connectDB } from '../config/db.js'
import { createFees } from './helpers/schoolFeesHelper.js'

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
        
        await welcomeUser();
      //  await createFees();

    })
    
}

run()


app.listen(4401, ()=>{
    console.log('Mail server up and running ...'); 
})