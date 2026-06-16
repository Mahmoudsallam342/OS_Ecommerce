import { Router } from "express";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./category.controller.js";

const router = Router();

router.post("/addcategory", addCategory);
router.get("/", getAllCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
