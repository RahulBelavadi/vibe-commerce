import { useNavigate } from "react-router-dom";

export default function ReceiptModal({ cart, onClose }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

 const handleProceed = () => {
  onClose();             
  alert("Payment Confirmed");
  navigate("/");           
  window.location.reload(); 
};

  return (
    <div className="modal">
      <div className="receipt-modal">
        <h2 className="receipt-title">🧾 Order Receipt</h2>
        <p className="receipt-timestamp">{formattedDate}</p>

        <div className="receipt-items">
          {cart.map((item) => (
            <div className="receipt-item" key={item._id}>
              <div className="item-info">
                <img src={item.image} alt={item.name} />
                <span className="item-name">{item.name}</span>
              </div>
              <span className="item-price">
                {item.qty} × ₹{item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>

        <button className="close-btn" onClick={handleProceed}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
