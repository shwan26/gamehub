import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
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

  // Function to remove a game from the cart
  const removeFromCart = async (gameId) => {
    const updatedCart = user.cart.filter(id => id !== gameId); // Remove the game from the cart
    setUser(prevUser => ({
      ...prevUser,
      cart: updatedCart
    }));

    // Update user's cart in the users.json file by sending a PUT request
    const response = await fetch(`/api/users/1`, { // Adjust the user ID as needed
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: updatedCart
      }),
    });

    if (response.ok) {
      setGames(prevGames => prevGames.filter(game => game.id !== gameId)); // Remove the game from the displayed list
    } else {
      console.error('Failed to update the cart');
    }
  };

  if (!user) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <Header /> {/* Add the Header component here */}
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
            {/* "Remove" button to remove the game from the cart */}
            <button onClick={() => removeFromCart(game.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
