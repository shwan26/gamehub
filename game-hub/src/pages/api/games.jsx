// /src/pages/api/game.jsx

import fs from 'fs';
import path from 'path';

// Helper function to get the path to games.json
const getGamesDataPath = () => path.join(process.cwd(), 'src/data/games.json');

// Helper function to read the data from games.json
const readGamesData = () => {
  const dataPath = getGamesDataPath();
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper function to write data to games.json
const writeGamesData = (data) => {
  const dataPath = getGamesDataPath();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// API route handler
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Retrieve all games
      const games = readGamesData();
      res.status(200).json(games);
      break;
      
    case 'POST':
      // Create a new game
      const newGame = { id: Date.now(), ...req.body }; // Use current timestamp as ID
      const existingGames = readGamesData();
      existingGames.push(newGame);
      writeGamesData(existingGames);
      res.status(201).json(newGame);
      break;

    case 'PUT':
      // Update an existing game
      const updatedGameData = req.body;
      const gamesList = readGamesData();
      const index = gamesList.findIndex(game => game.id === updatedGameData.id);

      if (index > -1) {
        gamesList[index] = updatedGameData;
        writeGamesData(gamesList);
        res.status(200).json(updatedGameData);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
      break;

    case 'DELETE':
      // Delete a game
      const { id } = req.body;
      const gamesToDelete = readGamesData();
      const filteredGames = gamesToDelete.filter(game => game.id !== id);
      writeGamesData(filteredGames);
      res.status(204).end(); // No content
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
