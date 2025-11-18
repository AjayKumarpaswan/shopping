import express from "express";
import { createOrder, getUserOrders, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get all orders (admin)
router.get("/all", getAllOrders);

// Get orders by user
router.get("/user/:userId", getUserOrders);

export default router;
