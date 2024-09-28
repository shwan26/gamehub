// /src/components/GameManager.jsx

import { useEffect, useState } from 'react';

const GameManager = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({ title: '', description: '', price: '', image: '' });
  
  // Fetch all games
  const fetchGames = async () => {
    const response = await fetch('/api/game');
    const data = await response.json();
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Create a new game
  const createGame = async () => {
    const response = await fetch('/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    if (response.ok) {
      fetchGames(); // Refresh the list after creating
    }
  };

  // Update a game (assumes the first game is updated for simplicity)
  const updateGame = async () => {
    const updatedGame = { ...games[0], title: 'Updated Title' };
    const response = await fetch('/api/game', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGame),
    });
    if (response.ok) {
      fetchGames(); // Refresh the list after updating
    }
  };

  // Delete a game (assumes the first game is deleted for simplicity)
  const deleteGame = async () => {
    const response = await fetch('/api/game', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: games[0].id }),
    });
    if (response.ok) {
      fetchGames(); // Refresh the list after deleting
    }
  };

  return (
    <div>
      <h2>Game Manager</h2>
      <input
        type="text"
        placeholder="Title"
        value={game.title}
        onChange={(e) => setGame({ ...game, title: e.target.value })}
      />
      <button onClick={createGame}>Create Game</button>
      <button onClick={updateGame}>Update First Game</button>
      <button onClick={deleteGame}>Delete First Game</button>

      <h3>Games List</h3>
      <ul>
        {games.map((g) => (
          <li key={g.id}>{g.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameManager;
