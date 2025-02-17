import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">Foodiesta</Link>

        <button className="navbar-toggler" type="button">
          ☰
        </button>

        <ul className="nav-list">
          <li>
            <Link className={`nav-link ${location.pathname === "/ProductList" ? "active" : ""}`} to="/ProductList">Menu</Link>
          </li>
          <li>
            <Link className={`nav-link ${location.pathname === "/RatingProducts" ? "active" : ""}`} to="/RatingProducts">Favourite</Link>
          </li>
          <li>
            <Link className={`nav-link ${location.pathname === "/Cart" ? "active" : ""}`} to="/Cart">Cart</Link>
          </li>

          {!localStorage.getItem('token') ? (
            <div className="button">
              <Link className="cta-button" to="/login">Login</Link>
              <Link className="cta-button" to="/signup">Signup</Link>
            </div>
          ) : (
            <button onClick={handleLogOut} className="button logout-button">Logout</button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
