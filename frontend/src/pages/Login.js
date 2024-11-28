// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '', isSignup: false });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = form.isSignup ? 'https://backend-3lua.onrender.com/api/users/signup' : 'https://backend-3lua.onrender.com/api/users/login';
        try {
            const { data } = await axios.post(endpoint, {
                email: form.email,
                password: form.password,
            });
            login(data.token); // Save token to AuthContext
            toast.success(`${form.isSignup ? 'Signup' : 'Login'} successful!`);
            navigate('/'); // Redirect to home
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://backend-3lua.onrender.com/api/users/auth/google'; // Ensure correct backend route // Redirect to Google OAuth route
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>{form.isSignup ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{form.isSignup ? 'Sign Up' : 'Log In'}</button>
            </form>
            <button onClick={handleGoogleLogin} style={{ marginTop: '1rem' }}>
                Login with Google
            </button>
            <p>
                {form.isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => setForm({ ...form, isSignup: !form.isSignup })}
                >
                    {form.isSignup ? 'Log In' : 'Sign Up'}
                </span>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Login;
