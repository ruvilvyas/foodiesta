import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: credentials.name,
                  email: credentials.email,
                  password: credentials.password
              })
          });
  
          if (!response.ok) {
              throw new Error('Failed to connect to the server');
          }
  
          const json = await response.json();
          console.log("Response from server:", json);
  
          if (json.authtoken) {
              localStorage.setItem('token', json.authtoken);
              navigate("/"); // Redirect to home after signup
          } else {
              alert(json.error || "Signup failed");
          }
      } catch (error) {
          console.error('Error during fetch:', error);
          alert("Error: " + error.message);
      }
  };
  
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
       
        <div className="mt-3">
            <h2 className="my-2">Create an account to Place order</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
