import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ReceiptModal from "./components/ReceiptModal";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const navigate = useNavigate();

  // Load cart from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(err => console.log(err));
  }, []);

  // Add product
  const addToCart = (product) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product._id, qty: 1 }),
    })
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(err => console.log(err));
  };

  // Remove product
  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(err => console.log(err));
  };

  // Checkout
  const checkout = () => {
    fetch("http://localhost:5000/api/cart/checkout", { method: "POST" })
      .then(res => res.json())
      .then(() =>
         setShowReceipt(true))
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header cartCount={cart.length} onCartClick={() => navigate("/cart")} />

      <div className="container">
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout} />}
          />
        </Routes>
      </div>

      {showReceipt && <ReceiptModal cart={cart} onClose={() => setShowReceipt(false)} />}
    </>
  );
}

export default App;
