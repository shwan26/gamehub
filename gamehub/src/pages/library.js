import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header'; // Import Header

const Library = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 1; // Example user ID; adjust based on your logic
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);

      // Fetch the games for the library based on user's library
      const gamePromises = userData.library.map(gameId =>
        fetch(`/api/games/${gameId}`).then(res => res.json())
      );
      const gameData = await Promise.all(gamePromises);
      setGames(gameData);
    };

    fetchUserData();
  }, []);

  const handleDeleteGame = async (gameId) => {
    const userId = 1; // Example user ID; adjust this based on your logic

    // Update the user's library in users.json
    const updatedLibrary = user.library.filter(id => id !== gameId);

    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, library: updatedLibrary }),
    });

    if (response.ok) {
      alert('Game removed from library!');
      setGames(games.filter(game => game.id !== gameId)); // Remove the game from local state
    } else {
      alert('Failed to remove game from library.');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Header /> {/* Add Header */}
      <h1>Your Library</h1>
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h2>{game.title}</h2>
          <button onClick={() => handleDeleteGame(game.id)}>Delete</button>
        </div>
      ))}
      {games.length === 0 && <p>Your library is empty.</p>}
    </div>
  );
};

export default Library;
