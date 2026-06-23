import { Router } from "express";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  // uploadCategoryImage,
  uploadCategoryImageCloud,
} from "./category.controller.js";
import { upload } from "../../services/multer.middle.js";
// import { multerMiddle } from "../../services/multer.middle.js";

const router = Router();

router.post("/addcategory", addCategory);
router.post(
  "/uploadimage",
  upload.single("category"),
  uploadCategoryImageCloud,
);
// router.post(
//   "/uploadimage",
//   multerMiddle("category").single("category"),
//   uploadCategoryImage,
// );
router.get("/", getAllCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
