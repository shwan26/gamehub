import React from 'react';
import { useParams } from 'react-router-dom';
import games from '../data/games.json'; // Adjust the import path to your games data

const GameDetail = () => {
  const { id } = useParams(); // Get the game ID from the URL
  const game = games.find((game) => game.id === parseInt(id)); // Find the game by ID

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
          <a href={`/cart`} className="btn btn-primary mt-3">Add to Cart</a>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
