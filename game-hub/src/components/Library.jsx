import React from 'react';
import users from '../data/users.json'; // Adjusted import to match your JSON structure
import games from '../data/games.json';

const Library = () => {
  const currentUser = users[0]; 
  const userPurchases = currentUser ? currentUser.purchases : []; // Default to an empty array if user is not found
  
  // Filter games that match the purchased IDs
  const ownedGames = games.filter((game) => userPurchases.includes(game.id));

  return (
    <div>
      <h1>Library</h1>
      <div className="game-grid">
        {ownedGames.length > 0 ? (
          ownedGames.map((game) => (
            <div key={game.id}>
              <img src={game.image} alt={game.title} />
              <h2>{game.title}</h2>
            </div>
          ))
        ) : (
          <p>No games found in your library.</p> // Display a message if no games are owned
        )}
      </div>
    </div>
  );
};

export default Library;
