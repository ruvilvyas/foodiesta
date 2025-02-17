import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import RatingProducts from './components/RatingProducts';
import Footer from './components/Footer';
import Home from './components/Home';  
import Buy from "./components/Buy";
import Login from './components/Login';
import Cart from './components/Cart'; 
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import ProductPage from './components/ProductPage'; // ✅ Fixed Import

function ProtectedRoute({ children }) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  const [cart, setCart] = useState([]); // Global cart state

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/RatingProducts" element={<RatingProducts />} />   
        <Route path="/product/:id" element={<ProtectedRoute><Buy /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout cart={cart} /></ProtectedRoute>} />
        <Route path="/product-page" element={<ProtectedRoute><ProductPage cart={cart} setCart={setCart} /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
