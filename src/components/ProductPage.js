import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample product data
const products = [
  { id: 1, name: "Carrot Red (Delhi)", price: 33, originalPrice: 39, discount: 15, rating: 4.4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNpoc5EB_C3NW7y_RJB2JN5tjl2F1tqoRbQ&s" },
  { id: 2, name: "Strawberry", price: 111, originalPrice: 155, discount: 28, rating: 4.6, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKWsp6W0MbdetaF_-UKiyzLhgm1cMEokD0w&s" },
  { id: 3, name: "Mushrooms", price: 80, originalPrice: 100, discount: 20, rating: 4.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcMVgqQ5CARct2a5kOcqBL3aNK9jgiRb2uw&s" }
];

const categories = [
  "All", "Fresh Vegetables", "Fresh Fruits", "Flowers & Leaves", "New Arrivals", "Leafy, Herbs & Spices"
];

const ProductPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        {categories.map((category, index) => (
          <button key={index} className="category-btn">{category}</button>
        ))}
      </aside>
      <main className="product-section">
        <h2>Fruits & Vegetables</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <span className="discount-badge">{product.discount}% Off</span>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="rating">⭐ {product.rating}</p>
              <p className="price">₹{product.price} <span className="original-price">₹{product.originalPrice}</span></p>
              <button onClick={() => addToCart(product)} className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="cart-footer">
        <button className="view-cart" onClick={() => navigate("/cart")}>
          {cart.length} Items | ₹{cart.reduce((acc, item) => acc + item.price, 0)} View Cart
        </button>
      </footer>
    </div>
  );
};

export default ProductPage;
