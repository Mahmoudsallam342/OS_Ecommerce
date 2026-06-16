import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      //   unique: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      //   required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const categoryModel = mongoose.model("categoryModel", categorySchema);
