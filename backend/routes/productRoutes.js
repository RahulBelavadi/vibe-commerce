import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Seed products
router.post("/seed", async (req, res) => {
  // await Product.deleteMany();
  const sampleProducts = [
    { name: "Wireless Headphones", price: 1299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
    { name: "Smart Watch", price: 1999, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1" },
    { name: "Bluetooth Speaker", price: 999, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab" },
  ];
  await Product.insertMany(sampleProducts);
  res.json({ message: "Products seeded!" });
});

export default router;
