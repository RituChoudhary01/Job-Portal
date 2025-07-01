import mongoose from 'mongoose'

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message)
    process.exit(1)
  }
}

export default connectDB

