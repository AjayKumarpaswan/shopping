import express from "express";
import { sendOrderEmail } from "../controllers/orderEmailController.js";
import { sendOrderWhatsApp } from "../controllers/orderWhatsAppController.js";

const router = express.Router();

router.post("/send-order-confirmation", async (req, res) => {
  try {
    await Promise.all([
      sendOrderEmail(req, res, true),
       sendOrderWhatsApp(req, res, true),
    ]);

    res.status(200).json({
      message: "Order confirmation sent via Email and WhatsApp successfully!",
    });
  } catch (error) {
    console.error("Order confirmation error:", error);
    res.status(500).json({
      message: "Failed to send order confirmation",
      error,
    });
  }
});

export default router;
