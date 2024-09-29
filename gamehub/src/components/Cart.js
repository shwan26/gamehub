import { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const updateCart = async (userId, gameId) => {
    const user = users.find(user => user.id === userId);
    const updatedCart = [...user.cart, gameId];

    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: updatedCart }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setCart(updatedUser.cart);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map(gameId => (
        <div key={gameId}>
          <p>Game ID: {gameId}</p>
          <button onClick={() => updateCart(1, gameId)}>Remove from Cart</button> {/* Assuming user ID is 1 */}
        </div>
      ))}
    </div>
  );
};

export default Cart;

// done