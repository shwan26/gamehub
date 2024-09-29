import React, { useEffect, useState } from 'react';
import users from '../data/users.json';
import games from '../data/games.json';
import GameCard from '../components/GameCard';

const LibraryPage = () => {
  const [ownedGames, setOwnedGames] = useState([]);
  const currentUser = users[0]; // Assuming the first user

  useEffect(() => {
    const userPurchases = currentUser?.purchases || [];
    setOwnedGames(games.filter(game => userPurchases.includes(game.id)));
  }, [currentUser]);

  const deleteFromLibrary = async (id) => {
    try {
      const updatedPurchases = currentUser.purchases.filter(purchaseId => purchaseId !== id);
      const response = await fetch(`/api/users/${currentUser.id}/purchase`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: id }),
      });

      if (response.ok) {
        setOwnedGames(prev => prev.filter(game => game.id !== id)); // Update local state
      } else {
        console.error('Failed to update purchases');
      }
    } catch (error) {
      console.error('Error while deleting game', error);
    }
  };

  return (
    <div>
      <h1 className="text-left mb-4">Library</h1>
      <div className="row">
        {ownedGames.length ? (
          ownedGames.map(game => (
            <div className="col-md-4 mb-4" key={game.id}>
              <GameCard 
                game={game}
                isPurchased={true}
                onDelete={deleteFromLibrary}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No games found in your library.</p>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
