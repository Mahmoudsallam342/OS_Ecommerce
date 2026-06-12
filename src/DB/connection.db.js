import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/OS_Ecommerce");
    console.log("DB connected");
  } catch (error) {
    console.log("DB Not connected");
  }
};
