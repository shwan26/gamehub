import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GameDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the game ID from the URL
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null); // To store user data

  useEffect(() => {
    const fetchGameDetail = async () => {
      if (id) {
        const response = await fetch(`/api/games/${id}`);
        const data = await response.json();
        setGame(data);
      }
    };

    const fetchUserData = async () => {
      const response = await fetch(`/api/users/1`); // Adjust the user ID as needed
      const data = await response.json();
      setUser(data);
    };

    fetchGameDetail();
    fetchUserData();
  }, [id]);

  const handleAddToCart = async () => {
    if (user) {
      // Check if the game is already in the cart
      if (user.cart.includes(game.id)) {
        alert("This game is already in your cart.");
        return;
      }

      const updatedCart = [...user.cart, game.id];

      await fetch(`/api/users/1`, { // Adjust the user ID as needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart }),
      });

      // Redirect to cart page
      router.push('/cart');
    }
  };

  const handleBuyNow = async () => {
    // Handle buy now action (You may want to implement transaction logic here)
    router.push('/transaction');
  };

  if (!game) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <p>Price: ${game.price}</p>
      <p>Release Date: {game.releaseDate}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default GameDetail;
