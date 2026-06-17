import bcrypt from "bcrypt";
import { categoryModel } from "../../DB/model/category.model.js";
import slugify from "slugify";
import { subCategoryModel } from "../../DB/model/subCategory.model.js";
export const addCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await categoryModel.create({ name, slug: slugify(name) });
    return res.status(201).json({
      message: "added to category successfully",
      category,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    return res.status(200).json({
      message: "categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.slug = slugify(req.body.name);
    const category = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    return res.status(200).json({
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const category = await categoryModel.findByIdAndDelete({ _id });
    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }
    await subCategoryModel.deleteMany({ categoryId: _id });

    return res.status(200).json({
      message: "category deleted successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const uploadCategoryImage = (req, res, next) => {
  try {
    res.status(201).json({ message: "image uploaded", file: req.file });
  } catch (error) {
    return next(error);
  }
};
