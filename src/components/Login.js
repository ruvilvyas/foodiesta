import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            mode: 'no-cors',
        });
    
        const json = await response.json();
        console.log(json);
    
        if (json.success && json.authtoken) {  
            localStorage.removeItem('token');  
            localStorage.setItem('token', json.authtoken);  
            navigate("/");  
        }
    };
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="mt-3">
            <h2>Login to Place an Order✨</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
