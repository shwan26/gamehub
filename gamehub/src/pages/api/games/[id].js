import fs from 'fs';
import path from 'path';

const gamesFilePath = path.join(process.cwd(), 'src', 'data', 'games.json');

export default function handler(req, res) {
  const { id } = req.query;

  const gamesData = JSON.parse(fs.readFileSync(gamesFilePath, 'utf8'));
  const gameIndex = gamesData.findIndex(game => game.id === parseInt(id));

  switch (req.method) {
    case 'GET':
      if (gameIndex >= 0) {
        res.status(200).json(gamesData[gameIndex]);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
      break;

    case 'PUT':
      if (gameIndex >= 0) {
        gamesData[gameIndex] = { ...gamesData[gameIndex], ...req.body };
        fs.writeFileSync(gamesFilePath, JSON.stringify(gamesData, null, 2));
        res.status(200).json(gamesData[gameIndex]);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
      break;

    case 'DELETE':
      if (gameIndex >= 0) {
        const deletedGame = gamesData.splice(gameIndex, 1);
        fs.writeFileSync(gamesFilePath, JSON.stringify(gamesData, null, 2));
        res.status(200).json(deletedGame);
      } else {
        res.status(404).json({ message: 'Game not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//done