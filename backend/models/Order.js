import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: String,
        description: String,
        price: Number,
        oldPrice: Number,
        selectedSize: String,
        image: String,
        images: [String], // array of product images
        category: String,
        createdAt: Date,
        updatedAt: Date,
      },
    ],
    deliveryDetails: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    quantities: { type: Map, of: Number }, // Map of item._id -> quantity
    subtotal: { type: Number, required: true },
    paymentId: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Completed, Shipped, Delivered
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
