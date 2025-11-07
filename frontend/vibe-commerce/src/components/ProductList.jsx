import { useEffect, useState } from "react";

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products">
      
      {products.length == 0?(
        <p className="loading"> Loading products...</p>
      ):(
        products.map((product) => (
        <div className="product" key={product._id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))
      )}
    </div>
  );
}
