import { Router } from "express";

import {
  addsubCategory,
  deletesubCategory,
  getAllsubCategories,
  updatesubCategory,
} from "./subCategory.controller.js";

const router = Router();

router.post("/addsubCategory", addsubCategory);
router.get("/", getAllsubCategories);
router.patch("/:id", updatesubCategory);
router.delete("/:id", deletesubCategory);
export default router;
