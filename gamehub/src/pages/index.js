import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { useEffect, useState } from 'react';

export default function Store() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch('/api/games');
      const data = await res.json();
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <Header />
      <h1>Game Store</h1>
      <div className="game-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
