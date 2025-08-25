import mongoose from "mongoose";

async function connectDB() {
  try {
    const user = process.env.DATABASE_USER;
    const password = encodeURIComponent(process.env.DATABASE_PASSWORD);
    const host = process.env.DATABASE_HOST;
    const dbName = process.env.DATABASE_NAME;
    const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(uri);
  } catch (e) {
    console.error("Error conectando a MongoDB:", e);
  }
}

export default connectDB;
