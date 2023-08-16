import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import styles from './Register.module.css';

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
        <div className={styles.container}>
        <h1 className={styles.heading}>Register</h1>
        <input
            type="text"
            placeholder="Username"
            className={styles.input}
            onChange={e => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={register}>
            Register
        </button>
        <p className={styles.link}>
            Already have an account? <Link to="/login" className={styles.anchor}>Login</Link>
        </p>
    </div>
    );
}

export default Register;
