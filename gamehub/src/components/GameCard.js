import React from 'react';
import Link from 'next/link';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      {/* Change the button to link to the game detail page */}
      <Link href={`/game/${game.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default GameCard;
