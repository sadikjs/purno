// lib/mongodb.js (Database Connection Utility)
import mongoose from "mongoose";

// 1. Get the MongoDB URI from environment variables (Recommended)
const uri = process.env.MONGODB_URI;

// 2. Caching for improved performance (Optional, but good practice)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering in production
      serverSelectionTimeoutMS: 5000, // Increase connection timeout if needed (in ms)
      connectTimeoutMS: 10000, // Increase connection timeout
    };

    try {
      cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
        return mongoose;
      });

      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  }
  return cached.conn;
}
export default dbConnect;
