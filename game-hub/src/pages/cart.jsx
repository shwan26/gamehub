import React, { useState, useEffect } from 'react';

const CartPage = ({ initialCartItems = [] }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    // Fetch cart items if you want to load them from a backend or local storage
    const fetchCartItems = async () => {
      const response = await fetch('/api/cart'); // Adjust API endpoint as needed
      const data = await response.json();
      setCartItems(data);
    };
    
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <h5>{item.title}</h5>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))}
          <a href="/transaction" className="btn btn-primary">Proceed to Transaction</a>
        </div>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
};

export default CartPage;
