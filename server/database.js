import mongoose from 'mongoose';
import "dotenv/config";

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/");
}

export {connectDB}