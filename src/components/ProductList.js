import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Pizza & Burger", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 2, name: "Milk-shake", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 3, name: "South-dishes", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 4, name: "Meat, Fish & Eggs", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 5, name: "Masala Dhosha", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 6, name: "Breakfast & Sauces", image: "https://tse3.mm.bing.net/th?id=OIP.CLDt3yWNyPcsA2ZfE9xm_wHaEK&pid=Api&P=0&h=220" },
  { id: 7, name: "MORE VERITIES", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg4B1r6X7iPI1eLvkDcab4gy67SyhhjEUHcA&s" }
];

const products2 = [
  { id: 1, name: "Punjabi Thali", image: "https://tse3.mm.bing.net/th?id=OIP._eVx6PJlxdH9M7ycBx2pHQHaFS&pid=Api&P=0&h=220" },
  { id: 2, name: "Gujarati Thali", image: "https://tse3.mm.bing.net/th?id=OIP._eVx6PJlxdH9M7ycBx2pHQHaFS&pid=Api&P=0&h=220" },
  { id: 3, name: "Rajasthan Special", image: "https://tse3.mm.bing.net/th?id=OIP._eVx6PJlxdH9M7ycBx2pHQHaFS&pid=Api&P=0&h=220" },
  { id: 4, name: "MORE VERITIES", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg4B1r6X7iPI1eLvkDcab4gy67SyhhjEUHcA&s" }
];

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <div className="product-list">
      {/* Section 1 - Dessert & Beverage */}
      <h2>Dessert & Beverage</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <button onClick={() => navigate(`/product/${product.id}`)}>Buy</button>
          </div>
        ))}
      </div>

      {/* Section 2 - Dishes (12 AM - 3 PM) */}
      <h2>Dishes (12 AM - 3 PM)</h2>
      <div className="product-container">
        {products2.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <button onClick={() => navigate(`/product/${product.id}`)}>Buy</button>
          </div>
        ))}
      </div>

      {/* Show Arrow Icon AFTER the Last Product */}
      <div className="arrow-container">
        <i
          className="fa-solid fa-arrow-right arrow-icon"
          onClick={() => navigate("/product-page")} // ✅ Use the correct route
        ></i>
      </div>
    </div>
  );
};

export default ProductList;
