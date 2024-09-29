import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Cart() {
  const [cartGames, setCartGames] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = 1; // Example user ID, adjust this logic as needed

      // Fetch the user data from users.json
      const userResponse = await fetch(`/api/users/${userId}`);
      const userData = await userResponse.json();

      setUser(userData);

      // Fetch the game details for each game in the user's cart
      const gamePromises = userData.cart.map(async (gameId) => {
        const gameResponse = await fetch(`/api/games/${gameId}`);
        return await gameResponse.json();
      });

      const games = await Promise.all(gamePromises);
      setCartGames(games);
    };

    fetchUserData();
  }, []);

  // Handle the "View" button click, redirect to game detail page
  const handleView = (gameId) => {
    router.push(`/game/${gameId}`); // Redirect to the game's detail page
  };

  // Handle the "Buy Now" button click
  const handleBuyNow = async (gameId) => {
    const userId = 1; // Example user ID, adjust as needed

    // Fetch the user data from users.json
    const userResponse = await fetch(`/api/users/${userId}`);
    const userData = await userResponse.json();

    // Check if the game is already in the user's library
    if (userData.library.includes(parseInt(gameId))) {
      alert('This game is already in your library.');

      // Remove the game from the cart
      userData.cart = userData.cart.filter((id) => id !== parseInt(gameId));

      // Update users.json with the new cart
      await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Redirect to the store page
      router.push('/');
    } else {
      // If the game is not in the library, proceed to the transaction page
      router.push(`/transaction?gameId=${gameId}`);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Header /> {/* Add header */}
      <h1>Your Cart</h1>
      {cartGames.length > 0 ? (
        cartGames.map((game) => (
          <div key={game.id} className="game-card">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <p>${game.price}</p>

            {/* View Button */}
            <button onClick={() => handleView(game.id)}>View</button>

            {/* Buy Now Button */}
            <button onClick={() => handleBuyNow(game.id)}>Buy Now</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
