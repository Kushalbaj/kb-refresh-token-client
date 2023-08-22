import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import'./Register.css';

function Register() {
    const { isLoggedIn, logIn } = useContext(AuthContext);
    const navigate = useNavigate();
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

    const register = () => {
        axios.post(`${process.env.SERVER_APP_URL}/api/user/register`, { username, password })
            .then(res => {
                navigate('/login');
            });
    };

    return (
        <div className="registerBody">
        <div className="containerRegister">
        <h1 className="heading">Register</h1>
        <div className="form">
        <div className="txt_field">
            <label>Username</label>
        <input
            type="text"
            required placeholder="Enter you usertname"
            onChange={e => setUsername(e.target.value)}
        />
        </div>   
            <label>Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            className="txt_field"
            onChange={e => setPassword(e.target.value)}
        />
        </div>
        <button className= "buttonRegister" onClick={register}>
            Register
        </button>
        <div className="login_link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>
    </div>
    );
}
export default Register;
