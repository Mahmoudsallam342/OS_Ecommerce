import { Router } from "express";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  uploadCategoryImage,
} from "./category.controller.js";
import { multerMiddleware } from "../../services/multer.middle.js";

const router = Router();

router.post("/addcategory", addCategory);
router.post("/uploadimage", multerMiddleware, uploadCategoryImage);
router.get("/", getAllCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
