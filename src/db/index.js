import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  console.log("In connectDB function");

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `\n MongoDB Conncection, DB Host : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

export default connectDB;
