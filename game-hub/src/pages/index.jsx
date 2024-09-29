import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';

const Store = () => {
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('/api/game');
      const data = await response.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const handleAddToCart = (gameId) => {
    const gameToAdd = games.find(game => game.id === gameId);
    if (gameToAdd) {
      setCartItems([...cartItems, gameToAdd]);
    }
  };

  return (
    <div>
      <h1 className="text-left mb-2">Game Store</h1>
      <div className="row">
        {games.map(game => (
          <div className="col-md-4 mb-4" key={game.id}>
            <GameCard 
              game={game}
              onAddToCart={handleAddToCart} // Pass the add to cart handler
              onPurchase={() => window.location.href = `/transaction/${game.id}`} // Navigate to transaction page
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
