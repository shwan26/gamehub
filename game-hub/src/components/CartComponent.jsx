import React, { useState } from 'react';
import games from '../data/games.json';

const CartComponent = () => {
  const [cart, setCart] = useState([]); // Initialize an empty cart state

  const handleAddToCart = (game) => {
    setCart([...cart, game]); // Add the game to the cart state
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((game, index) => (
          <li key={index}>{game.name}</li>
        ))}
      </ul>
      {games.map((game, index) => (
        <div key={index}>
          <h2>{game.name}</h2>
          <button onClick={() => handleAddToCart(game)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;