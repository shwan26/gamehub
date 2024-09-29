import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Image from 'next/image';

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
    <div >
  <Header /> {/* Add the Header component here */}
  <h1 className="text-center mb-4">Your Cart</h1>
  <div className="row">
    {games.map(game => (
      <div key={game.id} className="col-md-4 mb-4 d-flex flex-column align-items-center">
        <div className="card" style={{ width: '100%' }}>
          {/* Game Image */}
          <img 
            src={game.image} 
            alt={game.title} 
            className="card-img-top img-fluid" 
            style={{ objectFit: 'cover', height: '200px' }}
          />
          
          <div className="card-body">
            <h5 className="card-title">{game.title}</h5>
            <p className="card-text">{game.description}</p>
            <p className="card-text"><strong>Price: ${game.price}</strong></p>
            
            <div className="d-flex justify-content-between">
              <Link href={`/game/${game.id}`}>
                <button className="btn btn-primary">View</button>
              </Link>
              <Link href="/transaction">
                <button className="btn btn-success">Buy Now</button>
              </Link>
            </div>
            
            <button 
              className="btn btn-danger mt-2 w-100" 
              onClick={() => removeFromCart(game.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Cart;
