import { promises as fs } from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

async function readUsersFile() {
  const data = await fs.readFile(usersFilePath);
  return JSON.parse(data);
}

async function writeUsersFile(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export default async function handler(req, res) {
  const { method, query: { id } } = req;
  let users = await readUsersFile();
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  switch (method) {
    // Fetch user by ID
    case 'GET':
      res.status(200).json(users[userIndex]);
      break;

    // Update user by ID
    case 'PUT':
      const updatedUser = { ...users[userIndex], ...req.body };
      users[userIndex] = updatedUser;
      await writeUsersFile(users);
      res.status(200).json(updatedUser);
      break;

    // Delete user by ID
    case 'DELETE':
      users.splice(userIndex, 1);
      await writeUsersFile(users);
      res.status(204).end(); // No content response
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
