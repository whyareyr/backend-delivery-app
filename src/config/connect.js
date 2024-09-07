import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (err) {
    console.log("Mongo DB connection failed:", err);
  }
};
