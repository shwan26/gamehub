// /src/components/Header.jsx
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0">GameHub</h1>
        <nav className="d-flex align-items-center">
          <Link href="/" className="text-white mx-2">Store</Link>
          <Link href="/library" className="text-white mx-2">Library</Link>
          <Link href="/cart" className="text-white mx-2">Cart</Link>
          <Link href="/profile" className="text-white mx-2">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
