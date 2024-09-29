import { useEffect, useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import Header from '@/components/Header';
import GameCard from '@/components/GameCard';

const Library = () => {
  const { cart } = useContext(CartContext);
  const [library, setLibrary] = useState([]);
  const userId = 1; // Assuming user ID is 1 for now

  useEffect(() => {
    const fetchLibrary = async () => {
      const response = await fetch(`/api/users/${userId}`); // Fetch user with ID 1
      const userData = await response.json();
      const libraryGames = userData.library; // Assuming the library is stored in user data

      // Fetch game details for the library
      const gamesResponses = await Promise.all(libraryGames.map(gameId => fetch(`/api/games/${gameId}`)));
      const gamesData = await Promise.all(gamesResponses.map(res => res.json()));
      setLibrary(gamesData);
    };
    fetchLibrary();
  }, []);

  const removeFromLibrary = async (gameId) => {
    // Update the user's library state
    const updatedLibrary = library.filter(game => game.id !== gameId);
    setLibrary(updatedLibrary);

    // Update the user's library in users.json by sending a PUT request
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        library: updatedLibrary.map(game => game.id) // Only send game IDs to update the library
      }),
    });

    if (!response.ok) {
      console.error('Failed to update user library');
    }
  };

  return (
    <div>
  <Header />
  <h1 className="text-center mb-4">Your Library</h1>
  
  <div className="row">
    {library.map(game => (
      <div key={game.id} className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body d-flex flex-column">
            <h2 className="card-title">{game.title}</h2>
            <p className="card-text">{game.description}</p>
            <div className="mt-auto">
              <button 
                className="btn btn-danger w-100" 
                onClick={() => removeFromLibrary(game.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Library;
