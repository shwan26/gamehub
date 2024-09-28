import React from 'react';
import users from '../data/users.json'; // Adjusted import to match your JSON structure
import games from '../data/games.json';
import GameCard from '../components/GameCard'; // Import the GameCard component

const LibraryPage = () => {
  const currentUser = users[0]; 
  const userPurchases = currentUser ? currentUser.purchases : []; // Default to an empty array if user is not found
  
  // Filter games that match the purchased IDs
  const ownedGames = games.filter((game) => userPurchases.includes(game.id));

  return (
    <div>
      <h1 className="text-left mb-4">Library</h1>
  
      <div className="row">
        {ownedGames.length > 0 ? (
          ownedGames.map((game) => (
            <div className="col-md-4 mb-4" key={game.id}>
              <GameCard game={game} /> {/* Use the GameCard component */}
            </div>
          ))
        ) : (
          <p className="text-center">No games found in your library.</p> // Display a message if no games are owned
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
