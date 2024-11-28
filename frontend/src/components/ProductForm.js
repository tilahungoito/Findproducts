import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onSubmit, product }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        cost: product?.cost || '',
        image: product?.image || '', // URL or base64 string for image
        contact: product?.contact || '',
        imageFile: null, // New state to handle file upload
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
        }
    };

    const validateContact = (contact) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^\d{10}$/; // Assuming 10-digit phone numbers
        return emailPattern.test(contact) || phonePattern.test(contact);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateContact(formData.contact)) {
            alert("Invalid contact. Please enter a valid email or phone number.");
            return;
        }

        // If image file is provided, handle the upload (convert it to a base64 URL)
        if (formData.imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // After file is read as a data URL, update formData with the base64 string
                const imageData = reader.result;
                setFormData({ ...formData, image: imageData });
                onSubmit({ ...formData, image: imageData }); // Submit the base64 image
            };
            reader.readAsDataURL(formData.imageFile); // Convert file to base64 string
        } else {
            onSubmit(formData); // No file uploaded, use the URL if available
        }

        navigate('/'); // Redirect after submission
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f7f7f7', padding: '0 20px' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>
                    {product ? 'Edit Product' : 'Create Product'}
                </h2>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        placeholder="Price"
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    {/* Image upload input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Contact (Email or Phone)"
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.8rem', fontSize: '1.1rem', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
