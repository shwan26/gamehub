import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      res.status(200).json(usersData);
      break;
    case 'POST':
      const newUser = req.body;
      const existingUsers = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      existingUsers.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));
      res.status(201).json(newUser);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// done