import mongoose, { Schema } from "mongoose";
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "categoryModel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const subCategoryModel = mongoose.model(
  "subCategoryModel",
  subCategorySchema,
);
