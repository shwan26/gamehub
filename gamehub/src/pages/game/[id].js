import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      if (id) {
        // Fetch the game data
        const res = await fetch(`/api/games/${id}`);
        const data = await res.json();
        setGame(data);
      }
    };

    const fetchUserData = async () => {
      const userId = 1; // Example user ID, update this based on actual logic

      // Fetch user data
      const userResponse = await fetch(`/api/users/${userId}`);
      const userData = await userResponse.json();
      setUser(userData);
    };

    fetchGameData();
    fetchUserData();
  }, [id]);

  const handleBuyNow = async () => {
    if (user && game) {
      // Check if the game is already in the user's library
      if (user.library.includes(parseInt(id))) {
        alert('You already own this game.');

        // Redirect back to the store/homepage
        router.push('/');
      } else {
        // Proceed to transaction if the game is not in the library
        router.push(`/transaction?gameId=${id}`);
      }
    }
  };

  const handleAddToCart = async () => {
    const userId = 1; // Example user ID, adjust this as needed

    // Fetch the user data
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();

    // Add the game ID to the user's cart if it's not already in it
    if (!user.cart.includes(parseInt(id))) {
      user.cart.push(parseInt(id)); // Add game ID to cart

      // Update users.json with the new cart
      await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      alert('Game added to cart!');
    } else {
      alert('Game is already in the cart');
    }
  };

  if (!game || !user) return <div>Loading...</div>;

  return (
    <div>
      <Header /> {/* Add Header */}
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <p>${game.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
