const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/Product");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/shopDB")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });


// GET /products
// Fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
});


// GET /products/:id
// Fetch one product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }
});