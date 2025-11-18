import Order from "../models/Order.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, deliveryDetails, subtotal, paymentId, quantities } = req.body;

    // Validate required fields
    if (!userId || !cartItems || !cartItems.length || !deliveryDetails || !subtotal || !paymentId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 🔍 Check duplicate order by paymentId
    const existingOrder = await Order.findOne({ paymentId });
    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already exists",
        order: existingOrder,
      });
    }

    // Create new order
    const newOrder = new Order({
      userId,
      cartItems,
      deliveryDetails,
      subtotal,
      paymentId,
      quantities,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
