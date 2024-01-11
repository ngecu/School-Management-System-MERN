import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
const mongod = new MongoMemoryServer();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://devngecu:vJqwB0P8gOLlBl7G@cluster0.krax7x4.mongodb.net/`)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
   console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export const closeDB = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()

    console.log(`MongoDB dropped and closed`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}


export const clearDB = async () => {
  try {
    const collections = mongoose.connection.collections;
    for(const key in collections){
      const collection = collections[key];
      await collection.deleteMany();

    }
    
    console.log(`MongoDB cleared `)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default {connectDB,closeDB,clearDB}

