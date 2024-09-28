import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="card">
      <img 
        src={game.image} 
        className="card-img-top img-fluid" 
        alt={game.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Ensure fixed height and cover styling
      /> 
      <div className="card-body">
        <h5 className="card-title">{game.title}</h5>
        <p className="card-text">{game.description}</p>
        <p className="card-text">
          <small className="text-muted">Price: ${game.price}</small>
        </p>
        <a href={`/game/${game.id}`} className="btn btn-primary">View Details</a>
      </div>
    </div>
  );
};

export default GameCard;
