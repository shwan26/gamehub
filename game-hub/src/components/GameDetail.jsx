// src/pages/game/GameDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams(); // Get the game ID from the URL

  // Logic to fetch and display game details using the id
  return <div>Details for game ID: {id}</div>;
};

export default GameDetail;
