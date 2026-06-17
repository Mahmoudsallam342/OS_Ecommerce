import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
    },
    subCategoryId: {
      type: mongoose.Types.ObjectId,
      ref: "subCategoryModel",
      required: true,
    },
    // logo: {
    //   type: String, // image URL
    // },

    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const brandModel =
  mongoose.models.Brand || mongoose.model("Brand", brandSchema);
