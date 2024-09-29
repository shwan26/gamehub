import React from 'react';
import { useParams } from 'react-router-dom';
import games from '../data/games.json';

const GameDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const game = games.find((game) => game.id === parseInt(id));

  const onPurchase = async (gameId) => {
    try {
      const response = await fetch(`/api/users/1/purchase`, { // Assuming user ID 1 for this example
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Purchase successful', data);
        // You may want to give user feedback here
      } else {
        console.error('Failed to update purchase');
      }
    } catch (error) {
      console.error('Error while making purchase', error);
    }
  };

  if (!game) {
    return <div className="text-center">Game not found.</div>;
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
          <button className="btn btn-primary mt-3" onClick={() => onAddToCart(game.id)}>Add to Cart</button>
          <button className="btn btn-success mt-3" onClick={() => onPurchase(game.id)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
