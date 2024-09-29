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
      <h1 className="text-center mb-4">Welcome to the Game Hub!</h1>
      <div className="row">
        {games.map(game => (
          <div className="col-md-4 d-flex justify-content-center" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
// done