import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">GameHub</h1>
        <nav className="d-flex align-items-center">
          <Link to="/" className="text-white mx-2">Store</Link>
          <Link to="/library" className="text-white mx-2">Library</Link>
          <Link to="/cart" className="text-white mx-2">Cart</Link>
          <Link to="/profile" className="text-white mx-2">Profile</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
