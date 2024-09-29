import React from 'react';
import Link from 'next/link';
import Image from 'next/image';



const GameCard = ({ game }) => {
  return (
    <div className="card mb-4" style={{ width: '300px', height: '400px' }}>
      <img 
        src={game.image} 
        className="card-img-top" 
        alt={game.title} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body d-flex flex-column" style={{ height: '200px' }}>
        <h5 className="card-title">{game.title}</h5>
        <p className="card-text flex-grow-1">{game.description}</p>
        <Link href={`/game/${game.id}`} className="btn btn-primary mt-auto"> {/* mt-auto pushes the button to the bottom */}
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;