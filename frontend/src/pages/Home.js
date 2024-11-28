//front
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [colorMode, setColorMode] = useState('light');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    const toggleColorMode = () => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
        document.body.style.backgroundColor = colorMode === 'light' ? '#333' : '#fff';
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://backend-3lua.onrender.com/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data); // Set the initial filtered products to all products
        };
        fetchProducts();
    }, []);

    const token = localStorage.getItem('token');

    const handleSearch = (query) => {
        if (query === '') {
            setFilteredProducts(products); // If search query is empty, show all products
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered); // Set the filtered products based on the query
        }
    };

    const handleDelete = async (id) => {
        if (!token) {
            toast.error('You must be logged in to delete a product.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.delete(
                `https://backend-3lua.onrender.com/api/products/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setProducts(products.filter(product => product._id !== id));
            setFilteredProducts(filteredProducts.filter(product => product._id !== id)); // Remove deleted product from filtered list as well
            toast.success('Product deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete product.');
        }
    };

    const handleEdit = async (updatedProduct) => {
        if (!token) {
            toast.error('You must be logged in to edit a product.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.put(
                `https://backend-3lua.onrender.com/api/products/${updatedProduct._id}`,
                updatedProduct,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setProducts(
                products.map((product) =>
                    product._id === updatedProduct._id ? response.data : product
                )
            );
            setFilteredProducts(
                filteredProducts.map((product) =>
                    product._id === updatedProduct._id ? response.data : product
                )
            );
            toast.success('Product updated successfully!');
        } catch (error) {
            toast.error('Failed to update product.');
        }
    };

    return (
        <div>
            <Navbar
                toggleColorMode={toggleColorMode}
                colorMode={colorMode}
                onSearch={handleSearch} // Passing the handleSearch function as a prop
            />
            <ProductList
                products={filteredProducts} // Use filteredProducts for rendering
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
            <ToastContainer />
        </div>
    );
};

export default Home;

