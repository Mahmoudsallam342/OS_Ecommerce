import slugify from "slugify";
import { brandModel } from "../../DB/model/brand.model.js";

/**
 * ADD BRAND
 */
export const addBrand = async (req, res, next) => {
  const {
    name,
    //  logo,
    description,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

    const brand = await brandModel.create({
      name,
      slug: slugify(name),
      logo,
      description,
    });

    return res.status(201).json({
      message: "brand created successfully",
      brand,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET ALL BRANDS
 */
export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandModel.find();

    return res.status(200).json({
      message: "brands fetched successfully",
      brands,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

/**
 * GET BRAND BY ID
 */
export const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await brandModel.findById(id);

    if (!brand) {
      return res.status(404).json({
        message: "brand not found",
      });
    }

    return res.status(200).json({
      message: "brand fetched successfully",
      brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

/**
 * UPDATE BRAND
 */
export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const brand = await brandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!brand) {
      return res.status(404).json({
        message: "brand not found",
      });
    }

    return res.status(200).json({
      message: "brand updated successfully",
      brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

/**
 * DELETE BRAND
 */
export const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await brandModel.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({
        message: "brand not found",
      });
    }

    return res.status(200).json({
      message: "brand deleted successfully",
      brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
