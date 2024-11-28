//frontend/src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = ({ toggleColorMode, colorMode, onSearch }) => {
    const { user, logout } = useContext(AuthContext);

    // State for search input
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Call the onSearch function passed as a prop to filter products dynamically
    };

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f0f0f0',
                position: 'relative',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                flexWrap: 'wrap',
            }}
        >
            {/* Left Section */}
            <h1
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    flex: '1 1 auto',
                }}
            >
                🎯Find Products⌚
            </h1>

            {/* Center Section (Search & Create Button) */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    flex: '2 1 auto',
                    flexWrap: 'wrap',
                }}
            >
                {/* Search Input */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by product name"
                        style={{
                            padding: '0.5rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '250px',
                            outline: 'none',
                            transition: 'all 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.border = '1px solid #007BFF')}
                        onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
                    />
                    <button
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
                        onClick={() => onSearch(searchQuery)}
                    >
                        Search
                    </button>
                </div>

                {/* Add Product Button */}
                <Link to="/create">
                    <button
                        style={{
                            fontSize: '1.5rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        title="Add Product"
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        ➕
                    </button>
                </Link>
            </div>

            {/* Right Section (User Info) */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flex: '1 1 auto',
                }}
            >
                {/* Color Mode Button */}
                <button
                    onClick={toggleColorMode}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    {colorMode === 'light' ? '🌙' : '☀️'}
                </button>

                {/* User Section */}
                {user ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        {/* User Icon */}
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#ddd',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '0.3rem',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#007BFF')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ddd')}
                        >
                            {user.email.charAt(0).toUpperCase()} {/* User Initial */}
                        </div>

                        {/* Email */}
                        <p
                            style={{
                                margin: '0',
                                fontSize: '0.9rem',
                                color: '#333',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                fontWeight: '500',
                            }}
                        >
                            {user.email}
                        </p>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


