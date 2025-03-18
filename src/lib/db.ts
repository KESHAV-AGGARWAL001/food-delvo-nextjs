import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    const db_string = process.env.MONGODB_URI;

    console.log(db_string);
    if (!db_string) {
      console.log("No db string present");
      return;
    }
    await mongoose.connect(db_string);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongo;
