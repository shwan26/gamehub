// src/components/Header.jsx
import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">Browse</div>
            <div className="nav">
                <a href="#">Browse</a>
                <a href="#">Wishlist</a>
                <a href="#">Cart</a>
            </div>
        </div>
    );
};

export default Header;
