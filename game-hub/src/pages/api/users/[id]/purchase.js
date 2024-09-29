import { promises as fs } from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');
const transactionsFilePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');

// Helper functions to read/write JSON files
async function readUsersFile() {
  const data = await fs.readFile(usersFilePath);
  return JSON.parse(data);
}

async function writeUsersFile(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

async function readTransactionsFile() {
  const data = await fs.readFile(transactionsFilePath);
  return JSON.parse(data);
}

export default async function handler(req, res) {
  const { method, query: { id } } = req;
  const userId = parseInt(id);
  let users = await readUsersFile();
  let transactions = await readTransactionsFile();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  switch (method) {
    // Add a game to the user's purchases
    case 'POST':
      const { gameId } = req.body;
      if (!users[userIndex].purchases.includes(gameId)) {
        users[userIndex].purchases.push(gameId);
        await writeUsersFile(users);
      }

      // Log the transaction (optional)
      const newTransaction = {
        id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
        userId: userId,
        gameId,
        date: new Date().toISOString(),
      };
      transactions.push(newTransaction);
      await fs.writeFile(transactionsFilePath, JSON.stringify(transactions, null, 2));

      res.status(200).json({ message: 'Purchase updated', purchases: users[userIndex].purchases });
      break;

    // Remove a game from the user's purchases (e.g., delete from library)
    case 'DELETE':
      const { gameId: deleteGameId } = req.body;
      users[userIndex].purchases = users[userIndex].purchases.filter((id) => id !== deleteGameId);
      await writeUsersFile(users);
      res.status(200).json({ message: 'Purchase removed', purchases: users[userIndex].purchases });
      break;

    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
