import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Buy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = {
    "1": {
      name: "Amul Gold Full Cream Fresh Milk (Pouch)",
      price: 32,
      description: "Net Qty: 500 ml",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZlWl0qpaFvq0yLVkLikWd-GF70RarwqNKDw&s",
      returnPolicy: "No Return or Replacement",
    },
    "2": {
      name: "Nestlé Curd",
      price: 25,
      description: "Net Qty: 400 g",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6IXKH4oSd3C15pLP5eNR38mj3D56mk50dA&s",
      returnPolicy: "Returnable within 2 days",
    },
    "3": {
      name: "Idli-wada",
      price: 35,
      description: "Net Qty: 400 g",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4KoVUuAqGuCBob_A91FiLKEJeCzO2xxW8Pw&s",
      returnPolicy: "No return & Exchange",
    },
  };

  const product = products[id?.toString()];

  if (!product) {
    return <h1>Product not found</h1>;
  }

  // Add to Cart Function
  const addToCart = async () => {
    const token = localStorage.getItem("token"); // Ensure the user is logged in

    if (!token) {
        alert("Please log in to add items to your cart.");
        navigate("/login");
        return;
    }

    const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify({
            productId: id,
            name: product.name,
            price: product.price,
            quantity: 1,
            img: product.img,
        }),
    });

    if (response.ok) {
        navigate("/cart"); // Redirect to cart page after adding
    } else {
        alert("Failed to add item to cart. Try again!");
    }
};

  return (
    <div className="product-detail">
      <div className="product-container">
        <img src={product.img} alt={product.name} className="product-img" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>₹{product.price}</h2>
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
          <div className="return-policy">{product.returnPolicy}</div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
