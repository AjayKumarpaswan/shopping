import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, oldPrice, price, categoryName } = req.body;

    // Find category
    const category = await Category.findOne({ name: categoryName });
    if (!category)
      return res.status(400).json({ message: "Category not found" });

    // Store uploaded image names
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const product = new Product({
      name,
      description,
      images,
      oldPrice,
      price,
      category: category._id,
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name description");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ category: category._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name description");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, oldPrice, categoryName, removeImages } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (oldPrice) product.oldPrice = oldPrice;

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (!category) return res.status(400).json({ message: "Category not found" });
      product.category = category._id;
    }

    // Remove images
    let imagesToRemove = [];
    if (removeImages) {
      imagesToRemove = typeof removeImages === 'string' ? JSON.parse(removeImages) : removeImages;
      imagesToRemove.forEach(img => {
        const filePath = path.resolve("uploads", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      product.images = product.images.filter(img => !imagesToRemove.includes(img));
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      product.images = [...product.images, ...newImages];
    }

    await product.save();
    res.status(200).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from disk
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        const filePath = path.resolve("uploads", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    // Delete product document
    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


