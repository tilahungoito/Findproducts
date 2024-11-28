import React from 'react';
import './productCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onDelete, onEdit }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = product.image;
        link.download = product.name + '.jpg'; // You can adjust the extension based on the image format
        link.click();
    };

    return (
        <div className="card">
            <img src={product.image} alt={product.name} />
            <div className="card-content">
                <h3>{product.name}</h3>
                <p>Price: ${product.cost}</p>
                <p>Contact: {product.contact}</p>
                <div className="card-actions">
                    <button className="button" onClick={() => onEdit(product)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="button" onClick={() => onDelete(product._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                    {/* Download icon for image */}
                    <button className="button" onClick={handleDownload}>
                        <FontAwesomeIcon icon={faDownload} /> Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
