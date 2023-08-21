import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import'./Login.css';

function Login() {
    const { isLoggedIn, logIn } = useContext(AuthContext);

    // check if user is already logged in or has a token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            logIn();
        }
    }, [logIn]);

    // if user is already logged in, navigate them to the home page
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post(`${process.env.SERVER_APP_URL}/api/user/login`, { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.accessToken);
                logIn(); // sets isLoggedIn state to true
            });
    };

    return (
        <div className="loginBody">
       <div className="containerLogin">
            <h1 className = "heading">Login</h1>
            <div className = "form">
            <div className="txt_field">
                <label>Username</label>   
            
                <input type="text" required placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                <span></span>
            </div>
            <div className="txt_field">
                <label>Password</label>
            
                <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                <span></span>
                
            </div>
            <div className="forgetPassword">Forgot Password?</div>
            <button className = "buttonLogin" onClick={login}>Login</button>
            <div className="signup_link">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Login;

