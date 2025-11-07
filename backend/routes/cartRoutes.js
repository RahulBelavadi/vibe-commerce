import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

// Get cart items
router.get("/", async (req, res) => {
  const cart = await CartItem.find();
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  res.json({ cart, total }); // Add total here
});

// Add to cart
router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  const existingItem = await CartItem.findOne({ productId });

  if (existingItem) {
    existingItem.qty += qty;
    await existingItem.save();
  } else {
    const newItem = new CartItem({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
    });
    await newItem.save();
  }

  const cart = await CartItem.find();
  res.json({ cart });
});

// Remove from cart
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  const cart = await CartItem.find();
  res.json({ cart });
});

// Checkout
router.post("/checkout", async (req, res) => {
  const cartItems = await CartItem.find();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const receipt = {
    items: cartItems,
    total: total,
    timestamp: new Date().toISOString(),
    orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
  };
  
  await CartItem.deleteMany();
  res.json({ message: "Checkout successful", receipt });
});

export default router;
