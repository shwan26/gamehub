import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/games.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const games = JSON.parse(fs.readFileSync(filePath));
    res.status(200).json(games);
  } else if (req.method === 'POST') {
    const newGame = req.body;
    const games = JSON.parse(fs.readFileSync(filePath));
    games.push(newGame);
    fs.writeFileSync(filePath, JSON.stringify(games));
    res.status(201).json(newGame);
  }
}
