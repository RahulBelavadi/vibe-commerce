import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ cartCount, onCartClick }) {
  const navigate = useNavigate();

  function navigator(){
    navigate("/")
  }

  return (
    <header className="header">
      <h4 id="Home-b" onClick={navigator}>🛒 Vibe Commerce</h4>
      <button className="cart-btn" onClick={onCartClick}>
       <FaShoppingCart /> Cart ({cartCount})
      </button>
    </header>
  );
}
