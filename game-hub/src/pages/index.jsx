import React from 'react';
import GameCard from '../components/GameCard'; // Import GameCard
import games from '../data/games.json'; // Import your game data

const Store = () => {
  return (
    <div>
      <h1 className="text-left mb-2">Game Store</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 mb-4" key={game.id}>
            <GameCard game={game} /> {/* Render each game card */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
