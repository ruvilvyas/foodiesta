const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    img: String
});
const Product = mongoose.model("Product", productSchema);

// ✅ GET - Fetch all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
});
module.exports = router;
