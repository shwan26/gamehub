import { promises as fs } from 'fs';
import path from 'path';

// Path to the users.json file
const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

// Helper function to read the JSON file
async function readUsersFile() {
  const data = await fs.readFile(usersFilePath);
  return JSON.parse(data);
}

// Helper function to write to the JSON file
async function writeUsersFile(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export default async function handler(req, res) {
  const { method, query } = req;
  let users = await readUsersFile();

  switch (method) {
    // Fetch all users
    case 'GET':
      res.status(200).json(users);
      break;

    // Create a new user
    case 'POST':
      const newUser = req.body;
      newUser.id = users.length ? users[users.length - 1].id + 1 : 1; // Generate new user ID
      users.push(newUser);
      await writeUsersFile(users);
      res.status(201).json(newUser);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
