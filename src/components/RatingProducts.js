import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RatingProducts = () => {
  const navigate = useNavigate(); // Define navigate function

  const [cart, setCart] = useState({});

  const products = [
    {
      id: 1,
      name: "MIX-Viengca",
      price: 345,
      rating: 4.5,
      image:
        "https://tse3.mm.bing.net/th?id=OIP.SJL52XYM1Qs2feA5KZS7JAHaE8&pid=Api&P=0&h=220",
    },
    {
      id: 2,
      name: "Spicy Noodles",
      price: 299,
      rating: 4.7,
      image:
        "https://tse3.mm.bing.net/th?id=OIP.SJL52XYM1Qs2feA5KZS7JAHaE8&pid=Api&P=0&h=220",
    },
    {
      id: 3,
      name: "Cheese Pizza",
      price: 450,
      rating: 4.8,
      image:
        "https://tse3.mm.bing.net/th?id=OIP.SJL52XYM1Qs2feA5KZS7JAHaE8&pid=Api&P=0&h=220",
    },
  ];

  // Function to update cart quantity
  const updateQuantity = (productId, change) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[productId] || 0) + change;
      return newQuantity > 0
        ? { ...prevCart, [productId]: newQuantity }
        : { ...prevCart, [productId]: 0 };
    });
  };

  return (
    <>
      <h2 className="rating-list">Best-Rated Foods</h2>
      <div className="rating-list">
        {products.map((product) => (
          <div className="rating-card" key={product.id}>
            <div className="rating-container">
              <img src={product.image} alt={product.name} />
              <p className="product-name">{product.name}</p>
              <p className="product-price">₹{product.price}</p>
              <div className="product-rating">⭐⭐⭐⭐☆ ({product.rating})</div>

              {/* Quantity Controls */}
              <div className="cart-controls">
                <button className="qty" onClick={() => updateQuantity(product.id, -1)}>-</button>
                <span>{cart[product.id] || 0}</span>
                <button className="qty" onClick={() => updateQuantity(product.id, 1)}>+</button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="add-to-cart"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RatingProducts;
