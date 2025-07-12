import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.status(200).json({ success: true, data: products }); //200 means success
  } catch (error) {
    console.log("Error in Fetching Products:", error.message);
    res.status(500).json({ success: false, message: "Server error" }); //500 means server error
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // User will send product data in the request body
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json(Product); //201 means product created successfully
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message }); //500 means server error
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" }); //404 means not found
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }); // Update the product with the new data
    res.status(200).json({ success: true, data: updatedProduct }); //200 means success
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" }); //500 means server error
    console;
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" }); //404 means not found
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" }); //200 means success
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Rrror" }); //500 means server error
  }
};
