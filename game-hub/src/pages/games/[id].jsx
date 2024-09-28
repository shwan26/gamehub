import React from 'react';
import { useParams } from 'react-router-dom';
import games from '../../data/games.json'; // Adjust the path if necessary

const GameDetail = () => {
  const { id } = useParams();
  const game = games.find((g) => g.id === parseInt(id));

  return (
    <div>
      {game ? (
        <>
          <h1>{game.title}</h1>
          <img src={game.image} alt={game.title} />
          <p>{game.description}</p>
          <p>Price: ${game.price}</p>
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </>
      ) : (
        <p>Game not found</p>
      )}
    </div>
  );
};

export default GameDetail;
