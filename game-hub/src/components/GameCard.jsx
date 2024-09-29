import React from 'react';

const GameCard = ({ game, isPurchased, onAddToCart, onPurchase, onDelete }) => {
  return (
    <div className="card">
      <img 
        src={game.image} 
        className="card-img-top img-fluid" 
        alt={game.title} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h5 className="card-title">{game.title}</h5>
        <p className="card-text">
          <small className="text-muted">Price: ${game.price}</small>
        </p>
        {isPurchased ? (
          <button className="btn btn-danger" onClick={() => onDelete(game.id)}>Delete</button>
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => onAddToCart(game.id)}>Add to Cart</button>
            <a href={`/game/${game.id}`} className="btn btn-secondary">View Details</a>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
