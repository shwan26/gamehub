import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/games.json');

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const games = JSON.parse(fs.readFileSync(filePath));
    const game = games.find(g => g.id === parseInt(id));
    res.status(200).json(game);
  }
}
