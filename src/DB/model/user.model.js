import mongoose, { Schema } from "mongoose";
import { rolesTypes } from "../../middlewares/auth.middle.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "not specified"],
      default: "not specified",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(rolesTypes),
      default: rolesTypes.user,
    },
  },
  {
    timestamps: true,
  },
);
export const usersModel = mongoose.model("userModel", userSchema);
