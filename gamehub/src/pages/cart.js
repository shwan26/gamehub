import { useEffect, useState } from 'react';
import Link from 'next/link';

const Cart = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/1`); // Adjust the user ID as needed
      const data = await response.json();
      setUser(data);
      fetchGames(data.cart); // Fetch games in the user's cart
    };

    const fetchGames = async (cartIds) => {
      const responses = await Promise.all(
        cartIds.map(id => fetch(`/api/games/${id}`))
      );
      const gamesData = await Promise.all(responses.map(res => res.json()));
      setGames(gamesData);
    };

    fetchUserData();
  }, []);

  if (!user) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-list">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <p>Price: ${game.price}</p>
            {/* "View" button navigates to the game detail page */}
            <Link href={`/game/${game.id}`}>
              <button>View</button>
            </Link>
            {/* "Buy Now" button navigates to the transaction page */}
            <Link href="/transaction">
              <button>Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
