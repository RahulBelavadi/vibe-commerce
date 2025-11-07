import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  image: String,
  qty: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
