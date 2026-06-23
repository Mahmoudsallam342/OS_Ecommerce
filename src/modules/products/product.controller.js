import { productModel } from "../../DB/model/product.model.js";
import slugify from "slugify";
import { redisClient } from "../../redisConfig/redis.js";
//delete cache
const clearProductsCache = async () => {
  await redisClient.del("products");
};

/**
 *! ADD PRODUCT
 */
export const addProduct = async (req, res, next) => {
  const { name, price, description, brandId, stock } = req.body;
  console.log(req.body);
  if (!name) {
    return res.status(400).json({
      message: "name is required",
    });
  }
  try {
    const product = await productModel.create({
      name,
      slug: slugify(name),
      price,
      description,
      brandId,
      // brand,
      stock,
      // images,
    });
    await clearProductsCache();

    return res.status(201).json({
      message: "product added successfully",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 *! GET ALL PRODUCTS
 */
export const getAllProducts = async (req, res, next) => {
  try {
    // await redisClient.del("products");
    // 1. check cache
    const cachedProducts = await redisClient.get("products");

    if (cachedProducts) {
      return res.status(200).json({
        message: "products fetched from cache",
        products: JSON.parse(cachedProducts),
      });
    }
    // 2. fetch from DB
    const products = await productModel.find();

    // 3. save to redis
    await redisClient.setEx("products", 3600, JSON.stringify(products));

    return res.status(200).json({
      message: "products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
/**
 *! GET PRODUCT BY ID
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    // .populate("category");

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    return res.status(200).json({
      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
/**
 *! UPDATE PRODUCT
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    await clearProductsCache();

    return res.status(200).json({
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(id);
    await clearProductsCache();
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    return res.status(200).json({
      message: "product deleted successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
