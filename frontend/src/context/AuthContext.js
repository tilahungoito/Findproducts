// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info
    const [loading, setLoading] = useState(true); // Manage loading state
    const navigate = useNavigate();

    // Helper function to decode Base64URL
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64URL to Base64
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null; // Return null on error
        }
    };

    // Fetch user from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = decodeToken(token);
            if (userData) {
                setUser(userData);
            } else {
                console.warn('Invalid token, clearing localStorage');
                localStorage.removeItem('token'); // Clear invalid token
                setUser(null);
            }
        }
        setLoading(false); // Stop loading regardless of token presence
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const userData = decodeToken(token);
        if (userData) {
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    // Optionally render a loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
