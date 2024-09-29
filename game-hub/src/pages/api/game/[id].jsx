import React from 'react';
import { useRouter } from 'next/router';
import games from '../../../data/games.json'; // Adjust the import path to your games data

const GameDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const game = games.find((game) => game.id === parseInt(id)); // Find the game by ID

  const addToCart = () => {
    alert("Game added to cart!"); // Add your cart logic here
  };

  if (!game) {
    return <div className="text-center">Game not found.</div>; // Display a message if the game doesn't exist
  }

  return (
    <div>
      <h1 className="text-left">{game.title}</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={game.image} className="img-fluid" alt={game.title} />
        </div>
        <div className="col-md-6">
          <h3>Description</h3>
          <p>{game.description}</p>
          <h4>Price: ${game.price.toFixed(2)}</h4>
          <button className="btn btn-primary mt-3" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
