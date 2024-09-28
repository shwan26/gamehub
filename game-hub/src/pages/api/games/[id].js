import games from '../../../data/games.json';
import fs from 'fs';
import path from 'path';

const gamesFilePath = path.resolve(process.cwd(), 'src/data/games.json');

export default function handler(req, res) {
  const { id } = req.query;
  const gameId = parseInt(id, 10);

  const gameIndex = games.findIndex((g) => g.id === gameId);

  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' });
  }

  if (req.method === 'GET') {
    // GET single game by ID
    res.status(200).json(games[gameIndex]);
  } else if (req.method === 'PUT') {
    // PUT to update a game
    const updatedGame = { ...games[gameIndex], ...req.body };
    games[gameIndex] = updatedGame;

    fs.writeFileSync(gamesFilePath, JSON.stringify(games, null, 2));

    res.status(200).json(updatedGame);
  } else if (req.method === 'DELETE') {
    // DELETE a game by ID
    const updatedGames = games.filter((g) => g.id !== gameId);

    fs.writeFileSync(gamesFilePath, JSON.stringify(updatedGames, null, 2));

    res.status(200).json({ message: 'Game deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
