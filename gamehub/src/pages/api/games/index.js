import fs from 'fs';
import path from 'path';

const gamesFilePath = path.join(process.cwd(), 'src', 'data', 'games.json');

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const gamesData = JSON.parse(fs.readFileSync(gamesFilePath, 'utf8'));
      res.status(200).json(gamesData);
      break;
    case 'POST':
      const newGame = req.body;
      const existingGames = JSON.parse(fs.readFileSync(gamesFilePath, 'utf8'));
      existingGames.push(newGame);
      fs.writeFileSync(gamesFilePath, JSON.stringify(existingGames, null, 2));
      res.status(201).json(newGame);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
// done