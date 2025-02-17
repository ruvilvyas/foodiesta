import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch("http://localhost:5000/api/cart", {
        headers: { "auth-token": token }
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error("Failed to fetch cart");
      }
    };

    fetchCart();
  }, []);

  // Update Quantity (Sync with Backend)
  const updateQuantity = async (id, change) => {
    const token = localStorage.getItem("token");
    const item = cartItems.find((item) => item._id === id);
    
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);

    const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ quantity: newQuantity })
    });

    if (response.ok) {
      setCartItems(cartItems.map((item) => 
        item._id === id ? { ...item, quantity: newQuantity } : item
      ));
    } else {
      console.error("Failed to update quantity");
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE",
      headers: { "auth-token": token }
    });

    if (response.ok) {
      setCartItems(cartItems.filter((item) => item._id !== id));
    } else {
      console.error("Failed to remove item from cart");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.img} alt={item.name} />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{totalPrice}</h3>
      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default Cart;
