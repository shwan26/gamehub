import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <h1>Welcome to the Game Hub!</h1>
      <div className="game-list">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
// done