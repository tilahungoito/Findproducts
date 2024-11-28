import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Modal from 'react-modal';
import ProductForm from './ProductForm';

const ProductList = ({ products, onDelete, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleEditSubmit = (updatedData) => {
        onEdit({ ...selectedProduct, ...updatedData }); // Merge updated data with selected product
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onDelete={onDelete}
                        onEdit={handleEditClick}
                    />
                ))}
            </div>
            {selectedProduct && (
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <h2>Edit Product</h2>
                    <ProductForm
                        product={selectedProduct}
                        onSubmit={(updatedData) => {
                            handleEditSubmit({ ...selectedProduct, ...updatedData });
                        }}
                    />
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default ProductList;
