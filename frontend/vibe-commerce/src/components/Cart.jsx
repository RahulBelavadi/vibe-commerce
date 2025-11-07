import { useNavigate } from "react-router-dom";


export default function Cart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  function handleclick(){
    navigate("/")
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <>
        <p>Your cart is empty 🛒</p>
        <button id="cart-b" onClick={handleclick}>Continue Shopping</button>
        </>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.qty}</p>
                  <p>Total: ₹{item.price * item.qty}</p>
                  <button onClick={() => onRemove(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn" onClick={onCheckout}>
              Procee to buy
            </button>
          </div>
        </>
      )}
    </div>
  );
}
