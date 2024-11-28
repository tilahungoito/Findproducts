// components/CreateProduct.js
import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);

    // Helper function to refresh the token
    async function refreshToken() {
        try {
            const response = await axios.post('https://backend-3lua.onrender.com/api/auth/refresh', null, {
                withCredentials: true, // Ensure cookies are sent if using refresh tokens in cookies
            });
            const newToken = response.data.token; // Assuming the response contains the new JWT
            localStorage.setItem('token', newToken); // Update local storage with the new token
            return newToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            toast.error('Session expired. Please log in again.');
            localStorage.removeItem('token'); // Clear the token
            window.location.href = '/login'; // Redirect to login page
            return null; // Explicitly return null
        }
    }

    async function createProduct(productData) {
        setLoading(true); // Set loading state
        let token = localStorage.getItem('token'); // Retrieve token from local storage

        if (!token) {
            toast.error('You need to be logged in to create a product.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://backend-3lua.onrender.com/api/products',
                productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Add token to Authorization header
                    },
                }
            );
            console.log('Product created successfully:', response.data);
            toast.success('Product created successfully!');
        } catch (error) {
            if (error.response) {
                // Check for expired token and attempt refresh
                if (error.response.status === 403 && error.response.data.message?.includes('jwt expired')) {
                    console.warn('Token expired. Attempting to refresh...');
                    const newToken = await refreshToken(); // Attempt to refresh the token
                    if (newToken) {
                        // Retry the request with the new token
                        try {
                            const retryResponse = await axios.post(
                                'https://backend-3lua.onrender.com/api/products',
                                productData,
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${newToken}`,
                                    },
                                }
                            );
                            console.log('Product created successfully (after refresh):', retryResponse.data);
                            toast.success('Product created successfully!');
                            return; // Exit after successful retry
                        } catch (retryError) {
                            console.error('Error creating product after token refresh:', retryError);
                            toast.error('Failed to create product after refreshing token.');
                        }
                    }
                } else {
                    console.error('Error creating product:', error.response.data);
                    toast.error(error.response.data.message || 'Failed to create product.');
                }
            } else if (error.request) {
                // No response received
                console.error('No response received:', error.request);
                toast.error('No response from server. Please try again.');
            } else {
                // General errors
                console.error('Error:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div>
            <h1>Create a New Product</h1>
            <ProductForm onSubmit={createProduct} loading={loading} />
            <ToastContainer />
        </div>
    );
};

export default CreateProduct;

