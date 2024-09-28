import games from '../../../data/games.json';
import fs from 'fs';
import path from 'path';

const gamesFilePath = path.resolve(process.cwd(), 'src/data/games.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // GET all games
    res.status(200).json(games);
  } else if (req.method === 'POST') {
    // POST new game
    const newGame = req.body;
    newGame.id = games.length + 1; // Assign a new ID
    const updatedGames = [...games, newGame];

    fs.writeFileSync(gamesFilePath, JSON.stringify(updatedGames, null, 2));

    res.status(201).json(newGame);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
