import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    payDetail: "",
    price: ""
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token"); // ✅ Get token from localStorage

    try {
        const response = await fetch("http://localhost:5000/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken // ✅ Send token
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error("Payment failed. Check authentication.");
        }

        const json = await response.json();
        console.log("Response from server", json);
        alert("Payment successful!");
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
};

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="apple-pay">&#63743; Pay with Gpay</div>
        <p className="or">Or pay with card</p>
        <h3>Shipping Information</h3>
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={onChange} />
        <h4>Shipping Address</h4>
        <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={onChange} />
        <select name="country" onChange={onChange}>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
        </select>
        <input type="text" name="address" placeholder="Address" value={credentials.address} onChange={onChange} />
        <h3>Payment Details</h3>
        <div className="card-icons">
          <i className="fa-brands fa-cc-visa"></i>
          <i className="fa-brands fa-cc-mastercard"></i>
          <i className="fa-brands fa-cc-amex"></i>
        </div>
        <input type="text" name="payDetail" placeholder="Card Number" value={credentials.payDetail} onChange={onChange} />
        <input type="text" name="paymentMethod" placeholder="Payment Method (e.g., Credit Card)" value={credentials.paymentMethod} onChange={onChange} />
        <input type="number" name="price" placeholder="Amount" value={credentials.price} onChange={onChange} />
        <button className="pay-button" onClick={handleSubmit}>Pay ${credentials.price}</button>
      </div>
    </div>
  );
};

export default Checkout;
