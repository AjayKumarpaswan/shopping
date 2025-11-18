import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    images: {
      type: [String], // Array of image URLs or file paths
      default: [],
    },
    oldPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
