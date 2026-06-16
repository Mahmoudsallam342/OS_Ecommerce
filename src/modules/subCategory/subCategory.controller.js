import slugify from "slugify";
import { subCategoryModel } from "../../DB/model/subCategory.model.js";
export const addsubCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const subCategory = await subCategoryModel.create({
      name,
      slug: slugify(name),
    });
    return res.status(201).json({
      message: "added to subCategory successfully",
      subCategory,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllsubCategories = async (req, res, next) => {
  try {
    const subCategories = await subCategoryModel.find();

    return res.status(200).json({
      message: "subCategories fetched successfully",
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const updatesubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.slug = slugify(req.body.name);
    const subCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!subCategory) {
      return res.status(404).json({
        message: "subCategory not found",
      });
    }

    return res.status(200).json({
      message: "subCategory updated successfully",
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const deletesubCategory = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const subCategory = await subCategoryModel.findByIdAndDelete({ _id });

    if (!subCategory) {
      return res.status(404).json({
        message: "subCategory not found",
      });
    }

    return res.status(200).json({
      message: "subCategory deleted successfully",
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
