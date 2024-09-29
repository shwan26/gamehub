import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

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
      <Header />
      <div className="row">
        <div className="col-lg-6">
          <img 
            src={game.image} 
            alt={game.title} 
            className="img-fluid rounded shadow" 
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 className="mb-3">{game.title}</h1>
          <p>{game.description}</p>
          <p><strong>Price:</strong> ${game.price}</p>
          
          <div className="mt-4">
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary btn-lg me-3"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow} 
              className="btn btn-success btn-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default GameDetail;
