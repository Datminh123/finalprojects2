import mongoose from "mongoose";
import { env } from "../config/environtment.js";
const connectDB = async () => {
  try {
    await mongoose.connect(
      env.MONGO_URI
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;