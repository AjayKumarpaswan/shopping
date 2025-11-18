import express from "express";
import { 
  createProduct, 
  getAllProducts, 
  getProductsByCategory, 
  getProductById,
  updateProduct, 
  deleteProduct  
} from "../controllers/productController.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 👇 IMPORTANT: this allows multiple image upload
router.post(
  "/", 
  upload.array("images", 10),   // <-- accepts up to 10 images
  createProduct
);

router.get("/", getAllProducts);
router.get("/category/:categoryName", getProductsByCategory);
router.get("/:id", getProductById);

// Update product (with optional new images)
router.put("/:id", upload.array("images", 10), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
