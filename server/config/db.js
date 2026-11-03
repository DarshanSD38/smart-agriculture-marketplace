import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_agri_db');
    console.log(`\x1b[32m✔ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}\x1b[0m`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m✖ MongoDB Connection Error: ${error.message}\x1b[0m`);
    console.warn(`\x1b[33m💡 Hint: Ensure MongoDB is running locally ('mongod' or MongoDB Compass) or update MONGO_URI in server/.env with your MongoDB Atlas connection string.\x1b[0m`);
    // Do not terminate process immediately so developer can see the helpful hint
  }
};

export default connectDB;

