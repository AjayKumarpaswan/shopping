import express from "express";
import { createCategory, getAllCategories, updateCategory,
  deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory); // Create category
router.get("/", getAllCategories); // Get all categories

router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
