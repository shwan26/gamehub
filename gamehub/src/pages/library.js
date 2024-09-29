import { useEffect, useState, useContext } from 'react';
import CartContext from '../context/CartContext';

const Library = () => {
  const { cart } = useContext(CartContext);
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const response = await fetch('/api/users/1'); // Fetch user with ID 1
      const userData = await response.json();
      const libraryGames = userData.library; // Assuming the library is stored in user data

      // Fetch game details for the library
      const gamesResponses = await Promise.all(libraryGames.map(gameId => fetch(`/api/games/${gameId}`)));
      const gamesData = await Promise.all(gamesResponses.map(res => res.json()));
      setLibrary(gamesData);
    };
    fetchLibrary();
  }, []);

  return (
    <div>
      <h1>Your Library</h1>
      <div className="library-list">
        {library.map(game => (
          <div key={game.id}>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;

// done