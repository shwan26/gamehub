import { useEffect, useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import Header from '@/components/Header';

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
      <Header /> {/* Add the Header component here */}
      <h1>Your Library</h1>
      <div className="library-list">
        {library.map(game => (
          <div key={game.id} className="game-item">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <button onClick={() => removeFromLibrary(game.id)}>Remove</button> {/* Add Remove Button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
