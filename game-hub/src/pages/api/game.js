import fs from 'fs';
import path from 'path';

// Define the path to the games JSON file
const gamesFilePath = path.join(process.cwd(), 'src', 'data', 'games.json');

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Handle GET request
      fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading games file:', err);
          return res.status(500).json({ error: 'Failed to read data' });
        }
        try {
          const games = JSON.parse(data);
          if (req.query.id) {
            // Find game by ID
            const game = games.find((g) => g.id === parseInt(req.query.id));
            if (game) {
              return res.status(200).json(game);
            } else {
              return res.status(404).json({ message: "Game not found" });
            }
          } else {
            // Return all games
            return res.status(200).json(games);
          }
        } catch (parseError) {
          console.error('Error parsing games data:', parseError);
          return res.status(500).json({ error: 'Failed to parse data' });
        }
      });
      break;

    case 'POST':
      const newGame = req.body;

      fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading games file:', err);
          return res.status(500).json({ error: 'Failed to read data' });
        }

        try {
          const gamesList = JSON.parse(data);
          gamesList.push(newGame);

          fs.writeFile(gamesFilePath, JSON.stringify(gamesList, null, 2), (writeError) => {
            if (writeError) {
              console.error('Error writing to games file:', writeError);
              return res.status(500).json({ error: 'Failed to write data' });
            }
            return res.status(201).json(newGame);
          });
        } catch (parseError) {
          console.error('Error parsing games data:', parseError);
          return res.status(500).json({ error: 'Failed to parse data' });
        }
      });
      break;

    case 'DELETE':
      const { id } = req.body;

      fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading games file:', err);
          return res.status(500).json({ error: 'Failed to read data' });
        }

        try {
          const gamesList = JSON.parse(data);
          const updatedGames = gamesList.filter((game) => game.id !== id);

          fs.writeFile(gamesFilePath, JSON.stringify(updatedGames, null, 2), (writeError) => {
            if (writeError) {
              console.error('Error writing to games file:', writeError);
              return res.status(500).json({ error: 'Failed to write data' });
            }
            return res.status(200).json({ message: 'Game deleted' });
          });
        } catch (parseError) {
          console.error('Error parsing games data:', parseError);
          return res.status(500).json({ error: 'Failed to parse data' });
        }
      });
      break;

    default:
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
